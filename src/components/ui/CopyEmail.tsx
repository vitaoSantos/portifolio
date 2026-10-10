import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { TbCheck, TbCopy } from 'react-icons/tb'
import { profile } from '../../data/profile'

export function CopyEmail({ className = '' }: { className?: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 2200)
    return () => clearTimeout(t)
  }, [copied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`group inline-flex items-center gap-3 rounded-full border border-line-strong bg-white/[0.03] px-6 py-3.5 font-mono text-sm text-fg transition-colors hover:border-violet/60 hover:bg-violet/10 sm:text-base ${className}`}
      aria-label={`Copiar e-mail ${profile.email}`}
    >
      <span>{profile.email}</span>
      <span className="relative grid size-5 place-items-center text-cyan">
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span key="ok" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="text-ok">
              <TbCheck aria-hidden />
            </motion.span>
          ) : (
            <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <TbCopy aria-hidden />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      <span role="status" className="sr-only">
        {copied ? 'E-mail copiado' : ''}
      </span>
    </button>
  )
}
