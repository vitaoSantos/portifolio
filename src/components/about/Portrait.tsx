import photo from '../../assets/victor.jpg'
import { profile } from '../../data/profile'
import { TiltCard } from '../ui/TiltCard'

// Foto em duotone violeta/ciano que revela as cores reais no hover
export function Portrait() {
  return (
    <TiltCard className="border-gradient overflow-hidden rounded-[28px]" max={6}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[28px]">
        <div className="absolute inset-0 bg-gradient-to-br from-violet via-[#5b4bd6] to-cyan" />
        <img
          src={photo}
          alt=""
          aria-hidden
          className="absolute inset-0 size-full object-cover object-[50%_22%] mix-blend-luminosity contrast-125 grayscale"
        />
        <img
          src={photo}
          alt={`Foto de ${profile.name}`}
          className="absolute inset-0 size-full object-cover object-[50%_22%] opacity-0 transition-[opacity,transform] duration-700 ease-out group-hover:scale-[1.03] group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
          <div>
            <p className="font-display text-xl font-semibold">{profile.shortName}</p>
            <p className="text-sm text-muted">
              {profile.location} · {profile.country}
            </p>
          </div>
          <span className="rounded-full border border-line bg-ink/60 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted backdrop-blur">
            Passe o mouse
          </span>
        </div>
      </div>
    </TiltCard>
  )
}
