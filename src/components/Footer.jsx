import { Download } from 'lucide-react'

const DOWNLOAD_URL = 'https://github.com/Selim2211/OtoFaturaSite/releases/download/Demov1/OtoFatura_Setup_v1.0.0.exe'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#005B9F] flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 13h6M9 17h4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="font-bold text-base">OtoFatura</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Akınsoft Wolvox için yapay zeka destekli akıllı fatura entegratörü.
            </p>
          </div>

          {/* Ürün */}
          <div className="flex flex-col gap-3">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Ürün</div>
            <a href="#features" className="text-sm text-slate-400 hover:text-white transition-colors">Özellikler</a>
            <a href="#how-it-works" className="text-sm text-slate-400 hover:text-white transition-colors">Nasıl Çalışır?</a>
            <a href="#faq" className="text-sm text-slate-400 hover:text-white transition-colors">SSS</a>
            <a
              href={DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              <Download size={13} />
              İndir (v1.0.0)
            </a>
          </div>

          {/* Uyumluluk */}
          <div className="flex flex-col gap-3">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Uyumluluk</div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
              <span className="text-sm text-slate-400">Wolvox 8 / Wolvox 9</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
              <span className="text-sm text-slate-400">Firebird 2.5 / 3.0</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
              <span className="text-sm text-slate-400">Windows 10 / 11 · 64-bit</span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500 text-center">
            © 2026 Selim Akıncı ve Oto Fatura. Tüm Hakları Saklıdır.
          </p>
          <p className="text-xs text-slate-600">
            Akınsoft Wolvox için geliştirildi
          </p>
        </div>
      </div>
    </footer>
  )
}
