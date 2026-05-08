import { createFileRoute, notFound, Link } from "@tanstack/react-router";

type Service = {
  eyebrow: string;
  title: string;
  intro: string;
  blocks: { h: string; p: string }[];
};

const services: Record<string, Service> = {
  shipping: {
    eyebrow: "Service · 01",
    title: "Shipping.",
    intro: "Each fragrance leaves Grasse in protective tissue and a numbered case. Complimentary, anywhere.",
    blocks: [
      { h: "Standard · 5–7 days", p: "Worldwide, complimentary on every order. Tracked from atelier to door." },
      { h: "Express · 2–3 days", p: "$25 supplement. Available to 92 countries." },
      { h: "Concierge · Same-day", p: "Paris, London, NYC. Delivered by courier in archival packaging." },
    ],
  },
  returns: {
    eyebrow: "Service · 02",
    title: "Returns.",
    intro: "Scent is personal. If a composition does not become you, return it within thirty days — unworn or worn.",
    blocks: [
      { h: "Thirty days, no questions", p: "Return any fragrance for a full refund or maison credit." },
      { h: "Pre-paid label", p: "Generated in one click from your account or by writing to the concierge." },
      { h: "Discovery sets", p: "Order a sampler to find your composition before committing to a full bottle." },
    ],
  },
  concierge: {
    eyebrow: "Service · 03",
    title: "Concierge.",
    intro: "A perfumer on hand. We help you find — or gift — the precise fragrance for the precise moment.",
    blocks: [
      { h: "Private consultation", p: "Thirty minutes by video with a Macnelle's perfumer. Complimentary." },
      { h: "Bespoke gifting", p: "Hand-tied ribbon, scent personality card, scheduled to the hour." },
      { h: "Atelier visit", p: "By appointment in Grasse. Walk the fields, smell from the rack." },
    ],
  },
};

export const Route = createFileRoute("/service/$slug")({
  component: ServicePage,
  loader: ({ params }) => {
    const service = services[params.slug];
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.service.title.replace(".", "")} · Macnelle's` },
          { name: "description", content: loaderData.service.intro },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="py-32 text-center">
      <h1 className="font-display text-5xl">Not found</h1>
      <Link to="/" className="mt-6 inline-block link-underline text-xs uppercase tracking-luxe">
        Return home
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="py-32 text-center">
      <p className="text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
});

function ServicePage() {
  const { service } = Route.useLoaderData();
  return (
    <>
      <section className="theme-noir bg-background text-foreground py-24 md:py-32 relative overflow-hidden">
        <div className="aura" style={{ opacity: 0.3, inset: "20%", "--aura-from": "oklch(0.9 0 0 / 0.4)", "--aura-to": "oklch(0.3 0 0 / 0.4)" } as React.CSSProperties} />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs uppercase tracking-luxe text-muted-foreground">{service.eyebrow}</p>
          <h1 className="font-display text-6xl md:text-8xl mt-6">{service.title}</h1>
          <p className="mt-8 text-lg text-muted-foreground max-w-xl mx-auto">{service.intro}</p>
        </div>
      </section>
      <section className="bg-background py-24">
        <div className="mx-auto max-w-5xl px-6 grid md:grid-cols-3 gap-px bg-border">
          {service.blocks.map((b: { h: string; p: string }, i: number) => (
            <div key={b.h} className="bg-background p-8">
              <p className="font-display text-3xl text-muted-foreground/50">0{i + 1}</p>
              <h3 className="font-display text-2xl mt-4">{b.h}</h3>
              <p className="text-sm text-muted-foreground mt-3">{b.p}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
