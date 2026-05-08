import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useVault } from "@/store";
import { perfumes } from "@/data/perfumes";
import { Aura } from "@/components/Aura";

const COLLECTIONS = ["Date Night", "Daily", "Power", "Vacation"] as const;

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

  if (ids.length === 0) {
    return (
      <section className="theme-noir bg-background text-foreground min-h-[80vh] flex items-center">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <p className="text-xs uppercase tracking-luxe text-muted-foreground">The Vault</p>
          <h1 className="font-display text-5xl md:text-7xl mt-4">Empty, for now.</h1>
          <p className="text-muted-foreground mt-6">
            Save scents into private collections — Date Night, Daily, Power, Vacation.
          </p>
          <Link to="/shop" className="mt-10 inline-block bg-foreground text-background px-8 py-4 text-xs uppercase tracking-luxe">
            Browse the collection →
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="border-b border-border pb-12 mb-16">
          <p className="text-xs uppercase tracking-luxe text-muted-foreground">Your Vault</p>
          <h1 className="font-display text-5xl md:text-7xl mt-4">Saved Scents.</h1>
        </div>

        {COLLECTIONS.map((c) => {
          const list = ids.filter((id) => saved[id] === c).map((id) => perfumes.find((p) => p.id === id)!).filter(Boolean);
          if (list.length === 0) return null;
          return (
            <div key={c} className="mb-20">
              <h2 className="font-display text-3xl mb-6">{c}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
                {list.map((p) => (
                  <article key={p.id} className="group bg-background p-6 relative overflow-hidden">
                    <Aura variant={p.aura} className="opacity-30" />
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => navigate({ to: "/product/$id", params: { id: p.id } })}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") navigate({ to: "/product/$id", params: { id: p.id } });
                      }}
                      className="relative z-10 flex gap-4 items-center cursor-pointer"
                    >
                      <img src={p.image} alt={p.name} className="w-20 h-24 object-cover bg-muted" />
                      <div className="flex-1">
                        <h3 className="font-display text-2xl">{p.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{p.tagline}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggle(p.id, c)}
                      className="relative z-10 mt-4 text-[10px] uppercase tracking-luxe text-muted-foreground link-underline"
                    >
                      Remove from vault ✕
                    </button>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
