import { Download, Phone } from 'lucide-react'

const DOWNLOAD_URL = 'https://github.com/Selim2211/OtoFaturaSite/releases/download/v1.0/OtoFaturaKurulum_v1.5.0.exe'
const PHONE_DISPLAY = '0543 374 30 60'
const PHONE_TEL = '+905433743060'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <img src="/logo.png" alt="OtoFatura" className="h-8 w-auto self-start" />
            <p className="text-sm text-slate-400 leading-relaxed">
              Akınsoft Wolvox için yapay zeka destekli akıllı fatura entegratörü.
            </p>
          </div>

          {/* Ürün */}
          <div className="flex flex-col gap-3">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Ürün</div>
            <a href="#features" className="text-sm text-slate-400 hover:text-white transition-colors">Özellikler</a>
            <a href="#how-it-works" className="text-sm text-slate-400 hover:text-white transition-colors">Nasıl Kullanılır?</a>
            <a href="#faq" className="text-sm text-slate-400 hover:text-white transition-colors">SSS</a>
            <a
              href={DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              <Download size={13} />
              İndir (v1.5.0)
            </a>
          </div>

          {/* İletişim */}
          <div className="flex flex-col gap-3">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">İletişim</div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Ücretsiz demo ve bilgi almak için bizi arayın:
            </p>
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center gap-2 text-base font-bold text-white hover:text-blue-300 transition-colors"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#005B9F]">
                <Phone size={15} />
              </span>
              {PHONE_DISPLAY}
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
