import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Clock, TrendingUp, Zap } from 'lucide-react'

// Manuel giriş: her fatura için sabit hazırlık + her kalem için ayrı giriş süresi.
// OtoFatura: faturanın tamamını bir kerede okur — kalem sayısından neredeyse bağımsız.
const MANUAL_BASE     = 30   // sn — cari + fatura başlığı
const MANUAL_PER_ITEM = 15   // sn — her kalemi elle bulup girme
const AUTO_BASE       = 10   // sn — yükle + aktar
const AUTO_PER_ITEM   = 1    // sn — kalemi gözle kontrol

function fmt(totalSec) {
  const h = Math.floor(totalSec / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  if (h === 0) return `${m} dk`
  if (m === 0) return `${h} sa`
  return `${h} sa ${m} dk`
}

function fmtShort(sec) {
  sec = Math.round(sec)
  if (sec < 60) return `${sec} sn`
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return s === 0 ? `${m} dk` : `${m} dk ${s} sn`
}

export default function ROICalculator() {
  const [count, setCount] = useState(50)
  const [items, setItems] = useState(10)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const manualPerInvoice = MANUAL_BASE + items * MANUAL_PER_ITEM
  const autoPerInvoice   = AUTO_BASE + items * AUTO_PER_ITEM

  const manualTotal = count * manualPerInvoice
  const autoTotal   = count * autoPerInvoice
  const savedSec    = Math.max(0, manualTotal - autoTotal)
  const savedHours  = (savedSec / 3600).toFixed(1)
  const pct         = Math.round((savedSec / manualTotal) * 100)

  const countPos = ((count - 5) / (500 - 5)) * 100
  const itemsPos = ((items - 1) / (50 - 1)) * 100

  return (
    <section className="py-20 px-6 bg-void relative overflow-hidden">
      <div className="aurora top-1/3 left-1/4 w-[26rem] h-[26rem] bg-signal/8" />
      <div className="max-w-4xl mx-auto relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 chip text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider">
            <TrendingUp size={12} />
            ROI Hesaplayıcı
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-ink-50 tracking-tight mb-3">
            Ayda Ne Kadar{' '}
            <span className="text-grad">Zaman Kazanırsın?</span>
          </h2>
          <p className="text-ink-300 text-sm">Aylık fatura sayını ve ortalama kalem sayısını gir, hesaplayalım.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-strong edge-top rounded-2xl overflow-hidden"
        >
          <div className="px-8 pt-8 pb-6">
            {/* Slider 1 — fatura sayısı */}
            <div className="mb-7">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-ink-300 font-semibold">Aylık Fatura Sayısı</span>
                <span className="font-data text-2xl font-extrabold text-grad">{count}</span>
              </div>
              <input
                type="range" min={5} max={500} step={5} value={count}
                onChange={e => setCount(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{ background: `linear-gradient(to right, #2563EB 0%, #38E1FF ${countPos}%, rgba(255,255,255,0.08) ${countPos}%, rgba(255,255,255,0.08) 100%)` }}
              />
              <div className="font-data flex justify-between mt-1.5 text-xs text-ink-500">
                <span>5</span><span>500</span>
              </div>
            </div>

            {/* Slider 2 — ortalama kalem sayısı */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-ink-300 font-semibold">
                  Fatura Başına Ortalama Kalem
                </span>
                <span className="font-data text-2xl font-extrabold text-grad">{items}</span>
              </div>
              <input
                type="range" min={1} max={50} step={1} value={items}
                onChange={e => setItems(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{ background: `linear-gradient(to right, #2563EB 0%, #38E1FF ${itemsPos}%, rgba(255,255,255,0.08) ${itemsPos}%, rgba(255,255,255,0.08) 100%)` }}
              />
              <div className="font-data flex justify-between mt-1.5 text-xs text-ink-500">
                <span>1 kalem</span><span>50 kalem</span>
              </div>
              <p className="mt-2 text-xs text-ink-500">
                Çok kalemli faturalarda manuel giriş katlanarak uzar; OtoFatura ise faturayı tek seferde okur.
              </p>
            </div>

            {/* Comparison */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl bg-red-500/[0.06] border border-red-500/20 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={14} className="text-red-400" />
                  <span className="text-xs font-bold text-red-400 uppercase tracking-wide">Manuel Giriş</span>
                </div>
                <div className="font-data text-2xl font-extrabold text-ink-50">{fmt(manualTotal)}</div>
                <div className="text-xs text-ink-500 mt-0.5">~{fmtShort(manualPerInvoice)} / fatura</div>
              </div>
              <div className="rounded-xl bg-emerald-500/[0.06] border border-emerald-500/20 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={14} className="text-emerald-400" />
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">OtoFatura ile</span>
                </div>
                <div className="font-data text-2xl font-extrabold text-ink-50">{fmt(autoTotal)}</div>
                <div className="text-xs text-ink-500 mt-0.5">~{fmtShort(autoPerInvoice)} / fatura</div>
              </div>
            </div>

            {/* Result */}
            <div className="relative rounded-xl border border-signal/25 bg-gradient-to-r from-brand-600/10 to-signal/10 px-6 py-5 text-center overflow-hidden">
              <div className="absolute inset-0 grid-bg opacity-30" />
              <div className="relative">
                <p className="text-sm text-ink-300 mb-1">OtoFatura ile ayda</p>
                <motion.div
                  key={savedHours}
                  initial={{ scale: 0.88, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="font-data text-5xl font-black text-grad text-glow mb-1"
                >
                  {savedHours} saat
                </motion.div>
                <p className="text-sm text-ink-300 font-medium">
                  kazandınız{' '}
                  <span className="font-data text-signal font-bold">(%{pct} daha hızlı)</span>
                </p>
              </div>
            </div>
          </div>

          <div className="px-8 py-3 bg-white/[0.02] border-t border-signal/10 text-center">
            <p className="text-xs text-ink-500">
              Yıllık kazanım:{' '}
              <span className="font-data font-semibold text-ink-300">{(savedHours * 12).toFixed(0)} saat</span>
              {' '}— yaklaşık{' '}
              <span className="font-data font-semibold text-ink-300">{Math.round(Number(savedHours) * 12 / 8)} tam iş günü.</span>
            </p>
          </div>
        </motion.div>
      </div>

      <style>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px; height: 20px;
          border-radius: 50%;
          background: #38E1FF;
          cursor: pointer;
          border: 3px solid #050B18;
          box-shadow: 0 0 14px 2px rgba(56,225,255,0.55);
        }
        input[type='range']::-moz-range-thumb {
          width: 20px; height: 20px;
          border-radius: 50%;
          background: #38E1FF;
          cursor: pointer;
          border: 3px solid #050B18;
          box-shadow: 0 0 14px 2px rgba(56,225,255,0.55);
        }
      `}</style>
    </section>
  )
}
