import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Clock, TrendingUp, Zap } from 'lucide-react'

const MANUAL_SEC = 3 * 60   // 3 dakika
const AUTO_SEC  = 10        // 10 saniye

function fmt(totalSec) {
  const h = Math.floor(totalSec / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  if (h === 0) return `${m} dakika`
  if (m === 0) return `${h} saat`
  return `${h} saat ${m} dakika`
}

export default function ROICalculator() {
  const [count, setCount] = useState(50)
  const headerRef = useRef(null)
  const inView = useInView(headerRef, { once: true, margin: '-60px' })

  const manualTotal  = count * MANUAL_SEC
  const autoTotal    = count * AUTO_SEC
  const savedSec     = manualTotal - autoTotal
  const savedHours   = (savedSec / 3600).toFixed(1)
  const pct          = Math.round((savedSec / manualTotal) * 100)

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-5">
            <TrendingUp size={12} className="text-blue-400" />
            <span className="text-xs font-semibold text-blue-400 tracking-wide uppercase">ROI Hesaplayıcı</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Ayda Ne Kadar{' '}
            <span className="text-gradient">Zaman Kazanırsın?</span>
          </h2>
          <p className="text-slate-400 text-sm">Aylık fatura sayını gir, hesaplayalım.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="glass rounded-3xl border border-white/[0.08] overflow-hidden"
        >
          <div className="px-8 pt-10 pb-6">
            {/* Slider */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-slate-400 font-medium">Aylık Fatura Sayısı</span>
                <span className="text-2xl font-extrabold text-white">{count}</span>
              </div>
              <input
                type="range"
                min={5}
                max={500}
                step={5}
                value={count}
                onChange={e => setCount(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #06b6d4 ${(count - 5) / (500 - 5) * 100}%, rgba(255,255,255,0.1) ${(count - 5) / (500 - 5) * 100}%, rgba(255,255,255,0.1) 100%)`
                }}
              />
              <div className="flex justify-between mt-1.5 text-xs text-slate-600">
                <span>5</span>
                <span>500</span>
              </div>
            </div>

            {/* Comparison bars */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="rounded-2xl bg-red-500/5 border border-red-500/10 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={15} className="text-red-400" />
                  <span className="text-xs font-semibold text-red-400 uppercase tracking-wide">Manuel Giriş</span>
                </div>
                <div className="text-2xl font-extrabold text-white mb-1">{fmt(manualTotal)}</div>
                <div className="text-xs text-slate-500">~3 dakika / fatura</div>
              </div>

              <div className="rounded-2xl bg-emerald-500/5 border border-emerald-500/10 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Zap size={15} className="text-emerald-400" />
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">OtoFatura ile</span>
                </div>
                <div className="text-2xl font-extrabold text-white mb-1">{fmt(autoTotal)}</div>
                <div className="text-xs text-slate-500">~10 saniye / fatura</div>
              </div>
            </div>

            {/* Result */}
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-500/15 blur-sm" />
              <div className="absolute inset-0 border border-blue-500/20 rounded-2xl" />
              <div className="relative px-6 py-6 text-center">
                <p className="text-slate-400 text-sm mb-2">OtoFatura ile ayda</p>
                <motion.div
                  key={savedHours}
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="text-5xl font-black text-gradient mb-2"
                >
                  {savedHours} saat
                </motion.div>
                <p className="text-slate-300 text-sm font-medium">
                  kazandınız{' '}
                  <span className="text-blue-400 font-bold">(%{pct} daha hızlı)</span>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="px-8 py-4 bg-white/[0.02] border-t border-white/[0.05] text-center">
            <p className="text-xs text-slate-600">
              Yıllık kazanım: <span className="text-slate-400 font-semibold">{(savedHours * 12).toFixed(0)} saat</span> — bu, yaklaşık{' '}
              <span className="text-slate-400 font-semibold">{Math.round(savedHours * 12 / 8)} tam iş günü</span> demek.
            </p>
          </div>
        </motion.div>
      </div>

      <style>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #06b6d4);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(59,130,246,0.5);
          border: 2px solid rgba(255,255,255,0.2);
        }
        input[type='range']::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #06b6d4);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(59,130,246,0.5);
          border: 2px solid rgba(255,255,255,0.2);
        }
      `}</style>
    </section>
  )
}
