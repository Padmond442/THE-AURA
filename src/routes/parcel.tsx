import { createFileRoute, Link } from "@tanstack/react-router";
import { useParcel } from "@/store";
import { perfumes } from "@/data/perfumes";

export const Route = createFileRoute("/parcel")({
  component: Parcel,
  head: () => ({
    meta: [
      { title: "The Parcel · THE AURA" },
      { name: "description", content: "Curate a gift parcel and design the card that travels with it." },
    ],
  }),
});

const PALETTE = [
  "#0a0a0a",
  "#1c1c1c",
  "#3a2418",
  "#5a4a3a",
  "#f5f1ea",
  "#e8d9c4",
  "#c9a96e",
  "#7d5a3c",
  "#2a3a4a",
  "#8b1a1a",
];

function Swatch({ value, active, onClick }: { value: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={value}
      style={{ background: value }}
      className={`h-7 w-7 rounded-full border transition-transform ${
        active ? "border-foreground scale-110 ring-1 ring-foreground ring-offset-2 ring-offset-background" : "border-border hover:scale-105"
      }`}
    />
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-luxe text-muted-foreground">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function Parcel() {
  const { items, card, remove, setCard, reset } = useParcel();
  const products = items.map((id) => perfumes.find((p) => p.id === id)).filter(Boolean) as typeof perfumes;
  const total = products.reduce((n, p) => n + p.price, 0);

  return (
    <section className="bg-background min-h-[88vh]">
      {/* Header */}
      <header className="theme-noir bg-background text-foreground py-20 md:py-28 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-luxe text-muted-foreground">A gift, considered.</p>
            <h1 className="font-display text-6xl md:text-8xl mt-4 leading-none">The Parcel.</h1>
          </div>
          <div className="flex gap-10 text-xs uppercase tracking-luxe">
            <div>
              <p className="text-muted-foreground">Scents</p>
              <p className="font-display text-4xl mt-1 text-foreground">{products.length}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Total</p>
              <p className="font-display text-4xl mt-1 text-foreground">${total}</p>
            </div>
          </div>
        </div>
      </header>

      {products.length === 0 ? (
        <div className="mx-auto max-w-2xl px-6 py-32 text-center">
          <p className="font-display text-4xl md:text-5xl">Your parcel is empty.</p>
          <p className="text-muted-foreground mt-6">
            Add scents from any product page or the shop. Each piece will arrive in a single parcel with your card.
          </p>
          <Link to="/shop" className="mt-10 inline-block bg-foreground text-background px-10 py-4 text-xs uppercase tracking-luxe">
            Browse the Maison →
          </Link>
        </div>
      ) : (
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid lg:grid-cols-[1fr_1.1fr] gap-16">
          {/* LEFT — items + form */}
          <div>
            <p className="text-xs uppercase tracking-luxe text-muted-foreground mb-4">In this parcel</p>
            <ul className="divide-y divide-border border-y border-border mb-12">
              {products.map((p) => (
                <li key={p.id} className="py-4 flex items-center gap-4">
                  <img src={p.image} alt={p.name} className="h-16 w-16 object-cover bg-muted" />
                  <div className="flex-1">
                    <p className="font-display text-2xl">{p.name}</p>
                    <p className="text-xs text-muted-foreground italic">{p.tagline}</p>
                  </div>
                  <p className="text-sm tabular-nums">${p.price}</p>
                  <button
                    onClick={() => remove(p.id)}
                    className="text-[10px] uppercase tracking-luxe text-muted-foreground link-underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <p className="text-xs uppercase tracking-luxe text-muted-foreground mb-6">Design the card</p>
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="To">
                  <input
                    value={card.recipient}
                    onChange={(e) => setCard({ recipient: e.target.value })}
                    placeholder="Recipient's name"
                    className="w-full bg-transparent border-b border-border py-2 outline-none focus:border-foreground"
                  />
                </Field>
                <Field label="From">
                  <input
                    value={card.sender}
                    onChange={(e) => setCard({ sender: e.target.value })}
                    placeholder="Your name"
                    className="w-full bg-transparent border-b border-border py-2 outline-none focus:border-foreground"
                  />
                </Field>
              </div>

              <Field label="Message">
                <textarea
                  value={card.message}
                  onChange={(e) => setCard({ message: e.target.value.slice(0, 200) })}
                  rows={4}
                  placeholder="A few words to travel with the scent…"
                  className="w-full bg-transparent border border-border p-3 outline-none focus:border-foreground resize-none"
                />
                <span className="text-[10px] text-muted-foreground">{card.message.length}/200</span>
              </Field>

              <Field label="Card front">
                <div className="flex flex-wrap gap-3">
                  {PALETTE.map((c) => (
                    <Swatch key={`f-${c}`} value={c} active={card.frontColor === c} onClick={() => setCard({ frontColor: c })} />
                  ))}
                </div>
              </Field>

              <Field label="Card back">
                <div className="flex flex-wrap gap-3">
                  {PALETTE.map((c) => (
                    <Swatch key={`b-${c}`} value={c} active={card.backColor === c} onClick={() => setCard({ backColor: c })} />
                  ))}
                </div>
              </Field>

              <Field label="Lettering">
                <div className="flex flex-wrap gap-3">
                  {(["#f5f1ea", "#0a0a0a", "#c9a96e", "#8b1a1a"] as const).map((c) => (
                    <Swatch key={`t-${c}`} value={c} active={card.textColor === c} onClick={() => setCard({ textColor: c })} />
                  ))}
                </div>
              </Field>

              <Field label="Typography">
                <div className="flex gap-2">
                  {(["display", "sans"] as const).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setCard({ font: f })}
                      className={`px-4 py-2 text-[10px] uppercase tracking-luxe border ${
                        card.font === f ? "bg-foreground text-background border-foreground" : "border-border"
                      }`}
                    >
                      {f === "display" ? "Serif" : "Sans"}
                    </button>
                  ))}
                </div>
              </Field>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-2">
              <Link
                to="/checkout"
                className="flex-1 bg-foreground text-background px-8 py-4 text-xs uppercase tracking-luxe text-center hover:opacity-90"
              >
                Proceed to checkout · ${total}
              </Link>
              <button
                onClick={reset}
                className="px-6 py-4 text-xs uppercase tracking-luxe border border-border hover:bg-secondary"
              >
                Reset
              </button>
            </div>
          </div>

          {/* RIGHT — preview */}
          <div className="lg:sticky lg:top-24 self-start">
            <p className="text-xs uppercase tracking-luxe text-muted-foreground mb-6">Preview</p>
            <div className="space-y-8">
              {/* Front */}
              <div
                className="relative aspect-[3/2] rounded-sm shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] overflow-hidden p-8 flex flex-col justify-between transition-colors"
                style={{ background: card.frontColor, color: card.textColor }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[9px] uppercase tracking-luxe opacity-70">For</p>
                    <p
                      className={`mt-2 ${card.font === "display" ? "font-display text-4xl" : "text-2xl tracking-tight"}`}
                    >
                      {card.recipient || "Their name"}
                    </p>
                  </div>
                  <p className="font-display text-xl tracking-tight">M.</p>
                </div>
                <div>
                  <p className={`leading-snug ${card.font === "display" ? "font-display text-2xl italic" : "text-base"}`}>
                    {card.message || "A scent kept in confidence."}
                  </p>
                  <div className="mt-6 flex justify-between text-[9px] uppercase tracking-luxe opacity-70">
                    <span>From {card.sender || "you"}</span>
                    <span>THE AURA</span>
                  </div>
                </div>
              </div>

              {/* Back */}
              <div
                className="relative aspect-[3/2] rounded-sm shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] overflow-hidden p-8 flex flex-col justify-between transition-colors"
                style={{
                  background: card.backColor,
                  color:
                    card.backColor === "#f5f1ea" || card.backColor === "#e8d9c4"
                      ? "#0a0a0a"
                      : "#f5f1ea",
                }}
              >
                <div className="flex justify-between items-start">
                  <p className="font-display text-3xl tracking-tight">THE AURA</p>
                  <p className="text-[9px] uppercase tracking-luxe opacity-70">Maison de Parfum · Grasse</p>
                </div>
                <div className="grid grid-cols-3 gap-4 text-[9px] uppercase tracking-luxe opacity-80">
                  <div>
                    <p className="opacity-60">Atelier</p>
                    <p className="mt-1 normal-case tracking-normal">12 rue de Grasse, 06130 France</p>
                  </div>
                  <div>
                    <p className="opacity-60">Concierge</p>
                    <p className="mt-1 normal-case tracking-normal">concierge@aura.com</p>
                  </div>
                  <div>
                    <p className="opacity-60">Care</p>
                    <p className="mt-1 normal-case tracking-normal">Keep cool · Out of light</p>
                  </div>
                </div>
              </div>

              <p className="text-[10px] uppercase tracking-luxe text-muted-foreground text-center">
                Hand-pressed · Cotton paper · 110×165 mm
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
