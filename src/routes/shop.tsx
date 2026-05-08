import { createFileRoute } from "@tanstack/react-router";
import { perfumes } from "@/data/perfumes";
import { PerfumeCard } from "@/components/PerfumeCard";

export const Route = createFileRoute("/shop")({
  component: Shop,
  head: () => ({
    meta: [
      { title: "Shop · Macnelle's" },
      { name: "description", content: "The complete Macnelle's collection of imported French perfumes." },
    ],
  }),
});

function Shop() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="border-b border-border pb-12 mb-16">
          <p className="text-xs uppercase tracking-luxe text-muted-foreground">The Collection</p>
          <h1 className="font-display text-6xl md:text-7xl mt-4">All Fragrances.</h1>
        </div>
        <div className="flex gap-8 mb-12 text-xs uppercase tracking-luxe text-muted-foreground overflow-x-auto">
          {["All", "Oriental", "Floral", "Aromatic", "Woody", "Fresh"].map((f, i) => (
            <button
              key={f}
              className={`link-underline whitespace-nowrap ${i === 0 ? "text-foreground" : ""}`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {perfumes.map((p) => (
            <PerfumeCard key={p.id} perfume={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
