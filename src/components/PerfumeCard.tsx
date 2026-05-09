import { Link } from "@tanstack/react-router";
import type { Perfume } from "@/data/perfumes";
import { Aura } from "@/components/Aura";
import { GiftToggle } from "@/components/GiftToggle";

export function PerfumeCard({ perfume }: { perfume: Perfume }) {
  return (
    <Link
      to="/product/$id"
      params={{ id: perfume.id }}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Aura variant={perfume.aura} />
        <div className="smoke-rise absolute inset-0" />
        <GiftToggle id={perfume.id} />
        <img
          src={perfume.image}
          alt={perfume.name}
          loading="lazy"
          className="relative z-10 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
        <div className="absolute top-4 left-4 z-20 text-[10px] uppercase tracking-luxe text-muted-foreground">
          {perfume.family}
        </div>
      </div>
      <div className="mt-5 flex justify-between items-baseline">
        <div>
          <h3 className="font-display text-2xl">{perfume.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{perfume.tagline}</p>
        </div>
        <p className="text-sm tabular-nums">${perfume.price}</p>
      </div>
    </Link>
  );
}
