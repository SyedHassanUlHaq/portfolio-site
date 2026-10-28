type Data = Record<string, string | number | boolean | undefined>;

/**
 * Lightweight event helpers for Umami (loaded only when NEXT_PUBLIC_UMAMI_ID is set).
 * - `ev()` returns data-attributes for links/buttons: <a {...ev("cta-click", { where: "hero" })}>
 * - `track()` is for events that aren't clicks (search, video play).
 */
export function ev(name: string, data: Data = {}) {
  const attrs: Record<string, string> = { "data-umami-event": name };
  for (const [k, v] of Object.entries(data)) if (v !== undefined) attrs[`data-umami-event-${k}`] = String(v);
  return attrs;
}

export function track(name: string, data: Data = {}) {
  (window as unknown as { umami?: { track: (n: string, d?: Data) => void } }).umami?.track(name, data);
}
