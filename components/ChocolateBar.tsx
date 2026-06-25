'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Text, Float } from '@react-three/drei'

interface ChocolateBarProps {
  origin: string
  percentage: number
  color: string
  position: [number, number, number]
  rotation: [number, number, number]
}

export default function ChocolateBar({ origin, percentage, color, position, rotation }: ChocolateBarProps) {
  const meshRef = useRef<any>()

  return (
    <group position={position} rotation={rotation}>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
        <Box ref={meshRef} args={[1.8, 0.4, 0.8]} position={[0, 0, 0]}>
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
        </Box>
        {/* Gold foil wrapper */}
        <Box args={[1.85, 0.05, 0.85]} position={[0, 0.22, 0]}>
          <meshStandardMaterial color="#b8965a" roughness={0.4} metalness={0.6} />
        </Box>
        {/* Label */}
        <Text position={[0, 0.3, 0.5]} fontSize={0.15} color="#f0e8d8" anchorX="center" anchorY="middle">
          {origin}
        </Text>
        <Text position={[0, 0.1, 0.5]} fontSize={0.12} color="#b8965a" anchorX="center" anchorY="middle">
          {percentage}%
        </Text>
      </Float>
    </group>
  )
}