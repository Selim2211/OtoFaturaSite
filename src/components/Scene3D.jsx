import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Float, Grid, Sparkles, Edges,
  MeshTransmissionMaterial, MeshReflectorMaterial,
  ContactShadows, Environment, Lightformer,
} from '@react-three/drei'
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing'
import * as THREE from 'three'

const SIGNAL = '#38E1FF'
const BRAND = '#2563EB'

/* Kamera açılış hareketi — uzaktan yaklaşan sinematik dolly */
function IntroDolly() {
  const start = useRef(null)
  useFrame((state) => {
    if (start.current === null) start.current = state.clock.elapsedTime
    const t = Math.min((state.clock.elapsedTime - start.current) / 1.7, 1)
    const eased = 1 - Math.pow(1 - t, 3)
    state.camera.position.z = 15 - eased * 6
    state.camera.fov = 58 - eased * 13
    state.camera.updateProjectionMatrix()
  })
  return null
}

/* Prosedürel stüdyo ışığı — koyu tema için lacivert/camgöbeği rim-light */
function Studio() {
  return (
    <Environment resolution={256}>
      <Lightformer intensity={1.4} color="#12233F" position={[0, 6, -9]} rotation={[0, 0, 0]} scale={[12, 8, 1]} />
      <Lightformer intensity={2.4} color={SIGNAL} position={[-6, 1, 0]} rotation={[0, Math.PI / 2, 0]} scale={[10, 3, 1]} />
      <Lightformer intensity={2.4} color={BRAND} position={[6, 1, 0]} rotation={[0, -Math.PI / 2, 0]} scale={[10, 3, 1]} />
      <Lightformer intensity={1.1} color="#0A1526" position={[0, -6, 2]} rotation={[Math.PI / 2, 0, 0]} scale={[10, 10, 1]} />
    </Environment>
  )
}

/* Merkez — camsı kırılmalı kabuk + içinde parlayan çekirdek (imza rengi) */
function Core() {
  const shell = useRef()
  const inner = useRef()
  useFrame((_, dt) => {
    if (shell.current) shell.current.rotation.y += dt * 0.12
    if (inner.current) {
      inner.current.rotation.y -= dt * 0.3
      inner.current.rotation.x += dt * 0.08
    }
  })
  return (
    <group>
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.8, 2]} />
        <meshStandardMaterial color={SIGNAL} emissive={SIGNAL} emissiveIntensity={2.6} toneMapped={false} />
      </mesh>
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.5, 8]} />
        <MeshTransmissionMaterial
          thickness={0.55}
          roughness={0.06}
          transmission={1}
          ior={1.25}
          chromaticAberration={0.045}
          anisotropy={0.3}
          distortion={0.14}
          distortionScale={0.28}
          temporalDistortion={0.12}
          color="#0F2540"
          samples={6}
          resolution={256}
        />
      </mesh>
    </group>
  )
}

/* İnce yörünge halkaları */
function Ring({ radius = 3, tilt = 0, speed = 0.3, color = BRAND, opacity = 1 }) {
  const ref = useRef()
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.z += dt * speed })
  return (
    <group rotation={[tilt, tilt * 0.5, 0]}>
      <mesh ref={ref}>
        <torusGeometry args={[radius, 0.01, 16, 128]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} transparent opacity={opacity} toneMapped={false} />
      </mesh>
    </group>
  )
}

/* Dönen veri düğümleri halkası — nabız gibi parlayan noktalar */
function DataNodeRing({ radius = 4.6, count = 36, speed = 0.12, color = SIGNAL }) {
  const meshRef = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  useFrame((state) => {
    const t = state.clock.elapsedTime
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + t * speed
      const pulse = 0.55 + 0.45 * Math.sin(t * 2 + i * 0.4)
      dummy.position.set(Math.cos(angle) * radius, Math.sin(i * 12.9) * 0.35, Math.sin(angle) * radius)
      dummy.scale.setScalar(0.035 * pulse)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })
  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.9} toneMapped={false} />
    </instancedMesh>
  )
}

/* Faturaların çekirdeğe akışı — sürekli içe süzülen ışık parçacıkları */
function DataStream({ count = 26 }) {
  const meshRef = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const particles = useMemo(() => (
    new Array(count).fill(0).map(() => ({
      angle: Math.random() * Math.PI * 2,
      radiusStart: 4.6 + Math.random() * 1.6,
      speed: 0.35 + Math.random() * 0.45,
      offset: Math.random(),
      y: (Math.random() - 0.5) * 2.6,
    }))
  ), [count])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    particles.forEach((p, i) => {
      const progress = (t * p.speed * 0.16 + p.offset) % 1
      const radius = THREE.MathUtils.lerp(p.radiusStart, 0.25, progress)
      const x = Math.cos(p.angle) * radius
      const z = Math.sin(p.angle) * radius
      const y = THREE.MathUtils.lerp(p.y, 0, progress)
      dummy.position.set(x, y, z)
      dummy.scale.setScalar(0.045 * (1 - progress * 0.55))
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color={SIGNAL} toneMapped={false} />
    </instancedMesh>
  )
}

/**
 * "Kaostan Düzene" — her fatura kartı çekirdeğin etrafında yörüngede döner.
 * Dış yörüngede dağınık/eğik (kaos); içe doğru ilerledikçe kartlar hizalanır,
 * düzleşir ve küçülüp ışığa dönüşür (dissolve). Sonra dıştan yeniden başlar.
 */
function OrderingCard({ seed }) {
  const group = useRef()
  const mesh = useRef()
  const mat = useRef()
  const cfg = useMemo(() => ({
    angle: seed * 2.4,
    radiusMax: 4.6 + (seed % 3) * 0.4,
    speed: 0.06 + (seed % 5) * 0.01,
    chaosTiltX: (Math.sin(seed * 12.9) ) * 1.1,
    chaosTiltZ: (Math.cos(seed * 7.3) ) * 1.1,
    yWobble: Math.sin(seed * 5.1) * 1.4,
    matched: seed % 3 !== 0,
    cycle: 9 + (seed % 4),
  }), [seed])

  useFrame((state) => {
    const t = state.clock.elapsedTime + seed * 3.7
    const progress = (t % cfg.cycle) / cfg.cycle // 0 → 1: dıştan içe
    const angle = cfg.angle + t * cfg.speed
    const radius = THREE.MathUtils.lerp(cfg.radiusMax, 0.15, progress)
    const order = THREE.MathUtils.smoothstep(progress, 0.55, 0.95) // 0=kaos 1=tam hizalı/eriyor

    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    const y = THREE.MathUtils.lerp(cfg.yWobble * (1 - progress), 0, order)

    if (group.current) {
      group.current.position.set(x, y, z)
      // Kaos: rastgele eğik. Düzen: çekirdeğe bakan düz hiza.
      group.current.rotation.x = THREE.MathUtils.lerp(cfg.chaosTiltX, 0, order)
      group.current.rotation.z = THREE.MathUtils.lerp(cfg.chaosTiltZ, 0, order)
      group.current.rotation.y = -angle + Math.PI / 2
      const scale = THREE.MathUtils.lerp(1, 0.15, THREE.MathUtils.smoothstep(progress, 0.82, 1))
      group.current.scale.setScalar(scale)
    }
    if (mat.current) {
      mat.current.opacity = 1 - THREE.MathUtils.smoothstep(progress, 0.85, 1)
      mat.current.emissiveIntensity = 0.15 + order * 1.6
    }
  })

  return (
    <group ref={group}>
      <mesh ref={mesh}>
        <boxGeometry args={[0.78, 1.06, 0.03]} />
        <meshStandardMaterial
          ref={mat}
          color="#0C1830"
          emissive={SIGNAL}
          emissiveIntensity={0.15}
          metalness={0.3}
          roughness={0.25}
          transparent
        />
        <Edges threshold={15} color={SIGNAL} />
      </mesh>
      {[0.3, 0.15, 0, -0.15].map((yy, i) => (
        <mesh key={i} position={[-0.06, yy, 0.021]}>
          <planeGeometry args={[i === 0 ? 0.46 : 0.54, 0.04]} />
          <meshBasicMaterial color={i === 0 ? SIGNAL : '#3A5580'} transparent opacity={0.85} />
        </mesh>
      ))}
      {cfg.matched && (
        <mesh position={[0.28, 0.4, 0.022]}>
          <circleGeometry args={[0.085, 24]} />
          <meshStandardMaterial color="#10B981" emissive="#10B981" emissiveIntensity={1.3} toneMapped={false} />
        </mesh>
      )}
    </group>
  )
}

function Cards({ count = 11 }) {
  return new Array(count).fill(0).map((_, i) => <OrderingCard key={i} seed={i + 1} />)
}

/* Yansıtıcı zemin — koyu camgöbeği ayna yüzey */
function ReflectiveFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.6, 0]}>
      <planeGeometry args={[60, 60]} />
      <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={512}
        mixBlur={1}
        mixStrength={22}
        roughness={1}
        depthScale={1}
        minDepthThreshold={0.85}
        color="#081326"
        metalness={0.6}
        mirror={0.25}
      />
    </mesh>
  )
}

/* Yavaş dönüş + mouse parallax */
function Rig({ children }) {
  const group = useRef()
  useFrame((state, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.05
    const px = state.pointer.x * 1.1
    const py = state.pointer.y * 0.7
    state.camera.position.x += (px - state.camera.position.x) * 0.04
    state.camera.position.y += (py - state.camera.position.y) * 0.04
    state.camera.lookAt(0, 0, 0)
  })
  return <group ref={group}>{children}</group>
}

export default function Scene3D({ quality = 'medium' }) {
  const high = quality === 'high'

  return (
    <Canvas
      shadows={high}
      dpr={high ? [1, 1.8] : [1, 1.3]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 9], fov: 45 }}
    >
      <color attach="background" args={['#050B18']} />
      <fog attach="fog" args={['#050B18', 10, 22]} />

      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 8, 5]} intensity={0.7} color="#DCEBFF" castShadow={high} />
      <pointLight position={[-6, -1, -4]} intensity={1.1} color={SIGNAL} />
      <Studio />

      <IntroDolly />

      <Rig>
        <Core />
        <Ring radius={2.7} tilt={0.5} speed={0.35} color={SIGNAL} opacity={0.7} />
        <Ring radius={3.3} tilt={-0.8} speed={-0.25} color={BRAND} opacity={0.5} />
        {high && <Ring radius={4.0} tilt={1.2} speed={0.18} color="#6366F1" opacity={0.35} />}
        <DataNodeRing radius={4.6} count={high ? 36 : 22} speed={0.12} color={SIGNAL} />
        <DataStream count={high ? 26 : 16} />
        <Cards count={high ? 11 : 7} />
        <Sparkles count={high ? 50 : 26} scale={12} size={2} speed={0.3} color={SIGNAL} opacity={0.4} />
      </Rig>

      <ReflectiveFloor />
      <Grid
        position={[0, -2.59, 0]}
        args={[40, 40]}
        cellSize={0.7}
        cellThickness={0.5}
        cellColor="#122A4D"
        sectionSize={3.5}
        sectionThickness={1}
        sectionColor="#1B4A80"
        fadeDistance={22}
        fadeStrength={1.6}
      />
      {high && (
        <ContactShadows position={[0, -2.55, 0]} opacity={0.4} scale={14} blur={2.6} far={4} color="#000814" />
      )}

      <EffectComposer>
        {high && <DepthOfField focusDistance={0.015} focalLength={0.045} bokehScale={3} height={480} />}
        <Bloom mipmapBlur intensity={high ? 0.55 : 0.4} luminanceThreshold={0.65} luminanceSmoothing={0.25} />
      </EffectComposer>
    </Canvas>
  )
}
