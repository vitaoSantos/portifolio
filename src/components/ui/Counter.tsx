import { animate, useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { easeOut } from './motion'

export function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 2.2,
      ease: easeOut,
      onUpdate: (v) => setCurrent(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value])

  return (
    <span ref={ref} aria-label={`${value.toLocaleString('pt-BR')}${suffix}`}>
      {current.toLocaleString('pt-BR')}
      {suffix}
    </span>
  )
}
