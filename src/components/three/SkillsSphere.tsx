import fontUrl from '@fontsource/space-grotesk/files/space-grotesk-latin-500-normal.woff?url'
import { Billboard, OrbitControls, Text } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useInView } from 'motion/react'
import { Suspense, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { skillGroups } from '../../data/skills'
import { useFinePointer, useReducedMotion } from '../../hooks/useMediaQuery'

const RADIUS = 2.1

type TroikaText = THREE.Mesh & { fillOpacity: number; color: THREE.ColorRepresentation }

function Word({ position, label, color }: { position: THREE.Vector3; label: string; color: string }) {
  const text = useRef<TroikaText>(null)
  const holder = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const world = useMemo(() => new THREE.Vector3(), [])

  useFrame(({ camera }, delta) => {
    if (!text.current || !holder.current) return
    // Palavras ao fundo ficam mais apagadas, dando profundidade
    holder.current.getWorldPosition(world)
    const dist = world.distanceTo(camera.position)
    const near = camera.position.length() - RADIUS
    const depth = THREE.MathUtils.clamp(1 - (dist - near) / (RADIUS * 2), 0, 1)
    text.current.fillOpacity = hovered ? 1 : 0.16 + depth * 0.84
    text.current.color = hovered ? '#ffffff' : color
    const target = hovered ? 1.35 : 1
    holder.current.scale.setScalar(THREE.MathUtils.damp(holder.current.scale.x, target, 8, delta))
  })

  return (
    <group ref={holder} position={position}>
      <Billboard>
        <Text
          ref={text}
          font={fontUrl}
          fontSize={0.23}
          anchorX="center"
          anchorY="middle"
          color={color}
          onPointerOver={(e) => {
            e.stopPropagation()
            setHovered(true)
          }}
          onPointerOut={() => setHovered(false)}
        >
          {label}
        </Text>
      </Billboard>
    </group>
  )
}

function Cloud({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null)

  const words = useMemo(() => {
    const all = skillGroups.flatMap((g) => g.items.map((label) => ({ label, color: g.color })))
    const golden = Math.PI * (3 - Math.sqrt(5))
    return all.map((w, i) => {
      const y = 1 - (i / (all.length - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const theta = golden * i
      return { ...w, position: new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(RADIUS) }
    })
  }, [])

  useFrame((_, delta) => {
    if (!group.current || reduced) return
    group.current.rotation.y += delta * 0.12
    group.current.rotation.x = Math.sin(group.current.rotation.y * 0.5) * 0.12
  })

  return (
    <group ref={group}>
      {words.map((w) => (
        <Word key={w.label} {...w} />
      ))}
    </group>
  )
}

export default function SkillsSphere() {
  const reduced = useReducedMotion()
  const fine = useFinePointer()
  const wrapper = useRef<HTMLDivElement>(null)
  const visible = useInView(wrapper)

  return (
    <div ref={wrapper} className="absolute inset-0" style={{ touchAction: 'pan-y' }} data-cursor>
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        camera={{ position: [0, 0, 8.2], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        aria-hidden
      >
        <Suspense fallback={null}>
          <Cloud reduced={reduced} />
        </Suspense>
        {fine && <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.55} />}
      </Canvas>
    </div>
  )
}
