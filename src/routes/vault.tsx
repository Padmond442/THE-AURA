import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useVault } from "@/store";
import { perfumes } from "@/data/perfumes";
import { Aura } from "@/components/Aura";

const COLLECTIONS = ["All", "Date Night", "Daily", "Power", "Vacation"] as const;

const getContrastColor = (hex: string) => {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  return yiq >= 128 ? "light" : "dark";
};
export const Route = createFileRoute("/vault")({
  component: Vault,
  head: () => ({
    meta: [
      { title: "Scent Vault · THE AURA" },
      { name: "description", content: "Your private collection of saved fragrances." },
    ],
  }),
});

function Vault() {
  const { saved, toggle } = useVault();
  const navigate = useNavigate();
  const ids = Object.keys(saved);
  const [filter, setFilter] = useState<(typeof COLLECTIONS)[number]>("All");

  const counts = {
    All: ids.length,
    "Date Night": ids.filter((id) => saved[id] === "Date Night").length,
    Daily: ids.filter((id) => saved[id] === "Daily").length,
    Power: ids.filter((id) => saved[id] === "Power").length,
    Vacation: ids.filter((id) => saved[id] === "Vacation").length,
  };

  if (ids.length === 0) {
    return (
      <section className="theme-noir bg-background text-foreground min-h-[88vh] flex items-center relative overflow-hidden">
        <Aura variant="silver" intense className="!opacity-40" />
        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <p className="text-xs uppercase tracking-luxe text-muted-foreground">The Vault</p>
          <h1 className="font-display text-6xl md:text-8xl mt-4">Empty,<br />for now.</h1>
          <p className="text-muted-foreground mt-8 max-w-md mx-auto">
            Save scents into private collections — Date Night, Daily, Power, Vacation. The Vault remembers.
          </p>
          <Link to="/shop" className="mt-12 inline-block bg-foreground text-background px-10 py-4 text-xs uppercase tracking-luxe">
            Browse the Maison →
          </Link>
        </div>
      </section>
    );
  }

  const visible = filter === "All" ? ids : ids.filter((id) => saved[id] === filter);

  return (
    <section className="bg-background min-h-[88vh]">
      {/* Header */}
      <header className="theme-noir bg-background text-foreground py-20 md:py-28 relative overflow-hidden border-b border-border">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-luxe text-muted-foreground">Your Vault</p>
            <h1 className="font-display text-6xl md:text-8xl mt-4 leading-none">Saved Scents.</h1>
          </div>
          <div className="flex gap-8 text-xs uppercase tracking-luxe">
            <div>
              <p className="text-muted-foreground">Total</p>
              <p className="font-display text-4xl mt-1 text-foreground">{ids.length}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Collections</p>
              <p className="font-display text-4xl mt-1 text-foreground">
                {Object.values(counts).filter((c, i) => i > 0 && c > 0).length}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Filter rail */}
      <div className="sticky top-14 md:top-16 z-30 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 flex gap-1 overflow-x-auto py-3">
          {COLLECTIONS.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`whitespace-nowrap px-4 py-2 text-[10px] uppercase tracking-luxe border transition-colors ${filter === c ? "bg-foreground text-background border-foreground" : "border-border hover:bg-secondary"
                }`}
            >
              {c} <span className="opacity-60 ml-1">({counts[c]})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        {visible.length === 0 ? (
          <p className="text-muted-foreground text-center py-32">Nothing in <em>{filter}</em> yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {visible.map((id) => {
              const p = perfumes.find((x) => x.id === id);
              if (!p) return null;
              const c = saved[id];
              const isDominantLight = getContrastColor(p.palette.dominant) === "light";
              const hoverText = isDominantLight ? "group-hover:text-zinc-950" : "group-hover:text-white";
              const hoverMuted = isDominantLight ? "group-hover:text-black/60" : "group-hover:text-white/65";
              const hoverImageBg = isDominantLight ? "group-hover:bg-white/25" : "group-hover:bg-black/20";

              return (
                <article
                  key={p.id}
                  className="group bg-background relative overflow-hidden transition-colors duration-700"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ backgroundColor: p.palette.dominant }}
                  />

                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 70% 20%, ${p.palette.glow}, transparent 45%)`,
                    }}
                  />

                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => navigate({ to: "/product/$id", params: { id: p.id } })}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") navigate({ to: "/product/$id", params: { id: p.id } });
                    }}
                    className="relative z-10 cursor-pointer"
                  >
                    <div
                      className={`aspect-[5/4] bg-muted overflow-hidden transition-colors duration-700 ${hoverImageBg}`}
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-6">
                      <p
                        className={`text-[10px] uppercase tracking-luxe text-muted-foreground transition-colors duration-700 ${hoverMuted}`}
                      >
                        {c}
                      </p>

                      <div className="flex justify-between items-baseline mt-2">
                        <h3
                          className={`font-display text-3xl transition-colors duration-700 ${hoverText}`}
                        >
                          {p.name}
                        </h3>

                        <p
                          className={`text-sm tabular-nums transition-colors duration-700 ${hoverText}`}
                        >
                          ${p.price}
                        </p>
                      </div>

                      <p
                        className={`text-sm text-muted-foreground italic mt-1 transition-colors duration-700 ${hoverMuted}`}
                      >
                        {p.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 px-6 pb-6 flex justify-between items-center">
                    <Link
                      to="/product/$id"
                      params={{ id: p.id }}
                      className={`text-[10px] uppercase tracking-luxe link-underline transition-colors duration-700 ${hoverText}`}
                    >
                      View →
                    </Link>

                    <button
                      onClick={() => toggle(p.id, c)}
                      className={`text-[10px] uppercase tracking-luxe text-muted-foreground link-underline transition-colors duration-700 ${hoverMuted}`}
                    >
                      Remove ✕
                    </button>
                  </div>
                </article>
              );
            })}

            {Array.from({ length: (3 - (visible.length % 3)) % 3 }).map((_, i) => {
              const promos = [
                { eyebrow: "Discover", title: "Take the Scent Journey.", body: "A four-step ritual that translates mood into a fragrance.", to: "/journey" as const, cta: "Begin →", aura: "ember" as const },
                { eyebrow: "A gift, considered", title: "Build a Parcel.", body: "Pair these scents with a hand-pressed card and send them away.", to: "/parcel" as const, cta: "Open Parcel →", aura: "silver" as const },
                { eyebrow: "Continue", title: "More from the Maison.", body: "Three families, one philosophy. Walk the rest of the collection.", to: "/shop" as const, cta: "View Shop →", aura: "frost" as const },
              ];
              const promo = promos[i % promos.length];
              return (
                <Link
                  key={`promo-${i}`}
                  to={promo.to}
                  className="group bg-background relative overflow-hidden p-8 flex flex-col justify-between min-h-[420px]"
                >
                  <Aura variant={promo.aura} className="!opacity-30 group-hover:!opacity-60 transition-opacity" />
                  <p className="relative z-10 text-[10px] uppercase tracking-luxe text-muted-foreground">{promo.eyebrow}</p>
                  <div className="relative z-10">
                    <h3 className="font-display text-4xl leading-[1.1]">{promo.title}</h3>
                    <p className="text-sm text-muted-foreground mt-3 max-w-xs">{promo.body}</p>
                    <p className="mt-6 text-[10px] uppercase tracking-luxe link-underline">{promo.cta}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
