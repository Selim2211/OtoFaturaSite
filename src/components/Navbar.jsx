import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap, Download, Menu, X } from 'lucide-react'

const DOWNLOAD_URL = 'https://github.com/Selim2211/OtoFaturaSite/releases/download/v1.0/OtoFatura_Setup_v1.0.exe'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass border-b border-white/[0.06] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
            <Zap size={16} className="text-white" fill="white" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white">
            Oto<span className="text-gradient">Fatura</span>
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-slate-400 hover:text-white transition-colors">Özellikler</a>
          <a href="#how-it-works" className="text-sm text-slate-400 hover:text-white transition-colors">Nasıl Çalışır?</a>
          <a
            href={DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
          >
            <Download size={14} />
            İndir
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-slate-400 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden glass border-t border-white/[0.06] px-6 py-4 flex flex-col gap-4"
        >
          <a href="#features" className="text-slate-300 hover:text-white text-sm" onClick={() => setMenuOpen(false)}>Özellikler</a>
          <a href="#how-it-works" className="text-slate-300 hover:text-white text-sm" onClick={() => setMenuOpen(false)}>Nasıl Çalışır?</a>
          <a
            href={DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg w-fit"
          >
            <Download size={14} />
            İndir
          </a>
        </motion.div>
      )}
    </motion.nav>
  )
}
