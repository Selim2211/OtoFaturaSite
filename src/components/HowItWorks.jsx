import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Server, Upload, Cpu, Send } from 'lucide-react'

const steps = [
  {
    icon: Server,
    number: '01',
    title: 'Sunucuya Bağlan',
    desc: 'Akınsoft Wolvox\'un Firebird veritabanı IP ve port bilgilerini OtoFatura\'ya girin. Uzak sunucu da desteklenir.',
  },
  {
    icon: Upload,
    number: '02',
    title: 'Faturayı Sürükle',
    desc: 'PDF veya görsel formatındaki faturayı sürükle bırak ile yükleyin. Sistem saniyeler içinde tüm kalemleri ayıklar.',
  },
  {
    icon: Cpu,
    number: '03',
    title: 'AI Eşleştirsin',
    desc: 'Akıllı motor her satırı STOKHR veritabanınızla karşılaştırır. Belirsiz eşleşmeleri öneriler ile çözüme kavuşturur.',
  },
  {
    icon: Send,
    number: '04',
    title: 'Akınsoft\'a Gönder',
    desc: 'Tek tuşla FATURA, STOKHR ve CARI tablolarına PK çakışması yaşanmadan güvenli kayıt gerçekleşir.',
  },
]

function Step({ step, i, total }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const Icon = step.icon

  return (
    <div className="flex flex-col items-center relative">
      {/* Connector */}
      {i < total - 1 && (
        <div className="hidden lg:block absolute top-10 left-[calc(50%+44px)] w-[calc(100%-88px)] h-px border-t-2 border-dashed border-slate-200" />
      )}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: i * 0.12, duration: 0.5 }}
        className="flex flex-col items-center text-center gap-3 max-w-[200px]"
      >
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-white border-2 border-[#005B9F]/20 flex items-center justify-center shadow-sm">
            <Icon size={26} color="#005B9F" strokeWidth={1.8} />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#005B9F] rounded-full flex items-center justify-center text-[11px] font-black text-white">
            {step.number.slice(1)}
          </div>
        </div>
        <div className="text-[11px] font-bold text-[#005B9F] uppercase tracking-widest">Adım {step.number}</div>
        <h3 className="text-sm font-bold text-slate-900">{step.title}</h3>
        <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
      </motion.div>
    </div>
  )
}

export default function HowItWorks() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section id="how-it-works" className="py-24 px-6 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-blue-50 text-[#005B9F] text-xs font-bold px-3 py-1.5 rounded-full border border-blue-100 mb-4 uppercase tracking-wider">
            4 Adımda Tamamla
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Nasıl{' '}
            <span className="text-brand-gradient">Çalışır?</span>
          </h2>
          <p className="text-slate-600 max-w-lg mx-auto text-base">
            Dakikalar süren manuel girişi dört basit adıma sıkıştırıyoruz.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {steps.map((step, i) => <Step key={step.number} step={step} i={i} total={steps.length} />)}
        </div>
      </div>
    </section>
  )
}
