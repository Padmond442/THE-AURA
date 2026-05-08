import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/store";
import { perfumes } from "@/data/perfumes";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
  head: () => ({ meta: [{ title: "Checkout · THE AURA" }] }),
});

function Checkout() {
  const { items, clear } = useCart();
  const navigate = useNavigate();
  const [done, setDone] = useState(false);

  const lines = items
    .map((i) => {
      const p = perfumes.find((x) => x.id === i.id);
      return p ? { p, qty: i.qty } : null;
    })
    .filter(Boolean) as { p: (typeof perfumes)[number]; qty: number }[];
  const subtotal = lines.reduce((n, l) => n + l.p.price * l.qty, 0);

  if (done) {
    return (
      <section className="theme-noir bg-background text-foreground min-h-[80vh] flex items-center">
        <div className="mx-auto max-w-xl text-center px-6">
          <p className="text-xs uppercase tracking-luxe text-muted-foreground">Confirmed</p>
          <h1 className="font-display text-6xl mt-4">Merci.</h1>
          <p className="text-muted-foreground mt-6">
            Your order has been received. A confirmation will arrive shortly,
            with tracking once your scent leaves Grasse.
          </p>
          <Link to="/shop" className="mt-10 inline-block link-underline text-xs uppercase tracking-luxe">
            Continue browsing →
          </Link>
        </div>
      </section>
    );
  }

  if (lines.length === 0) {
    return (
      <section className="py-32 text-center px-6">
        <h1 className="font-display text-5xl">Your bag is empty.</h1>
        <Link to="/shop" className="mt-8 inline-block link-underline text-xs uppercase tracking-luxe">
          Browse the collection →
        </Link>
      </section>
    );
  }

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-10 grid lg:grid-cols-5 gap-12">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            clear();
            setDone(true);
            window.scrollTo({ top: 0 });
          }}
          className="lg:col-span-3 space-y-12"
        >
          <div>
            <p className="text-xs uppercase tracking-luxe text-muted-foreground">01 · Contact</p>
            <input required type="email" placeholder="Email" className="w-full mt-3 bg-transparent border-b border-border py-3 outline-none focus:border-foreground" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-luxe text-muted-foreground">02 · Delivery</p>
            <div className="grid sm:grid-cols-2 gap-4 mt-3">
              <input required placeholder="First name" className="bg-transparent border-b border-border py-3 outline-none focus:border-foreground" />
              <input required placeholder="Last name" className="bg-transparent border-b border-border py-3 outline-none focus:border-foreground" />
              <input required placeholder="Address" className="sm:col-span-2 bg-transparent border-b border-border py-3 outline-none focus:border-foreground" />
              <input required placeholder="City" className="bg-transparent border-b border-border py-3 outline-none focus:border-foreground" />
              <input required placeholder="Postal code" className="bg-transparent border-b border-border py-3 outline-none focus:border-foreground" />
              <input required placeholder="Country" className="sm:col-span-2 bg-transparent border-b border-border py-3 outline-none focus:border-foreground" />
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-luxe text-muted-foreground">03 · Payment</p>
            <input required placeholder="Card number" className="w-full mt-3 bg-transparent border-b border-border py-3 outline-none focus:border-foreground" />
            <div className="grid grid-cols-2 gap-4 mt-3">
              <input required placeholder="MM / YY" className="bg-transparent border-b border-border py-3 outline-none focus:border-foreground" />
              <input required placeholder="CVC" className="bg-transparent border-b border-border py-3 outline-none focus:border-foreground" />
            </div>
          </div>
          <button type="submit" className="w-full bg-foreground text-background py-5 text-xs uppercase tracking-luxe">
            Confirm order · ${subtotal}
          </button>
          <button type="button" onClick={() => navigate({ to: "/shop" })} className="block mx-auto text-xs uppercase tracking-luxe link-underline">
            ← Continue shopping
          </button>
        </form>

        <aside className="lg:col-span-2 bg-secondary p-8">
          <p className="text-xs uppercase tracking-luxe text-muted-foreground">Order summary</p>
          <ul className="mt-6 divide-y divide-border">
            {lines.map(({ p, qty }) => (
              <li key={p.id} className="py-4 flex gap-4 items-center">
                <img src={p.image} alt={p.name} className="w-14 h-16 object-cover bg-background" />
                <div className="flex-1">
                  <p className="font-display text-lg">{p.name}</p>
                  <p className="text-xs text-muted-foreground">Qty {qty}</p>
                </div>
                <p className="text-sm tabular-nums">${p.price * qty}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 pt-6 border-t border-border space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${subtotal}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>Complimentary</span></div>
            <div className="flex justify-between font-display text-2xl pt-3"><span>Total</span><span>${subtotal}</span></div>
          </div>
        </aside>
      </div>
    </section>
  );
}
