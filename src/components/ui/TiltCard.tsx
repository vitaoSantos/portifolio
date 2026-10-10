import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react'
import type { PointerEvent, ReactNode } from 'react'
import { useFinePointer } from '../../hooks/useMediaQuery'

// Card que inclina em 3D seguindo o mouse, com um brilho que acompanha o cursor
export function TiltCard({ children, className = '', max = 8 }: { children: ReactNode; className?: string; max?: number }) {
  const fine = useFinePointer()
  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 })
  const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 })
  const gx = useMotionValue(50)
  const gy = useMotionValue(50)
  const glare = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, rgb(255 255 255 / 0.10), transparent 45%)`

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (!fine) return
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    ry.set((px - 0.5) * max * 2)
    rx.set(-(py - 0.5) * max * 2)
    gx.set(px * 100)
    gy.set(py * 100)
  }

  function onLeave() {
    rx.set(0)
    ry.set(0)
  }

  return (
    <div className="[perspective:1200px]">
      <motion.div
        className={`group relative [transform-style:preserve-3d] ${className}`}
        style={{ rotateX: rx, rotateY: ry }}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        {children}
        {fine && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: glare }}
          />
        )}
      </motion.div>
    </div>
  )
}
