"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { AppSettings } from "@workspace/lib/settings";
import {
  DEFAULT_SETTINGS,
  loadSettingsAsync,
  resetSettings,
  saveSettings,
  subscribeSettings,
} from "@workspace/lib/settings";

// ─── Context ──────────────────────────────────────────────────────────────────

interface SettingsContextValue {
  settings: AppSettings;
  updateSetting: <K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K],
  ) => void;
  resetAllSettings: () => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  // Start with defaults (safe for SSR), hydrate on client mount
  const [settings, setSettings] = useState<AppSettings>({
    ...DEFAULT_SETTINGS,
  });

  useEffect(() => {
    let active = true;

    async function initialize() {
      const current = await loadSettingsAsync();
      if (active) {
        setSettings(current);
      }
    }
    initialize();

    const unsubscribe = subscribeSettings((updated) => {
      if (active) {
        setSettings(updated);
      }
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const updateSetting = useCallback(
    <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
      setSettings((prev) => {
        const next = { ...prev, [key]: value };
        saveSettings({ [key]: value });
        return next;
      });
    },
    [],
  );

  const resetAllSettings = useCallback(() => {
    const defaults = resetSettings();
    setSettings(defaults);
  }, []);

  return (
    <SettingsContext.Provider
      value={{ settings, updateSetting, resetAllSettings }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx)
    throw new Error("useSettings must be used inside <SettingsProvider>");
  return ctx;
}
