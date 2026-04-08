"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "./button";
import { AzkarList } from "@workspace/azkar/constants";
import { CONFIDENCE_THRESHOLD } from "@workspace/audio-processing/constants";

export type DebugChunk = {
  rawAudio: number[];
  processedAudio: number[];
  results: Array<{ label: string; value: number }>;
  timestamp: number;
};

interface DevAudioDebuggerProps {
  /** Confidence value (0–1) above which a result is highlighted green. */
  confidenceThreshold?: number;
}

/**
 * DevAudioDebugger
 *
 * Drop-in audio debug overlay. Listens for:
 *   window.dispatchEvent(new CustomEvent("debugAudioChunk", {
 *     detail: { rawAudio, processedAudio, results }
 *   }))
 *
 * Mount this component only when you want the debugger to be available.
 * It carries no environment guard itself — the consumer decides when to render it.
 *
 * Layout: bottom-sheet style (inset-x-0 bottom-0 max-h-[90vh]) so it works
 * in both full-page web apps and narrower extension popups without overflowing.
 */
export const DevAudioDebugger = ({
  confidenceThreshold = CONFIDENCE_THRESHOLD,
}: DevAudioDebuggerProps) => {
  const [chunks, setChunks] = useState<DebugChunk[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleDebugAudio = (e: Event) => {
      const detail = (e as CustomEvent).detail as Omit<DebugChunk, "timestamp">;
      setChunks((prev) => {
        const newChunks = [{ ...detail, timestamp: Date.now() }, ...prev];
        if (newChunks.length > 20) newChunks.pop();
        return newChunks;
      });
    };

    window.addEventListener("debugAudioChunk", handleDebugAudio);
    return () =>
      window.removeEventListener("debugAudioChunk", handleDebugAudio);
  }, []);

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed right-4 bottom-4 z-50 size-10 rounded-full bg-black text-lg text-white opacity-50 shadow-lg hover:opacity-100 dark:bg-white dark:text-black"
        title="Open Audio Debugger"
      >
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          🐞
        </span>
      </Button>
    );
  }

  return (
    <div
      dir="ltr"
      className="fixed right-0 bottom-0 z-50 flex max-h-[80vh] w-full flex-col gap-3 overflow-hidden overflow-x-hidden rounded-t-xl border border-zinc-200 bg-white p-3 text-xs shadow-xl sm:w-[400px] md:right-4 md:bottom-16 md:h-[600px] dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="flex shrink-0 items-center justify-between border-b pb-2 dark:border-zinc-800">
        <h3 className="font-bold">🐞 Audio Debugger</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-zinc-500 hover:text-black dark:hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 overflow-x-hidden overflow-y-auto">
        {chunks.length === 0 ? (
          <div className="py-8 text-center text-zinc-500">
            No audio chunks yet. Start listening!
          </div>
        ) : (
          chunks.map((chunk, i) => (
            <AudioChunkView
              key={chunk.timestamp + i}
              chunk={chunk}
              confidenceThreshold={confidenceThreshold}
            />
          ))
        )}
      </div>
    </div>
  );
};

const AudioChunkView = ({
  chunk,
  confidenceThreshold,
}: {
  chunk: DebugChunk;
  confidenceThreshold: number;
}) => {
  const rawCanvasRef = useRef<HTMLCanvasElement>(null);
  const procCanvasRef = useRef<HTMLCanvasElement>(null);

  const [uploadLabel, setUploadLabel] = useState<string>(
    AzkarList[0]?.id || "noise",
  );
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    drawWaveform(rawCanvasRef.current, chunk.rawAudio, "rgb(239, 68, 68)");
    drawWaveform(
      procCanvasRef.current,
      chunk.processedAudio,
      "rgb(34, 197, 94)",
    );
  }, [chunk]);

  const bestResult = chunk.results.reduce(
    (prev, current) => (prev.value > current.value ? prev : current),
    chunk.results[0] || { label: "none", value: 0 },
  );

  const isGood = bestResult.value > confidenceThreshold;
  const badgeClass =
    "font-bold px-2 py-0.5 rounded text-[10px] " +
    (isGood
      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400");

  const playAudio = (data: number[]) => {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    const audioCtx = new AudioCtx();
    const sampleRate = 16000;
    const normalizedArray = new Float32Array(data.length);
    for (let i = 0; i < data.length; i++) {
      let val = data[i]!;
      if (Math.abs(val) > 1.0) val = val / 32768.0;
      normalizedArray[i] = val;
    }
    const buffer = audioCtx.createBuffer(1, normalizedArray.length, sampleRate);
    buffer.copyToChannel(normalizedArray, 0);
    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(audioCtx.destination);
    source.start(0);
  };

  const downloadWav = (data: number[]) => {
    const blob = createWavBlob(data);
    const url = URL.createObjectURL(blob);
    Object.assign(document.createElement("a"), {
      href: url,
      download: `sample_${Date.now()}.wav`,
    }).click();
  };

  const uploadWav = async (data: number[]) => {
    try {
      setIsUploading(true);
      const apiKey =
        (typeof process !== "undefined" &&
          process.env.NEXT_PUBLIC_EDGE_IMPULSE_API_KEY) ||
        (typeof import.meta !== "undefined" && (import.meta as any).env
          ? (import.meta as any).env.VITE_EDGE_IMPULSE_API_KEY
          : "") ||
        (typeof process !== "undefined" && process.env.EDGE_IMPULSE_API_KEY);

      if (!apiKey) {
        alert("Missing EDGE_IMPULSE_API_KEY in environment variables.");
        return;
      }

      // 1. Prepare the standard WAV blob
      const blob = createWavBlob(data);
      const fileName = `sample_${Date.now()}.wav`;

      // 2. IMPORTANT: Use the /files endpoint instead of /data
      const endpoint = Math.random() < 0.8 ? "training" : "testing";
      const url = `https://ingestion.edgeimpulse.com/api/${endpoint}/files`;

      // 3. Use FormData (The /files endpoint loves this)
      const formData = new FormData();
      formData.append("data", blob, fileName);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "x-label": uploadLabel,
          // DO NOT set Content-Type header; let the browser set the multipart boundary
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(`Upload failed: ${JSON.stringify(result)}`);
      }
      alert(`Uploaded to ${endpoint} successfully as '${uploadLabel}'`);
    } catch (e: any) {
      alert(e.message || "Failed to upload.");
      console.error(e);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex shrink-0 flex-col gap-2 rounded-lg border border-zinc-200 bg-zinc-50 p-2 text-xs dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between font-mono">
        <span className="text-zinc-500">
          {new Date(chunk.timestamp).toLocaleTimeString()}
        </span>
        <span className={badgeClass}>
          {bestResult.label}: {bestResult.value.toFixed(2)}
        </span>
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <div className="mb-1 flex items-center justify-between text-[10px] text-zinc-500">
            <span className="flex items-center gap-1">
              Raw
              <button
                onClick={() => playAudio(chunk.rawAudio)}
                title="Play raw"
              >
                ▶️
              </button>
            </span>
            <span>n={chunk.rawAudio.length}</span>
          </div>
          <canvas
            ref={rawCanvasRef}
            width={160}
            height={40}
            className="w-full rounded border bg-white dark:border-zinc-800 dark:bg-black"
          />
        </div>
        <div className="flex-1">
          <div className="mb-1 flex items-center justify-between text-[10px] text-zinc-500">
            <span className="flex items-center gap-1">
              Proc
              <button
                onClick={() => playAudio(chunk.processedAudio)}
                title="Play processed"
              >
                ▶️
              </button>
              <button
                onClick={() => downloadWav(chunk.processedAudio)}
                title="Download WAV"
              >
                💾
              </button>
              <span className="relative ml-1 flex items-center space-x-1 border-l pl-2 dark:border-zinc-700">
                <select
                  value={uploadLabel}
                  onChange={(e) => setUploadLabel(e.target.value)}
                  className="w-14 rounded border bg-transparent p-0 text-[10px] outline-none dark:border-zinc-700"
                >
                  {AzkarList.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.id}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => uploadWav(chunk.processedAudio)}
                  title="Upload to Edge Impulse"
                  disabled={isUploading}
                  className="disabled:opacity-50"
                >
                  {isUploading ? "⏳" : "☁️"}
                </button>
              </span>
            </span>
            <span>n={chunk.processedAudio.length}</span>
          </div>
          <canvas
            ref={procCanvasRef}
            width={160}
            height={40}
            className="w-full rounded border bg-white dark:border-zinc-800 dark:bg-black"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-1">
        {chunk.results
          .filter((r) => r.value > 0.05)
          .sort((a, b) => b.value - a.value)
          .map((r) => (
            <span
              key={r.label}
              className="rounded bg-zinc-200/50 px-1 text-[10px] text-zinc-600 dark:bg-zinc-800/50"
            >
              {r.label}: {r.value.toFixed(2)}
            </span>
          ))}
      </div>
    </div>
  );
};

function drawWaveform(
  canvas: HTMLCanvasElement | null,
  data: number[],
  color: string,
) {
  if (!canvas || !data.length) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const { width, height } = canvas;
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.beginPath();
  const step = Math.max(1, Math.floor(data.length / width));
  const amp = height / 2;
  for (let i = 0; i < width; i++) {
    let min = 1.0,
      max = -1.0;
    for (let j = 0; j < step; j++) {
      const idx = i * step + j;
      if (idx >= data.length) break;
      let val = data[idx]!;
      if (Math.abs(val) > 1.0) val = val / 32768.0;
      if (val < min) min = val;
      if (val > max) max = val;
    }
    ctx.moveTo(i, amp - min * amp);
    ctx.lineTo(i, amp - max * amp);
  }
  ctx.stroke();
}

function createWavBlob(data: number[]): Blob {
  const sampleRate = 16000;
  const samples = new Int16Array(
    data.map((v) =>
      Math.max(-32768, Math.min(32767, Math.abs(v) > 1.0 ? v : v * 32768)),
    ),
  );
  const buf = new ArrayBuffer(44 + samples.byteLength);
  const view = new DataView(buf);
  const str = (off: number, s: string) =>
    [...s].forEach((c, i) => view.setUint8(off + i, c.charCodeAt(0)));
  str(0, "RIFF");
  view.setUint32(4, 36 + samples.byteLength, true);
  str(8, "WAVE");
  str(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  str(36, "data");
  view.setUint32(40, samples.byteLength, true);
  new Int16Array(buf, 44).set(samples);
  return new Blob([buf], { type: "audio/wav" });
}
