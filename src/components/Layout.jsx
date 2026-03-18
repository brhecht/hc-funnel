import FUNNEL from "../config/funnel"

export default function Layout({ children }) {
  const { brand, theme } = FUNNEL

  return (
    <div
      className="min-h-screen"
      style={{
        background: theme.bg,
        color: theme.text,
        fontFamily: theme.bodyFont,
      }}
    >
      {/* Nav */}
      <header className="max-w-3xl mx-auto px-5 py-6 flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-xs"
          style={{ background: theme.accent, fontFamily: theme.headingFont }}
        >
          HC
        </div>
        <div>
          <div
            className="text-sm font-bold"
            style={{ fontFamily: theme.headingFont, letterSpacing: "-0.3px", color: theme.text }}
          >
            {brand.name}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-5 pb-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="text-center pb-8">
        <span className="text-xs font-medium uppercase tracking-widest" style={{ color: theme.faint }}>
          {brand.name}
        </span>
      </footer>
    </div>
  )
}
