/**
 * Google Analytics 4 — dynamic loader + event helper.
 * Loads gtag.js on first import if VITE_GA_MEASUREMENT_ID is set.
 */

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

if (GA_ID && typeof window !== "undefined") {
  window.dataLayer = window.dataLayer || []
  window.gtag = function () { window.dataLayer.push(arguments) }
  window.gtag("js", new Date())
  window.gtag("config", GA_ID)

  const script = document.createElement("script")
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)
}

export function trackGA(eventName, params = {}) {
  if (typeof window !== "undefined" && typeof window.gtag === "function" && GA_ID) {
    window.gtag("event", eventName, params)
  }
}
