// Brilhos de fundo e textura granulada fixos em toda a página
export function Background() {
  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-[25%] -top-[30%] size-[75vmax] rounded-full bg-violet/[0.13] blur-[130px]" />
        <div className="absolute -right-[30%] top-[35%] size-[65vmax] rounded-full bg-cyan/[0.08] blur-[150px]" />
      </div>
      <div aria-hidden className="grain" />
    </>
  )
}
