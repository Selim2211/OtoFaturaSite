/**
 * Telefon için "Kağıttan Dijitale" hikayesi — WebGL'siz, saf CSS keyframe döngüsü.
 * Masaüstündeki 3D sahnenin (Scene3D) 14 saniyelik senaryosunu birebir taklit eder:
 *   01 kağıt fatura → 02 tarama ışını → 03 parçacıklara dağılıp dijital karta toplanma
 *   → 04 Wolvox kapısına uçuş + "Aktarım Başarılı" onayı, altta aşama göstergesi.
 * Normal akış içinde durur (absolute değil) — hiçbir metinle çakışmaz, taşma yapmaz.
 * Yalnızca transform/opacity animasyonları: pil dostu, her telefonda akıcı.
 */

const ROWS = [0, 1, 2, 3]
const STAGES = ['01 — KAĞIT FATURA', '02 — TARANIYOR', '03 — DİJİTALLEŞİYOR', "04 — WOLVOX'A AKTARILDI"]

/* Kart 160×208 px; Wolvox kapısı kartın ~170 px sağında (aşağıdaki layout ile hizalı) */
const FLY_X = '170px'
const FLY_Y = '-2px'

/* Deterministik pseudo-random (Scene3D'deki TransformParticles ile aynı fikir) */
const rnd = (i, s) => {
  const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453
  return x - Math.floor(x)
}

const PARTICLES = new Array(18).fill(0).map((_, i) => ({
  left: `${8 + rnd(i, 1) * 80}%`,          // kağıt üzerindeki çıkış noktası
  top: `${8 + rnd(i, 2) * 80}%`,
  sx: `${(rnd(i, 3) - 0.5) * 190}px`,      // savrulma
  sy: `${(rnd(i, 4) - 0.5) * 150}px`,
  cx: `${(rnd(i, 5) - 0.5) * 90}px`,       // karta toplanma
  cy: `${(rnd(i, 6) - 0.5) * 120}px`,
  size: 3 + Math.round(rnd(i, 7) * 3),
  delay: `${rnd(i, 8) * 0.5}s`,
}))

export default function InvoiceStoryCard() {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Sahne: solda kart, sağda Wolvox rozeti */}
      <div className="relative w-[300px] h-[232px]">
        {/* Uçan katman (kart + kağıt + parçacıklar + ışın) */}
        <div
          className="story-flight absolute left-0 top-3 w-40 h-52 [perspective:900px]"
          style={{ '--fly-x': FLY_X, '--fly-y': FLY_Y }}
        >
          {/* Kağıt fatura */}
          <div
            className="story-paper absolute inset-0 rounded-lg border border-[#C9C2AB] shadow-lg overflow-hidden"
            style={{ background: 'linear-gradient(160deg, #EFEAD9 0%, #DDD5BE 100%)' }}
          >
            <div className="px-4 pt-5 flex flex-col gap-3">
              {ROWS.map((r) => (
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

          {/* Parçacıklar — kağıttan kopar, karta toplanır */}
          <div className="pointer-events-none absolute inset-0">
            {PARTICLES.map((p, i) => (
              <span
                key={i}
                className="story-particle absolute rounded-full bg-signal opacity-0 shadow-[0_0_6px_1px_rgba(56,225,255,0.55)]"
                style={{
                  left: p.left,
                  top: p.top,
                  width: p.size,
                  height: p.size,
                  '--sx': p.sx,
                  '--sy': p.sy,
                  '--cx': p.cx,
                  '--cy': p.cy,
                  animationDelay: p.delay,
                }}
              />
            ))}
          </div>

          {/* Dijital fatura kartı */}
          <div className="story-digital absolute inset-0 rounded-lg glass-strong border border-signal/30 shadow-glow overflow-hidden opacity-0">
            <div className="flex items-center gap-1 px-3 py-1.5 border-b border-signal/10">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400/70" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400/70" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70" />
              <span className="ml-1 font-data text-[8px] text-ink-500">FATURA</span>
            </div>
            <div className="px-4 pt-4 flex flex-col gap-3">
              {ROWS.map((r) => (
                <span
                  key={r}
                  className="story-row h-1.5 rounded-full bg-signal"
                  style={{ width: r === 0 ? '45%' : '70%', animationDelay: `${r * 0.18}s` }}
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

        {/* Wolvox rozeti — kart buraya uçar, daireye Wolvox ERP logosu oturur */}
        <div className="story-gate pointer-events-none absolute right-3 top-[78px] w-[76px] h-[76px] opacity-0">
          {/* Dönen ışıklı dış halka */}
          <div className="story-gate-ring absolute -inset-1 rounded-full border-2 border-dashed border-signal/70 shadow-[0_0_20px_3px_rgba(56,225,255,0.45)]" />
          {/* Logo dairesi — logonun kendi mavisiyle dolu, ışık halkasıyla çevrili */}
          <div className="absolute inset-0 rounded-full overflow-hidden border border-signal/60 bg-[#1c4e8f] shadow-[0_0_22px_2px_rgba(56,225,255,0.55),inset_0_2px_8px_rgba(255,255,255,0.18),inset_0_-6px_12px_rgba(0,0,0,0.35)]">
            <img
              src="/wolwoxlogo.png"
              alt="Wolvox ERP"
              className="absolute inset-0 h-full w-full object-contain p-1.5"
              draggable="false"
            />
            {/* Üstten cam parlaması */}
            <span className="absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/25 to-transparent" />
          </div>
          {/* Varış parlaması */}
          <div className="story-gate-flash absolute inset-1 rounded-full bg-[#BFF6FF] opacity-0 blur-[2px]" />
        </div>

        {/* Aktarım onayı — kapının altında belirir */}
        <span className="story-success pointer-events-none absolute right-0 bottom-1 flex items-center gap-1.5 whitespace-nowrap rounded-full border border-emerald-400/50 bg-[#050B18]/90 px-2.5 py-1 opacity-0 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" stroke="#34D399" strokeWidth="2" />
            <path d="M7 12.5l3.2 3.2L17 9" stroke="#34D399" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-data text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-300">
            Aktarım Başarılı
          </span>
        </span>
      </div>

      {/* Aşama göstergesi — masaüstündeki ile aynı metinler */}
      <div className="flex flex-col items-center gap-2.5">
        <div className="relative h-3 w-56">
          {STAGES.map((s, i) => (
            <span
              key={s}
              className={`story-stage-${i + 1} absolute inset-0 flex items-center justify-center whitespace-nowrap font-data text-[10px] uppercase tracking-[0.18em] text-signal/80 opacity-0`}
            >
              {s}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          {STAGES.map((_, i) => (
            <span key={i} className={`story-dot-${i + 1} h-1 rounded-full`} style={{ width: 6, background: 'rgba(255,255,255,0.15)' }} />
          ))}
        </div>
      </div>
    </div>
  )
}
