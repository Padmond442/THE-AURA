import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { useCart, useUI } from "@/store";
import { perfumes } from "@/data/perfumes";

export function CartDrawer() {
  const { cartOpen, setCartOpen } = useUI();
  const { items, setQty, clear } = useCart();

  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "";
  }, [cartOpen]);

  const lines = items
    .map((i) => {
      const p = perfumes.find((x) => x.id === i.id);
      return p ? { p, qty: i.qty } : null;
    })
    .filter(Boolean) as { p: (typeof perfumes)[number]; qty: number }[];

  const subtotal = lines.reduce((n, l) => n + l.p.price * l.qty, 0);

  return (
    <>
      <div
        onClick={() => setCartOpen(false)}
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity ${
          cartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <aside
        className={`theme-noir fixed top-0 right-0 bottom-0 z-[70] w-full sm:w-[460px] bg-background text-foreground border-l border-border transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <p className="text-xs uppercase tracking-luxe">Your Bag · {lines.length}</p>
          <button onClick={() => setCartOpen(false)} className="text-xs uppercase tracking-luxe link-underline">
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {lines.length === 0 ? (
            <div className="p-10 text-center">
              <p className="font-display text-3xl">Your bag is quiet.</p>
              <p className="text-sm text-muted-foreground mt-3">
                Begin with the Scent Journey, or browse the collection.
              </p>
              <Link
                to="/shop"
                onClick={() => setCartOpen(false)}
                className="mt-8 inline-block text-xs uppercase tracking-luxe link-underline"
              >
                Explore →
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {lines.map(({ p, qty }) => (
                <li key={p.id} className="p-6 flex gap-4">
                  <img src={p.image} alt={p.name} className="w-20 h-24 object-cover bg-muted" />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-display text-xl">{p.name}</h4>
                      <p className="text-sm tabular-nums">${p.price * qty}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">100ml · EDP</p>
                    <div className="mt-4 flex items-center gap-3 text-sm">
                      <button onClick={() => setQty(p.id, qty - 1)} className="w-7 h-7 border border-border">−</button>
                      <span className="tabular-nums w-6 text-center">{qty}</span>
                      <button onClick={() => setQty(p.id, qty + 1)} className="w-7 h-7 border border-border">+</button>
                      <button onClick={() => setQty(p.id, 0)} className="ml-auto text-xs uppercase tracking-luxe text-muted-foreground link-underline">
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-border p-6 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="tabular-nums">${subtotal}</span>
            </div>
            <p className="text-xs text-muted-foreground">Complimentary global shipping. Taxes calculated at checkout.</p>
            <Link
              to="/checkout"
              onClick={() => setCartOpen(false)}
              className="block w-full text-center bg-foreground text-background py-4 text-xs uppercase tracking-luxe hover:opacity-90"
            >
              Checkout · ${subtotal}
            </Link>
            <button onClick={clear} className="w-full text-xs uppercase tracking-luxe text-muted-foreground link-underline">
              Empty bag
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
