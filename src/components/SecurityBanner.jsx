import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Lock, Server, ArrowLeftRight, ShieldCheck } from 'lucide-react'

const points = [
  { icon: ArrowLeftRight, label: 'Doğrudan ERP Aktarımı', desc: 'Verileriniz aracı bulut sunucularına uğramaz, doğrudan kendi Firebird veritabanınıza güvenle yazılır.' },
  { icon: Server, label: 'Lokal Firebird Veritabanı', desc: 'On-premise mimari. Faturalar ve ERP verisi yalnızca kendi sunucunuzda işlenir.' },
  { icon: ShieldCheck, label: 'Şifreli Kimlik Bilgisi Depolama', desc: 'Bağlantı şifreleri sistem keyring\'inde AES şifreli saklanır.' },
]

export default function SecurityBanner() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-sm overflow-hidden"
        >
          <div className="px-8 py-10 sm:px-12 flex flex-col lg:flex-row gap-10 items-start lg:items-center">
            {/* Left */}
            <div className="flex-shrink-0 flex flex-col gap-3 lg:max-w-xs">
              <div className="w-12 h-12 rounded-xl bg-[#005B9F] flex items-center justify-center">
                <Lock size={22} className="text-white" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#005B9F]">Gizlilik Öncelikli Mimari</span>
              <h3 className="text-2xl font-extrabold text-slate-900 leading-snug">
                %100 Yerel,<br />%100 Güvenli
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Finansal verileriniz asla dışarıdaki bulut sunucularına aktarılmaz. OtoFatura doğrudan kendi bilgisayarınızda çalışır.{' '}
                <span className="text-slate-900 font-semibold">Verileriniz sadece size aittir.</span>
              </p>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px self-stretch bg-slate-200 mx-4" />

            {/* Right — 3 cards */}
            <div className="flex-1 grid sm:grid-cols-3 gap-4">
              {points.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col gap-2 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Icon size={15} color="#005B9F" />
                  </div>
                  <div className="text-sm font-bold text-slate-900">{label}</div>
                  <div className="text-xs text-slate-500 leading-relaxed">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
