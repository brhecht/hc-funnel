import FUNNEL from '../config/funnel'

export default function Layout({ children }) {
  const { brand, theme } = FUNNEL

  return (
    <div
      className="min-h-screen font-sans"
      style={{
        background: `
          radial-gradient(1200px 700px at 20% -10%, ${theme.accent}25, transparent 55%),
          radial-gradient(900px 600px at 85% 0%, ${theme.accent2}20, transparent 55%),
          ${theme.bg}
        `,
        color: theme.text,
      }}
    >
      {/* Nav */}
      <header className="max-w-5xl mx-auto px-5 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg"
            style={{
              background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})`,
            }}
          />
          <span className="font-bold text-lg tracking-tight">{brand.name}</span>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-5 pb-20">
        {children}
      </main>
    </div>
  )
}
