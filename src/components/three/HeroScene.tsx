import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { useInView } from 'motion/react'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useReducedMotion } from '../../hooks/useMediaQuery'

const VIOLET = new THREE.Color('#8b5cf6')
const CYAN = new THREE.Color('#22d3ee')
const PULSE_COLOR = new THREE.Color('#e0f7ff')

type Graph = {
  nodes: THREE.Vector3[]
  positions: Float32Array
  colors: Float32Array
  sizes: Float32Array
  seeds: Float32Array
  linePositions: Float32Array
  lineColors: Float32Array
  adjacency: number[][]
}

// Gera uma "rede neural": pontos numa esfera achatada ligados aos vizinhos mais próximos
function buildGraph(count: number, radius: number): Graph {
  let seed = 11
  const rand = () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  const nodes: THREE.Vector3[] = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    const shell = radius * (0.68 + rand() * 0.42)
    nodes.push(new THREE.Vector3(Math.cos(theta) * r * shell * 1.22, y * shell * 0.92, Math.sin(theta) * r * shell))
  }

  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  const seeds = new Float32Array(count)
  const tmp = new THREE.Color()

  nodes.forEach((p, i) => {
    positions.set([p.x, p.y, p.z], i * 3)
    const t = THREE.MathUtils.clamp((p.x / (radius * 1.22) + p.y / radius) * 0.35 + 0.5, 0, 1)
    tmp.copy(VIOLET).lerp(CYAN, t)
    colors.set([tmp.r, tmp.g, tmp.b], i * 3)
    sizes[i] = rand() < 0.07 ? 2.6 + rand() * 1.2 : 0.7 + rand() * 0.9
    seeds[i] = rand()
  })

  const maxDist = radius * 0.5
  const adjacency: number[][] = nodes.map(() => [])
  const edges: [number, number][] = []
  for (let i = 0; i < count; i++) {
    const near: { j: number; d: number }[] = []
    for (let j = 0; j < count; j++) {
      if (i === j) continue
      const d = nodes[i].distanceTo(nodes[j])
      if (d < maxDist) near.push({ j, d })
    }
    near.sort((a, b) => a.d - b.d)
    for (const { j } of near.slice(0, 3)) {
      if (adjacency[i].includes(j)) continue
      adjacency[i].push(j)
      adjacency[j].push(i)
      edges.push([i, j])
    }
  }

  const linePositions = new Float32Array(edges.length * 6)
  const lineColors = new Float32Array(edges.length * 6)
  edges.forEach(([a, b], k) => {
    linePositions.set([nodes[a].x, nodes[a].y, nodes[a].z, nodes[b].x, nodes[b].y, nodes[b].z], k * 6)
    lineColors.set([colors[a * 3], colors[a * 3 + 1], colors[a * 3 + 2], colors[b * 3], colors[b * 3 + 1], colors[b * 3 + 2]], k * 6)
  })

  return { nodes, positions, colors, sizes, seeds, linePositions, lineColors, adjacency }
}

const pointVertex = /* glsl */ `
  uniform float uTime;
  uniform float uScale;
  attribute float aSize;
  attribute float aSeed;
  varying vec3 vColor;
  varying float vFade;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    float twinkle = 0.75 + 0.25 * sin(uTime * 1.7 + aSeed * 6.2831);
    gl_PointSize = aSize * uScale * twinkle * (10.0 / -mv.z);
    vColor = color;
    vFade = smoothstep(15.0, 7.0, -mv.z);
  }
`

const pointFragment = /* glsl */ `
  varying vec3 vColor;
  varying float vFade;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    a *= a;
    gl_FragColor = vec4(vColor, a * (0.3 + 0.7 * vFade));
  }
`

function makePointMaterial(scale: number) {
  return new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uScale: { value: scale } },
    vertexShader: pointVertex,
    fragmentShader: pointFragment,
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
}

const PULSES = 42

function Network({ offsetX, mobile, reduced }: { offsetX: number; mobile: boolean; reduced: boolean }) {
  const group = useRef<THREE.Group>(null)
  const pulseGeo = useRef<THREE.BufferGeometry>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const spin = useRef(0)
  const dpr = useThree((s) => s.viewport.dpr)

  const graph = useMemo(() => buildGraph(mobile ? 230 : 380, 3.3), [mobile])
  const nodeMaterial = useMemo(() => makePointMaterial(9 * dpr), [dpr])
  const pulseMaterial = useMemo(() => makePointMaterial(13 * dpr), [dpr])

  // Pulsos de "sinal" percorrendo as conexões
  const pulses = useMemo(() => {
    const list = Array.from({ length: PULSES }, (_, i) => {
      const from = (i * 37) % graph.nodes.length
      const neighbors = graph.adjacency[from]
      const to = neighbors.length ? neighbors[i % neighbors.length] : from
      return { from, to, t: (i * 0.137) % 1, speed: 0.35 + ((i * 53) % 10) / 14 }
    })
    const positions = new Float32Array(PULSES * 3)
    const colors = new Float32Array(PULSES * 3)
    const sizes = new Float32Array(PULSES).fill(2.4)
    const seeds = new Float32Array(PULSES).map((_, i) => i / PULSES)
    for (let i = 0; i < PULSES; i++) colors.set([PULSE_COLOR.r, PULSE_COLOR.g, PULSE_COLOR.b], i * 3)
    return { list, positions, colors, sizes, seeds }
  }, [graph])

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useEffect(() => () => {
    nodeMaterial.dispose()
    pulseMaterial.dispose()
  }, [nodeMaterial, pulseMaterial])

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    const g = group.current
    if (!g) return

    if (!reduced) spin.current += dt * 0.06
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, spin.current + mouse.current.x * 0.45, 2.5, dt)
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, mouse.current.y * 0.28, 2.5, dt)

    // Afasta a rede conforme a página rola
    const scroll = Math.min(window.scrollY / window.innerHeight, 1.2)
    g.position.z = THREE.MathUtils.damp(g.position.z, -scroll * 3, 4, dt)

    const time = state.clock.elapsedTime
    nodeMaterial.uniforms.uTime.value = time
    pulseMaterial.uniforms.uTime.value = time

    if (reduced || !pulseGeo.current) return
    const { list, positions } = pulses
    for (let i = 0; i < list.length; i++) {
      const p = list[i]
      p.t += dt * p.speed
      if (p.t >= 1) {
        const neighbors = graph.adjacency[p.to]
        const options = neighbors.filter((n) => n !== p.from)
        const pool = options.length ? options : neighbors
        p.from = p.to
        p.to = pool[Math.floor(Math.random() * pool.length)] ?? p.to
        p.t = 0
      }
      const a = graph.nodes[p.from]
      const b = graph.nodes[p.to]
      positions[i * 3] = a.x + (b.x - a.x) * p.t
      positions[i * 3 + 1] = a.y + (b.y - a.y) * p.t
      positions[i * 3 + 2] = a.z + (b.z - a.z) * p.t
    }
    pulseGeo.current.attributes.position.needsUpdate = true
  })

  return (
    <group position={[offsetX, mobile ? 0.6 : 0, 0]} scale={mobile ? 0.82 : 1}>
      <group ref={group}>
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[graph.linePositions, 3]} />
            <bufferAttribute attach="attributes-color" args={[graph.lineColors, 3]} />
          </bufferGeometry>
          <lineBasicMaterial vertexColors transparent opacity={0.2} depthWrite={false} blending={THREE.AdditiveBlending} />
        </lineSegments>

        <points material={nodeMaterial}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[graph.positions, 3]} />
            <bufferAttribute attach="attributes-color" args={[graph.colors, 3]} />
            <bufferAttribute attach="attributes-aSize" args={[graph.sizes, 1]} />
            <bufferAttribute attach="attributes-aSeed" args={[graph.seeds, 1]} />
          </bufferGeometry>
        </points>

        {!reduced && (
          <points material={pulseMaterial}>
            <bufferGeometry ref={pulseGeo}>
              <bufferAttribute attach="attributes-position" args={[pulses.positions, 3]} />
              <bufferAttribute attach="attributes-color" args={[pulses.colors, 3]} />
              <bufferAttribute attach="attributes-aSize" args={[pulses.sizes, 1]} />
              <bufferAttribute attach="attributes-aSeed" args={[pulses.seeds, 1]} />
            </bufferGeometry>
          </points>
        )}
      </group>
    </group>
  )
}

export default function HeroScene({ offsetX = 0, mobile = false }: { offsetX?: number; mobile?: boolean }) {
  const reduced = useReducedMotion()
  const wrapper = useRef<HTMLDivElement>(null)
  const visible = useInView(wrapper)

  return (
    <div ref={wrapper} className="absolute inset-0">
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, mobile ? 1.25 : 1.75]}
        gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
        aria-hidden
      >
        <color attach="background" args={['#07070c']} />
        <Network offsetX={offsetX} mobile={mobile} reduced={reduced} />
        {!mobile && (
          <EffectComposer multisampling={0}>
            <Bloom mipmapBlur intensity={0.85} luminanceThreshold={0.12} luminanceSmoothing={0.35} radius={0.75} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  )
}
