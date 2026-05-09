import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { perfumes } from "@/data/perfumes";
import { Aura } from "@/components/Aura";
import { useCart, useUI, useVault } from "@/store";
import { GiftToggle } from "@/components/GiftToggle";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Plus, Heart, Check, ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/product/$id")({
  component: Product,
  loader: ({ params }) => {
    const perfume = perfumes.find((p) => p.id === params.id);
    if (!perfume) throw notFound();

    const related = perfumes.filter((p) => p.id !== perfume.id).slice(0, 3);

    return { perfume, related };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
        { title: `${loaderData.perfume.name} · THE AURA` },
        { name: "description", content: loaderData.perfume.tagline },
        { property: "og:title", content: `${loaderData.perfume.name} · THE AURA` },
        { property: "og:description", content: loaderData.perfume.tagline },
        { property: "og:image", content: loaderData.perfume.image },
      ]
      : [],
  }),
});

const SIZES = [
  { ml: 30, mult: 0.45 },
  { ml: 50, mult: 0.7 },
  { ml: 100, mult: 1 },
];

const COLLECTIONS = ["Date Night", "Daily", "Power", "Vacation"] as const;

const getContrastColor = (hex: string) => {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "light" : "dark";
};

function Product() {
  const { perfume, related } = Route.useLoaderData();

  const addToCart = useCart((s) => s.add);
  const setCartOpen = useUI((s) => s.setCartOpen);
  const { saved, toggle } = useVault();

  const contrast = getContrastColor(perfume.palette.dominant);
  const isLight = contrast === "light";

  const isSaved = Boolean(saved[perfume.id]);
  const [collection, setCollection] = useState<(typeof COLLECTIONS)[number]>("Daily");
  const [size, setSize] = useState(SIZES[2]);
  const price = Math.round(perfume.price * size.mult);

  const images = perfume.images && perfume.images.length > 0 ? perfume.images : [perfume.image];
  const [activeIndex, setActiveIndex] = useState(0);

  const nextImage = () => setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  const prevImage = () => setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  return (
    <article className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-500">
      {/* HERO SECTION */}
      <section
        className="relative overflow-hidden pt-24 md:pt-32 lg:pt-40 pb-12 md:pb-24 transition-colors duration-1000 ease-in-out"
        style={{ backgroundColor: perfume.palette.dominant }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{
            background: `radial-gradient(circle at 50% -10%, ${perfume.palette.glow}, transparent 70%)`,
          }}
        />

        <div className="container relative z-10 px-6 md:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* GALLERY */}
            <div className="lg:col-span-7 flex flex-col md:flex-row gap-4 md:gap-6">
              <div className="order-1 md:order-2 relative aspect-8/9 md:aspect-square w-full overflow-hidden group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={images[activeIndex]}
                    src={images[activeIndex]}
                    alt={`${perfume.name} view ${activeIndex + 1}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: "circOut" }}
                    className="h-full w-full object-contain p-8 md:p-12"
                  />
                </AnimatePresence>

                {images.length > 1 && (
                  <div className="absolute inset-0 flex items-center justify-between px-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={prevImage}
                      className="p-3 bg-black/40 hover:bg-black/60 backdrop-blur-xl rounded-full border border-white/10 text-white transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    <button
                      onClick={nextImage}
                      className="p-3 bg-black/40 hover:bg-black/60 backdrop-blur-xl rounded-full border border-white/10 text-white transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </div>

              <div className="order-2 md:order-1 flex md:flex-col gap-3 overflow-x-auto md:overflow-y-visible no-scrollbar py-2">
                {images.map((img: string, idx: number) => (
                  <button
                    key={`${img}-${idx}`}
                    onClick={() => setActiveIndex(idx)}
                    className={cn(
                      "relative shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-500",
                      activeIndex === idx
                        ? "border-white scale-105 shadow-xl"
                        : "border-transparent opacity-40 hover:opacity-100"
                    )}
                  >
                    <img src={img} className="w-full h-full object-cover" alt={`thumbnail ${idx + 1}`} />

                    {activeIndex === idx && (
                      <motion.div layoutId="activeThumb" className="absolute inset-0 bg-white/10" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* PRODUCT INFO */}
            <div className="lg:col-span-5 space-y-8 mt-4 md:mt-40">
              <header className="space-y-4">
                <div className="flex justify-between items-end gap-4">
                  <span
                    className={cn(
                      "text-[10px] uppercase tracking-[0.3em] font-bold",
                      isLight ? "opacity-60" : "text-white/50"
                    )}
                  >
                    {perfume.family}
                  </span>

                  <span
                    className={cn(
                      "text-2xl font-display whitespace-nowrap",
                      isLight ? "text-zinc-950" : "text-white"
                    )}
                  >
                    GHC {price}
                  </span>
                </div>

                <h1
                  className={cn(
                    "font-display text-5xl md:text-7xl leading-[0.9] tracking-tighter",
                    isLight ? "text-zinc-950" : "text-white"
                  )}
                >
                  {perfume.name}
                </h1>

                <p className={cn("text-lg md:text-xl italic font-serif", isLight ? "opacity-80" : "text-white/80")}>
                  {perfume.tagline}
                </p>
              </header>

              <div className="space-y-8">
                <p
                  className={cn(
                    "text-sm md:text-base leading-relaxed max-w-lg",
                    isLight ? "opacity-70" : "text-white/70"
                  )}
                >
                  {perfume.story}
                </p>

                <div className="flex flex-col gap-3 pt-4">
                  {/* FORMAT */}
                  <div>
                    <p
                      className={cn(
                        "text-[10px] uppercase tracking-[0.3em] font-bold mb-3",
                        isLight ? "text-black/50" : "text-white/50"
                      )}
                    >
                      Format
                    </p>

                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      {SIZES.map((s) => (
                        <button
                          key={s.ml}
                          onClick={() => setSize(s)}
                          className={cn(
                            "border py-4 text-[10px] uppercase tracking-widest font-bold transition-all",
                            isLight
                              ? size.ml === s.ml
                                ? "bg-black text-white border-black"
                                : "border-black/20 text-black hover:bg-black/5"
                              : size.ml === s.ml
                                ? "bg-white text-black border-white"
                                : "border-white/20 text-white hover:bg-white/10"
                          )}
                        >
                          {s.ml}ml
                        </button>
                      ))}
                    </div>
                  </div>

                  <p
                    className={cn(
                      "text-[10px] uppercase tracking-[0.25em] leading-relaxed",
                      isLight ? "text-black/50" : "text-white/50"
                    )}
                  >
                    Free shipping · Returns within 30 days
                  </p>

                  <button
                    onClick={() => {
                      addToCart(perfume.id);
                      setCartOpen(true);
                    }}
                    className="w-full py-5 flex items-center justify-center gap-3 transition-all hover:brightness-110 active:scale-[0.98] font-bold uppercase text-xs tracking-widest"
                    style={{
                      backgroundColor: isLight ? "#000" : perfume.palette.accent,
                      color: isLight ? "#fff" : perfume.palette.dark,
                    }}
                  >
                    <span>Add to Bag</span>
                    <Plus size={16} />
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative">
                      <select
                        value={collection}
                        onChange={(e) => setCollection(e.target.value as (typeof COLLECTIONS)[number])}
                        className={cn(
                          "w-full border py-4 px-4 text-[10px] uppercase tracking-widest appearance-none focus:outline-none bg-transparent",
                          isLight ? "border-black/20 text-black" : "border-white/10 text-white"
                        )}
                      >
                        {COLLECTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-zinc-900 text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      onClick={() => toggle(perfume.id, collection)}
                      className={cn(
                        "flex items-center justify-center gap-2 border py-4 transition-all uppercase text-[10px] tracking-widest font-bold",
                        isLight
                          ? isSaved
                            ? "bg-black text-white border-black"
                            : "border-black/20 hover:bg-black/5"
                          : isSaved
                            ? "bg-white text-black border-white"
                            : "border-white/20 text-white hover:bg-white/10"
                      )}
                    >
                      {isSaved ? <Check size={14} /> : <Heart size={14} />}
                      <span>{isSaved ? "Saved" : "Save"}</span>
                    </button>
                  </div>

                  <GiftToggle id={perfume.id} variant="full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE STORY */}
      <section className="bg-white dark:bg-zinc-950 py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 text-center">
          <p className="text-xs uppercase tracking-luxe text-zinc-400 dark:text-zinc-500">
            The Story
          </p>

          <p className="font-display text-3xl md:text-5xl mt-8 leading-[1.2] italic text-zinc-950 dark:text-white">
            “{perfume.story}”
          </p>
        </div>
      </section>

      {/* PRODUCT DETAILS */}
      <section className="bg-white dark:bg-zinc-950 py-20 md:py-28 border-y border-zinc-200 dark:border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-4">
              <p className="text-xs uppercase tracking-luxe text-zinc-400 dark:text-zinc-500">
                Product Details
              </p>

              <h2 className="font-display text-4xl md:text-5xl mt-4 leading-tight text-zinc-950 dark:text-white">
                Composition, wear, and finish.
              </h2>

              <p className="mt-6 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 max-w-sm">
                A concise breakdown of the fragrance profile, concentration, notes, and how it settles on skin.
              </p>
            </div>

            <div className="lg:col-span-8">
              <div className="divide-y divide-zinc-200 dark:divide-white/10 border-t border-zinc-200 dark:border-white/10">
                <div className="grid md:grid-cols-[180px_1fr] gap-4 py-6">
                  <p className="text-[10px] uppercase tracking-luxe text-zinc-400 dark:text-zinc-500">
                    Fragrance Family
                  </p>

                  <p className="text-sm md:text-base text-zinc-950 dark:text-white">
                    {perfume.family}
                  </p>
                </div>

                <div className="grid md:grid-cols-[180px_1fr] gap-4 py-6">
                  <p className="text-[10px] uppercase tracking-luxe text-zinc-400 dark:text-zinc-500">
                    Concentration
                  </p>

                  <p className="text-sm md:text-base text-zinc-950 dark:text-white">
                    Eau de Parfum
                  </p>
                </div>

                <div className="grid md:grid-cols-[180px_1fr] gap-4 py-6">
                  <p className="text-[10px] uppercase tracking-luxe text-zinc-400 dark:text-zinc-500">
                    Top Notes
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {perfume.notes.top.map((note: string) => (
                      <span
                        key={note}
                        className="border border-zinc-200 dark:border-white/10 px-3 py-1.5 text-xs text-zinc-600 dark:text-zinc-300"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-[180px_1fr] gap-4 py-6">
                  <p className="text-[10px] uppercase tracking-luxe text-zinc-400 dark:text-zinc-500">
                    Heart Notes
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {perfume.notes.heart.map((note: string) => (
                      <span
                        key={note}
                        className="border border-zinc-200 dark:border-white/10 px-3 py-1.5 text-xs text-zinc-600 dark:text-zinc-300"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-[180px_1fr] gap-4 py-6">
                  <p className="text-[10px] uppercase tracking-luxe text-zinc-400 dark:text-zinc-500">
                    Base Notes
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {perfume.notes.base.map((note: string) => (
                      <span
                        key={note}
                        className="border border-zinc-200 dark:border-white/10 px-3 py-1.5 text-xs text-zinc-600 dark:text-zinc-300"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-[180px_1fr] gap-4 py-6">
                  <p className="text-[10px] uppercase tracking-luxe text-zinc-400 dark:text-zinc-500">
                    Character
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {perfume.mood.map((mood: string) => (
                      <span
                        key={mood}
                        className="border border-zinc-200 dark:border-white/10 px-3 py-1.5 text-xs text-zinc-600 dark:text-zinc-300"
                      >
                        {mood}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-[180px_1fr] gap-4 py-6">
                  <p className="text-[10px] uppercase tracking-luxe text-zinc-400 dark:text-zinc-500">
                    Shipping & Returns
                  </p>

                  <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-300">
                    Free shipping. Returns accepted within 30 days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WEAR IT FOR + RITUAL */}
      <section className="bg-zinc-50 dark:bg-zinc-900 py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-xs uppercase tracking-luxe text-zinc-400 dark:text-zinc-500">
              Wear it for
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {perfume.mood.map((m: string) => (
                <span
                  key={m}
                  className="border border-zinc-200 dark:border-white/10 px-5 py-2 text-sm bg-white dark:bg-zinc-950 text-zinc-950 dark:text-white"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-luxe text-zinc-400 dark:text-zinc-500">
              Ritual
            </p>

            <p className="font-display text-2xl mt-6 leading-relaxed text-zinc-950 dark:text-white">
              Two drops at the pulse — wrist, behind the ear, the hollow of the throat. Never the air. Never the clothes.
            </p>
          </div>
        </div>
      </section>

      {/* FROM THE SAME HAND */}
      <section className="bg-white dark:bg-zinc-950 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 mb-12">
            <h2 className="font-display text-4xl md:text-5xl text-zinc-950 dark:text-white">
              From the same hand.
            </h2>

            <Link
              to="/shop"
              className="link-underline text-xs uppercase tracking-luxe text-zinc-500 dark:text-zinc-400"
            >
              View all →
            </Link>
          </div>

          <div className="grid sm:grid-cols-3 gap-px bg-zinc-200 dark:bg-white/10">
            {related.map((p: typeof perfume) => (
              <Link
                key={p.id}
                to="/product/$id"
                params={{ id: p.id }}
                className="group bg-white dark:bg-zinc-950 relative overflow-hidden p-6"
              >
                <Aura variant={p.aura} className="opacity-30 group-hover:opacity-70" />

                <div className="relative z-10 aspect-4/5 bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>

                <div className="relative z-10 mt-4 flex justify-between items-baseline gap-4">
                  <h3 className="font-display text-2xl text-zinc-950 dark:text-white">
                    {p.name}
                  </h3>

                  <p className="text-sm tabular-nums text-zinc-500 dark:text-zinc-400">
                    GHC {p.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}