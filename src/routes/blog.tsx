import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/blog")({
  component: Blog,
  head: () => ({
    meta: [
      { title: "Journal · THE AURA" },
      { name: "description", content: "Letters from the atelier — perfume, ritual, and the art of memory." },
    ],
  }),
});

const POSTS = [
  {
    slug: "the-architecture-of-a-fragrance",
    title: "The Architecture of a Fragrance",
    excerpt: "Why a perfume is built like a building — top floors of light, foundations of memory.",
    date: "April 02, 2026",
    read: "6 min",
    category: "Craft",
  },
  {
    slug: "grasse-in-spring",
    title: "Grasse in Spring",
    excerpt: "Notes from a week in the jasmine fields, where our heart notes are born.",
    date: "March 18, 2026",
    read: "4 min",
    category: "Field Notes",
  },
  {
    slug: "the-quiet-luxury-of-restraint",
    title: "The Quiet Luxury of Restraint",
    excerpt: "Three drops, never more. On wearing perfume the way it was meant to be worn.",
    date: "February 27, 2026",
    read: "3 min",
    category: "Ritual",
  },
  {
    slug: "what-oud-actually-smells-like",
    title: "What Oud Actually Smells Like",
    excerpt: "Beyond the cliché — a slow, honest portrait of the most misunderstood note.",
    date: "January 30, 2026",
    read: "8 min",
    category: "Notes",
  },
];

function Blog() {
  const [hero, ...rest] = POSTS;
  return (
    <section className="bg-background pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-12">
        <p className="text-xs uppercase tracking-luxe text-muted-foreground">The Journal</p>
        <h1 className="font-display text-5xl md:text-7xl mt-4">Letters from the atelier.</h1>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Link to="/blog" className="group block border-t border-b border-border py-16 grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-2 text-xs uppercase tracking-luxe text-muted-foreground">{hero.category}</div>
          <div className="md:col-span-7">
            <h2 className="font-display text-4xl md:text-6xl group-hover:opacity-70 transition-opacity">{hero.title}</h2>
            <p className="text-muted-foreground mt-4 max-w-xl">{hero.excerpt}</p>
          </div>
          <div className="md:col-span-3 text-xs uppercase tracking-luxe text-muted-foreground md:text-right">
            {hero.date} · {hero.read}
          </div>
        </Link>

        <div className="grid md:grid-cols-3 gap-px bg-border mt-px">
          {rest.map((p) => (
            <Link
              to="/blog"
              key={p.slug}
              className="bg-background p-8 group hover:bg-secondary transition-colors min-h-[40vh] flex flex-col justify-between"
            >
              <p className="text-[10px] uppercase tracking-luxe text-muted-foreground">{p.category}</p>
              <div>
                <h3 className="font-display text-3xl group-hover:opacity-70 transition-opacity">{p.title}</h3>
                <p className="text-sm text-muted-foreground mt-3">{p.excerpt}</p>
                <p className="text-[10px] uppercase tracking-luxe text-muted-foreground mt-6">
                  {p.date} · {p.read}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
