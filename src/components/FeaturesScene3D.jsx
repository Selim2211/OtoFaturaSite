import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'

/**
 * Features bölümü arka planı — çok hafif ikinci canvas.
 * Post-processing YOK, tek wireframe ikosahedron + birkaç parçacık.
 * Amaç: sayfada tek bir "gösteriş" anı yerine, sakin bir arka plan dokunuşu.
 */
function SlowWireframe() {
  const ref = useRef()
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.08
      ref.current.rotation.x += dt * 0.03
    }
  })
  return (
    <mesh ref={ref} position={[2.2, 0, -2]}>
      <icosahedronGeometry args={[2.1, 1]} />
      <meshBasicMaterial wireframe color="#1B4A80" transparent opacity={0.35} />
    </mesh>
  )
}

export default function FeaturesScene3D() {
  return (
    <Canvas
      dpr={[1, 1.2]}
      gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      camera={{ position: [0, 0, 7], fov: 40 }}
    >
      <ambientLight intensity={0.6} />
      <SlowWireframe />
      <Sparkles count={20} scale={8} size={1.6} speed={0.15} color="#38E1FF" opacity={0.25} />
    </Canvas>
  )
}
