import type { Project } from '../../data/projects'

export function ProjectCover({ project, className = '' }: { project: Project; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={project.cover}
        alt={`Ilustração do projeto ${project.title}`}
        loading="lazy"
        className="size-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
      />
      {project.illustrativeCover && (
        <span className="absolute right-3 top-3 rounded-full border border-line bg-ink/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted backdrop-blur">
          Imagem ilustrativa
        </span>
      )}
    </div>
  )
}
