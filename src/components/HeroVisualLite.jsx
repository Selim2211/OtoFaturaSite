/**
 * Telefon / düşük güç / reduced-motion-kapalı cihazlar için WebGL'siz,
 * saf CSS animasyonlu Hero görseli. 3D sahnedeki "OCR tarayıcı ışını"
 * konseptini hafifçe taklit eder: fatura kartı üzerinde gezinen tarama
 * çizgisi + sırayla parlayan satırlar + eşleşme onayı.
 * Pil dostu (yalnızca transform/opacity animasyonları).
 */
export default function HeroVisualLite() {
  const rows = [0, 1, 2, 3]
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Zemin */}
      <div className="absolute inset-0 grid-bg grid-bg-fade opacity-70" />
      <div className="aurora aurora-anim animate-aurora-1 top-[6%] right-[-12%] w-[26rem] h-[26rem] bg-brand-600/25" />
      <div className="aurora aurora-anim animate-aurora-2 bottom-[-10%] left-[-10%] w-[24rem] h-[24rem] bg-signal/18" />

      {/* Kart kümesi — mobilde gizli (metinle çakışmasın), masaüstünde sağda */}
      <div className="hidden md:block absolute top-1/2 -translate-y-1/2 right-[8%]">
        <div className="relative w-56 h-72">
          {/* Arka kartlar */}
          <div className="absolute inset-0 rounded-2xl glass -rotate-6 translate-x-4 translate-y-3 opacity-50" />
          <div className="absolute inset-0 rounded-2xl glass rotate-3 -translate-x-3 opacity-70" />

          {/* Ön kart */}
          <div className="absolute inset-0 rounded-2xl glass-strong border border-signal/25 shadow-glow overflow-hidden">
            {/* Kart başlığı */}
            <div className="flex items-center gap-1.5 px-3 py-2 border-b border-signal/10">
              <span className="w-2 h-2 rounded-full bg-red-400/70" />
              <span className="w-2 h-2 rounded-full bg-amber-400/70" />
              <span className="w-2 h-2 rounded-full bg-emerald-400/70" />
              <span className="ml-1 font-data text-[9px] text-ink-500">FATURA</span>
            </div>

            {/* Satırlar */}
            <div className="px-4 pt-5 flex flex-col gap-3.5">
              {rows.map((r) => (
                <div key={r} className="flex items-center gap-2">
                  <span
                    className="h-2 rounded-full bg-signal animate-row-scan"
                    style={{ width: r === 0 ? '40%' : '68%', animationDelay: `${r * 0.34}s` }}
                  />
                  {r !== 0 && (
                    <span
                      className="h-2 w-2 rounded-full bg-emerald-400 animate-row-scan"
                      style={{ animationDelay: `${r * 0.34 + 0.1}s` }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Eşleşme rozeti */}
            <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-glow-pulse" />
              <span className="font-data text-[9px] font-bold text-emerald-300">%97</span>
            </div>

            {/* Tarama ışını */}
            <div className="pointer-events-none absolute left-0 right-0 h-8 animate-scan-sweep" style={{ top: '8%' }}>
              <div className="mx-auto h-[2px] w-[88%] bg-signal shadow-[0_0_12px_2px_rgba(56,225,255,0.7)]" />
              <div className="mx-auto -mt-4 h-8 w-[88%] bg-gradient-to-b from-signal/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
