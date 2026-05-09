import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="theme-noir bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h3 className="font-display text-4xl mb-4">Receive the Maison.</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              Private releases, scent letters, and invitations to the atelier.
            </p>
            <form className="flex border-b border-border max-w-md">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-transparent py-3 outline-none text-sm"
              />
              <button className="text-xs uppercase tracking-luxe">Subscribe →</button>
            </form>
          </div>
          <div>
            <p className="text-xs uppercase tracking-luxe mb-4 text-muted-foreground">Maison</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="link-underline">Our Story</Link></li>
              <li><Link to="/collections" className="link-underline">Collections</Link></li>
              <li><Link to="/blog" className="link-underline">Journal</Link></li>
              <li><Link to="/contact" className="link-underline">Contact</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-luxe mb-4 text-muted-foreground">Discover</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop" className="link-underline">Shop</Link></li>
              <li><Link to="/categories" className="link-underline">Categories</Link></li>
              <li><Link to="/journey" className="link-underline">Scent Journey</Link></li>
              <li><Link to="/gift-finder" className="link-underline">Gift Finder</Link></li>
              <li><Link to="/service/shipping" className="link-underline">Shipping</Link></li>
              <li><Link to="/service/returns" className="link-underline">Returns</Link></li>
              <li><Link to="/service/concierge" className="link-underline">Concierge</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between text-xs uppercase tracking-luxe text-muted-foreground">
          <p>© {new Date().getFullYear()} THE AURA · Imported from France</p>
          <p>Crafted in Grasse</p>
        </div>
      </div>
    </footer>
  );
}
