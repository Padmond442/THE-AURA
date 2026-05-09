import { createFileRoute, Link } from "@tanstack/react-router";
import { perfumes } from "@/data/perfumes";
import { Aura } from "@/components/Aura";

export const Route = createFileRoute("/categories")({
  component: Categories,
  head: () => ({
    meta: [
      { title: "Categories · THE AURA" },
      { name: "description", content: "Explore THE AURA fragrance families — Oriental, Floral, Aromatic, and more." },
    ],
  }),
});

const FAMILIES = [
  {
    slug: "oriental",
    name: "Oriental",
    subtitle: "Spice, resin, and the warm dark",
    aura: "ember" as const,
    keys: ["oriental"],
  },
  {
    slug: "floral",
    name: "Floral",
    subtitle: "Petals at first light",
    aura: "silver" as const,
    keys: ["floral"],
  },
  {
    slug: "aromatic",
    name: "Aromatic",
    subtitle: "Air, herb, sharpened glass",
    aura: "frost" as const,
    keys: ["aromatic", "fresh"],
  },
];

function Categories() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-12">
        <p className="text-xs uppercase tracking-luxe text-muted-foreground">Olfactory Families</p>
        <h1 className="font-display text-5xl md:text-7xl mt-4">Categories.</h1>
        <p className="text-muted-foreground mt-6 max-w-xl">
          Each fragrance belongs to a family — a lineage of notes, accords, and atmospheres.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-px bg-border">
        {FAMILIES.map((f) => {
          const items = perfumes.filter((p) =>
            f.keys.some((k) => p.family.toLowerCase().includes(k))
          );
          return (
            <Link
              key={f.slug}
              to="/shop"
              className="group relative bg-background min-h-[60vh] p-10 overflow-hidden flex flex-col justify-between"
            >
              <Aura variant={f.aura} className="opacity-50 group-hover:opacity-90" />
              <div className="relative z-10">
                <p className="text-[10px] uppercase tracking-luxe text-muted-foreground">
                  {items.length} fragrance{items.length === 1 ? "" : "s"}
                </p>
                <h2 className="font-display text-5xl mt-4">{f.name}</h2>
                <p className="text-muted-foreground italic mt-2">{f.subtitle}</p>
              </div>
              <div className="relative z-10 flex flex-wrap gap-2 mt-8">
                {items.map((p) => (
                  <span key={p.id} className="text-xs uppercase tracking-luxe border border-border px-3 py-1">
                    {p.name}
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
