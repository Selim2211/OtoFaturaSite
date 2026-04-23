import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Download, ArrowRight } from 'lucide-react'

const DOWNLOAD_URL = 'https://www.mediafire.com/file/zl2idanh9l589ml/OtoFatura_Setup_v1.0.exe/file'

export default function CTABanner() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-24 px-6">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl"
      >
        {/* BG */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-navy-900 to-cyan-900/40" />
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl" />
        <div className="absolute inset-0 border border-white/[0.08] rounded-3xl" />

        <div className="relative px-8 py-14 sm:px-16 text-center flex flex-col items-center gap-6">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5">
            <span className="text-xs font-semibold text-blue-300 tracking-wide uppercase">Ücretsiz Dene</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Bugün Fatura Girişini{' '}
            <span className="text-gradient">Hızlandır</span>
          </h2>

          <p className="text-slate-400 max-w-md text-base leading-relaxed">
            Kurulum 2 dakika. İlk faturanı dakikalar içinde Wolvox'a aktar.
          </p>

          <a
            href={DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 glow-blue hover:scale-105 text-base"
          >
            <Download size={18} />
            Hemen İndir (Windows)
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>

          <p className="text-xs text-slate-600">Windows 10/11 · 64-bit · Akınsoft Wolvox gerektirir</p>
        </div>
      </motion.div>
    </section>
  )
}
