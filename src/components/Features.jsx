import { lazy, Suspense, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Brain, BookMarked, Database, ShieldCheck } from 'lucide-react'
import { use3DCapability } from '../hooks/use3DCapability'

const FeaturesScene3D = lazy(() => import('./FeaturesScene3D'))

const features = [
  {
    icon: Brain,
    color: '#38E1FF',
    title: 'Akıllı Ürün Tanıma',
    subtitle: 'Yapay Zeka',
    desc: 'Faturadaki ürün adları farklı yazılmış, kısaltılmış ya da hatalı olsa bile OtoFatura bunları sizin stok kartlarınızla doğru eşleştirir. Yanlış firma karışıklığı yaşanmaz.',
  },
  {
    icon: BookMarked,
    color: '#5AA9FF',
    title: 'Akıllı Stok Hafızası',
    subtitle: 'Kullandıkça Öğrenir',
    desc: 'Bir ürünü bir kez kendi stok kartınızla eşleştirdiğinizde OtoFatura bunu aklında tutar. Sonraki faturalarda aynı ürünü otomatik tanır — aynı işi iki kez yapmazsınız.',
  },
  {
    icon: Database,
    color: '#2563EB',
    title: 'Tek Tıkla Akınsoft\'a Aktarım',
    subtitle: 'Doğrudan ERP Kaydı',
    desc: 'Onayladığınız fatura; ürün, cari ve stok kayıtlarıyla birlikte doğrudan Akınsoft Wolvox\'a yazılır. Mevcut kayıtlarınız bozulmaz, çakışma olmaz. Uzak sunucu da desteklenir.',
  },
  {
    icon: ShieldCheck,
    color: '#10B981',
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
      className="relative neon-card edge-top rounded-2xl p-6 flex flex-col gap-4 overflow-hidden"
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center border"
        style={{ background: `${feat.color}14`, borderColor: `${feat.color}35` }}
      >
        <Icon size={20} color={feat.color} strokeWidth={2} />
      </div>
      <div>
        <div className="font-data text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: feat.color }}>{feat.subtitle}</div>
        <h3 className="font-display text-base font-bold text-ink-50 mb-2">{feat.title}</h3>
        <p className="text-sm text-ink-300 leading-relaxed">{feat.desc}</p>
      </div>
    </motion.div>
  )
}

export default function Features() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })
  const { can3D } = use3DCapability()
  const sectionRef = useRef(null)
  const [sectionVisible, setSectionVisible] = useState(false)

  // Bu bölüm ekranda değilken minik 3D arka planın render döngüsünü durdur.
  useEffect(() => {
    if (!sectionRef.current) return
    const obs = new IntersectionObserver(
      ([entry]) => setSectionVisible(entry.isIntersecting),
      { threshold: 0 }
    )
    obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="features" className="py-24 px-6 bg-void-panel relative overflow-hidden">
      {/* Sakin, çok hafif ikinci 3D dokunuş — arka planda yavaşça dönen wireframe */}
      {can3D && (
        <div className="absolute inset-0 opacity-60 pointer-events-none">
          <Suspense fallback={null}>
            <FeaturesScene3D active={sectionVisible} />
          </Suspense>
        </div>
      )}
      <div className="aurora top-0 left-1/2 -translate-x-1/2 w-[36rem] h-[24rem] bg-signal/6" />
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <span className="inline-block chip text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider">
            Güçlü Özellikler
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-ink-50 tracking-tight mb-4">
            OtoFatura'nın{' '}
            <span className="text-grad">Süper Güçleri</span>
          </h2>
          <p className="text-ink-300 max-w-xl mx-auto text-base leading-relaxed">
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
