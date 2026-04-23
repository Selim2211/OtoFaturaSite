import { Zap } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
            <Zap size={13} className="text-white" fill="white" />
          </div>
          <span className="font-bold text-base text-white">
            Oto<span className="text-gradient">Fatura</span>
          </span>
        </div>

        {/* Center */}
        <p className="text-xs text-slate-600 text-center">
          © 2026 Selim Akıncı ve Oto Fatura. Tüm Hakları Saklıdır.
        </p>

        {/* Right */}
        <p className="text-xs text-slate-700">
          Akınsoft <span className="text-slate-500">Wolvox</span> için geliştirildi
        </p>
      </div>
    </footer>
  )
}
