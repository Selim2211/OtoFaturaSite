import { motion } from 'framer-motion'
import { Download, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react'

const DOWNLOAD_URL = 'https://www.mediafire.com/file/zl2idanh9l589ml/OtoFatura_Setup_v1.0.exe/file'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' },
  }),
}

const highlights = [
  'Yapay Zeka Destekli',
  'Wolvox Uyumlu',
  'Tek Tıkla Aktarım',
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background layers */}
      <div className="absolute inset-0 bg-navy-900 bg-grid" />
      <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 via-transparent to-transparent" style={{ backgroundPosition: '30% 40%' }} />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left — text */}
        <div className="flex flex-col gap-6">
          {/* Badge */}
          <motion.div
            variants={fadeUp} custom={0} initial="hidden" animate="visible"
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 w-fit"
          >
            <Sparkles size={13} className="text-cyan-400" />
            <span className="text-xs font-medium text-cyan-300 tracking-wide">OtoFatura SmartCore™</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp} custom={1} initial="hidden" animate="visible"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white"
          >
            Fatura Girişini{' '}
            <span className="text-gradient">Yapay Zekaya</span>{' '}
            Bırak
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={fadeUp} custom={2} initial="hidden" animate="visible"
            className="text-lg text-slate-400 leading-relaxed max-w-lg"
          >
            Akınsoft Wolvox entegre masaüstü uygulaması. Fatura girişlerini akıllı eşleştirme ile saniyelere indir; Kasa, Cari ve Tahakkuk hesaplarını %100 uyumlu senkronize et.
          </motion.p>

          {/* Highlights */}
          <motion.div
            variants={fadeUp} custom={3} initial="hidden" animate="visible"
            className="flex flex-wrap gap-3"
          >
            {highlights.map((h) => (
              <div key={h} className="flex items-center gap-1.5 text-sm text-slate-300">
                <CheckCircle2 size={14} className="text-emerald-400" />
                {h}
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={fadeUp} custom={4} initial="hidden" animate="visible"
            className="flex flex-wrap gap-4 mt-2"
          >
            <a
              href={DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold px-6 py-3.5 rounded-xl transition-all duration-200 glow-blue hover:scale-105 text-sm"
            >
              <Download size={16} />
              Hemen İndir (Windows)
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#how-it-works"
              className="flex items-center gap-2 glass glass-hover text-slate-300 hover:text-white font-semibold px-6 py-3.5 rounded-xl text-sm transition-all duration-200"
            >
              Nasıl Çalışır?
            </a>
          </motion.div>
        </div>

        {/* Right — mockup */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="hidden lg:flex justify-center items-center"
        >
          <div className="relative animate-float">
            {/* Outer glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-2xl blur-xl" />
            {/* App window mockup */}
            <div className="relative glass rounded-2xl overflow-hidden border border-white/10 w-[480px] shadow-2xl">
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.03]">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-3 text-xs text-slate-500 font-mono">OtoFatura v2.1</span>
              </div>
              {/* Mock content */}
              <div className="p-5 flex flex-col gap-3">
                {/* Header bar */}
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-xs text-emerald-400 font-medium">Wolvox Bağlı</span>
                  </div>
                  <div className="text-xs text-slate-500">12 fatura işlendi</div>
                </div>
                {/* Upload zone */}
                <div className="border-2 border-dashed border-blue-500/30 rounded-xl p-4 text-center bg-blue-500/5">
                  <div className="text-2xl mb-1">📄</div>
                  <div className="text-xs text-slate-400">Fatura PDF'ini sürükle & bırak</div>
                </div>
                {/* Result rows */}
                {[
                  { name: 'SAMSUNG SSD 1TB', match: '98%', status: 'ok' },
                  { name: 'LOGITECH MX KEYS', match: '94%', status: 'ok' },
                  { name: 'HDMI KABLO 3MT', match: '71%', status: 'warn' },
                  { name: 'USB HUB 4 PORT', match: '89%', status: 'ok' },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between glass rounded-lg px-3 py-2.5"
                  >
                    <span className="text-xs text-slate-300 font-mono truncate flex-1">{row.name}</span>
                    <span className={`text-xs font-bold ml-3 ${row.status === 'ok' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {row.match}
                    </span>
                  </div>
                ))}
                {/* Send button */}
                <button className="mt-1 w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold py-2.5 rounded-lg">
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
