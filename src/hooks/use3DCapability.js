import { useEffect, useState } from 'react'

/**
 * 3D render edilip edilmeyeceğine ve hangi kalite kademesinde
 * çalışılacağına karar verir. Mobil/düşük-güç/reduced-motion'da
 * her zaman şık bir CSS fallback'e düşülür — asla boş/iskelet ekran değil.
 */
export function use3DCapability() {
  const [state, setState] = useState({ can3D: false, quality: 'medium' })

  useEffect(() => {
    const wide = window.matchMedia('(min-width: 768px)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cores = navigator.hardwareConcurrency || 4
    const mem = navigator.deviceMemory || 8 // Firefox/Chrome dışı tarayıcılarda undefined → iyimser varsay

    const can3D = wide && !reduced && cores >= 4
    const quality = cores >= 8 && mem >= 6 ? 'high' : 'medium'

    setState({ can3D, quality })
  }, [])

  return state
}
