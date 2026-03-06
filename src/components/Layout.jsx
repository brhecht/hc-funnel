import FUNNEL from "../config/funnel"
import AppSwitcher from "./AppSwitcher"

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
      <AppSwitcher current="funnel" />
      {/* Nav */}
      <header className="max-w-3xl mx-auto px-6 py-8 flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
          style={{ background: theme.accent, fontFamily: theme.headingFont }}
        >
          HC
        </div>
        <div>
          <div className="text-sm font-bold" style={{ fontFamily: theme.headingFont, letterSpacing: "-0.3px" }}>
            {brand.name}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 pb-24">
        {children}
      </main>

      {/* Footer */}
      <footer className="text-center pb-10">
        <span className="text-xs font-medium uppercase tracking-widest" style={{ color: theme.faint }}>
          {brand.name}
        </span>
      </footer>
    </div>
  )
}
