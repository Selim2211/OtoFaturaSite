/**
 * 3D sahne Suspense'te beklerken gösterilen temalı yükleme durumu.
 * Boş ekran yerine "veri toplanıyor" hissi veren tarama animasyonu.
 */
export default function SceneLoader() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-void">
      <div className="absolute inset-0 grid-bg grid-bg-fade opacity-40" />
      <div className="aurora aurora-anim top-1/3 left-1/3 w-[26rem] h-[26rem] bg-signal/10 animate-glow-pulse" />
      <div className="scan-veil animate-scanline" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <div className="w-2.5 h-2.5 rounded-full bg-signal shadow-glow-sm animate-glow-pulse" />
        <span className="font-data text-[11px] tracking-[0.2em] text-signal/70 uppercase">
          Sahne oluşturuluyor
        </span>
      </div>
    </div>
  )
}
