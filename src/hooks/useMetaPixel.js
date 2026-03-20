import { useEffect } from "react"

export function useMetaPixel(eventName, params = {}) {
  const pixelId = import.meta.env.VITE_META_PIXEL_ID

  useEffect(() => {
    if (!pixelId || typeof window.fbq !== "function") return
    window.fbq("track", eventName, params)
  }, [eventName, pixelId])
}
