/**
 * Cross-browser WebExtension API shim.
 *
 * - In Firefox, `browser` is the native global (Promise-based).
 * - In Chrome, `browser` is provided by webextension-polyfill, which wraps
 *   `chrome.*` with Promises and normalises the namespace.
 *
 * Always import `ext` from here instead of using `chrome.*` or `browser.*`
 * directly, so the rest of the codebase stays browser-agnostic.
 */
import polyfill from "webextension-polyfill";

export const ext = polyfill;
