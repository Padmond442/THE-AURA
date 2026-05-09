import { Link } from "@tanstack/react-router";
import { useCart, useUI } from "@/store";
import { useState } from "react";
import { ChevronDown, Menu, Search, ShoppingBag, X } from "lucide-react";

export function SiteHeader() {
  const count = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));
  const { setCartOpen, setSearchOpen } = useUI();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mainNavLinks = [
    { to: "/shop", label: "Shop" },
    { to: "/collections", label: "Collections" },
    { to: "/journey", label: "Journey" },
  ];

  const exploreGroups = [
    {
      eyebrow: "Discover",
      title: "Explore the collection",
      description:
        "Move through THE AURA by scent family, mood, occasion, or the full seasonal edit.",
      links: [
        {
          to: "/categories",
          label: "Categories",
          description: "Browse by fragrance family, intensity, mood, and profile.",
        },
        {
          to: "/collections",
          label: "Collections",
          description: "Curated edits for daily wear, evenings, travel, and signature scent discovery.",
        },
      ],
    },
    {
      eyebrow: "Personal",
      title: "Find your scent",
      description:
        "Tools for choosing, saving, gifting, and returning to fragrances that feel personal.",
      links: [
        {
          to: "/journey",
          label: "Scent Journey",
          description: "Answer guided prompts and discover perfumes matched to your taste.",
        },
        {
          to: "/vault",
          label: "Vault",
          description: "View saved scents and keep track of fragrances you want to revisit.",
        },
      ],
    },
    {
      eyebrow: "Service",
      title: "Gifting and care",
      description:
        "Support for thoughtful gifting, delivery, order tracking, and the story behind the house.",
      links: [
        {
          to: "/gift-finder",
          label: "Gift Finder",
          description: "Choose a scent for someone else by mood, relationship, and occasion.",
        },
        {
          to: "/parcel",
          label: "Parcel",
          description: "Track orders, gifting details, delivery notes, and shipment progress.",
        },
        {
          to: "/about",
          label: "Maison",
          description: "Learn the philosophy, ritual, and design language behind THE AURA.",
        },
      ],
    },
  ];

  const mobileNavLinks = [
    ...mainNavLinks,
    { to: "/categories", label: "Categories" },
    { to: "/gift-finder", label: "Gift Finder" },
    { to: "/vault", label: "Vault" },
    { to: "/parcel", label: "Parcel" },
    { to: "/about", label: "Maison" },
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/75 border-b border-border/50">
      <div className="mx-auto max-w-6xl px-5 lg:px-10 h-14 md:h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="font-display text-xl md:text-2xl tracking-tight shrink-0"
          onClick={closeMobileMenu}
        >
          THE AURA
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-7 lg:gap-10 text-xs uppercase tracking-luxe">
          {mainNavLinks.map((link) => (
            <Link key={link.to} to={link.to} className="link-underline whitespace-nowrap">
              {link.label}
            </Link>
          ))}

          {/* Desktop Wide Dropdown */}
          <div className="relative group">
            <button
              type="button"
              className="flex items-center gap-1.5 uppercase tracking-luxe text-xs link-underline"
              aria-label="Open explore menu"
            >
              Explore
              <ChevronDown
                size={13}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:rotate-180"
              />
            </button>

            <div className="pointer-events-none absolute left-1/2 top-full pt-5 w-[min(92vw,980px)] -translate-x-1/2 opacity-0 translate-y-2 transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0">
              <div className="overflow-hidden rounded-3xl border border-border/60 bg-background/95 backdrop-blur-xl shadow-2xl">
                <div className="grid grid-cols-12">
                  {/* Feature panel */}
                  <div className="col-span-4 bg-secondary/70 p-8 border-r border-border/50">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
                      Explore THE AURA
                    </p>

                    <h3 className="font-display text-4xl leading-none mt-5">
                      Choose by instinct, ritual, or occasion.
                    </h3>

                    <p className="mt-6 text-sm normal-case tracking-normal leading-relaxed text-muted-foreground">
                      Use the expanded menu to move quickly between discovery, gifting,
                      saved scents, delivery, and the story behind the maison.
                    </p>

                    <Link
                      to="/shop"
                      className="mt-8 inline-flex text-[10px] uppercase tracking-luxe link-underline"
                    >
                      View all fragrances →
                    </Link>
                  </div>

                  {/* Informative columns */}
                  <div className="col-span-8 grid grid-cols-3 divide-x divide-border/50">
                    {exploreGroups.map((group) => (
                      <div key={group.title} className="p-7">
                        <p className="text-[9px] uppercase tracking-[0.32em] text-muted-foreground">
                          {group.eyebrow}
                        </p>

                        <h4 className="font-display text-2xl mt-3 leading-tight">
                          {group.title}
                        </h4>

                        <p className="mt-3 text-xs normal-case tracking-normal leading-relaxed text-muted-foreground">
                          {group.description}
                        </p>

                        <div className="mt-7 space-y-1">
                          {group.links.map((link) => (
                            <Link
                              key={link.to}
                              to={link.to}
                              className="block rounded-xl px-3 py-3 -mx-3 transition-colors hover:bg-secondary"
                            >
                              <div className="flex items-center justify-between gap-4">
                                <p className="text-[10px] uppercase tracking-luxe text-foreground">
                                  {link.label}
                                </p>

                                <span className="text-xs text-muted-foreground">→</span>
                              </div>

                              <p className="mt-1.5 text-xs normal-case tracking-normal leading-relaxed text-muted-foreground">
                                {link.description}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 md:gap-5 shrink-0">
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 md:px-0 md:py-0"
            aria-label="Search"
          >
            <Search size={20} className="md:hidden" strokeWidth={1.5} />

            <span className="hidden md:block text-xs uppercase tracking-luxe link-underline">
              Search
            </span>
          </button>

          <button
            onClick={() => setCartOpen(true)}
            className="p-2 md:px-0 md:py-0 relative"
            aria-label="Open bag"
          >
            <div className="md:hidden">
              <ShoppingBag size={20} strokeWidth={1.5} />

              {count > 0 && (
                <span className="absolute top-1 right-1 bg-primary text-[8px] text-primary-foreground w-3 h-3 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </div>

            <span className="hidden md:block text-xs uppercase tracking-luxe link-underline whitespace-nowrap">
              Bag ({count})
            </span>
          </button>

          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`
          fixed inset-0 top-14 z-40 h-[calc(100vh-3.5rem)] bg-white dark:bg-black md:hidden
          transition-transform duration-500 ease-in-out
          ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <nav className="flex flex-col h-full overflow-y-auto px-8 py-8">
          <div className="flex flex-col gap-1">
            {mobileNavLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={closeMobileMenu}
                className="group flex items-center justify-between border-b border-border/20 py-5 text-lg uppercase tracking-[0.22em] font-light"
              >
                <span>{link.label}</span>
                <span className="text-xs opacity-30 transition-opacity group-hover:opacity-70">→</span>
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-8 grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                setSearchOpen(true);
                closeMobileMenu();
              }}
              className="border border-border/30 py-4 text-[10px] uppercase tracking-luxe"
              aria-label="Search"
            >
              Search
            </button>

            <button
              onClick={() => {
                setCartOpen(true);
                closeMobileMenu();
              }}
              className="border border-border/30 py-4 text-[10px] uppercase tracking-luxe"
              aria-label="Open bag"
            >
              Bag ({count})
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}