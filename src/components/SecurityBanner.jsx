import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Lock, Server, WifiOff, ShieldCheck } from 'lucide-react'

const points = [
  { icon: WifiOff, label: 'İnternet Bağlantısı Gerekmez' },
  { icon: Server, label: 'Lokal Firebird Veritabanı' },
  { icon: ShieldCheck, label: 'Şifreli Kimlik Bilgisi Depolama' },
]

export default function SecurityBanner() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="py-10 px-6">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-6xl mx-auto relative overflow-hidden rounded-2xl border border-emerald-500/20"
      >
        {/* BG */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/60 via-navy-900 to-teal-950/40" />
        <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-teal-500/8 rounded-full blur-2xl pointer-events-none" />

        <div className="relative px-8 py-10 sm:px-12 flex flex-col lg:flex-row items-center gap-8">
          {/* Icon */}
          <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center shadow-xl">
            <Lock size={28} className="text-white" />
          </div>

          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Gizlilik Öncelikli Mimari</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2 tracking-tight">
              %100 Yerel, %100 Güvenli
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
              Finansal verileriniz asla dışarıdaki bulut sunucularına aktarılmaz. OtoFatura doğrudan kendi bilgisayarınızda çalışır ve veriyi kapalı devre Akınsoft Firebird veritabanınıza yazar.{' '}
              <span className="text-slate-300 font-medium">Verileriniz sadece size aittir.</span>
            </p>
          </div>

          {/* Pills */}
          <div className="flex flex-col gap-2.5 flex-shrink-0">
            {points.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5 glass rounded-lg px-3.5 py-2 border border-emerald-500/10">
                <Icon size={14} className="text-emerald-400 flex-shrink-0" />
                <span className="text-xs text-slate-300 font-medium whitespace-nowrap">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
