import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Grid, Sparkles, Edges, Html } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

const SIGNAL = '#38E1FF'

/* Tarama çizgisinin dikey konumu — tek, deterministik zaman fonksiyonu.
 * Hem ışın hem her kart bunu bağımsız hesaplar; ref paylaşımına gerek yok. */
function scanY(t, speed = 0.55, amp = 0.5) {
  return Math.sin(t * speed) * amp
}

/* Kamera açılış hareketi — uzaktan yaklaşan sinematik dolly */
function IntroDolly() {
  const start = useRef(null)
  useFrame((state) => {
    if (start.current === null) start.current = state.clock.elapsedTime
    const t = Math.min((state.clock.elapsedTime - start.current) / 1.7, 1)
    const eased = 1 - Math.pow(1 - t, 3)
    state.camera.position.z = 13 - eased * 5.5
    state.camera.fov = 54 - eased * 12
    state.camera.updateProjectionMatrix()
  })
  return null
}

/* OCR tarama ışını — kartların önünden aşağı/yukarı geçen ince ışık çizgisi */
function ScanBeam({ width }) {
  const beam = useRef()
  const glow = useRef()
  useFrame((state) => {
    const y = scanY(state.clock.elapsedTime)
    if (beam.current) beam.current.position.y = y
    if (glow.current) glow.current.position.y = y
  })
  return (
    <group>
      <mesh ref={glow} position={[0, 0, 0.08]}>
        <planeGeometry args={[width, 0.5]} />
        <meshBasicMaterial color={SIGNAL} transparent opacity={0.07} />
      </mesh>
      <mesh ref={beam} position={[0, 0, 0.1]}>
        <planeGeometry args={[width, 0.03]} />
        <meshStandardMaterial color={SIGNAL} emissive={SIGNAL} emissiveIntensity={2.4} toneMapped={false} />
      </mesh>
    </group>
  )
}

/* Işının kart üstünden ekranın köşesine (temsili "Wolvox'a gönderim")
 * süzülen tek seferlik ışık parçacığı — her tarama döngüsünde bir kez tetiklenir. */
const TRANSFER_TARGET = new THREE.Vector3(3.6, 1.8, 1.3)
const FLIGHT_DURATION = 0.9

/* Tek fatura kartı — tarama ışını satırların üzerinden geçerken o satır
 * anlık parlıyor (OCR'ın satırı "okuduğu" an). Eşleşen kartlarda tarama
 * alt satırı geçince: yeşil onay rozeti + kısa süreli "%eşleşme" etiketi
 * belirginleşiyor, ardından kart üstünden bir ışık parçacığı hedefe uçuyor. */
function ScanCard({ index, total }) {
  const group = useRef()
  const lineMats = useRef([])
  const checkMesh = useRef()
  const badgeDiv = useRef()
  const sparkMesh = useRef()
  const flightStart = useRef(null)
  const startPos = useMemo(() => new THREE.Vector3(), [])

  const cfg = useMemo(() => {
    const mid = (total - 1) / 2
    const offset = index - mid
    return {
      x: offset * 1.35,
      z: -Math.abs(offset) * 0.45,
      rotY: -offset * 0.1,
      phase: index * 1.7,
      matched: index % 3 !== 0,
      pct: 93 + ((index * 37) % 6), // sabit, kart başına deterministik %93-98
    }
  }, [index, total])

  const lineYs = [0.3, 0.14, -0.02, -0.18]

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const bob = Math.sin(t * 0.5 + cfg.phase) * 0.06
    if (group.current) group.current.position.set(cfg.x, bob, cfg.z)

    const sY = scanY(t)
    lineYs.forEach((ly, i) => {
      const worldLy = bob + ly
      const dist = Math.abs(sY - worldLy)
      const heat = Math.max(0, 1 - dist / 0.32)
      const mat = lineMats.current[i]
      if (mat) mat.emissiveIntensity = 0.15 + heat * 2.2
    })

    if (!cfg.matched) return

    const passedNow = sY < lineYs[lineYs.length - 1] - 0.08
    const targetOpacity = passedNow ? 0.95 : 0.12

    if (checkMesh.current) {
      checkMesh.current.material.opacity = THREE.MathUtils.lerp(checkMesh.current.material.opacity, targetOpacity, 0.05)
    }
    if (badgeDiv.current) {
      const cur = parseFloat(badgeDiv.current.style.opacity || '0')
      const next = THREE.MathUtils.lerp(cur, passedNow ? 1 : 0, 0.06)
      badgeDiv.current.style.opacity = next
      badgeDiv.current.style.transform = `translateY(${(1 - next) * 6}px)`
    }

    // Uçuş tetikleyici — döngü başına bir kez, geçiş anında
    if (passedNow && flightStart.current === null) {
      flightStart.current = t
      startPos.set(cfg.x, bob + 0.15, cfg.z + 0.05)
    }
    if (!passedNow) flightStart.current = null

    if (sparkMesh.current) {
      if (flightStart.current !== null) {
        const ft = t - flightStart.current
        const p = Math.min(ft / FLIGHT_DURATION, 1)
        const eased = 1 - Math.pow(1 - p, 2)
        sparkMesh.current.position.lerpVectors(startPos, TRANSFER_TARGET, eased)
        sparkMesh.current.visible = true
        sparkMesh.current.material.opacity = p < 0.8 ? 0.9 : THREE.MathUtils.lerp(0.9, 0, (p - 0.8) / 0.2)
        sparkMesh.current.scale.setScalar(THREE.MathUtils.lerp(1, 0.25, p))
      } else {
        sparkMesh.current.visible = false
      }
    }
  })

  return (
    <>
      <group ref={group} rotation={[0, cfg.rotY, 0]}>
        <mesh>
          <boxGeometry args={[0.86, 1.14, 0.03]} />
          <meshStandardMaterial color="#0C1830" metalness={0.25} roughness={0.3} />
          <Edges threshold={15} color={SIGNAL} />
        </mesh>
        {lineYs.map((ly, i) => (
          <mesh key={i} position={[-0.05, ly, 0.021]}>
            <planeGeometry args={[i === 0 ? 0.5 : 0.58, 0.045]} />
            <meshStandardMaterial
              ref={(m) => { lineMats.current[i] = m }}
              color={i === 0 ? SIGNAL : '#3A5580'}
              emissive={SIGNAL}
              emissiveIntensity={0.15}
              toneMapped={false}
            />
          </mesh>
        ))}
        {cfg.matched && (
          <>
            <mesh ref={checkMesh} position={[0.33, 0.42, 0.022]}>
              <circleGeometry args={[0.075, 20]} />
              <meshStandardMaterial color="#10B981" emissive="#10B981" emissiveIntensity={1.2} transparent opacity={0.12} toneMapped={false} />
            </mesh>
            <Html position={[0.02, 0.56, 0.05]} center distanceFactor={6} style={{ pointerEvents: 'none' }}>
              <div
                ref={badgeDiv}
                className="font-data whitespace-nowrap rounded border border-emerald-500/40 bg-void/85 px-1.5 py-0.5 text-[10px] font-bold text-emerald-300"
                style={{ opacity: 0 }}
              >
                %{cfg.pct} eşleşti
              </div>
            </Html>
          </>
        )}
      </group>
      {cfg.matched && (
        <mesh ref={sparkMesh} visible={false}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color={SIGNAL} transparent opacity={0} toneMapped={false} />
        </mesh>
      )}
    </>
  )
}

function CardsArc({ count }) {
  return new Array(count).fill(0).map((_, i) => <ScanCard key={i} index={i} total={count} />)
}

/* Mouse parallax + çok hafif sallanma (tam dönüş yok — sabit duran bir belge kümesi) */
function Rig({ children }) {
  const group = useRef()
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.12
    }
    const px = state.pointer.x * 1.0
    const py = state.pointer.y * 0.5
    state.camera.position.x += (px - state.camera.position.x) * 0.04
    state.camera.position.y += (py - state.camera.position.y) * 0.04
    state.camera.lookAt(0, 0, 0)
  })
  return <group ref={group}>{children}</group>
}

export default function Scene3D({ quality = 'medium', active = true }) {
  const high = quality === 'high'
  const count = high ? 7 : 5
  const beamWidth = (count - 1) * 1.35 + 1.3

  return (
    <Canvas
      dpr={high ? [1, 1.6] : [1, 1.15]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 7.5], fov: 42 }}
      frameloop={active ? 'always' : 'never'}
    >
      <color attach="background" args={['#050B18']} />
      <fog attach="fog" args={['#050B18', 8, 18]} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 6]} intensity={0.6} color="#DCEBFF" />
      <pointLight position={[0, 2, 4]} intensity={0.8} color={SIGNAL} />

      <IntroDolly />

      <Rig>
        <CardsArc count={count} />
        <ScanBeam width={beamWidth} />
        <Sparkles count={high ? 40 : 22} scale={9} size={1.8} speed={0.25} color={SIGNAL} opacity={0.35} />
      </Rig>

      <Grid
        position={[0, -2.2, 0]}
        args={[30, 30]}
        cellSize={0.6}
        cellThickness={0.5}
        cellColor="#122A4D"
        sectionSize={3}
        sectionThickness={1}
        sectionColor="#1B4A80"
        fadeDistance={16}
        fadeStrength={1.6}
      />

      <EffectComposer>
        <Bloom mipmapBlur={high} intensity={high ? 0.6 : 0.45} luminanceThreshold={0.55} luminanceSmoothing={0.25} />
      </EffectComposer>
    </Canvas>
  )
}
