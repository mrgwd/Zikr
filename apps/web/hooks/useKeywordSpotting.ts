/**
 * useKeywordSpotting — orchestrates mic + model into zikr detection.
 *
 * Key fix: `handleAudioData` no longer lists `detections` as a dependency.
 * Instead, it uses `setDetections` with a functional updater (prev => next),
 * which always has access to the latest state without needing to close over it.
 * This prevents the callback — and the entire audio pipeline wired to it —
 * from being recreated on every count increment.
 */

"use client";

import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import {
  COOLDOWN_MS,
  CONFIDENCE_THRESHOLD,
  SAME_ZIKR_COOLDOWN_MS,
} from "@workspace/audio-processing/constants";
import { processAudio, resampleAudio } from "@workspace/audio-processing/utils";
import { usePersistentMicrophone } from "./usePersistentMicrophone";
import { Detections } from "@workspace/model/types";
import {
  ensureDailyReset,
  getCounts,
  incrementCount,
  setCount,
} from "@workspace/lib/zikrStorage";

import { useModelLoader } from "./useModelLoader";
import { buildInitialDetections } from "@workspace/azkar/helpers";
import { getAzkarKeys } from "@workspace/azkar/constants";

export function useKeywordSpotting() {
  const {
    classifier,
    isModelLoaded,
    isModelLoading,
    error: modelError,
  } = useModelLoader();

  const initialDetections = useMemo(
    () => buildInitialDetections() as Detections,
    [],
  );

  const [detections, setDetections] = useState<Detections>(initialDetections);

  /**
   * Counts consecutive "non-zikr" audio windows.
   * Renamed from lastZikrTime → idleTickCount to reflect what it actually is.
   * Reset to 0 on any valid zikr detection.
   * Incremented on every "noise" or "unknown" classification.
   */
  const [idleTickCount, setIdleTickCount] = useState(0);

  const activeZikrRef = useRef<{ label: string | null; time: number }>({ label: null, time: 0 });
  const keys = useMemo(() => getAzkarKeys(), []);

  // ── Hydrate counts from storage on mount ──────────────────────────────
  useEffect(() => {
    ensureDailyReset(keys as unknown as string[]);
    const stored = getCounts(keys as unknown as string[]);
    setDetections((prev) => {
      const rehydrated = { ...prev };
      keys.forEach((k) => {
        rehydrated[k] = { ...prev[k]!, count: stored[k] ?? prev[k]!.count };
      });
      return rehydrated;
    });
  }, [keys]);

  // ── Audio processing callback ──────────────────────────────────────────
  const handleAudioData = useCallback(
    (audioData: Float32Array, sampleRate: number) => {
      // Read classifier from the singleton directly — avoids it being
      // a dep while still always using the latest instance
      const currentClassifier = classifier;
      if (!currentClassifier) return;

      try {
        const resampledAudio = resampleAudio(audioData, sampleRate);
        const scaledAudioData = processAudio(resampledAudio);
        if (!scaledAudioData) return;

        const result = currentClassifier.classify(scaledAudioData, true);
        if (!result?.results) return;

        // Dispatch debug info
        if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("debugAudioChunk", {
              detail: {
                rawAudio: Array.from(resampledAudio),
                processedAudio: Array.from(scaledAudioData),
                results: result.results,
              },
            })
          );
        }

        let maxConfidence = 0.4;
        let detectedLabel: string | null = null;

        result.results.forEach((r) => {
          if (r.value > maxConfidence && r.value > CONFIDENCE_THRESHOLD) {
            maxConfidence = r.value;
            detectedLabel = r.label;
          }
        });

        if (detectedLabel === null) return;

        const isNoise =
          detectedLabel === "noise" || detectedLabel === "unknown";

        if (isNoise) {
          setIdleTickCount((prev) => prev + 1);
          return;
        }

        // ── Valid zikr detected ──────────────────────────────────────
        setIdleTickCount(0);

        const now = Date.now();
        const active = activeZikrRef.current;

        // If it's the SAME zikr, prevent overlapping windows from double counting it
        if (active.label === detectedLabel) {
          if (now - active.time < SAME_ZIKR_COOLDOWN_MS) {
            return;
          }
        }
        // If switching to a NEW zikr, check the global switch cooldown
        else if (active.label !== null) {
          if (now - active.time < COOLDOWN_MS) {
            // Block the switch. We must wait COOLDOWN_MS before accepting a DIFFERENT zikr.
            return;
          }
        }

        // Update the active zikr and the last time we heard it
        activeZikrRef.current = { label: detectedLabel, time: now };

        // Functional updater — no need for detections in dep array
        setDetections((prev) => {
          const current = prev[detectedLabel!];
          if (!current) return prev;
          return {
            ...prev,
            [detectedLabel!]: {
              ...current,
              count: current.count + 1, // Count every detection
              lastAccuracy: Math.round(maxConfidence * 100),
            },
          };
        });

        if (keys.includes(detectedLabel)) {
          incrementCount(detectedLabel);
        }
      } catch (err) {
        console.error("Audio processing error:", err);
      }
    },
    // classifier is the only real dep here — keys is stable (memoized)
    [classifier, keys],
  );

  const {
    isListening,
    error: micError,
    startListening,
    stopListening,
  } = usePersistentMicrophone({
    onAudioData: handleAudioData,
    workletUrl: "/worklets/zikr-audio-processor.worklet.js",
  });

  // ── Actions ────────────────────────────────────────────────────────────
  const resetCounters = useCallback(() => {
    setDetections((prev) => {
      const next: Detections = {} as Detections;
      Object.entries(prev).forEach(([k, v]) => {
        next[k] = { ...v, count: 0, lastAccuracy: 0 };
      });
      return next;
    });
    setIdleTickCount(0);
    keys.forEach((k) => setCount(k, 0));
  }, [keys]);

  const handleStartListening = useCallback(() => {
    if (!isModelLoaded) return;
    startListening();
  }, [isModelLoaded, startListening]);

  const handleToggleListening = useCallback(() => {
    if (isListening) stopListening();
    else handleStartListening();
  }, [isListening, stopListening, handleStartListening]);

  return {
    isListening,
    isModelLoaded,
    isModelLoading,
    error: modelError || micError,
    detections,
    idleTickCount,
    startListening: handleStartListening,
    stopListening,
    toggleListening: handleToggleListening,
    resetCounters,
  } as const;
}
