import { createFileRoute, Link } from "@tanstack/react-router";
import { perfumes } from "@/data/perfumes";
import { Aura } from "@/components/Aura";

export const Route = createFileRoute("/collections")({
  component: Collections,
  head: () => ({
    meta: [
      { title: "Collections · THE AURA" },
      { name: "description", content: "Limited editions and curated capsules from the Maison." },
    ],
  }),
});

const COLLECTIONS = [
  {
    name: "Nuit Blanche",
    subtitle: "Capsule No. 01 · Winter '26",
    description: "Three fragrances composed in a single sleepless night in Paris. The first capsule of the year.",
    ids: ["minuit", "blanche"],
    aura: "ember" as const,
  },
  {
    name: "L'Architecture",
    subtitle: "Capsule No. 02 · Year-Round",
    description: "Sharp, structural, deliberate. For those who choose presence over volume.",
    ids: ["ombre"],
    aura: "frost" as const,
  },
  {
    name: "Les Origines",
    subtitle: "The House Library",
    description: "The fragrances that defined the Maison — from the first bottle to today.",
    ids: ["minuit", "blanche", "ombre"],
    aura: "silver" as const,
  },
];

function Collections() {
  return (
    <section className="bg-background pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-12">
        <p className="text-xs uppercase tracking-luxe text-muted-foreground">Curated Capsules</p>
        <h1 className="font-display text-5xl md:text-7xl mt-4">Collections.</h1>
      </div>

      <div className="space-y-px bg-border">
        {COLLECTIONS.map((c, i) => {
          const items = c.ids.map((id) => perfumes.find((p) => p.id === id)!).filter(Boolean);
          const reverse = i % 2 === 1;
          return (
            <div
              key={c.name}
              className={`relative bg-background grid lg:grid-cols-5 gap-px p-0 overflow-hidden ${reverse ? "lg:[direction:rtl]" : ""}`}
            >
              <div className="lg:col-span-2 relative min-h-[50vh] [direction:ltr]">
                <Aura variant={c.aura} intense className="!opacity-60" />
                <div className="relative z-10 p-12 flex flex-col justify-center h-full">
                  <p className="text-xs uppercase tracking-luxe text-muted-foreground">{c.subtitle}</p>
                  <h2 className="font-display text-5xl md:text-6xl mt-4">{c.name}</h2>
                  <p className="text-muted-foreground mt-6 max-w-sm">{c.description}</p>
                </div>
              </div>
              <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border [direction:ltr]">
                {items.map((p) => (
                  <Link
                    key={p.id}
                    to="/product/$id"
                    params={{ id: p.id }}
                    className="bg-background relative overflow-hidden group p-6 flex flex-col"
                  >
                    <Aura variant={p.aura} className="opacity-30 group-hover:opacity-70" />
                    <div className="relative z-10 aspect-square bg-muted overflow-hidden">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    </div>
                    <div className="relative z-10 mt-4">
                      <h3 className="font-display text-2xl">{p.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">${p.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
