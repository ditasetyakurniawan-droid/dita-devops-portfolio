import Image from "next/image";

type ProfilePortraitProps = Readonly<{
  name: string;
  src?: string;
}>;

export function ProfilePortrait({ name, src }: ProfilePortraitProps) {
  return (
    <div className="relative aspect-[7/9] w-full max-w-[290px] overflow-hidden rounded-2xl border border-border-highlight bg-obsidian-raised shadow-panel" aria-label={src ? `Foto profil ${name}` : `Monogram ${name}`}>
      {src ? (
        <Image
          src={src}
          alt={`Foto profil ${name}`}
          fill
          sizes="(max-width: 1024px) 290px, 290px"
          className="object-cover object-center"
          priority
        />
      ) : (
        <div className="relative grid h-full place-items-center overflow-hidden bg-ambient-blue">
          <div aria-hidden="true" className="absolute -left-16 -top-12 size-56 rounded-full border border-accent-blue/20" />
          <div aria-hidden="true" className="absolute -bottom-20 -right-16 size-56 rounded-full border border-accent-cyan/20" />
          <span className="font-mono text-6xl font-medium tracking-[-.12em] text-slate-50 sm:text-7xl" aria-hidden="true">DK</span>
          <span className="sr-only">Personal monogram; a portrait has not been provided.</span>
        </div>
      )}
      <span className="absolute bottom-3 left-3 rounded-md border border-border-highlight bg-obsidian/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[.13em] text-slate-50 backdrop-blur-sm">Dita / DevOps</span>
    </div>
  );
}
