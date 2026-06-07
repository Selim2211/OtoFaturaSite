import { motion } from 'framer-motion'
import { Download, ArrowRight, ChevronRight, CheckCircle2 } from 'lucide-react'

const DOWNLOAD_URL = 'https://github.com/Selim2211/OtoFaturaSite/releases/download/Demov1/OtoFatura_Setup_v1.0.0.exe'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: 'easeOut' },
  }),
}

const badges = ['Wolvox 8/9 Uyumlu', 'Firebird Direkt Yazım', 'PK Çakışması Yok']

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-white">
      {/* Subtle grid bg */}
      <div className="absolute inset-0 bg-grid-light pointer-events-none" />
      {/* Top-right radial glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-gradient-radial from-blue-50 via-white to-transparent opacity-70 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 100% 0%, #dbeafe 0%, #ffffff 60%)' }} />

      <div className="relative max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT */}
        <div className="flex flex-col gap-6">
          {/* Badge */}
          <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible">
            <span className="inline-flex items-center gap-1.5 bg-blue-50 text-[#005B9F] text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-100">
              <span className="w-1.5 h-1.5 rounded-full bg-[#005B9F] animate-pulse" />
              Akınsoft Wolvox Entegrasyonu
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp} custom={1} initial="hidden" animate="visible"
            className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold leading-tight tracking-tight text-slate-900"
          >
            Dakikalar Değil,{' '}
            <span className="text-brand-gradient">Saniyeler:</span>{' '}
            Fatura Girişinde Yeni Dönem.
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={fadeUp} custom={2} initial="hidden" animate="visible"
            className="text-lg text-slate-600 leading-relaxed max-w-lg"
          >
            Akınsoft Wolvox entegreli OtoFatura ile manuel veri girişini tarihe gömün. 50+ kalemlik faturaları yapay zekaya okutun, PK çakışması yaşamadan saniyeler içinde STOKHR deponuza işleyin.
          </motion.p>

          {/* Checkmarks */}
          <motion.div variants={fadeUp} custom={3} initial="hidden" animate="visible" className="flex flex-wrap gap-3">
            {badges.map(b => (
              <span key={b} className="flex items-center gap-1.5 text-sm text-slate-600">
                <CheckCircle2 size={14} className="text-[#005B9F] flex-shrink-0" />
                {b}
              </span>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeUp} custom={4} initial="hidden" animate="visible" className="flex flex-wrap gap-3 mt-1">
            <a
              href={DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 bg-[#005B9F] hover:bg-[#004a82] text-white font-bold px-6 py-3.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg text-sm"
            >
              <Download size={16} />
              Hemen İndir (v1.0.0)
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-1.5 text-[#005B9F] border border-[#005B9F]/30 hover:border-[#005B9F] bg-white font-semibold px-6 py-3.5 rounded-xl text-sm transition-all duration-200 hover:bg-blue-50"
            >
              Nasıl Çalışır?
              <ChevronRight size={14} />
            </a>
          </motion.div>

          {/* Small note */}
          <motion.p variants={fadeUp} custom={5} initial="hidden" animate="visible" className="text-xs text-slate-400">
            Windows 10/11 · 64-bit · Kurulum 2 dakika. Verimlilik ise sonsuz.
          </motion.p>
        </div>

        {/* RIGHT — mockup */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="hidden lg:flex justify-center"
        >
          <div className="relative animate-float">
            {/* Shadow */}
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-blue-100 to-blue-50 blur-2xl opacity-60" />
            {/* Window */}
            <div className="relative bg-white rounded-2xl border border-slate-200 shadow-xl w-[460px] overflow-hidden">
              {/* Chrome */}
              <div className="flex items-center gap-1.5 px-4 py-3 bg-slate-50 border-b border-slate-200">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="ml-3 text-xs text-slate-400 font-mono">OtoFatura v1.0.0</span>
              </div>
              {/* Content */}
              <div className="p-5 flex flex-col gap-3 bg-slate-50/50">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span className="text-xs text-emerald-700 font-semibold">Wolvox Bağlantısı Aktif</span>
                  </div>
                  <span className="text-xs text-slate-400 bg-white px-2 py-0.5 rounded-full border border-slate-200">14 fatura işlendi</span>
                </div>
                {/* Upload zone */}
                <div className="border-2 border-dashed border-blue-200 rounded-xl p-4 text-center bg-blue-50/40">
                  <div className="text-xl mb-1">📄</div>
                  <div className="text-xs text-slate-500 font-medium">Fatura PDF'ini sürükle & bırak</div>
                </div>
                {/* Rows */}
                {[
                  { name: 'SAMSUNG SSD 1TB', match: '%98', ok: true },
                  { name: 'LOGITECH MX KEYS', match: '%94', ok: true },
                  { name: 'HDMI KABLO 3MT', match: '%71', ok: false },
                  { name: 'USB HUB 4 PORT', match: '%89', ok: true },
                ].map((r, i) => (
                  <div key={i} className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-3 py-2.5 shadow-sm">
                    <span className="text-xs text-slate-700 font-mono truncate flex-1">{r.name}</span>
                    <span className={`text-xs font-bold ml-3 ${r.ok ? 'text-emerald-600' : 'text-amber-500'}`}>{r.match}</span>
                  </div>
                ))}
                <button className="w-full bg-[#005B9F] hover:bg-[#004a82] text-white text-xs font-bold py-2.5 rounded-lg mt-1 transition-colors">
                  Wolvox'a Aktar →
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
