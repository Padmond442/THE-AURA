import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "Maison · THE AURA" },
      { name: "description", content: "The AURA atelier — imported French perfumery, composed in Grasse." },
    ],
  }),
});

function About() {
  return (
    <>
      <section className="theme-noir bg-background text-foreground py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs uppercase tracking-luxe text-muted-foreground">The Maison</p>
          <h1 className="font-display text-6xl md:text-8xl mt-6 leading-none">
            We compose <em className="italic">memory.</em>
          </h1>
          <p className="mt-10 text-lg text-muted-foreground max-w-2xl mx-auto">
            THE AURA began with a simple belief — that fragrance is the
            most honest form of memory. Each composition is sourced from
            single-origin essences in Grasse, then translated into a moving
            aura, a city, a texture, a feeling.
          </p>
        </div>
      </section>
      <section className="py-32 bg-background">
        <div className="mx-auto max-w-5xl px-6 grid md:grid-cols-3 gap-12">
          {[
            { n: "01", t: "Sourced", d: "Single-origin essences from Grasse, Provence." },
            { n: "02", t: "Composed", d: "Hand-blended in micro-batches by our perfumer." },
            { n: "03", t: "Imported", d: "Shipped directly to you, world-wide." },
          ].map((step) => (
            <div key={step.n}>
              <p className="font-display text-5xl">{step.n}</p>
              <h3 className="text-xs uppercase tracking-luxe mt-4">{step.t}</h3>
              <p className="text-muted-foreground mt-3">{step.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
