import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Sparkles, Shield, ListChecks, Zap } from 'lucide-react'

const features = [
  {
    icon: Sparkles,
    color: 'from-blue-500 to-cyan-400',
    glow: 'rgba(59,130,246,0.15)',
    title: 'Akıllı Eşleştirme',
    subtitle: 'Fuzzy Match AI',
    desc: 'Birebir eşleşmeyen ürünlerde OtoFatura akıllı algoritması ile en yakın stok kalemlerini önerir. Yanlış yazılmış, kısaltılmış veya farklı kodlu ürünleri anında tanır.',
  },
  {
    icon: Shield,
    color: 'from-violet-500 to-purple-400',
    glow: 'rgba(139,92,246,0.15)',
    title: 'Kusursuz Bütünlük',
    subtitle: 'Double-Entry Mantığı',
    desc: 'Kasa, Cari ve Tahakkuk hesaplarını Akınsoft Wolvox\'un muhasebe mantığıyla %100 uyumlu senkronize eder. Hiçbir satır eksik kalmaz.',
  },
  {
    icon: ListChecks,
    color: 'from-emerald-500 to-teal-400',
    glow: 'rgba(16,185,129,0.15)',
    title: 'Satır Bazlı Kontrol',
    subtitle: 'Hedefli Düzeltme',
    desc: 'Sadece hatalı veya düşük güvenlikli satırları tek tıkla yeniden eşleştir. Doğru satırlara dokunmadan hızlıca düzelt.',
  },
  {
    icon: Zap,
    color: 'from-amber-500 to-orange-400',
    glow: 'rgba(245,158,11,0.15)',
    title: 'Hızlı ve Güvenli',
    subtitle: 'Firebird Direkt Yazım',
    desc: 'Doğrudan Firebird veritabanına kurşun geçirmez kayıt mimarisiyle yazar. Ara sunucu yok, veri kaybı yok, gecikme yok.',
  },
]

function FeatureCard({ feat, i }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const Icon = feat.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.1, duration: 0.55, ease: 'easeOut' }}
      className="glass glass-hover rounded-2xl p-6 flex flex-col gap-4 cursor-default"
      style={{ '--glow': feat.glow }}
    >
      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feat.color} flex items-center justify-center shadow-lg`}>
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">{feat.subtitle}</div>
        <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
      </div>
    </motion.div>
  )
}

export default function Features() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section id="features" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-blue-900/10 via-transparent to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-5">
            <span className="text-xs font-semibold text-blue-400 tracking-wide uppercase">Güçlü Özellikler</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            OtoFatura'nın{' '}
            <span className="text-gradient">Süper Güçleri</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base leading-relaxed">
            Manuel fatura girişinin tüm sorunlarını ortadan kaldıran, muhasebe bütünlüğünü koruyan dört temel güç.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <FeatureCard key={f.title} feat={f} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
