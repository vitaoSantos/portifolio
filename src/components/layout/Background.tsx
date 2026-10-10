// Brilhos de fundo e textura granulada fixos em toda a página.
// Os brilhos usam gradiente radial em vez de filter: blur, que pesa muito no celular.
export function Background() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(60vmax_60vmax_at_0%_0%,rgb(139_92_246/0.14),transparent_70%),radial-gradient(55vmax_55vmax_at_100%_65%,rgb(34_211_238/0.08),transparent_70%)]"
      />
      <div aria-hidden className="grain hidden md:block" />
    </>
  )
}
