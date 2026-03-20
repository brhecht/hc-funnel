/**
 * Meta Pixel helper — fires standard + custom events.
 * Pixel is initialized in index.html, so we just call window.fbq.
 */
export function trackPixel(eventName, params = {}) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", eventName, params)
  }
}
