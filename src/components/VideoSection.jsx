import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Play, Clapperboard } from 'lucide-react'

const VIDEO_ID = 'tWfSSmEJ57w'
const THUMB = `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`
const EMBED = `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`

export default function VideoSection() {
  const [playing, setPlaying] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="video" className="py-24 px-6 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-light opacity-40 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-blue-50 text-[#005B9F] text-xs font-bold px-3 py-1.5 rounded-full border border-blue-100 mb-4 uppercase tracking-wider">
            <Clapperboard size={12} />
            Tanıtım Videosu
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            OtoFatura'yı{' '}
            <span className="text-brand-gradient">İş Başında İzleyin</span>
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-base leading-relaxed">
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
          <div className="absolute -inset-3 bg-gradient-to-br from-blue-200 to-indigo-100 rounded-3xl blur-2xl opacity-60 -z-10" />

          <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 shadow-2xl bg-slate-900">
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
                className="group absolute inset-0 w-full h-full"
                aria-label="Videoyu oynat"
              >
                {/* Thumbnail */}
                <img
                  src={THUMB}
                  alt="OtoFatura tanıtım videosu önizleme"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.src = `https://img.youtube.com/vi/${VIDEO_ID}/hqdefault.jpg` }}
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/20 transition-colors" />
                {/* Play button */}
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex items-center justify-center w-20 h-20 rounded-full bg-[#005B9F] text-white shadow-xl shadow-blue-900/30 group-hover:scale-110 transition-transform duration-200">
                    <Play size={30} className="ml-1" fill="white" />
                  </span>
                </span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
