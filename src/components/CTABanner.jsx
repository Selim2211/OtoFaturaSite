import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Download, ArrowRight, Phone } from 'lucide-react'

const DOWNLOAD_URL = 'https://github.com/Selim2211/OtoFaturaSite/releases/download/v1.0/OtoFaturaKurulum_v1.5.0.exe'
const PHONE_DISPLAY = '0543 374 30 60'
const PHONE_TEL = '+905433743060'

export default function CTABanner() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-24 px-6 bg-white">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-[#005B9F] rounded-3xl overflow-hidden relative shadow-xl"
      >
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/5 rounded-full" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/5 rounded-full" />

        <div className="relative px-8 py-14 sm:px-16 text-center flex flex-col items-center gap-6">
          <span className="inline-block bg-white/10 text-white/90 text-xs font-bold px-4 py-1.5 rounded-full border border-white/20 uppercase tracking-wider">
            Hemen Başla
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Bugün Fatura Girişini Hızlandır
          </h2>
          <p className="text-blue-100 max-w-md text-base leading-relaxed">
            Kurulum sadece 2 dakika. Verimlilik ise sonsuz.
          </p>
          <a
            href={DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-white text-[#005B9F] font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:bg-blue-50 text-base"
          >
            <Download size={18} />
            Hemen İndir (Windows v1.6)
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-xs text-blue-200">Windows 10/11 · 64-bit · Akınsoft Wolvox 8/9 gerektirir</p>

          {/* Telefon CTA */}
          <div className="mt-4 flex flex-col items-center gap-2 border-t border-white/15 pt-6 w-full max-w-md">
            <p className="text-sm text-blue-100">Ücretsiz demo ve bilgi almak için bizi arayın</p>
            <a
              href={`tel:${PHONE_TEL}`}
              className="group inline-flex items-center gap-2.5 text-white font-extrabold text-2xl sm:text-3xl tracking-tight hover:text-blue-100 transition-colors"
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/15 group-hover:bg-white/25 transition-colors">
                <Phone size={18} />
              </span>
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
