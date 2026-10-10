import { motion } from 'motion/react'
import { easeOut } from './motion'

type Props = {
  text: string
  className?: string
  delay?: number
  stagger?: number
  play?: boolean
}

// Revela o texto letra por letra, de baixo para cima
export function SplitText({ text, className, delay = 0, stagger = 0.028, play = true }: Props) {
  const words = text.split(' ')
  let index = 0

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      {words.map((word, wi) => (
        <span key={wi} aria-hidden className="inline-block whitespace-nowrap">
          {[...word].map((char) => {
            const i = index++
            return (
              <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: '115%' }}
                  animate={{ y: play ? '0%' : '115%' }}
                  transition={{ duration: 0.9, ease: easeOut, delay: delay + i * stagger }}
                >
                  {char}
                </motion.span>
              </span>
            )
          })}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  )
}
