import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import heroImg from "@/assets/hero-bottle.jpg";
import { perfumes } from "@/data/perfumes";
import { PerfumeCard } from "@/components/PerfumeCard";
import { Aura } from "@/components/Aura";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "THE AURA — A Living Fragrance Gallery" },
      {
        name: "description",
        content:
          "Imported French perfumery, curated by emotion. Discover your scent through THE AURA's Scent Journey.",
      },
    ],
  }),
});

function useBottleTilt() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 80, mass: 1.2 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-4, 4]);
  const translateX = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const translateY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handler = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener("mousemove", handler, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handler);
    };
  }, [mouseX, mouseY]);

  return { rotateX, rotateY, translateX, translateY };
}

const collections = [
  {
    id: "house-aura",
    name: "House AURA",
    subtitle: "The Founding Collection",
    description: "Our signature trilogy — composed in Grasse, bottled in midnight, dawn, and shadow.",
    perfumes: perfumes.filter((p) => ["minuit", "blanche", "ombre"].includes(p.id)),
  },
  {
    id: "atelier-noir",
    name: "Atelier Noir",
    subtitle: "Oriental · Intense",
    description: "Dark compositions for evening rituals. Oud, amber, and the weight of memory.",
    perfumes: perfumes.filter((p) => p.aura === "ember" || p.family.includes("Oriental")),
  },
  {
    id: "maison-blanche",
    name: "Maison Blanche",
    subtitle: "Luminous · Daily",
    description: "Light-bearing fragrances for morning clarity and quiet confidence.",
    perfumes: perfumes.filter((p) => p.aura === "silver" || p.family.includes("Floral")),
  },
  {
    id: "editions-frost",
    name: "Éditions Frost",
    subtitle: "Aromatic · Architectural",
    description: "Sharp, crystalline structures. For the precise and the present.",
    perfumes: perfumes.filter((p) => p.aura === "frost" || p.family.includes("Aromatic")),
  },
];

function Index() {
  const heroRef = useRef<HTMLElement>(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: "-10%" });

  const { rotateX, rotateY, translateX, translateY } = useBottleTilt();

  const floatingNotes = [
    { label: "Bergamot", style: { top: "8%", left: "3%", animationDelay: "0s", animationDuration: "8s" } },
    { label: "Oud Wood", style: { bottom: "32%", left: "1%", animationDelay: "2s", animationDuration: "10s" } },
    { label: "Vanilla", style: { top: "18%", right: "6%", animationDelay: "1s", animationDuration: "9s" } },
    { label: "Vetiver", style: { bottom: "22%", right: "3%", animationDelay: "3s", animationDuration: "7s" } },
    { label: "Iris", style: { top: "45%", left: "8%", animationDelay: "4s", animationDuration: "11s" } },
  ];

  return (
    <>
      <style>{`
        @keyframes float-note {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          25% { transform: translateY(-14px) translateX(4px); opacity: 0.5; }
          50% { transform: translateY(-8px) translateX(-3px); opacity: 0.35; }
          75% { transform: translateY(-18px) translateX(2px); opacity: 0.45; }
        }

        .float-note {
          animation: float-note var(--duration, 8s) ease-in-out infinite;
          animation-delay: var(--delay, 0s);
          will-change: transform, opacity;
        }

        @media (prefers-reduced-motion: reduce) {
          .float-note { animation: none; opacity: 0.3; }
          .animate-float { animation: none; }
        }
      `}</style>

      {/* HERO */}
      <section ref={heroRef} className="theme-noir bg-background text-foreground relative overflow-hidden">
        <div className="absolute inset-0 grain opacity-20 pointer-events-none z-20" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/10 to-background/85 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.15)_100%)] pointer-events-none z-10" />

        <div className="relative z-10 min-h-[82svh] md:min-h-dvh flex flex-col">
          <div className="flex-1 flex items-center">
            <div className="w-full max-w-7xl mx-auto px-6 lg:px-16 pt-20 pb-8 md:py-20 lg:py-0">
              <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center min-h-[auto] lg:min-h-[80vh]">
                {/* TEXT */}
                <div className="lg:col-span-5 relative z-30 order-2 lg:order-1 -mt-4 sm:mt-0 lg:pt-0">
                  <motion.div
                    initial={{ opacity: 0, x: -15 }}
                    animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="hidden lg:block absolute -left-10 top-1/2 -translate-y-1/2"
                  >
                    <span
                      className="text-[9px] uppercase tracking-luxe text-muted-foreground/30"
                      style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                    >
                      Maison AURA&rsquo;s · Grasse · Est. 2024
                    </span>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="lg:hidden text-[10px] uppercase tracking-luxe text-muted-foreground mb-3"
                  >
                    Maison AURA&rsquo;s · Grasse
                  </motion.p>

                  <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="font-display text-5xl sm:text-6xl lg:text-[6.5rem] xl:text-[8rem] leading-[0.88] tracking-tight"
                  >
                    Scent,
                    <motion.em
                      initial={{ opacity: 0, x: -20 }}
                      animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.8, delay: 0.35 }}
                      className="text-muted-foreground block lg:ml-8 mt-1"
                    >
                      remembered.
                    </motion.em>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={isHeroInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="mt-5 lg:mt-8 text-sm lg:text-[15px] text-muted-foreground max-w-sm leading-relaxed"
                  >
                    A living fragrance gallery — emotion, weather, and memory composed into French perfume.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="mt-7 flex flex-col sm:flex-row gap-3"
                  >
                    <Link
                      to="/journey"
                      className="group relative inline-flex items-center justify-center gap-2 bg-foreground text-background px-7 py-3.5 text-[10px] lg:text-[11px] uppercase tracking-luxe overflow-hidden transition-transform active:scale-[0.98]"
                    >
                      <span className="relative z-10">Begin Scent Journey</span>
                      <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
                      <div className="absolute inset-0 bg-muted-foreground -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]" />
                    </Link>

                    <Link
                      to="/"
                      hash="collection"
                      className="group relative inline-flex items-center justify-center px-7 py-3.5 text-[10px] lg:text-[11px] uppercase tracking-luxe border border-border overflow-hidden transition-transform active:scale-[0.98]"
                    >
                      <span className="relative z-10 transition-colors duration-500 group-hover:text-background">
                        Explore Collection
                      </span>
                      <div className="absolute inset-0 bg-foreground translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]" />
                    </Link>
                  </motion.div>
                </div>

                {/* BOTTLE */}
                <div className="lg:col-span-7 relative order-1 lg:order-2 h-[34svh] min-h-[260px] max-h-[390px] sm:h-[44vh] sm:max-h-[520px] lg:h-[78vh] lg:max-h-none">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Aura variant="silver" intense className="opacity-[0.15] scale-110" />
                  </div>

                  {floatingNotes.map((note) => (
                    <span
                      key={note.label}
                      className="hidden lg:block absolute text-[9px] uppercase tracking-luxe text-muted-foreground/30 pointer-events-none float-note"
                      style={{
                        ...note.style,
                        ["--duration" as string]: note.style.animationDuration,
                        ["--delay" as string]: note.style.animationDelay,
                      }}
                    >
                      {note.label}
                    </span>
                  ))}

                  <motion.div className="relative z-10 h-full w-full flex items-center justify-center" style={{ perspective: 1000 }}>
                    <motion.div
                      style={{
                        rotateX,
                        rotateY,
                        x: translateX,
                        y: translateY,
                        transformStyle: "preserve-3d",
                        willChange: "transform",
                      }}
                      className="relative h-full w-full max-w-70 sm:max-w-sm lg:max-w-md xl:max-w-lg mx-auto"
                    >
                      <img
                        src={heroImg}
                        alt="THE AURA's signature perfume bottle in cinematic smoke"
                        className="h-full w-full object-contain animate-float"
                        width={1080}
                        height={1920}
                        loading="eager"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/4 to-transparent pointer-events-none" />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-30 border-t border-border/15 py-3 overflow-hidden bg-background/30">
            <div className="animate-marquee whitespace-nowrap flex">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-8 lg:gap-12 px-4 lg:px-6">
                  {[
                    "Composed in Grasse",
                    "Single-origin essences",
                    "Complimentary global shipping",
                    "Concierge gifting",
                    "Established with intention",
                  ].map((text) => (
                    <span
                      key={text}
                      className="flex items-center gap-3 text-[9px] lg:text-[10px] uppercase tracking-luxe text-muted-foreground/50 shrink-0"
                    >
                      <span className="w-1 h-1 rotate-45 bg-muted-foreground/20 shrink-0" />
                      {text}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SIGNATURE */}
      <section id="collection" className="bg-background relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-16 pt-16 lg:pt-28 pb-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-luxe text-muted-foreground">The Signature</p>
              <h2 className="font-display text-4xl lg:text-5xl mt-3 leading-tight">
                Filter by feeling,
                <br className="hidden lg:block" /> not by note.
              </h2>
            </div>

            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed lg:text-right">
              Other houses ask what notes you like. We ask what mood you wish to inhabit.
            </p>
          </div>
        </div>

        {/* Horizontal product strip */}
        <div className="relative">
          <div className="mx-auto max-w-7xl">
            <div className="flex gap-4 lg:gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scroll-px-6 lg:scroll-px-16 px-6 lg:px-16 scrollbar-hide">
              {perfumes.slice(0, 5).map((perfume, i) => (
                <motion.div
                  key={perfume.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="snap-start shrink-0 w-65 lg:w-75 group"
                >
                  <Link to="/product/$id" params={{ id: perfume.id }} className="block">
                    <div className="relative aspect-3/4 bg-secondary/50 rounded-sm overflow-hidden mb-4">
                      <img
                        src={perfume.image}
                        alt={perfume.name}
                        className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <span className="text-[10px] uppercase tracking-luxe text-background bg-foreground/90 px-3 py-1.5">
                          {perfume.family}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="font-display text-xl">{perfume.name}</h3>
                        <span className="text-sm text-muted-foreground">${perfume.price}</span>
                      </div>

                      <p className="text-xs text-muted-foreground line-clamp-1">{perfume.tagline}</p>

                      <div className="flex gap-1.5 pt-1">
                        {perfume.mood.slice(0, 2).map((m) => (
                          <span
                            key={m}
                            className="text-[9px] uppercase tracking-luxe text-muted-foreground/60 border border-border/50 px-2 py-0.5"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mood filter grid */}
        <div className="mx-auto max-w-7xl px-6 lg:px-16 py-12 border-t border-border/10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {[
              { k: "Mood", v: "Quiet, tender, mischievous" },
              { k: "Weather", v: "First rain after summer" },
              { k: "City", v: "Lisbon at midnight" },
              { k: "Texture", v: "Bare linen, warm skin" },
            ].map((item) => (
              <div
                key={item.k}
                className="bg-background p-5 lg:p-6 group hover:bg-secondary/30 transition-colors duration-500 cursor-pointer"
              >
                <p className="text-[9px] uppercase tracking-luxe text-muted-foreground mb-2">{item.k}</p>
                <p className="font-display text-lg lg:text-xl">{item.v}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center lg:text-left">
            <Link
              to="/journey"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-luxe link-underline text-muted-foreground hover:text-foreground transition-colors"
            >
              Start your full journey →
            </Link>
          </div>
        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="bg-secondary/30 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-16">
          <div className="text-center mb-16 lg:mb-20">
            <p className="text-[10px] uppercase tracking-luxe text-muted-foreground mb-3">Collections</p>
            <h2 className="font-display text-4xl lg:text-6xl">Curated Houses.</h2>
            <p className="mt-4 text-sm text-muted-foreground max-w-md mx-auto">
              Each house represents a distinct philosophy of scent — explore by character, not just ingredient.
            </p>
          </div>

          <div className="space-y-20 lg:space-y-28">
            {collections.map((collection, ci) => (
              <CollectionBlock key={collection.id} collection={collection} index={ci} />
            ))}
          </div>
        </div>
      </section>

      {/* AURA */}
      <section className="theme-noir bg-background text-foreground py-32 relative overflow-hidden">
        <div className="aura" style={{ opacity: 0.4, inset: "10%" }} />

        <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center relative z-10">
          <p className="text-[10px] uppercase tracking-luxe text-muted-foreground">The Aura</p>

          <h2 className="font-display text-5xl md:text-7xl mt-6 leading-tight">
            Every fragrance has
            <br />
            <em className="italic">a visible soul.</em>
          </h2>

          <p className="mt-8 text-lg text-muted-foreground max-w-2xl mx-auto">
            We render each composition as a moving aura — generated from its notes. Warm oud breathes in golden ember;
            cool vetiver drifts in pale silver. Scent, finally, made seeable.
          </p>
        </div>
      </section>
    </>
  );
}

function CollectionBlock({
  collection,
  index,
}: {
  collection: (typeof collections)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="relative">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8 lg:mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span
              className={`w-2 h-2 rounded-full ${
                index === 0
                  ? "bg-amber-500/60"
                  : index === 1
                    ? "bg-rose-400/60"
                    : index === 2
                      ? "bg-slate-300/60"
                      : "bg-cyan-400/60"
              }`}
            />
            <p className="text-[10px] uppercase tracking-luxe text-muted-foreground">{collection.subtitle}</p>
          </div>

          <h3 className="font-display text-3xl lg:text-4xl">{collection.name}</h3>
        </div>

        <p className="text-sm text-muted-foreground max-w-xs">{collection.description}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {collection.perfumes.map((perfume, pi) => (
          <motion.div
            key={perfume.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: pi * 0.1, ease: "easeOut" }}
          >
            <PerfumeCard perfume={perfume} />
          </motion.div>
        ))}

        {collection.perfumes.length < 4 &&
          [...Array(4 - collection.perfumes.length)].map((_, i) => (
            <div
              key={`placeholder-${i}`}
              className="aspect-3/4 bg-secondary/30 rounded-sm flex items-center justify-center border border-border/20 border-dashed"
            >
              <span className="text-[10px] uppercase tracking-luxe text-muted-foreground/30">Coming Soon</span>
            </div>
          ))}
      </div>

      <div className="mt-6 text-right">
        <Link
          to="/collections"
          className="text-[10px] uppercase tracking-luxe text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
        >
          View all {collection.name} →
        </Link>
      </div>
    </div>
  );
}