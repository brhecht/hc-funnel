import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useFunnel } from "../context/FunnelContext"
import { trackPixelEvent as trackPixel } from "../hooks/useMetaPixel"
import { trackGA } from "../utils/analytics"

export default function Landing() {
  const { config } = useFunnel()
  const { landing, theme } = config

  useEffect(() => {
    trackPixel("ViewContent", { content_name: "Landing Page" })
    trackGA("page_view", { page_title: "Landing" })
  }, [])

  return (
    <div className="flex flex-col items-center pt-6 md:pt-20 space-y-10 md:space-y-14">
      {/* Hero */}
      <div className="text-center max-w-2xl space-y-5 md:space-y-6">
        <h1
          className="text-2xl md:text-5xl font-extrabold tracking-tight leading-tight whitespace-pre-line"
          style={{ fontFamily: theme.headingFont, letterSpacing: "-1.5px", color: theme.text }}
        >
          {landing.headline}
        </h1>
        <p className="text-base md:text-lg leading-relaxed max-w-xl mx-auto" style={{ color: theme.muted }}>
          {landing.subheadline}
        </p>
        <div className="pt-2 md:pt-4">
          <Link
            to={landing.ctaLink}
            className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-xl transition-all hover:scale-[1.02] shadow-lg text-white"
            style={{
              background: theme.accent,
              boxShadow: `0 14px 40px ${theme.accent}33`,
            }}
          >
            {landing.ctaText}
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        {landing.socialProof && (
          <p className="text-sm pt-2" style={{ color: theme.faint }}>
            {landing.socialProof}
          </p>
        )}
      </div>

      {/* Feature cards */}
      {landing.features && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-3xl">
          {landing.features.map((f, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl transition-all hover:shadow-md"
              style={{
                background: theme.card,
                border: `1px solid ${theme.border}`,
              }}
            >
              <h3
                className="text-base font-bold mb-2"
                style={{ fontFamily: theme.headingFont, letterSpacing: "-0.3px", color: theme.text }}
              >
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: theme.muted }}>
                {f.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
