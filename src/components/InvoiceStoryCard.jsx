/**
 * Telefon için "Kağıttan Dijitale" hikayesi — WebGL'siz, saf CSS keyframe döngüsü.
 * 9 saniyelik döngü: kağıt fatura → tarama ışını → dijital karta dönüş → %97 eşleşme.
 * Normal akış içinde durur (absolute değil) — hiçbir metinle çakışmaz, taşma yapmaz.
 * Yalnızca transform/opacity animasyonları: pil dostu, her telefonda akıcı.
 */
export default function InvoiceStoryCard() {
  const rows = [0, 1, 2, 3]
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-44 h-56 [perspective:900px]">
        {/* Kağıt fatura */}
        <div
          className="story-paper absolute inset-0 rounded-lg border border-[#C9C2AB] shadow-lg overflow-hidden"
          style={{ background: 'linear-gradient(160deg, #EFEAD9 0%, #DDD5BE 100%)' }}
        >
          <div className="px-4 pt-5 flex flex-col gap-3">
            {rows.map((r) => (
              <span
                key={r}
                className="h-1.5 rounded-full bg-[#8B8368]/60"
                style={{ width: r === 0 ? '45%' : '70%' }}
              />
            ))}
          </div>
          {/* Kaşe */}
          <span className="absolute bottom-3 right-3 w-8 h-8 rounded-full border-2 border-[#A44A3F]/50 rotate-[-12deg]" />
        </div>

        {/* Dijital fatura kartı */}
        <div className="story-digital absolute inset-0 rounded-lg glass-strong border border-signal/30 shadow-glow overflow-hidden opacity-0">
          <div className="flex items-center gap-1 px-3 py-1.5 border-b border-signal/10">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400/70" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400/70" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70" />
          </div>
          <div className="px-4 pt-4 flex flex-col gap-3">
            {rows.map((r) => (
              <span
                key={r}
                className="story-row h-1.5 rounded-full bg-signal"
                style={{ width: r === 0 ? '45%' : '70%', animationDelay: `${r * 0.12}s` }}
              />
            ))}
          </div>
          {/* Eşleşme rozeti */}
          <span className="story-badge absolute bottom-3 right-3 flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 opacity-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="font-data text-[9px] font-bold text-emerald-300">%97</span>
          </span>
        </div>

        {/* Tarama ışını — iki kartın üstünde gezer */}
        <div className="story-scan pointer-events-none absolute left-0 right-0 h-6 opacity-0" style={{ top: '6%' }}>
          <div className="mx-auto h-[2px] w-[86%] bg-signal shadow-[0_0_12px_2px_rgba(56,225,255,0.7)]" />
          <div className="mx-auto -mt-3 h-6 w-[86%] bg-gradient-to-b from-signal/20 to-transparent" />
        </div>
      </div>

      <span className="font-data text-[10px] uppercase tracking-[0.18em] text-ink-500">
        Kağıttan dijitale — otomatik
      </span>
    </div>
  )
}
