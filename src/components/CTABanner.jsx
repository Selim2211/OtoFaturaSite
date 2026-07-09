import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Download, ArrowRight, Phone } from 'lucide-react'

const DOWNLOAD_URL = 'https://github.com/Selim2211/OtoFaturaSite/releases/download/v1.0/OtoFaturaKurulum_v1.0.5.exe'
const PHONE_DISPLAY = '0543 374 30 60'
const PHONE_TEL = '+905433743060'

export default function CTABanner() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="cv-auto py-24 px-6 bg-void relative overflow-hidden">
      <div className="aurora top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[24rem] bg-signal/10" />
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto rounded-3xl overflow-hidden relative shadow-glow border border-signal/15"
      >
        {/* Gradient + glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-void-elevated via-brand-800 to-brand-600" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-signal/25 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/10 rounded-full blur-2xl" />

        <div className="relative px-5 py-12 sm:px-16 sm:py-14 text-center flex flex-col items-center gap-6">
          <span className="inline-block bg-white/15 text-white text-xs font-bold px-4 py-1.5 rounded-full border border-white/25 uppercase tracking-wider">
            Hemen Başla
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Bugün Fatura Girişini Hızlandır
          </h2>
          <p className="text-blue-50 max-w-md text-sm sm:text-base leading-relaxed">
            Kurulum sadece 2 dakika. Verimlilik ise sonsuz.
          </p>
          <a
            href={DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 sm:gap-3 bg-white text-brand-700 font-bold px-5 sm:px-8 py-3.5 sm:py-4 rounded-xl transition-all duration-200 shadow-lg hover:scale-[1.03] hover:bg-blue-50 text-sm sm:text-base cursor-pointer text-center"
          >
            <Download size={18} className="flex-shrink-0" />
            <span>Hemen İndir <span className="hidden sm:inline">(Windows v1.0.5)</span></span>
            <ArrowRight size={16} className="flex-shrink-0 group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-xs text-blue-100">Windows 10/11 · 64-bit · Akınsoft Wolvox 8/9 gerektirir</p>

          {/* Telefon CTA */}
          <div className="mt-4 flex flex-col items-center gap-2 border-t border-white/20 pt-6 w-full max-w-md">
            <p className="text-sm text-blue-50">Ücretsiz demo ve bilgi almak için bizi arayın</p>
            <a
              href={`tel:${PHONE_TEL}`}
              className="font-data group inline-flex items-center gap-2 sm:gap-2.5 text-white font-extrabold text-xl sm:text-3xl tracking-tight hover:text-blue-50 transition-colors"
            >
              <span className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors flex-shrink-0">
                <Phone size={16} className="sm:hidden" />
                <Phone size={18} className="hidden sm:block" />
              </span>
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
