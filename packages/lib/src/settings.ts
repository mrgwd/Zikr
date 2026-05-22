// ─── Types & defaults ────────────────────────────────────────────────────────

export interface AppSettings {
  confidenceThreshold: number; // 0.5 – 0.99
  targetRms: number; // 0.05 – 0.30
  minRms: number; // 0.00001 – 0.001
  // language: string; // reserved — hidden until i18n is added
}

export const DEFAULT_SETTINGS: AppSettings = {
  confidenceThreshold: 0.9,
  targetRms: 0.15,
  minRms: 0.0001,
};

export const SETTINGS_RANGES = {
  confidenceThreshold: { min: 0.5, max: 0.99, step: 0.01 },
  targetRms: { min: 0.05, max: 0.3, step: 0.01 },
  minRms: { min: 0.00001, max: 0.001, step: 0.00001 },
} as const;

// ─── Storage helpers ──────────────────────────────────────────────────────────

const STORAGE_KEY = "katheera_settings";

const isBrowser = (): boolean => typeof window !== "undefined";
const getChrome = (): any => (globalThis as any).chrome;
const isChromeExt = (): boolean => {
  const c = getChrome();
  return typeof c !== "undefined" && !!c.storage?.local;
};

function parseSettings(raw: string | null | undefined): AppSettings {
  if (!raw) return { ...DEFAULT_SETTINGS };
  try {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

// ─── Synchronous API (web / localStorage) ────────────────────────────────────

export function loadSettings(): AppSettings {
  if (!isBrowser()) return { ...DEFAULT_SETTINGS };
  try {
    return parseSettings(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveSettings(partial: Partial<AppSettings>): void {
  if (isChromeExt()) {
    const chrome = getChrome();
    chrome.storage.local.get([STORAGE_KEY], (res: any) => {
      const current = parseSettings(res[STORAGE_KEY]);
      chrome.storage.local.set({
        [STORAGE_KEY]: JSON.stringify({ ...current, ...partial }),
      });
    });
    return;
  }
  if (!isBrowser()) return;
  try {
    const current = loadSettings();
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...current, ...partial }),
    );
  } catch {}
}

export function resetSettings(): AppSettings {
  const defaults = { ...DEFAULT_SETTINGS };
  const serialized = JSON.stringify(defaults);
  if (isChromeExt()) {
    getChrome().storage.local.set({ [STORAGE_KEY]: serialized });
  } else if (isBrowser()) {
    try {
      window.localStorage.setItem(STORAGE_KEY, serialized);
    } catch {}
  }
  return defaults;
}

// ─── Async API (extension offscreen / background) ────────────────────────────

export async function loadSettingsAsync(): Promise<AppSettings> {
  if (isChromeExt()) {
    return new Promise((resolve) => {
      getChrome().storage.local.get([STORAGE_KEY], (res: any) => {
        resolve(parseSettings(res[STORAGE_KEY]));
      });
    });
  }
  return loadSettings();
}

/**
 * Subscribe to settings changes via chrome.storage.onChanged.
 * Returns an unsubscribe function.
 * In non-extension environments this is a no-op.
 */
export function subscribeSettings(
  cb: (settings: AppSettings) => void,
): () => void {
  if (!isChromeExt()) return () => {};
  const chrome = getChrome();
  const handler = (changes: any, namespace: string) => {
    if (namespace !== "local") return;
    if (!(STORAGE_KEY in changes)) return;
    cb(parseSettings(changes[STORAGE_KEY]?.newValue));
  };
  chrome.storage.onChanged.addListener(handler);
  return () => chrome.storage.onChanged.removeListener(handler);
}
