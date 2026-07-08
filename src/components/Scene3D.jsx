import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Grid, Sparkles, Edges, Html, useTexture } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

const SIGNAL = '#38E1FF'
const PAPER = '#E7E1CF'

/* Hikaye kendi kendine döner — 14 saniyelik sonsuz döngü.
 * smooth.current her karede 0..1 arası döngü ilerlemesini taşır;
 * aşama değişince onStage ile Hero'daki etiket güncellenir. */
const CYCLE = 14
const stageOf = (p) => (p < 0.2 ? 0 : p < 0.55 ? 1 : p < 0.85 ? 2 : 3)

function StoryLoop({ smooth, onStage }) {
  const lastStage = useRef(-1)
  useFrame((state) => {
    const p = (state.clock.elapsedTime % CYCLE) / CYCLE
    smooth.current = p
    const s = stageOf(p)
    if (s !== lastStage.current) {
      lastStage.current = s
      onStage?.(s)
    }
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

const PAPER_ACCENT = '#2B4C74'   // başlık/toplam vurgusu (kurumsal lacivert)
const PAPER_ROW = '#6E6A57'      // kalem satırları
const PAPER_FAINT = '#B4AC92'    // ince ayraç/soluk çizgi

function PaperInvoice({ smooth }) {
  const group = useRef()
  const mat = useRef()
  const geo = usePaperGeometry()
  // Fatura kalemleri: [açıklama genişliği, fiyat genişliği]
  const items = [
    [0.40, 0.12], [0.46, 0.10], [0.34, 0.13], [0.42, 0.11],
  ]
  const itemY = (i) => 0.16 - i * 0.135

  useFrame((state) => {
    const p = smooth.current
    const t = state.clock.elapsedTime
    // Döngü başında yumuşak beliriş; 0.42–0.6'da parçacıklara "eriyerek" kaybolur
    const fadeIn = ease(seg(p, 0, 0.05))
    const dissolve = ease(seg(p, 0.42, 0.6))
    const visible = fadeIn * (1 - dissolve)
    if (group.current) {
      group.current.visible = visible > 0.01
      group.current.rotation.y = Math.sin(t * 0.4) * 0.18 * (1 - p)
      group.current.rotation.x = Math.sin(t * 0.3) * 0.06 * (1 - p)
      group.current.position.y = Math.sin(t * 0.6) * 0.05 * (1 - p)
      group.current.scale.setScalar(1 - dissolve * 0.25)
    }
    if (mat.current) mat.current.opacity = visible
  })

  const Z = 0.045
  return (
    <group ref={group}>
      {/* Kağıt gövdesi (hafif buruşuk) */}
      <mesh geometry={geo}>
        <meshStandardMaterial ref={mat} color={PAPER} roughness={0.92} metalness={0} side={THREE.DoubleSide} transparent />
      </mesh>

      {/* Üst başlık şeridi */}
      <mesh position={[0, 0.5, Z]}>
        <planeGeometry args={[0.82, 0.16]} />
        <meshBasicMaterial color={PAPER_ACCENT} transparent opacity={0.9} />
      </mesh>
      {/* Başlıktaki logo karesi */}
      <mesh position={[-0.28, 0.5, Z + 0.001]}>
        <planeGeometry args={[0.1, 0.1]} />
        <meshBasicMaterial color="#EAF2FF" transparent opacity={0.85} />
      </mesh>
      {/* Başlık yazı satırları (açık) */}
      <mesh position={[0.04, 0.53, Z + 0.001]}>
        <planeGeometry args={[0.4, 0.028]} />
        <meshBasicMaterial color="#DCE6F5" transparent opacity={0.85} />
      </mesh>
      <mesh position={[0.0, 0.47, Z + 0.001]}>
        <planeGeometry args={[0.32, 0.022]} />
        <meshBasicMaterial color="#B9C9E2" transparent opacity={0.7} />
      </mesh>

      {/* Fatura no / tarih bloğu (sağ üst, başlık altında) */}
      <mesh position={[0.2, 0.34, Z]}>
        <planeGeometry args={[0.24, 0.02]} />
        <meshBasicMaterial color={PAPER_ROW} transparent opacity={0.5} />
      </mesh>
      <mesh position={[0.24, 0.30, Z]}>
        <planeGeometry args={[0.16, 0.02]} />
        <meshBasicMaterial color={PAPER_ROW} transparent opacity={0.4} />
      </mesh>

      {/* Sütun başlığı ayraç çizgisi */}
      <mesh position={[0, 0.25, Z]}>
        <planeGeometry args={[0.82, 0.008]} />
        <meshBasicMaterial color={PAPER_ACCENT} transparent opacity={0.55} />
      </mesh>

      {/* Kalem satırları: solda açıklama, sağda fiyat */}
      {items.map(([desc, price], i) => (
        <group key={i} position={[0, itemY(i), Z]}>
          <mesh position={[-0.41 + desc / 2 + 0.02, 0, 0]}>
            <planeGeometry args={[desc, 0.035]} />
            <meshBasicMaterial color={PAPER_ROW} transparent opacity={0.6} />
          </mesh>
          <mesh position={[0.39 - price / 2, 0, 0]}>
            <planeGeometry args={[price, 0.035]} />
            <meshBasicMaterial color={PAPER_ROW} transparent opacity={0.45} />
          </mesh>
          {/* ince satır ayracı */}
          <mesh position={[0, -0.055, 0]}>
            <planeGeometry args={[0.82, 0.004]} />
            <meshBasicMaterial color={PAPER_FAINT} transparent opacity={0.5} />
          </mesh>
        </group>
      ))}

      {/* TOPLAM vurgu kutusu (sağ alt) */}
      <mesh position={[0.22, -0.4, Z]}>
        <planeGeometry args={[0.36, 0.11]} />
        <meshBasicMaterial color={PAPER_ACCENT} transparent opacity={0.85} />
      </mesh>
      <mesh position={[0.1, -0.4, Z + 0.001]}>
        <planeGeometry args={[0.1, 0.028]} />
        <meshBasicMaterial color="#DCE6F5" transparent opacity={0.85} />
      </mesh>
      <mesh position={[0.29, -0.4, Z + 0.001]}>
        <planeGeometry args={[0.14, 0.032]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.9} />
      </mesh>

      {/* Köşe kaşesi (sol alt) */}
      <mesh position={[-0.26, -0.42, Z]} rotation={[0, 0, -0.22]}>
        <ringGeometry args={[0.07, 0.092, 28]} />
        <meshBasicMaterial color="#A44A3F" transparent opacity={0.55} />
      </mesh>
      <mesh position={[-0.26, -0.42, Z]} rotation={[0, 0, -0.22]}>
        <planeGeometry args={[0.11, 0.022]} />
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

/* ---------- SAHNE 3: KAĞIT PARÇALANMASI → DİJİTAL ----------
 * Kağıt, ızgara hücrelerine bölünür; her hücre bir "shard" (kağıt parçası).
 * 0.42–0.62: parçalar kağıttan KOPAR, takla atarak savrulur (gerçek parçalanma).
 * 0.60–0.78: parçalar kartın yüzeyine toplanır ve rengi kağıttan CYAN'a döner
 * (kağıt → dijital bit). instanceColor ile parça parça renk geçişi. */
function TransformParticles({ smooth, count }) {
  const meshRef = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const cPaper = useMemo(() => new THREE.Color(PAPER), [])
  const cSignal = useMemo(() => new THREE.Color(SIGNAL), [])
  const cTmp = useMemo(() => new THREE.Color(), [])

  // Kağıdı düzgün ızgaraya böl → parçalar kağıdın tamamını kaplar (gerçek kırılma)
  const parts = useMemo(() => {
    const cols = Math.max(4, Math.round(Math.sqrt(count * 0.76)))
    const rows = Math.ceil(count / cols)
    const W = 0.95, H = 1.25
    const arr = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const idx = r * cols + c
        if (idx >= count) break
        const rnd = (s) => {
          const x = Math.sin(idx * 127.1 + s * 311.7) * 43758.5453
          return x - Math.floor(x)
        }
        // hücre merkezi = parçanın kağıttaki gerçek yeri
        const px = -W / 2 + (c + 0.5) * (W / cols)
        const py = -H / 2 + (r + 0.5) * (H / rows)
        arr.push({
          paper: new THREE.Vector3(px, py, 0.03),
          // patlama yönü merkezden dışa + rastgele derinlik
          swirl: new THREE.Vector3(px * 2.6 + (rnd(3) - 0.5) * 1.6, py * 2.2 + (rnd(4) - 0.5) * 1.4, (rnd(5) - 0.5) * 1.8),
          card: new THREE.Vector3((rnd(6) - 0.5) * 0.82, (rnd(7) - 0.5) * 1.08, 0.02),
          spin: new THREE.Vector3((rnd(8) - 0.5) * 14, (rnd(9) - 0.5) * 14, (rnd(1) - 0.5) * 14),
          delay: rnd(2) * 0.14,
          size: (0.9 + rnd(9) * 0.5) * (Math.min(W / cols, H / rows) * 0.92),
        })
      }
    }
    return arr
  }, [count])
  const tmp = useMemo(() => new THREE.Vector3(), [])

  useFrame((state) => {
    const p = smooth.current
    const t = state.clock.elapsedTime
    const out = ease(seg(p, 0.42, 0.62))     // kopma/savrulma
    const gather = ease(seg(p, 0.6, 0.78))   // karta toplanma
    const alive = out > 0.01 && gather < 0.995
    if (!alive) { meshRef.current.visible = false; return }
    meshRef.current.visible = true
    parts.forEach((pt, i) => {
      const o = ease(seg(out - pt.delay, 0, 1 - pt.delay))
      const g = ease(seg(gather - pt.delay, 0, 1 - pt.delay))
      tmp.lerpVectors(pt.paper, pt.swirl, o)
      dummy.position.lerpVectors(tmp, pt.card, g)
      // takla: kopunca hızlı döner, toplanınca hizalanır
      const tumble = (o - g) * 1
      dummy.rotation.set(pt.spin.x * tumble + t * 0.2, pt.spin.y * tumble, pt.spin.z * tumble)
      // toplanırken küçülüp bit'e dönüşür
      const scale = pt.size * (1 - g * 0.55) * (o < 1 ? 0.35 + 0.65 * o : 1)
      dummy.scale.setScalar(Math.max(scale, 0.0001))
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
      // renk: kağıt → cyan (toplanma ilerledikçe)
      cTmp.copy(cPaper).lerp(cSignal, ease(g))
      meshRef.current.setColorAt(i, cTmp)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]} visible={false}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial color={PAPER} toneMapped={false} transparent opacity={0.98} side={THREE.DoubleSide} />
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

/* Wolvox'u temsil eden ışık kapısı + "AKTARIM BAŞARILI" onayı */
const LOGO_BLUE = '#0b4d8e'          // logonun zemin mavisi (pikselden ölçüldü) — disk aynı renk
const LOGO_ASPECT = 1                 // logo artık kare/yuvarlak (transparan köşeler)

function Gate({ smooth }) {
  const group = useRef()
  const ringGroup = useRef()   // dönen halka grubu (Object3D)
  const ringMat = useRef()     // halka materyali (emissive)
  const flash = useRef()
  const label = useRef()
  const discMat = useRef()     // mavi rozet diski
  const glossMat = useRef()    // üst cam parlaması
  const logoMat = useRef()     // logo düzlemi materyali

  // Logo dokusu — keskin görünsün diye anisotropy + sRGB
  const tex = useTexture('/wolwoxlogo.png')
  useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = 16
    tex.minFilter = THREE.LinearMipmapLinearFilter
    tex.magFilter = THREE.LinearFilter
    tex.generateMipmaps = true
    tex.needsUpdate = true
  }, [tex])

  useFrame((state) => {
    const p = smooth.current
    const t = state.clock.elapsedTime
    const appear = ease(seg(p, 0.72, 0.85))
    const arrived = ease(seg(p, 0.93, 0.985))
    if (group.current) {
      group.current.visible = appear > 0.01
      group.current.scale.setScalar(appear * (1 + arrived * 0.15))
    }
    if (ringGroup.current) ringGroup.current.rotation.z = t * 0.4
    if (ringMat.current) ringMat.current.emissiveIntensity = 1.4 + Math.sin(t * 3) * 0.4 + arrived * 2.5
    if (discMat.current) discMat.current.opacity = appear
    if (glossMat.current) glossMat.current.opacity = appear * 0.4
    if (logoMat.current) logoMat.current.opacity = appear
    if (flash.current) flash.current.opacity = arrived * 0.6
    if (label.current) {
      label.current.style.opacity = arrived
      label.current.style.transform = `translateY(${(1 - arrived) * 10}px) scale(${0.85 + arrived * 0.15})`
    }
  })

  const logoW = 0.82
  return (
    <group ref={group} position={GATE_POS.toArray()} visible={false}>
      {/* Neon dış halka (döner) */}
      <group ref={ringGroup}>
        <mesh>
          <torusGeometry args={[0.44, 0.028, 20, 96]} />
          <meshStandardMaterial ref={ringMat} color={SIGNAL} emissive={SIGNAL} emissiveIntensity={1.4} toneMapped={false} />
        </mesh>
      </group>
      {/* Mavi rozet diski — halkayı doldurur (logo ile aynı renk/ışık → dikiş yok) */}
      <mesh position={[0, 0, -0.01]}>
        <circleGeometry args={[0.41, 64]} />
        <meshBasicMaterial ref={discMat} color={LOGO_BLUE} transparent opacity={0} toneMapped={false} />
      </mesh>
      {/* Üstten cam parlaması */}
      <mesh position={[0, 0.14, 0.005]}>
        <circleGeometry args={[0.34, 48, 0, Math.PI]} />
        <meshBasicMaterial ref={glossMat} color="#BFE6FF" transparent opacity={0} toneMapped={false} />
      </mesh>
      {/* Wolvox ERP logosu — native oranında, bozulmasız (contain) */}
      <mesh position={[0, 0, 0.012]}>
        <planeGeometry args={[logoW, logoW * LOGO_ASPECT]} />
        <meshBasicMaterial ref={logoMat} map={tex} transparent opacity={0} toneMapped={false} />
      </mesh>
      <mesh>
        <circleGeometry args={[0.4, 48]} />
        <meshBasicMaterial ref={flash} color="#BFF6FF" transparent opacity={0} toneMapped={false} />
      </mesh>
      {/* Onay yazısı — halkanın altında belirir */}
      <Html position={[0, -0.78, 0]} center distanceFactor={5.5} style={{ pointerEvents: 'none' }}>
        <div
          ref={label}
          style={{ opacity: 0 }}
          className="flex items-center gap-2 whitespace-nowrap rounded-full border border-emerald-400/50 bg-[#050B18]/90 px-4 py-1.5 shadow-[0_0_24px_rgba(16,185,129,0.35)]"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" stroke="#34D399" strokeWidth="2" />
            <path d="M7 12.5l3.2 3.2L17 9" stroke="#34D399" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-data text-[13px] font-bold uppercase tracking-[0.18em] text-emerald-300">
            Aktarım Başarılı
          </span>
        </div>
      </Html>
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

export default function Scene3D({ quality = 'medium', active = true, onStage }) {
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

      <StoryLoop smooth={smooth} onStage={onStage} />

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
