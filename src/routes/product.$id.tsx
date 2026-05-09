import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { perfumes } from "@/data/perfumes";
import { Aura } from "@/components/Aura";
import { useCart, useUI, useVault } from "@/store";
import { GiftToggle } from "@/components/GiftToggle";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Plus, Heart, Check, Info, ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/product/$id")({
  component: Product,
  loader: ({ params }) => {
    const perfume = perfumes.find((p) => p.id === params.id);
    if (!perfume) throw notFound();
    return { perfume };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.perfume.name} · THE AURA` },
          { name: "description", content: loaderData.perfume.tagline },
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
  const { perfume } = Route.useLoaderData();
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
      {/* HERO SECTION: Dynamic Background isolated here */}
      <section
        className="relative overflow-hidden pt-24 md:pt-32 lg:pt-40 pb-12 md:pb-24 transition-colors duration-1000 ease-in-out"
        style={{ backgroundColor: perfume.palette.dominant }}
      >
        {/* Subtle radial glow to add depth to the dominant color */}
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
              {/* Main Display */}
              <div className="order-1 md:order-2 relative aspect-8/9 md:aspect-square w-fulloverflow-hidden group">
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

              {/* Thumbnails */}
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

                  {/* SHIPPING / RETURNS */}
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

      {/* COMPOSITION SECTION: Neutral background, uses accent for markers */}
      <section className="py-20 md:py-32 bg-zinc-50 dark:bg-zinc-950 border-y border-zinc-200 dark:border-white/5">
        <div className="container px-6 md:px-4 max-w-8xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start px-0 md:px-8 lg:px-24">
            <div className="lg:sticky lg:top-32">
              <h2 className="font-display text-4xl md:text-5xl mb-6 tracking-tight text-zinc-900 dark:text-white">
                The Olfactory Architecture
              </h2>

              <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed">
                Every AURA fragrance is built on a temporal curve, designed to evolve on your skin from the first
                bright spark to the deep, lingering memory.
              </p>

              <div className="mt-8 flex items-start gap-3 p-5 border border-dashed border-zinc-300 dark:border-white/10 rounded-xl">
                <Info size={16} className="text-zinc-400 shrink-0 mt-0.5" />

                <p className="text-xs text-zinc-500 dark:text-zinc-500 italic leading-relaxed">
                  Apply to pulse points. Avoid rubbing wrists to preserve the molecular structure.
                </p>
              </div>
            </div>

            <div className="space-y-12 md:space-y-14">
              {[
                { label: "Top Notes", time: "0 – 15 Minutes", notes: perfume.notes.top },
                { label: "Heart Notes", time: "15 Min – 4 Hours", notes: perfume.notes.heart },
                { label: "Base Notes", time: "4 Hours – Twilight", notes: perfume.notes.base },
              ].map((tier) => (
                <div
                  key={tier.label}
                  className="relative pl-6 md:pl-8 border-l border-zinc-200 dark:border-white/10 last:border-0 last:pb-0"
                >
                  <div
                    className="absolute -left-[4.5px] top-0 w-2 h-2 rounded-full"
                    style={{ backgroundColor: perfume.palette.accent }}
                  />

                  <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 font-bold">
                    {tier.label}
                  </span>

                  <p className="text-[9px] italic opacity-40 mb-4 uppercase tracking-wider text-zinc-900 dark:text-white">
                    {tier.time}
                  </p>

                  <div className="flex flex-wrap gap-x-5 md:gap-x-6 gap-y-3">
                    {tier.notes.map((n: string) => (
                      <span
                        key={n}
                        className="font-display text-3xl md:text-5xl hover:opacity-70 transition-opacity cursor-default text-zinc-900 dark:text-white"
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MOOD SECTION */}
      <section className="py-24 text-center px-6 bg-white dark:bg-zinc-950">
        <h3 className="text-[10px] uppercase tracking-[0.4em] mb-12 opacity-40 font-bold text-zinc-900 dark:text-white">
          Atmospheres
        </h3>

        <div className="flex justify-center flex-wrap gap-3 max-w-3xl mx-auto">
          {perfume.mood.map((m: string) => (
            <span
              key={m}
              className="px-8 py-4 rounded-full border border-zinc-200 dark:border-white/10 text-xs md:text-sm font-serif hover:bg-zinc-900 dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-500 cursor-default text-zinc-900 dark:text-white"
            >
              {m}
            </span>
          ))}
        </div>
      </section>
    </article>
  );
}