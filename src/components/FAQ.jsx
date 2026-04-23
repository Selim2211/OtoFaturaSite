import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'Kurulum zor mu?',
    a: 'İndirdiğiniz tek bir dosya ile saniyeler içinde kurulur, ekstra ayar gerektirmez.',
  },
  {
    q: 'Hatalı ürün eşleşirse ne olur?',
    a: 'Aktarım öncesi tam kontrol sizdedir. Hatalı satırları arayüzden tek tıkla değiştirebilirsiniz.',
  },
  {
    q: 'Hangi Akınsoft sürümleriyle uyumlu?',
    a: 'Firebird veritabanı kullanan Wolvox ERP v8 ve üzeri tüm sürümlerle tam uyumludur.',
  },
]

function FAQItem({ item, i }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.08, duration: 0.5 }}
      className="glass rounded-xl overflow-hidden border border-white/[0.06] hover:border-blue-500/20 transition-colors duration-200"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left gap-4"
      >
        <span className="text-sm font-semibold text-slate-200">{item.q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 text-slate-500"
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm text-slate-400 leading-relaxed border-t border-white/[0.05] pt-3">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const headerRef = useRef(null)
  const inView = useInView(headerRef, { once: true, margin: '-60px' })

  return (
    <section className="py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-4">
            <span className="text-xs font-semibold text-blue-400 tracking-wide uppercase">SSS</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight mb-3">
            Sıkça Sorulan{' '}
            <span className="text-gradient">Sorular</span>
          </h2>
          <p className="text-slate-400 text-sm">Aklınızdaki soruların yanıtları burada.</p>
        </motion.div>

        <div className="flex flex-col gap-3">
          {faqs.map((item, i) => (
            <FAQItem key={item.q} item={item} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
