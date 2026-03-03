import { Link } from 'react-router-dom'
import { useFunnel } from '../context/FunnelContext'

export default function Landing() {
  const { config } = useFunnel()
  const { landing, theme } = config

  return (
    <div className="flex flex-col items-center pt-16 md:pt-28 space-y-16">
      {/* Hero */}
      <div className="text-center max-w-2xl space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
          {landing.headline}
        </h1>
        <p className="text-lg md:text-xl leading-relaxed" style={{ color: config.theme.muted }}>
          {landing.subheadline}
        </p>
        <div className="pt-4">
          <Link
            to={landing.ctaLink}
            className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-xl transition-all hover:scale-[1.02] shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})`,
              color: theme.bg,
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
          <p className="text-sm pt-2" style={{ color: config.theme.muted }}>
            {landing.socialProof}
          </p>
        )}
      </div>

      {/* Feature cards */}
      {landing.features && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {landing.features.map((f, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border transition-colors hover:border-white/20"
              style={{
                background: `${theme.bg}cc`,
                borderColor: 'rgba(255,255,255,0.08)',
              }}
            >
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: config.theme.muted }}>
                {f.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
