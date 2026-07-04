import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, ArrowRight, ChevronRight, CheckCircle2 } from 'lucide-react'
import { use3DCapability } from '../hooks/use3DCapability'
import SceneLoader from './SceneLoader'
import HeroVisualLite from './HeroVisualLite'

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
  const sectionRef = useRef(null)
  const [heroVisible, setHeroVisible] = useState(true)

  // Hero ekran dışına çıkınca R3F render döngüsünü tamamen durdur —
  // scroll sırasında GPU/ana thread'i boşa meşgul etmemesi için.
  useEffect(() => {
    if (!sectionRef.current) return
    const obs = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0 }
    )
    obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden bg-void">
      {/* 3D katmanı ya da fallback */}
      <div className="absolute inset-0">
        {can3D ? (
          <Suspense fallback={<SceneLoader />}>
            <Scene3D quality={quality} active={heroVisible} />
          </Suspense>
        ) : (
          <HeroVisualLite />
        )}
      </div>

      {/* Okunabilirlik: mobilde üstten koyu (metin), altta görsel açık kalsın;
          masaüstünde soldan koyu (metin solda). */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-void via-void/70 to-transparent md:bg-gradient-to-r md:from-void md:via-void/75 md:to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-24 md:h-40 bg-gradient-to-t from-void to-transparent pointer-events-none" />

      {/* Mobil tarama ışını — perdenin üstünde, belirgin hareket (yalnızca telefon) */}
      <div className="md:hidden absolute inset-x-0 z-[5] h-10 animate-scan-sweep pointer-events-none" style={{ top: '8%' }}>
        <div className="mx-auto h-[2px] w-[80%] bg-signal shadow-[0_0_16px_3px_rgba(56,225,255,0.7)]" />
        <div className="mx-auto -mt-5 h-10 w-[80%] bg-gradient-to-b from-signal/15 to-transparent" />
      </div>

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
            Akınsoft Wolvox entegreli OtoFatura ile manuel veri girişini tarihe gömün. 50+ kalemlik faturaları OtoFatura'ya okutun, tek tıkla — hatasız ve eksiksiz — stok deponuza işleyin.
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
