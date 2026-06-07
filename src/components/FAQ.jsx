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
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.07, duration: 0.45 }}
      className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:border-[#005B9F]/30 transition-colors duration-200"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left gap-4"
      >
        <span className="text-sm font-semibold text-slate-800">{item.q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22 }} className="flex-shrink-0 text-slate-400">
          <ChevronDown size={18} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="faq" className="py-20 px-6 bg-slate-50">
      <div className="max-w-2xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-10"
        >
          <span className="inline-block bg-blue-50 text-[#005B9F] text-xs font-bold px-3 py-1.5 rounded-full border border-blue-100 mb-4 uppercase tracking-wider">
            SSS
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
            Sıkça Sorulan{' '}
            <span className="text-brand-gradient">Sorular</span>
          </h2>
          <p className="text-slate-600 text-sm">Aklınızdaki soruların yanıtları burada.</p>
        </motion.div>
        <div className="flex flex-col gap-3">
          {faqs.map((item, i) => <FAQItem key={item.q} item={item} i={i} />)}
        </div>
      </div>
    </section>
  )
}
