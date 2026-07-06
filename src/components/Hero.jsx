import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, ArrowRight, ChevronRight, CheckCircle2 } from 'lucide-react'
import { use3DCapability } from '../hooks/use3DCapability'
import SceneLoader from './SceneLoader'
import HeroVisualLite from './HeroVisualLite'
import InvoiceStoryCard from './InvoiceStoryCard'

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

/* Scrollytelling aşama etiketleri (yalnızca masaüstü) */
const STAGES = [
  '01 — KAĞIT FATURA',
  '02 — TARANIYOR',
  '03 — DİJİTALLEŞİYOR',
  '04 — WOLVOX\'A AKTARILDI',
]
const stageFromProgress = (p) => (p < 0.2 ? 0 : p < 0.55 ? 1 : p < 0.85 ? 2 : 3)

export default function Hero() {
  const { can3D, quality } = use3DCapability()
  const sectionRef = useRef(null)
  const progressRef = useRef(0)
  const [heroVisible, setHeroVisible] = useState(true)
  const [stage, setStage] = useState(0)

  // Görünürlük: ekran dışına çıkınca R3F render döngüsü tamamen durur
  useEffect(() => {
    if (!sectionRef.current) return
    const obs = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0 }
    )
    obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  // Pinned scroll ilerlemesi (0..1) — rAF ile kısıtlanmış, passive
  useEffect(() => {
    let ticking = false
    const measure = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const scrollable = el.offsetHeight - window.innerHeight
      const p = scrollable > 0
        ? Math.max(0, Math.min(1, -rect.top / scrollable))
        : 0
      progressRef.current = p
      setStage((s) => {
        const ns = stageFromProgress(p)
        return ns === s ? s : ns
      })
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => { measure(); ticking = false })
    }
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    /* Masaüstü: 280vh — sahne sabitlenir, scroll hikayeyi oynatır.
       Mobil: normal tek ekran — pinned scroll mobilde anti-pattern. */
    <section ref={sectionRef} className="relative bg-void md:h-[280vh]">
      <div className="relative md:sticky md:top-0 min-h-screen md:h-screen flex items-center overflow-hidden">
        {/* 3D katmanı ya da mobil arka plan */}
        <div className="absolute inset-0">
          {can3D ? (
            <Suspense fallback={<SceneLoader />}>
              <Scene3D quality={quality} active={heroVisible} progressRef={progressRef} />
            </Suspense>
          ) : (
            <HeroVisualLite />
          )}
        </div>

        {/* Okunabilirlik: mobilde üstten, masaüstünde soldan koyulaşan perde */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-void via-void/70 to-transparent md:bg-gradient-to-r md:from-void md:via-void/75 md:to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-24 md:h-40 bg-gradient-to-t from-void to-transparent pointer-events-none" />

        {/* İçerik */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full pt-24 pb-10 md:pb-16">
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

            {/* Mobil hikaye kartı — akış içinde, hiçbir şeyle çakışmaz */}
            {!can3D && (
              <motion.div
                variants={fadeUp} custom={6} initial="hidden" animate="visible"
                className="md:hidden flex justify-center pt-4"
              >
                <InvoiceStoryCard />
              </motion.div>
            )}
          </div>
        </div>

        {/* Aşama göstergesi — yalnızca masaüstü scrollytelling */}
        <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-3">
          <span key={stage} className="font-data text-[11px] uppercase tracking-[0.22em] text-signal/80">
            {STAGES[stage]}
          </span>
          <div className="flex items-center gap-1.5">
            {STAGES.map((_, i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === stage ? 'w-6 bg-signal' : 'w-2 bg-white/15'
                }`}
              />
            ))}
          </div>
          <span className="font-data text-[10px] uppercase tracking-widest text-ink-500">
            Kaydır — dönüşümü izle
          </span>
        </div>
      </div>
    </section>
  )
}
