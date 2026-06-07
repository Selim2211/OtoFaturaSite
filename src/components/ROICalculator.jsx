import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Clock, TrendingUp, Zap } from 'lucide-react'

const MANUAL_SEC = 3 * 60
const AUTO_SEC   = 10

function fmt(totalSec) {
  const h = Math.floor(totalSec / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  if (h === 0) return `${m} dk`
  if (m === 0) return `${h} sa`
  return `${h} sa ${m} dk`
}

export default function ROICalculator() {
  const [count, setCount] = useState(50)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const manualTotal = count * MANUAL_SEC
  const autoTotal   = count * AUTO_SEC
  const savedSec    = manualTotal - autoTotal
  const savedHours  = (savedSec / 3600).toFixed(1)
  const pct         = Math.round((savedSec / manualTotal) * 100)
  const pct_pos     = ((count - 5) / (500 - 5)) * 100

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-blue-50 text-[#005B9F] text-xs font-bold px-3 py-1.5 rounded-full border border-blue-100 mb-4 uppercase tracking-wider">
            <TrendingUp size={12} />
            ROI Hesaplayıcı
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Ayda Ne Kadar{' '}
            <span className="text-brand-gradient">Zaman Kazanırsın?</span>
          </h2>
          <p className="text-slate-600 text-sm">Aylık fatura sayını gir, hesaplayalım.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
        >
          <div className="px-8 pt-8 pb-6">
            {/* Slider */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-slate-600 font-semibold">Aylık Fatura Sayısı</span>
                <span className="text-2xl font-extrabold text-[#005B9F]">{count}</span>
              </div>
              <input
                type="range" min={5} max={500} step={5} value={count}
                onChange={e => setCount(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{ background: `linear-gradient(to right, #005B9F 0%, #005B9F ${pct_pos}%, #e2e8f0 ${pct_pos}%, #e2e8f0 100%)` }}
              />
              <div className="flex justify-between mt-1.5 text-xs text-slate-400">
                <span>5</span><span>500</span>
              </div>
            </div>

            {/* Comparison */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl bg-red-50 border border-red-100 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={14} className="text-red-500" />
                  <span className="text-xs font-bold text-red-500 uppercase tracking-wide">Manuel Giriş</span>
                </div>
                <div className="text-2xl font-extrabold text-slate-900">{fmt(manualTotal)}</div>
                <div className="text-xs text-slate-500 mt-0.5">~3 dakika / fatura</div>
              </div>
              <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={14} className="text-emerald-600" />
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide">OtoFatura ile</span>
                </div>
                <div className="text-2xl font-extrabold text-slate-900">{fmt(autoTotal)}</div>
                <div className="text-xs text-slate-500 mt-0.5">~10 saniye / fatura</div>
              </div>
            </div>

            {/* Result */}
            <div className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 px-6 py-5 text-center">
              <p className="text-sm text-slate-600 mb-1">OtoFatura ile ayda</p>
              <motion.div
                key={savedHours}
                initial={{ scale: 0.88, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-5xl font-black text-brand-gradient mb-1"
              >
                {savedHours} saat
              </motion.div>
              <p className="text-sm text-slate-700 font-medium">
                kazandınız{' '}
                <span className="text-[#005B9F] font-bold">(%{pct} daha hızlı)</span>
              </p>
            </div>
          </div>

          <div className="px-8 py-3 bg-slate-50 border-t border-slate-200 text-center">
            <p className="text-xs text-slate-500">
              Yıllık kazanım:{' '}
              <span className="font-semibold text-slate-700">{(savedHours * 12).toFixed(0)} saat</span>
              {' '}— yaklaşık{' '}
              <span className="font-semibold text-slate-700">{Math.round(Number(savedHours) * 12 / 8)} tam iş günü.</span>
            </p>
          </div>
        </motion.div>
      </div>

      <style>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px; height: 20px;
          border-radius: 50%;
          background: #005B9F;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 0 0 2px #005B9F40;
        }
        input[type='range']::-moz-range-thumb {
          width: 20px; height: 20px;
          border-radius: 50%;
          background: #005B9F;
          cursor: pointer;
          border: 2px solid white;
        }
      `}</style>
    </section>
  )
}
