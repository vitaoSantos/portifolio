import { ContactShadows } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useInView } from 'motion/react'
import { useEffect, useMemo, useRef, type ReactNode } from 'react'
import * as THREE from 'three'
import { useFinePointer, useReducedMotion } from '../../hooks/useMediaQuery'

const CHIP_RADIUS = 0.5
const CHIP_HEIGHT = 0.11

type ChipStyle = { base: string; stripe: string; suit: string }

const CHIP_STYLES: ChipStyle[] = [
  { base: '#d61f3c', stripe: '#ffffff', suit: '♥' },
  { base: '#16161f', stripe: '#ffffff', suit: '♠' },
  { base: '#7c4dff', stripe: '#e9e3ff', suit: '♦' },
  { base: '#0fb5d4', stripe: '#ecfeff', suit: '♣' },
]

function canvasTexture(width: number, height: number, draw: (ctx: CanvasRenderingContext2D) => void) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  draw(canvas.getContext('2d')!)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  return texture
}

// Materiais da ficha: lateral listrada, topo com anel e naipe
function chipMaterials(style: ChipStyle) {
  const side = canvasTexture(512, 64, (ctx) => {
    ctx.fillStyle = style.base
    ctx.fillRect(0, 0, 512, 64)
    ctx.fillStyle = style.stripe
    for (let i = 0; i < 8; i++) ctx.fillRect(i * 64 + 20, 0, 24, 64)
  })
  const top = canvasTexture(256, 256, (ctx) => {
    ctx.fillStyle = style.base
    ctx.fillRect(0, 0, 256, 256)
    ctx.translate(128, 128)
    ctx.fillStyle = style.stripe
    for (let i = 0; i < 8; i++) {
      ctx.save()
      ctx.rotate((i / 8) * Math.PI * 2)
      ctx.fillRect(-14, -128, 28, 30)
      ctx.restore()
    }
    ctx.strokeStyle = style.stripe
    ctx.lineWidth = 4
    ctx.setLineDash([10, 8])
    ctx.beginPath()
    ctx.arc(0, 0, 78, 0, Math.PI * 2)
    ctx.stroke()
    ctx.setLineDash([])
    ctx.fillStyle = 'rgba(255,255,255,0.12)'
    ctx.beginPath()
    ctx.arc(0, 0, 66, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = style.stripe
    ctx.font = 'bold 72px serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(style.suit, 0, 6)
  })
  const sideMat = new THREE.MeshStandardMaterial({ map: side, roughness: 0.45, metalness: 0.05 })
  const topMat = new THREE.MeshStandardMaterial({ map: top, roughness: 0.4, metalness: 0.05 })
  return [sideMat, topMat, topMat]
}

function cardMaterials(rank: string, suit: string, red: boolean) {
  const color = red ? '#d61f3c' : '#12121a'
  const front = canvasTexture(320, 448, (ctx) => {
    ctx.fillStyle = '#fbfbfd'
    ctx.fillRect(0, 0, 320, 448)
    ctx.fillStyle = color
    ctx.font = 'bold 64px Georgia, serif'
    ctx.textAlign = 'left'
    ctx.fillText(rank, 22, 72)
    ctx.font = '52px serif'
    ctx.fillText(suit, 24, 130)
    ctx.save()
    ctx.translate(320, 448)
    ctx.rotate(Math.PI)
    ctx.font = 'bold 64px Georgia, serif'
    ctx.fillText(rank, 22, 72)
    ctx.font = '52px serif'
    ctx.fillText(suit, 24, 130)
    ctx.restore()
    ctx.font = '190px serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(suit, 160, 236)
  })
  const back = canvasTexture(320, 448, (ctx) => {
    const g = ctx.createLinearGradient(0, 0, 320, 448)
    g.addColorStop(0, '#6d3df5')
    g.addColorStop(1, '#0ea5c6')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 320, 448)
    ctx.strokeStyle = 'rgba(255,255,255,0.22)'
    ctx.lineWidth = 2
    for (let i = -448; i < 448; i += 24) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i + 448, 448)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(i + 448, 0)
      ctx.lineTo(i, 448)
      ctx.stroke()
    }
    ctx.strokeStyle = 'rgba(255,255,255,0.8)'
    ctx.lineWidth = 6
    ctx.strokeRect(18, 18, 284, 412)
  })
  const edge = new THREE.MeshStandardMaterial({ color: '#f1f1f5', roughness: 0.6 })
  return [
    edge,
    edge,
    edge,
    edge,
    new THREE.MeshStandardMaterial({ map: front, roughness: 0.35 }),
    new THREE.MeshStandardMaterial({ map: back, roughness: 0.35 }),
  ]
}

type Chip = { styleIndex: number; x: number; z: number; target: number; start: number; delay: number; rot: number }

function Chips({ active, reduced }: { active: boolean; reduced: boolean }) {
  const geometry = useMemo(() => new THREE.CylinderGeometry(CHIP_RADIUS, CHIP_RADIUS, CHIP_HEIGHT, 48), [])
  const materials = useMemo(() => CHIP_STYLES.map(chipMaterials), [])
  const refs = useRef<(THREE.Mesh | null)[]>([])
  const startedAt = useRef<number | null>(null)

  // Quatro pilhas de alturas diferentes, ligeiramente desalinhadas
  const chips = useMemo<Chip[]>(() => {
    const stacks = [
      { x: -1.35, z: 0.35, count: 7, style: 0 },
      { x: -0.25, z: -0.35, count: 11, style: 1 },
      { x: 0.85, z: 0.3, count: 9, style: 2 },
      { x: 1.85, z: -0.25, count: 5, style: 3 },
    ]
    const list: Chip[] = []
    stacks.forEach((s, si) => {
      for (let i = 0; i < s.count; i++) {
        const target = CHIP_HEIGHT / 2 + i * (CHIP_HEIGHT + 0.004)
        list.push({
          styleIndex: s.style,
          x: s.x + Math.sin(i * 2.1 + si) * 0.025,
          z: s.z + Math.cos(i * 1.7 + si) * 0.025,
          target,
          start: target + 3.5 + i * 0.12,
          delay: si * 0.22 + i * 0.07,
          rot: (i * 0.9 + si) % (Math.PI * 2),
        })
      }
    })
    return list
  }, [])

  useEffect(
    () => () => {
      geometry.dispose()
      materials.flat().forEach((m) => {
        m.map?.dispose()
        m.dispose()
      })
    },
    [geometry, materials],
  )

  useFrame((state, delta) => {
    if (active && startedAt.current === null) startedAt.current = state.clock.elapsedTime
    const elapsed = startedAt.current === null ? -1 : state.clock.elapsedTime - startedAt.current
    chips.forEach((chip, i) => {
      const mesh = refs.current[i]
      if (!mesh) return
      if (reduced) {
        mesh.position.y = chip.target
        return
      }
      const goal = elapsed >= chip.delay ? chip.target : chip.start
      mesh.position.y = THREE.MathUtils.damp(mesh.position.y, goal, 7, Math.min(delta, 0.05))
    })
  })

  return (
    <group>
      {chips.map((chip, i) => (
        <mesh
          key={i}
          ref={(el) => {
            refs.current[i] = el
          }}
          geometry={geometry}
          material={materials[chip.styleIndex]}
          position={[chip.x, reduced ? chip.target : chip.start, chip.z]}
          rotation={[0, chip.rot, 0]}
          castShadow
        />
      ))}
    </group>
  )
}

function Card({ rank, suit, red, position, phase, reduced }: { rank: string; suit: string; red: boolean; position: [number, number, number]; phase: number; reduced: boolean }) {
  const ref = useRef<THREE.Mesh>(null)
  const materials = useMemo(() => cardMaterials(rank, suit, red), [rank, suit, red])

  useEffect(
    () => () => {
      materials.forEach((m) => {
        m.map?.dispose()
        m.dispose()
      })
    },
    [materials],
  )

  useFrame((state) => {
    if (!ref.current || reduced) return
    const t = state.clock.elapsedTime + phase
    ref.current.rotation.y = t * 0.55
    ref.current.rotation.z = Math.sin(t * 0.7) * 0.12
    ref.current.position.y = position[1] + Math.sin(t * 1.1) * 0.12
  })

  return (
    <mesh ref={ref} position={position} rotation={[0.15, phase, 0.1]} material={materials}>
      <boxGeometry args={[0.82, 1.15, 0.012]} />
    </mesh>
  )
}

function Rig({ children, reduced }: { children: ReactNode; reduced: boolean }) {
  const group = useRef<THREE.Group>(null)
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useFrame((state, delta) => {
    if (!group.current) return
    const dt = Math.min(delta, 0.05)
    const idle = reduced ? 0 : Math.sin(state.clock.elapsedTime * 0.25) * 0.25
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, idle + mouse.current.x * 0.35, 3, dt)
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, mouse.current.y * 0.08, 3, dt)
  })

  return <group ref={group}>{children}</group>
}

export default function PokerScene() {
  const reduced = useReducedMotion()
  const fine = useFinePointer()
  const wrapper = useRef<HTMLDivElement>(null)
  const visible = useInView(wrapper)
  const seen = useInView(wrapper, { once: true, amount: 0.4 })

  return (
    <div ref={wrapper} className="absolute inset-0">
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        camera={{ position: [0, 2.6, 6.2], fov: 38 }}
        dpr={[1, fine ? 1.75 : 1.5]}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ camera }) => camera.lookAt(0, 0.55, 0)}
        aria-hidden
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 6, 4]} intensity={1.6} />
        <pointLight position={[-4, 2, 2]} intensity={18} color="#8b5cf6" />
        <pointLight position={[4, 1.5, -1]} intensity={14} color="#22d3ee" />
        <Rig reduced={reduced}>
          <Chips active={seen} reduced={reduced} />
          <Card rank="A" suit="♠" red={false} position={[-0.9, 1.7, -0.6]} phase={0} reduced={reduced} />
          <Card rank="K" suit="♥" red position={[0.65, 1.85, -0.75]} phase={1.6} reduced={reduced} />
        </Rig>
        <ContactShadows position={[0, 0, 0]} opacity={0.55} scale={9} blur={2.4} far={3} color="#000000" />
      </Canvas>
    </div>
  )
}
