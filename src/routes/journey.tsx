import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { perfumes } from "@/data/perfumes";

export const Route = createFileRoute("/journey")({
  component: Journey,
  head: () => ({
    meta: [
      { title: "Scent Journey · THE AURA" },
      { name: "description", content: "Discover your fragrance through emotion, weather, and memory." },
    ],
  }),
});

const steps = [
  { q: "What mood do you wish to inhabit?", opts: ["Quiet & tender", "Mysterious", "Luminous", "Confident"] },
  { q: "Choose a weather.", opts: ["First rain", "Summer dusk", "Winter morning", "Autumn smoke"] },
  { q: "Choose a city.", opts: ["Paris", "Marrakech", "Lisbon", "Kyoto"] },
  { q: "Choose a fabric.", opts: ["Bare linen", "Velvet", "Silk", "Worn leather"] },
];

function Journey() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const done = step >= steps.length;

  const select = (opt: string) => {
    setAnswers([...answers, opt]);
    setStep(step + 1);
  };

  const reset = () => {
    setAnswers([]);
    setStep(0);
  };

  return (
    <section className="theme-noir bg-background text-foreground min-h-[calc(100vh-4rem)] relative overflow-hidden">
      <div className="aura" style={{ opacity: 0.3, inset: "20%" }} />
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-luxe text-muted-foreground">Scent Journey</p>
          <h1 className="font-display text-5xl md:text-6xl mt-4">
            {done ? "Composed for you." : "Tell us how you feel."}
          </h1>
        </div>

        {!done ? (
          <div key={step} className="reveal">
            <div className="flex justify-center gap-2 mb-12">
              {steps.map((_, i) => (
                <span
                  key={i}
                  className={`h-px w-12 transition-all ${
                    i <= step ? "bg-foreground" : "bg-border"
                  }`}
                />
              ))}
            </div>
            <p className="font-display text-3xl md:text-4xl text-center mb-12">
              {steps[step].q}
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {steps[step].opts.map((opt) => (
                <button
                  key={opt}
                  onClick={() => select(opt)}
                  className="group relative border border-border p-8 text-left transition-all hover:border-foreground hover:bg-accent overflow-hidden"
                >
                  <div className="aura" style={{ opacity: 0 }} />
                  <span className="relative z-10 font-display text-2xl">{opt}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="reveal">
            <p className="text-center text-muted-foreground max-w-md mx-auto mb-12">
              From your {answers.join(", ").toLowerCase()} — a private composition
              emerges from the maison.
            </p>
            <div className="grid gap-px bg-border">
              {perfumes.map((p) => (
                <Link
                  key={p.id}
                  to="/product/$id"
                  params={{ id: p.id }}
                  className="bg-background p-8 flex items-center gap-8 hover:bg-accent transition-colors group"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-24 w-24 object-cover bg-muted"
                  />
                  <div className="flex-1">
                    <h3 className="font-display text-3xl">{p.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{p.tagline}</p>
                  </div>
                  <span className="text-xs uppercase tracking-luxe opacity-0 group-hover:opacity-100 transition-opacity">
                    Discover →
                  </span>
                </Link>
              ))}
            </div>
            <div className="text-center mt-12">
              <button onClick={reset} className="text-xs uppercase tracking-luxe link-underline">
                Begin again ↺
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
