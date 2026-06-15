import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Brain, BookMarked, Database, ShieldCheck } from 'lucide-react'

const features = [
  {
    icon: Brain,
    color: '#005B9F',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    title: 'Akıllı Ürün Tanıma',
    subtitle: 'Yapay Zeka',
    desc: 'Faturadaki ürün adları farklı yazılmış, kısaltılmış ya da hatalı olsa bile OtoFatura bunları sizin stok kartlarınızla doğru eşleştirir. Yanlış firma karışıklığı yaşanmaz.',
  },
  {
    icon: BookMarked,
    color: '#0369a1',
    bg: 'bg-sky-50',
    border: 'border-sky-100',
    title: 'Akıllı Stok Hafızası',
    subtitle: 'Kullandıkça Öğrenir',
    desc: 'Bir ürünü bir kez kendi stok kartınızla eşleştirdiğinizde OtoFatura bunu aklında tutar. Sonraki faturalarda aynı ürünü otomatik tanır — aynı işi iki kez yapmazsınız.',
  },
  {
    icon: Database,
    color: '#1d4ed8',
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
    title: 'Tek Tıkla Akınsoft\'a Aktarım',
    subtitle: 'Doğrudan ERP Kaydı',
    desc: 'Onayladığınız fatura; ürün, cari ve stok kayıtlarıyla birlikte doğrudan Akınsoft Wolvox\'a yazılır. Mevcut kayıtlarınız bozulmaz, çakışma olmaz. Uzak sunucu da desteklenir.',
  },
  {
    icon: ShieldCheck,
    color: '#047857',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    title: 'Her Zaman Sizin Kontrolünüzde',
    subtitle: 'Çift Onay',
    desc: 'Bir bilgi net okunamazsa sistem durmaz; size sorar. Aktarımdan önce her şeyi görür, onaylar ve dilediğiniz satırı elle düzeltebilirsiniz.',
  },
]

function Card({ feat, i }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const Icon = feat.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
      className={`bg-white rounded-2xl border ${feat.border} shadow-sm card-hover p-6 flex flex-col gap-4`}
    >
      <div className={`w-11 h-11 rounded-xl ${feat.bg} flex items-center justify-center`}>
        <Icon size={20} color={feat.color} strokeWidth={2} />
      </div>
      <div>
        <div className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: feat.color }}>{feat.subtitle}</div>
        <h3 className="text-base font-bold text-slate-900 mb-2">{feat.title}</h3>
        <p className="text-sm text-slate-600 leading-relaxed">{feat.desc}</p>
      </div>
    </motion.div>
  )
}

export default function Features() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section id="features" className="py-24 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-blue-50 text-[#005B9F] text-xs font-bold px-3 py-1.5 rounded-full border border-blue-100 mb-4 uppercase tracking-wider">
            Güçlü Özellikler
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            OtoFatura'nın{' '}
            <span className="text-brand-gradient">Süper Güçleri</span>
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-base leading-relaxed">
            Manuel fatura girişinin tüm sorunlarını ortadan kaldıran, muhasebe bütünlüğünü her koşulda koruyan dört temel güç.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => <Card key={f.title} feat={f} i={i} />)}
        </div>
      </div>
    </section>
  )
}
