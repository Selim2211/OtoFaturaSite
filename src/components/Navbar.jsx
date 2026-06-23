import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Download, Menu, X, Phone } from 'lucide-react'

const DOWNLOAD_URL = 'https://github.com/Selim2211/OtoFaturaSite/releases/download/v1.0/OtoFaturaKurulum_v1.0.3.exe'
const PHONE_DISPLAY = '0543 374 30 60'
const PHONE_TEL = '+905433743060'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm py-3'
          : 'bg-white py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <img src="/logo.png" alt="OtoFatura" className="h-8 w-auto" />
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-7">
          <a href="#video" className="text-sm text-slate-600 hover:text-[#005B9F] transition-colors font-medium">Video</a>
          <a href="#features" className="text-sm text-slate-600 hover:text-[#005B9F] transition-colors font-medium">Özellikler</a>
          <a href="#how-it-works" className="text-sm text-slate-600 hover:text-[#005B9F] transition-colors font-medium">Nasıl Kullanılır?</a>
          <a href="#faq" className="text-sm text-slate-600 hover:text-[#005B9F] transition-colors font-medium">SSS</a>
          <a
            href={`tel:${PHONE_TEL}`}
            className="flex items-center gap-1.5 text-sm text-[#005B9F] hover:text-[#004a82] transition-colors font-semibold"
          >
            <Phone size={14} />
            {PHONE_DISPLAY}
          </a>
          <a
            href={DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#005B9F] hover:bg-[#004a82] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors duration-200 shadow-sm"
          >
            <Download size={14} />
            Hemen İndir
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-slate-600 hover:text-slate-900" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-white border-t border-slate-100 px-6 py-4 flex flex-col gap-4"
        >
          <a href="#features" className="text-slate-700 hover:text-[#005B9F] text-sm font-medium" onClick={() => setMenuOpen(false)}>Özellikler</a>
          <a href="#how-it-works" className="text-slate-700 hover:text-[#005B9F] text-sm font-medium" onClick={() => setMenuOpen(false)}>Nasıl Kullanılır?</a>
          <a href="#faq" className="text-slate-700 hover:text-[#005B9F] text-sm font-medium" onClick={() => setMenuOpen(false)}>SSS</a>
          <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-1.5 text-[#005B9F] text-sm font-semibold">
            <Phone size={14} />
            {PHONE_DISPLAY}
          </a>
          <a
            href={DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#005B9F] text-white text-sm font-semibold px-4 py-2.5 rounded-lg w-fit"
          >
            <Download size={14} />
            Hemen İndir
          </a>
        </motion.div>
      )}
    </motion.nav>
  )
}
