import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Download, Menu, X, Phone } from 'lucide-react'

const DOWNLOAD_URL = 'https://github.com/Selim2211/OtoFaturaSite/releases/download/v1.0/OtoFaturaKurulum_v1.1.0.exe'
const PHONE_DISPLAY = '0543 374 30 60'
const PHONE_TEL = '+905433743060'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [logoOk, setLogoOk] = useState(true)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 16)
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? 'glass-strong border-signal/15 py-3 shadow-[0_1px_0_rgba(56,225,255,0.15)]'
          : 'bg-transparent border-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo — görsel yoksa şık wordmark'a düş */}
        <a href="#" className="flex items-center">
          {logoOk ? (
            <img
              src="/logo.png" alt="OtoFatura" className="h-8 w-auto"
              onError={() => setLogoOk(false)}
            />
          ) : (
            <span className="font-display text-lg font-bold tracking-tight text-ink-50">
              Oto<span className="text-grad">Fatura</span>
            </span>
          )}
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-7">
          <a href="#video" className="text-sm text-ink-400 hover:text-signal transition-colors font-medium">Video</a>
          <a href="#features" className="text-sm text-ink-400 hover:text-signal transition-colors font-medium">Özellikler</a>
          <a href="#how-it-works" className="text-sm text-ink-400 hover:text-signal transition-colors font-medium">Nasıl Kullanılır?</a>
          <a href="#faq" className="text-sm text-ink-400 hover:text-signal transition-colors font-medium">SSS</a>
          <a
            href={`tel:${PHONE_TEL}`}
            className="flex items-center gap-1.5 text-sm text-signal-soft hover:text-signal transition-colors font-semibold font-data"
          >
            <Phone size={14} />
            {PHONE_DISPLAY}
          </a>
          <a
            href={DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-to-r from-brand-700 to-brand-500 hover:from-brand-600 hover:to-signal text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-all duration-200 glow-blue cursor-pointer"
          >
            <Download size={14} />
            Hemen İndir
          </a>
        </div>

        {/* Mobile toggle — 44x44 dokunma alanı */}
        <button
          className="md:hidden -mr-2.5 flex h-11 w-11 items-center justify-center text-ink-400 hover:text-ink-50 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden glass-strong border-t border-signal/10 px-6 py-2 flex flex-col"
        >
          <a href="#video" className="text-ink-300 hover:text-signal text-sm font-medium py-3 border-b border-white/5" onClick={() => setMenuOpen(false)}>Video</a>
          <a href="#features" className="text-ink-300 hover:text-signal text-sm font-medium py-3 border-b border-white/5" onClick={() => setMenuOpen(false)}>Özellikler</a>
          <a href="#how-it-works" className="text-ink-300 hover:text-signal text-sm font-medium py-3 border-b border-white/5" onClick={() => setMenuOpen(false)}>Nasıl Kullanılır?</a>
          <a href="#faq" className="text-ink-300 hover:text-signal text-sm font-medium py-3 border-b border-white/5" onClick={() => setMenuOpen(false)}>SSS</a>
          <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-1.5 text-signal-soft text-sm font-semibold font-data py-3">
            <Phone size={14} />
            {PHONE_DISPLAY}
          </a>
          <a
            href={DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-brand-700 to-brand-500 text-white text-sm font-semibold px-4 py-3 rounded-lg my-3"
          >
            <Download size={14} />
            Hemen İndir
          </a>
        </motion.div>
      )}
    </motion.nav>
  )
}
