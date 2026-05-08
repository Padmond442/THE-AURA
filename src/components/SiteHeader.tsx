import { Link } from "@tanstack/react-router";
import { useCart, useUI } from "@/store";
import { Menu, X, Search, ShoppingBag } from "lucide-react";

export function SiteHeader() {
  const count = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));
  const { setCartOpen, setSearchOpen, mobileMenuOpen, setMobileMenuOpen } = useUI();

  const navLinks = [
    { to: "/shop", label: "Shop" },
    { to: "/journey", label: "Scent Journey" },
    { to: "/vault", label: "Vault" },
    { to: "/about", label: "Maison" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/50">
      <div className="mx-auto max-w-7xl px-5 lg:px-10 h-14 md:h-16 flex items-center justify-between">

        {/* Logo - Stays left */}
        <Link to="/" className="font-display text-xl md:text-2xl tracking-tight">
          THE AURA
        </Link>

        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden md:flex items-center gap-10 text-xs uppercase tracking-luxe">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="link-underline">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions - Search, Bag, and Mobile Toggle */}
        <div className="flex items-center gap-3 md:gap-6">

          {/* Search: Icon on mobile, Text on desktop */}
          <button onClick={() => setSearchOpen(true)} className="p-2" aria-label="Search">
            <Search size={20} className="md:hidden" strokeWidth={1.5} />
            <span className="hidden md:block text-xs uppercase tracking-luxe link-underline">Search</span>
          </button>

          {/* Bag: Icon on mobile, Text on desktop */}
          <button onClick={() => setCartOpen(true)} className="p-2 relative" aria-label="Open bag">
            <div className="md:hidden">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute top-1 right-1 bg-primary text-[8px] text-primary-foreground w-3 h-3 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </div>
            <span className="hidden md:block text-xs uppercase tracking-luxe link-underline">
              Bag ({count})
            </span>
          </button>

          {/* Mobile Menu Toggle - Far Right */}
          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay - Slides from right */}
      <div className={`
  fixed inset-0 top-14 z-40 transition-transform duration-500 ease-in-out md:hidden
  /* Explicitly set a solid background and height */
  bg-white dark:bg-black h-screen 
  ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}
`}>
        <nav className="flex flex-col p-10 gap-8 text-xl uppercase tracking-[0.2em] font-light">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className="border-b border-border/20 pb-6 last:border-0"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}