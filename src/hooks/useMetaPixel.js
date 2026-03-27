import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID

export function useMetaPixel() {
  useEffect(() => {
    if (!PIXEL_ID || window.fbq) return

    // Queue function — buffers calls until the SDK loads
    window.fbq = function () {
      ;(window.fbq.q = window.fbq.q || []).push(arguments)
    }
    window._fbq = window.fbq
    window.fbq.push = window.fbq
    window.fbq.loaded = true
    window.fbq.version = '2.0'
    window.fbq.q = []

    // Load SDK script
    const s = document.createElement('script')
    s.async = true
    s.src = 'https://connect.facebook.net/en_US/fbevents.js'
    document.head.appendChild(s)

    window.fbq('init', PIXEL_ID)
    window.fbq('track', 'PageView')
  }, [])
}

// SPA route-change tracker — call inside BrowserRouter
export function usePixelPageView() {
  const location = useLocation()

  useEffect(() => {
    // Skip initial load — base init already fires first PageView
    if (!window.fbq) return
    window.fbq('track', 'PageView')
  }, [location.pathname])
}

// Standard Meta pixel events — everything else is custom
const STANDARD_EVENTS = new Set([
  'PageView', 'ViewContent', 'Lead', 'CompleteRegistration',
  'AddToCart', 'Purchase', 'Search', 'InitiateCheckout',
  'AddPaymentInfo', 'AddToWishlist', 'Contact', 'CustomizeProduct',
  'Donate', 'FindLocation', 'Schedule', 'StartTrial',
  'SubmitApplication', 'Subscribe'
])

// Fire a standard or custom pixel event
export function trackPixelEvent(eventName, params = {}) {
  try {
    if (window.fbq) {
      const method = STANDARD_EVENTS.has(eventName) ? 'track' : 'trackCustom'
      window.fbq(method, eventName, params)
    }
  } catch {
    // Pixel failures must never break the quiz flow
  }
}
