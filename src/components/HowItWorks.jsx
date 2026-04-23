import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Upload, Cpu, Send } from 'lucide-react'

const steps = [
  {
    icon: Upload,
    number: '01',
    title: 'Faturanı Yükle',
    desc: 'PDF veya görüntü formatındaki faturanı sürükle bırak veya seç. OtoFatura saniyeler içinde analiz eder.',
    color: 'from-blue-500 to-blue-400',
  },
  {
    icon: Cpu,
    number: '02',
    title: 'Akıllıca Eşleştir',
    desc: 'Sistemimiz, faturadaki her kalemi Wolvox stok veritabanıyla karşılaştırır. Belirsiz olanları önerilerle sunar.',
    color: 'from-cyan-500 to-teal-400',
  },
  {
    icon: Send,
    number: '03',
    title: 'Tek Tıkla Wolvox\'a Aktar',
    desc: 'Onayladıktan sonra tek butonla direkt Firebird veritabanına yazar. Fatura, cari ve kasa kaydı otomatik oluşur.',
    color: 'from-violet-500 to-purple-400',
  },
]

function Step({ step, i, total }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const Icon = step.icon

  return (
    <div className="flex flex-col items-center relative">
      {/* Connector line (not last) */}
      {i < total - 1 && (
        <div className="hidden lg:block absolute top-10 left-[calc(50%+3rem)] w-[calc(100%-6rem)] h-px bg-gradient-to-r from-white/10 to-white/5" />
      )}

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: i * 0.15, duration: 0.6 }}
        className="flex flex-col items-center text-center gap-4 max-w-xs"
      >
        {/* Step number + icon */}
        <div className="relative">
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl`}>
            <Icon size={28} className="text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-7 h-7 glass rounded-full flex items-center justify-center text-xs font-black text-slate-300 border border-white/10">
            {step.number.slice(1)}
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Adım {step.number}</div>
          <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
          <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
        </div>
      </motion.div>
    </div>
  )
}

export default function HowItWorks() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section id="how-it-works" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-5">
            <span className="text-xs font-semibold text-cyan-400 tracking-wide uppercase">3 Adımda Tamamla</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Nasıl{' '}
            <span className="text-gradient">Çalışır?</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto text-base">
            Dakikalar süren manuel girişi üç adıma sıkıştırıyoruz.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10">
          {steps.map((step, i) => (
            <Step key={step.number} step={step} i={i} total={steps.length} />
          ))}
        </div>
      </div>
    </section>
  )
}
