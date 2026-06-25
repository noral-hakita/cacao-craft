'use client'
import { Float } from '@react-three/drei'

interface ChocolateBarProps {
  origin: string
  percentage: number
  color: string
  position: readonly [number, number, number]  // or [number, number, number]
  rotation: readonly [number, number, number]
}

export default function ChocolateBar({ origin, percentage, color, position, rotation }: ChocolateBarProps) {
  return (
    <group position={position as [number, number, number]} rotation={rotation as [number, number, number]}>
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.8, 0.4, 0.8]} />
          <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0.22, 0]}>
          <boxGeometry args={[1.85, 0.05, 0.85]} />
          <meshStandardMaterial color="#b8965a" roughness={0.3} metalness={0.6} />
        </mesh>
        <mesh position={[0, -0.22, 0]}>
          <boxGeometry args={[1.85, 0.05, 0.85]} />
          <meshStandardMaterial color="#b8965a" roughness={0.3} metalness={0.6} />
        </mesh>
      </Float>
    </group>
  )
}