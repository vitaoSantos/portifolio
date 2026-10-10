import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { TbPlayerPlayFilled, TbRefresh, TbTerminal2 } from 'react-icons/tb'
import { easeOut } from '../ui/motion'

// Terminal que "executa" o exemplo e mostra a saída linha a linha
export function RunOutput({ lines }: { lines: string[] }) {
  const [ran, setRan] = useState(false)

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-[#08080e]">
      <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3">
        <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-faint">
          <TbTerminal2 aria-hidden className="text-base text-cyan" /> Saída · igual em Java e PHP
        </span>
        <button
          type="button"
          onClick={() => setRan((v) => !v)}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-4 py-1.5 text-xs font-semibold text-ink transition-[filter] hover:brightness-110"
        >
          {ran ? (
            <>
              <TbRefresh aria-hidden /> Limpar
            </>
          ) : (
            <>
              <TbPlayerPlayFilled aria-hidden /> Executar
            </>
          )}
        </button>
      </div>
      <div className="min-h-[92px] p-4 font-mono text-[13px] leading-relaxed" aria-live="polite">
        <AnimatePresence mode="wait">
          {ran ? (
            <motion.div key="out" exit={{ opacity: 0 }}>
              {lines.map((line, i) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: easeOut, delay: 0.15 + i * 0.25 }}
                  className="text-fg"
                >
                  <span className="mr-2 text-ok" aria-hidden>
                    ›
                  </span>
                  {line}
                </motion.p>
              ))}
            </motion.div>
          ) : (
            <motion.p key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-faint">
              Clique em Executar para ver o resultado
              <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-cyan/70" aria-hidden />
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
