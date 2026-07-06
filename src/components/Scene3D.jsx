import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Grid, Sparkles, Edges } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

const SIGNAL = '#38E1FF'
const PAPER = '#E7E1CF'
const PAPER_INK = '#8B8368'

/* Scroll ilerlemesini (0..1) yumuşatıp tüm sahneye dağıtan yardımcı.
 * progressRef: Hero'nun scroll dinleyicisinin yazdığı ham değer.
 * smooth:      her karede ona doğru yumuşakça yaklaşan değer. */
function ProgressSmoother({ progressRef, smooth }) {
  useFrame(() => {
    const target = progressRef?.current ?? 0
    smooth.current += (target - smooth.current) * 0.09
  })
  return null
}

/* p'yi [a,b] aralığında 0..1'e sıkıştırır */
const seg = (p, a, b) => THREE.MathUtils.clamp((p - a) / (b - a), 0, 1)
const ease = (t) => t * t * (3 - 2 * t) // smoothstep

/* ---------- SAHNE 1: Buruşuk kağıt fatura ---------- */
function usePaperGeometry() {
  return useMemo(() => {
    const g = new THREE.PlaneGeometry(0.95, 1.25, 10, 14)
    const pos = g.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i)
      // deterministik "buruşukluk" — hafif dalgalı kağıt yüzeyi
      const z = Math.sin(x * 9.1 + 1.3) * 0.028 + Math.cos(y * 7.7 + 0.6) * 0.032
        + Math.sin((x + y) * 12.4) * 0.014
      pos.setZ(i, z)
    }
    g.computeVertexNormals()
    return g
  }, [])
}

function PaperInvoice({ smooth }) {
  const group = useRef()
  const mat = useRef()
  const geo = usePaperGeometry()
  const rowYs = [0.42, 0.24, 0.06, -0.12, -0.30]

  useFrame((state) => {
    const p = smooth.current
    const t = state.clock.elapsedTime
    // Kağıt 0–0.45 arasında görünür; 0.45–0.62'de parçacıklara "eriyerek" kaybolur
    const dissolve = ease(seg(p, 0.42, 0.6))
    const visible = 1 - dissolve
    if (group.current) {
      group.current.visible = visible > 0.01
      group.current.rotation.y = Math.sin(t * 0.4) * 0.18 * (1 - p)
      group.current.rotation.x = Math.sin(t * 0.3) * 0.06 * (1 - p)
      group.current.position.y = Math.sin(t * 0.6) * 0.05 * (1 - p)
      group.current.scale.setScalar(1 - dissolve * 0.25)
    }
    if (mat.current) mat.current.opacity = visible
  })

  return (
    <group ref={group}>
      <mesh geometry={geo}>
        <meshStandardMaterial ref={mat} color={PAPER} roughness={0.92} metalness={0} side={THREE.DoubleSide} transparent />
      </mesh>
      {/* Kağıt üstündeki soluk satırlar */}
      {rowYs.map((y, i) => (
        <mesh key={i} position={[-0.04, y, 0.045]}>
          <planeGeometry args={[i === 0 ? 0.52 : 0.66, 0.05]} />
          <meshBasicMaterial color={PAPER_INK} transparent opacity={0.55} />
        </mesh>
      ))}
      {/* Köşe kaşesi hissi */}
      <mesh position={[0.28, -0.48, 0.045]} rotation={[0, 0, -0.2]}>
        <ringGeometry args={[0.07, 0.09, 24]} />
        <meshBasicMaterial color="#A44A3F" transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

/* ---------- SAHNE 2: Tarama ışını ---------- */
function ScanBeam({ smooth }) {
  const beam = useRef()
  const glow = useRef()
  useFrame(() => {
    const p = smooth.current
    const s = seg(p, 0.2, 0.45)          // ışının aktif olduğu aralık
    const alive = s > 0 && s < 1
    const y = THREE.MathUtils.lerp(0.68, -0.68, ease(s))
    if (beam.current) {
      beam.current.visible = alive
      beam.current.position.y = y
    }
    if (glow.current) {
      glow.current.visible = alive
      glow.current.position.y = y
    }
  })
  return (
    <group>
      <mesh ref={glow} position={[0, 0, 0.09]} visible={false}>
        <planeGeometry args={[1.5, 0.4]} />
        <meshBasicMaterial color={SIGNAL} transparent opacity={0.08} />
      </mesh>
      <mesh ref={beam} position={[0, 0, 0.1]} visible={false}>
        <planeGeometry args={[1.5, 0.028]} />
        <meshStandardMaterial color={SIGNAL} emissive={SIGNAL} emissiveIntensity={2.6} toneMapped={false} />
      </mesh>
    </group>
  )
}

/* ---------- SAHNE 3: Parçacık dönüşümü (kağıt → dijital) ---------- */
function TransformParticles({ smooth, count }) {
  const meshRef = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const parts = useMemo(() => (
    new Array(count).fill(0).map((_, i) => {
      const rnd = (s) => { // deterministik pseudo-random
        const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453
        return x - Math.floor(x)
      }
      const px = (rnd(1) - 0.5) * 0.95
      const py = (rnd(2) - 0.5) * 1.25
      return {
        paper: new THREE.Vector3(px, py, 0.03),
        swirl: new THREE.Vector3((rnd(3) - 0.5) * 3.4, (rnd(4) - 0.5) * 2.2, (rnd(5) - 0.5) * 1.6),
        card: new THREE.Vector3((rnd(6) - 0.5) * 0.86, (rnd(7) - 0.5) * 1.14, 0.03),
        delay: rnd(8) * 0.12,
        size: 0.016 + rnd(9) * 0.02,
      }
    })
  ), [count])
  const tmp = useMemo(() => new THREE.Vector3(), [])

  useFrame(() => {
    const p = smooth.current
    // 0.42–0.62: kağıttan kopup savrulma · 0.62–0.78: karta toplanma
    const out = ease(seg(p, 0.42, 0.62))
    const gather = ease(seg(p, 0.6, 0.78))
    const alive = out > 0.01 && gather < 0.995
    parts.forEach((pt, i) => {
      const o = ease(seg(out - pt.delay, 0, 1 - pt.delay))
      const g = ease(seg(gather - pt.delay, 0, 1 - pt.delay))
      tmp.lerpVectors(pt.paper, pt.swirl, o)
      dummy.position.lerpVectors(tmp, pt.card, g)
      const scale = alive ? pt.size * (0.6 + 0.8 * Math.sin(Math.PI * Math.max(o, g))) : 0
      dummy.scale.setScalar(Math.max(scale, 0.0001))
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
    meshRef.current.visible = alive
  })

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]} visible={false}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color={SIGNAL} toneMapped={false} transparent opacity={0.95} />
    </instancedMesh>
  )
}

/* ---------- SAHNE 4: Dijital fatura kartı + Wolvox kapısına uçuş ---------- */
const GATE_POS = new THREE.Vector3(2.7, 0.5, -1.4)

function DigitalCard({ smooth }) {
  const group = useRef()
  const mats = useRef([])
  const rowMats = useRef([])
  const badgeMat = useRef()
  const rowYs = [0.34, 0.16, -0.02, -0.2]
  const home = useMemo(() => new THREE.Vector3(0, 0, 0), [])

  useFrame((state) => {
    const p = smooth.current
    const t = state.clock.elapsedTime
    const build = ease(seg(p, 0.66, 0.8))     // kart belirme
    const fly = ease(seg(p, 0.87, 0.99))      // kapıya uçuş
    const visible = build > 0.01 && fly < 0.995

    if (group.current) {
      group.current.visible = visible
      group.current.position.lerpVectors(home, GATE_POS, fly)
      group.current.position.y += Math.sin(t * 0.8) * 0.04 * (1 - fly)
      group.current.rotation.y = (1 - build) * 0.6 + fly * 0.9
      group.current.scale.setScalar(build * (1 - fly * 0.75))
    }
    mats.current.forEach((m) => { if (m) m.opacity = build * (1 - fly) })
    rowMats.current.forEach((m, i) => {
      if (!m) return
      const rowIn = ease(seg(p, 0.7 + i * 0.025, 0.78 + i * 0.025))
      m.opacity = rowIn * (1 - fly)
      m.emissiveIntensity = 0.3 + rowIn * 1.6
    })
    if (badgeMat.current) {
      const b = ease(seg(p, 0.8, 0.86))
      badgeMat.current.opacity = b * (1 - fly)
    }
  })

  return (
    <group ref={group} visible={false}>
      <mesh>
        <boxGeometry args={[0.88, 1.16, 0.03]} />
        <meshStandardMaterial
          ref={(m) => { mats.current[0] = m }}
          color="#0C1830" metalness={0.3} roughness={0.25} transparent
        />
        <Edges threshold={15} color={SIGNAL} />
      </mesh>
      {rowYs.map((y, i) => (
        <mesh key={i} position={[-0.05, y, 0.021]}>
          <planeGeometry args={[i === 0 ? 0.5 : 0.6, 0.048]} />
          <meshStandardMaterial
            ref={(m) => { rowMats.current[i] = m }}
            color={i === 0 ? SIGNAL : '#3A5580'}
            emissive={SIGNAL} emissiveIntensity={0.3}
            transparent opacity={0} toneMapped={false}
          />
        </mesh>
      ))}
      <mesh position={[0.32, 0.44, 0.022]}>
        <circleGeometry args={[0.08, 20]} />
        <meshStandardMaterial
          ref={badgeMat}
          color="#10B981" emissive="#10B981" emissiveIntensity={1.4}
          transparent opacity={0} toneMapped={false}
        />
      </mesh>
    </group>
  )
}

/* Wolvox'u temsil eden ışık kapısı */
function Gate({ smooth }) {
  const group = useRef()
  const ring = useRef()
  const flash = useRef()
  useFrame((state) => {
    const p = smooth.current
    const t = state.clock.elapsedTime
    const appear = ease(seg(p, 0.72, 0.85))
    const arrived = ease(seg(p, 0.95, 1))
    if (group.current) {
      group.current.visible = appear > 0.01
      group.current.scale.setScalar(appear * (1 + arrived * 0.15))
      group.current.rotation.z = t * 0.4
    }
    if (ring.current) ring.current.emissiveIntensity = 1.4 + Math.sin(t * 3) * 0.4 + arrived * 2.5
    if (flash.current) flash.current.opacity = arrived * 0.6
  })
  return (
    <group ref={group} position={GATE_POS.toArray()} visible={false}>
      <mesh>
        <torusGeometry args={[0.42, 0.03, 16, 64]} />
        <meshStandardMaterial ref={ring} color={SIGNAL} emissive={SIGNAL} emissiveIntensity={1.4} toneMapped={false} />
      </mesh>
      <mesh>
        <circleGeometry args={[0.38, 32]} />
        <meshBasicMaterial ref={flash} color="#BFF6FF" transparent opacity={0} toneMapped={false} />
      </mesh>
    </group>
  )
}

/* Mouse parallax */
function Rig({ children }) {
  const group = useRef()
  useFrame((state) => {
    const px = state.pointer.x * 0.9
    const py = state.pointer.y * 0.45
    state.camera.position.x += (px - state.camera.position.x) * 0.04
    state.camera.position.y += (py - state.camera.position.y) * 0.04
    state.camera.lookAt(0, 0, 0)
  })
  return <group ref={group}>{children}</group>
}

export default function Scene3D({ quality = 'medium', active = true, progressRef }) {
  const high = quality === 'high'
  const smooth = useRef(0)

  return (
    <Canvas
      dpr={high ? [1, 1.6] : [1, 1.15]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0.6, 0.1, 4.6], fov: 42 }}
      frameloop={active ? 'always' : 'never'}
    >
      <color attach="background" args={['#050B18']} />
      <fog attach="fog" args={['#050B18', 7, 16]} />

      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 5, 5]} intensity={0.9} color="#EAF2FF" />
      <pointLight position={[-4, 1, 3]} intensity={0.7} color={SIGNAL} />

      <ProgressSmoother progressRef={progressRef} smooth={smooth} />

      <Rig>
        <group position={[0.9, 0.1, 0]}>
          <PaperInvoice smooth={smooth} />
          <ScanBeam smooth={smooth} />
          <TransformParticles smooth={smooth} count={high ? 320 : 180} />
          <DigitalCard smooth={smooth} />
        </group>
        <Gate smooth={smooth} />
        <Sparkles count={high ? 40 : 22} scale={8} size={1.8} speed={0.25} color={SIGNAL} opacity={0.32} />
      </Rig>

      <Grid
        position={[0, -1.9, 0]}
        args={[26, 26]}
        cellSize={0.55}
        cellThickness={0.5}
        cellColor="#122A4D"
        sectionSize={2.75}
        sectionThickness={1}
        sectionColor="#1B4A80"
        fadeDistance={13}
        fadeStrength={1.6}
      />

      <EffectComposer>
        <Bloom mipmapBlur={high} intensity={high ? 0.6 : 0.45} luminanceThreshold={0.55} luminanceSmoothing={0.25} />
      </EffectComposer>
    </Canvas>
  )
}
