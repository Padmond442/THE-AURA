import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useUI } from "@/store";
import { perfumes } from "@/data/perfumes";
import { X, Search as SearchIcon, ArrowRight } from "lucide-react";

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useUI();
  const [q, setQ] = useState("");

  useEffect(() => {
    document.body.style.overflow = searchOpen ? "hidden" : "";
    if (!searchOpen) setQ("");
  }, [searchOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setSearchOpen]);

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return perfumes;
    return perfumes.filter((p) => {
      const hay = [p.name, p.tagline, p.family, ...p.mood, ...p.notes.top, ...p.notes.heart, ...p.notes.base]
        .join(" ")
        .toLowerCase();
      return hay.includes(t);
    });
  }, [q]);

  if (!searchOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] theme-noir bg-background text-foreground md:bg-background/95 reveal flex flex-col">
      {/* MOBILE HEADER (Sticky) */}
      <div className="flex md:hidden items-center gap-4 px-5 h-16 border-b border-border/50">
        <div className="relative flex-1">
          <SearchIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search notes, moods..."
            className="w-full bg-accent/50 py-2 pl-10 pr-4 rounded-full text-sm outline-none border border-transparent focus:border-primary/20 transition-all"
          />
        </div>
        <button 
          onClick={() => setSearchOpen(false)} 
          className="text-xs uppercase tracking-widest font-medium"
        >
          Cancel
        </button>
      </div>

      {/* DESKTOP HEADER (Original Design) */}
      <div className="hidden md:block mx-auto w-full max-w-3xl px-6 pt-24">
        <div className="flex items-center gap-4 border-b border-border pb-4">
          <span className="text-xs uppercase tracking-luxe text-muted-foreground">Search</span>
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="A mood, a memory, a note…"
            className="flex-1 bg-transparent font-display text-5xl outline-none placeholder:text-muted-foreground/50"
          />
          <button onClick={() => setSearchOpen(false)} className="text-xs uppercase tracking-luxe link-underline">
            Esc
          </button>
        </div>
      </div>

      {/* RESULTS AREA */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="mx-auto max-w-3xl px-6 py-6 md:py-10">
          <p className="text-[10px] uppercase tracking-luxe text-muted-foreground mb-6">
            {results.length} {results.length === 1 ? "result" : "results"}
          </p>
          
          <ul className="divide-y divide-border">
            {results.map((p) => (
              <li key={p.id}>
                <Link
                  to="/product/$id"
                  params={{ id: p.id }}
                  onClick={() => setSearchOpen(false)}
                  className="flex items-center gap-4 md:gap-6 py-4 md:py-5 hover:bg-accent px-3 -mx-3 transition-colors group"
                >
                  <div className="relative overflow-hidden w-16 h-16 md:w-20 md:h-20 bg-muted">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-display text-xl md:text-2xl leading-none md:mb-1">{p.name}</h4>
                    <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest">{p.tagline}</p>
                    {/* Only show family on mobile for more context */}
                    <p className="md:hidden text-[9px] text-primary/60 uppercase mt-1">{p.family}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] md:text-xs font-light">${p.price}</span>
                    <ArrowRight size={14} className="text-muted-foreground opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                  </div>
                </Link>
              </li>
            ))}
            
            {results.length === 0 && (
              <li className="py-20 text-center flex flex-col items-center">
                <p className="text-muted-foreground font-display text-2xl mb-2">Nothing matches — yet.</p>
                <p className="text-xs text-muted-foreground/60 max-w-[200px]">Try searching for notes like "Sandalwood" or "Bergamot".</p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}