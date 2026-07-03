import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Play, Clapperboard } from 'lucide-react'

const VIDEO_ID = 'itnsn_Ml1fg'
const EMBED = `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`

/* Holografik hedef köşeleri — viewfinder/reticle hissi */
function Corner({ className }) {
  return <span className={`absolute w-6 h-6 border-signal/70 ${className}`} />
}

export default function VideoSection() {
  const [playing, setPlaying] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="video" className="py-24 px-6 bg-void-panel relative overflow-hidden">
      <div className="absolute inset-0 grid-bg grid-bg-fade opacity-50 pointer-events-none" />
      <div className="aurora top-1/4 left-1/3 w-[30rem] h-[30rem] bg-signal/8" />

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 chip text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider">
            <Clapperboard size={12} />
            Tanıtım Videosu
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-ink-50 tracking-tight mb-4">
            OtoFatura'yı{' '}
            <span className="text-grad">İş Başında İzleyin</span>
          </h2>
          <p className="text-ink-300 max-w-xl mx-auto text-base leading-relaxed">
            Bir faturanın saniyeler içinde nasıl Akınsoft'a işlendiğini kendi gözlerinizle görün.
          </p>
        </motion.div>

        {/* Player */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.65, delay: 0.1, ease: 'easeOut' }}
          className="relative"
        >
          {/* Glow */}
          <div className="absolute -inset-3 bg-gradient-to-br from-signal/20 to-brand-600/20 rounded-3xl blur-2xl opacity-70 -z-10" />

          {/* Holografik hedef köşeleri */}
          <Corner className="-top-2 -left-2 border-t-2 border-l-2 rounded-tl-lg" />
          <Corner className="-top-2 -right-2 border-t-2 border-r-2 rounded-tr-lg" />
          <Corner className="-bottom-2 -left-2 border-b-2 border-l-2 rounded-bl-lg" />
          <Corner className="-bottom-2 -right-2 border-b-2 border-r-2 rounded-br-lg" />

          <div className="relative aspect-video rounded-2xl overflow-hidden border border-signal/15 shadow-glow bg-void">
            {playing ? (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={EMBED}
                title="OtoFatura Tanıtım Videosu"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="group absolute inset-0 w-full h-full cursor-pointer"
                aria-label="Videoyu oynat"
              >
                {/* Markalı kapak */}
                <div className="absolute inset-0 bg-gradient-to-br from-void-elevated via-void-panel to-void" />
                <div
                  className="absolute inset-0 opacity-[0.14]"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(56,225,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(56,225,255,0.5) 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                  }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-signal/20 blur-3xl rounded-full" />

                <div className="relative z-10 flex flex-col items-center justify-center h-full gap-6 px-6">
                  <img
                    src="/logo.png"
                    alt="OtoFatura"
                    className="h-12 sm:h-16 w-auto drop-shadow-lg"
                  />
                  <span className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-brand-600 to-signal text-white shadow-glow group-hover:scale-110 transition-transform duration-200">
                    <Play size={30} className="ml-1" fill="white" />
                  </span>
                  <span className="font-data text-xs font-semibold uppercase tracking-widest text-ink-300">
                    Tanıtımı İzle
                  </span>
                </div>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
