import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact · THE AURA" },
      { name: "description", content: "Reach the Maison — concierge, press, and private appointments." },
    ],
  }),
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [topic, setTopic] = useState("Concierge");

  return (
    <section className="bg-background min-h-[90vh]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-24 grid lg:grid-cols-5 gap-16">
        <aside className="lg:col-span-2">
          <p className="text-xs uppercase tracking-luxe text-muted-foreground">Reach the Maison</p>
          <h1 className="font-display text-5xl md:text-7xl mt-4 leading-none">Speak with us.</h1>
          <p className="text-muted-foreground mt-6 max-w-md">
            We respond to every letter, in the order received, in the language you write. Allow up to 48 hours.
          </p>

          <div className="mt-12 space-y-8 text-sm">
            <div>
              <p className="text-[10px] uppercase tracking-luxe text-muted-foreground">Concierge</p>
              <p className="mt-2">concierge@aura.com</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-luxe text-muted-foreground">Press</p>
              <p className="mt-2">press@aura.com</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-luxe text-muted-foreground">Atelier</p>
              <p className="mt-2">14 rue des Parfumeurs<br />06130 Grasse, France</p>
            </div>
          </div>
        </aside>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="lg:col-span-3 border border-border p-10"
        >
          {sent ? (
            <div className="py-20 text-center reveal">
              <p className="text-xs uppercase tracking-luxe text-muted-foreground">Letter sent</p>
              <h2 className="font-display text-5xl mt-4">Merci.</h2>
              <p className="text-muted-foreground mt-4">A response is composed by hand. We will write back soon.</p>
            </div>
          ) : (
            <>
              <p className="text-[10px] uppercase tracking-luxe text-muted-foreground">Subject</p>
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {["Concierge", "Press", "Wholesale", "Other"].map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setTopic(t)}
                    className={`py-3 text-xs uppercase tracking-luxe border transition-colors ${
                      topic === t ? "bg-foreground text-background border-foreground" : "border-border hover:bg-secondary"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="mt-8 grid sm:grid-cols-2 gap-6">
                <label className="block">
                  <span className="text-[10px] uppercase tracking-luxe text-muted-foreground">Name</span>
                  <input required className="mt-2 w-full bg-transparent border-b border-border py-3 outline-none focus:border-foreground transition-colors" />
                </label>
                <label className="block">
                  <span className="text-[10px] uppercase tracking-luxe text-muted-foreground">Email</span>
                  <input required type="email" className="mt-2 w-full bg-transparent border-b border-border py-3 outline-none focus:border-foreground transition-colors" />
                </label>
              </div>

              <label className="block mt-6">
                <span className="text-[10px] uppercase tracking-luxe text-muted-foreground">Message</span>
                <textarea required rows={6} className="mt-2 w-full bg-transparent border-b border-border py-3 outline-none focus:border-foreground transition-colors resize-none" />
              </label>

              <button className="mt-10 bg-foreground text-background px-10 py-4 text-xs uppercase tracking-luxe">
                Send letter →
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
