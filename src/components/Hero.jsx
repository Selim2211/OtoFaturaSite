import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Download, ArrowRight, ChevronRight, CheckCircle2 } from 'lucide-react'
import { use3DCapability } from '../hooks/use3DCapability'
import SceneLoader from './SceneLoader'

const Scene3D = lazy(() => import('./Scene3D'))

const DOWNLOAD_URL = 'https://github.com/Selim2211/OtoFaturaSite/releases/download/v1.0/OtoFaturaKurulum_v1.0.4.exe'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.15 + i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
}

const badges = ['Wolvox 8/9 Uyumlu', 'Anında ERP Kaydı', 'Çakışmasız Aktarım']

export default function Hero() {
  const { can3D, quality } = use3DCapability()

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-void">
      {/* 3D katmanı ya da fallback */}
      <div className="absolute inset-0">
        {can3D ? (
          <Suspense fallback={<SceneLoader />}>
            <Scene3D quality={quality} />
          </Suspense>
        ) : (
          <HeroFallback />
        )}
      </div>

      {/* Okunabilirlik: sol koyulaştırma + alt geçiş */}
      <div className="absolute inset-0 bg-gradient-to-r from-void via-void/75 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-void to-transparent pointer-events-none" />

      {/* İçerik */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full pt-24 pb-16">
        <div className="max-w-2xl flex flex-col gap-6">
          <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible">
            <span className="inline-flex items-center gap-1.5 chip text-xs font-semibold px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse shadow-glow-sm" />
              Akınsoft Wolvox Entegrasyonu
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp} custom={1} initial="hidden" animate="visible"
            className="font-display text-4xl sm:text-5xl lg:text-[3.6rem] font-extrabold leading-[1.05] tracking-tight text-ink-50"
          >
            Dakikalar Değil,{' '}
            <span className="text-grad text-glow">Saniyeler:</span>{' '}
            Fatura Girişinde Yeni Dönem.
          </motion.h1>

          <motion.p
            variants={fadeUp} custom={2} initial="hidden" animate="visible"
            className="text-lg text-ink-300 leading-relaxed max-w-lg"
          >
            Akınsoft Wolvox entegreli OtoFatura ile manuel veri girişini tarihe gömün. 50+ kalemlik faturaları yapay zekaya okutun, tek tıkla — hatasız ve eksiksiz — stok deponuza işleyin.
          </motion.p>

          <motion.div variants={fadeUp} custom={3} initial="hidden" animate="visible" className="flex flex-wrap gap-x-5 gap-y-2">
            {badges.map(b => (
              <span key={b} className="flex items-center gap-1.5 text-sm text-ink-300 font-medium">
                <CheckCircle2 size={14} className="text-signal flex-shrink-0" />
                {b}
              </span>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} custom={4} initial="hidden" animate="visible" className="flex flex-wrap gap-3 mt-1">
            <a
              href={DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 bg-gradient-to-r from-brand-700 to-brand-500 hover:from-brand-600 hover:to-signal text-white font-bold px-6 py-3.5 rounded-xl transition-all duration-200 glow-blue hover:scale-[1.03] text-sm cursor-pointer"
            >
              <Download size={16} />
              Hemen İndir (v1.0.4)
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-1.5 text-ink-50 glass hover:border-signal/40 font-semibold px-6 py-3.5 rounded-xl text-sm transition-all duration-200 cursor-pointer"
            >
              Nasıl Kullanılır?
              <ChevronRight size={14} />
            </a>
          </motion.div>

          <motion.p variants={fadeUp} custom={5} initial="hidden" animate="visible" className="font-data text-xs text-ink-500">
            Windows 10/11 · 64-bit · Kurulum 2 dakika. Verimlilik ise sonsuz.
          </motion.p>
        </div>
      </div>

      {/* Kaydırma ipucu */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-ink-500"
      >
        <span className="font-data text-[10px] uppercase tracking-widest">Keşfet</span>
        <span className="w-5 h-8 rounded-full border border-signal/25 flex justify-center pt-1.5 bg-white/[0.02]">
          <motion.span
            className="w-1 h-1.5 rounded-full bg-signal"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </span>
      </motion.div>
    </section>
  )
}

/* 3D yokken (mobil/reduced-motion/düşük güç) gösterilen şık atmosferik fallback */
function HeroFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 grid-bg grid-bg-fade" />
      <div className="aurora animate-aurora-1 top-[-10%] left-[10%] w-[36rem] h-[36rem] bg-brand-600/20" />
      <div className="aurora animate-aurora-2 bottom-[-15%] right-[-8%] w-[34rem] h-[34rem] bg-signal/12" />
      <div className="aurora top-[30%] right-[25%] w-[20rem] h-[20rem] bg-indigo-500/10 animate-glow-pulse" />
    </div>
  )
}
