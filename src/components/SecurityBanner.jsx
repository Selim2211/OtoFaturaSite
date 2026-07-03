import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Lock, Server, ArrowLeftRight, ShieldCheck } from 'lucide-react'

const points = [
  { icon: ArrowLeftRight, label: 'Doğrudan Aktarım', desc: 'Verileriniz aracı bulut sunucularına uğramaz, doğrudan kendi Akınsoft veritabanınıza güvenle yazılır.' },
  { icon: Server, label: 'Kendi Bilgisayarınızda', desc: 'Faturalarınız ve muhasebe veriniz dışarı çıkmaz; yalnızca sizin bilgisayarınızda işlenir.' },
  { icon: ShieldCheck, label: 'Şifreli Bağlantı Bilgileri', desc: 'Veritabanı bağlantı şifreleriniz cihazınızda şifrelenerek güvende tutulur.' },
]

/* Şifreli veri paketi — altıgen çerçeve + kilit + nabız halkaları (ince çizgi illüstrasyon) */
function EncryptedPacket() {
  return (
    <div className="relative w-14 h-14 flex-shrink-0">
      <span className="absolute inset-0 animate-glow-pulse"
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          background: 'linear-gradient(135deg, rgba(16,185,129,0.9), rgba(56,225,255,0.7))',
        }}
      />
      <span className="absolute inset-[2px]"
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          background: '#050B18',
        }}
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <Lock size={20} className="text-emerald-400" />
      </span>
    </div>
  )
}

export default function SecurityBanner() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="py-20 px-6 bg-void relative overflow-hidden">
      <div className="aurora bottom-0 right-1/4 w-[30rem] h-[20rem] bg-emerald-500/8" />
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-strong edge-top rounded-2xl overflow-hidden"
        >
          <div className="px-8 py-10 sm:px-12 flex flex-col lg:flex-row gap-10 items-start lg:items-center">
            {/* Left */}
            <div className="flex-shrink-0 flex flex-col gap-3 lg:max-w-xs">
              <EncryptedPacket />
              <span className="font-data text-[11px] font-bold uppercase tracking-widest text-emerald-400">Gizlilik Öncelikli Mimari</span>
              <h3 className="font-display text-2xl font-extrabold text-ink-50 leading-snug">
                %100 Yerel,<br />%100 Güvenli
              </h3>
              <p className="text-sm text-ink-300 leading-relaxed">
                Finansal verileriniz asla dışarıdaki bulut sunucularına aktarılmaz. OtoFatura doğrudan kendi bilgisayarınızda çalışır.{' '}
                <span className="text-ink-50 font-semibold">Verileriniz sadece size aittir.</span>
              </p>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px self-stretch bg-signal/10 mx-4" />

            {/* Right — 3 cards */}
            <div className="flex-1 grid sm:grid-cols-3 gap-4">
              {points.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="bg-white/[0.02] border border-emerald-500/15 rounded-xl p-4 flex flex-col gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center">
                    <Icon size={15} color="#34D399" />
                  </div>
                  <div className="text-sm font-bold text-ink-50">{label}</div>
                  <div className="text-xs text-ink-300 leading-relaxed">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
