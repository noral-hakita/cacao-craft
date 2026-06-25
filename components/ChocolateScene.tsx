'use client'
import { useRef, useEffect, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, Float } from '@react-three/drei'
import * as THREE from 'three'

// ─── CHOCOLATE BAR ──────────────────────────────────────────────────
function ChocolateBar({ origin, percentage, color, position, rotation }: any) {
  const ref = useRef<THREE.Mesh>(null)

  return (
    <group position={position} rotation={rotation}>
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
        {/* Main bar */}
        <mesh ref={ref} position={[0, 0, 0]}>
          <boxGeometry args={[1.8, 0.4, 0.8]} />
          <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
        </mesh>
        {/* Gold top wrapper */}
        <mesh position={[0, 0.22, 0]}>
          <boxGeometry args={[1.85, 0.05, 0.85]} />
          <meshStandardMaterial color="#b8965a" roughness={0.3} metalness={0.6} />
        </mesh>
        {/* Gold bottom wrapper */}
        <mesh position={[0, -0.22, 0]}>
          <boxGeometry args={[1.85, 0.05, 0.85]} />
          <meshStandardMaterial color="#b8965a" roughness={0.3} metalness={0.6} />
        </mesh>
      </Float>
    </group>
  )
}

// ─── SCENE ──────────────────────────────────────────────────────────
function SceneContent({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const { clock } = useThree()

  const bars = useMemo(() => [
    { origin: 'Nicaragua', pct: 72, color: '#3d2b1f', pos: [-3.5, 0.5, 0], rot: [0, 0, 0] },
    { origin: 'Madagascar', pct: 45, color: '#5a3d2b', pos: [0, 1.2, 3.5], rot: [0.2, 0.5, 0.1] },
    { origin: 'Ecuador', pct: 33, color: '#4a3222', pos: [3.5, 0.8, -1.5], rot: [-0.1, -0.3, 0.2] },
    { origin: 'Peru', pct: 85, color: '#2a1a10', pos: [-2.5, -0.5, 3.5], rot: [0.3, 0.8, -0.1] },
    { origin: 'Guatemala', pct: 68, color: '#3d2818', pos: [3, -0.2, -3], rot: [-0.2, -0.6, 0.1] },
    { origin: 'Tanzania', pct: 50, color: '#4d3525', pos: [0, -0.8, -4], rot: [0.1, 0, -0.1] },
  ], [])

  useFrame(() => {
    if (groupRef.current) {
      const targetRotY = scrollProgress * Math.PI * 4
      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.06
      const floatOffset = Math.sin(clock.getElapsedTime() * 0.3) * 0.1
      groupRef.current.position.y = floatOffset
    }
  })

  return (
    <group ref={groupRef}>
      {bars.map((bar, i) => (
        <ChocolateBar
          key={i}
          origin={bar.origin}
          percentage={bar.pct}
          color={bar.color}
          position={bar.pos}
          rotation={bar.rot}
        />
      ))}
    </group>
  )
}

// ─── MAIN ───────────────────────────────────────────────────────────
export default function ChocolateScene({ scrollProgress }: { scrollProgress: number }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="w-full h-full bg-transparent" />
  }

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} color="#f0e8d8" />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#d4b07a" />
        <directionalLight position={[-5, -2, -5]} intensity={0.5} color="#b8965a" />
        <pointLight position={[0, 5, 0]} intensity={0.5} color="#b8965a" />
        <Environment preset="studio" />
        <SceneContent scrollProgress={scrollProgress} />
        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}