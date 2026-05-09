import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { perfumes } from "@/data/perfumes";
import { Aura } from "@/components/Aura";

export const Route = createFileRoute("/gift-finder")({
  component: GiftFinder,
  head: () => ({
    meta: [
      { title: "Gift Finder · THE AURA" },
      { name: "description", content: "Find the perfect fragrance gift in three quiet questions." },
    ],
  }),
});

type Step = 0 | 1 | 2 | 3;

function GiftFinder() {
  const [step, setStep] = useState<Step>(0);
  const [recipient, setRecipient] = useState<string>("");
  const [occasion, setOccasion] = useState<string>("");
  const [budget, setBudget] = useState<number>(300);

  const recipients = ["A Lover", "A Parent", "A Friend", "Yourself"];
  const occasions = ["Birthday", "Anniversary", "Just Because", "Milestone"];

  const recommendation = (() => {
    if (occasion === "Anniversary" || recipient === "A Lover") return perfumes.find((p) => p.id === "minuit");
    if (recipient === "A Parent" || occasion === "Milestone") return perfumes.find((p) => p.id === "ombre");
    return perfumes.find((p) => p.id === "blanche");
  })();

  return (
    <section className="theme-noir bg-background text-foreground min-h-[90vh] flex items-center">
      <div className="mx-auto max-w-3xl w-full px-6 lg:px-10 py-24">
        <p className="text-xs uppercase tracking-luxe text-muted-foreground">Gift Finder · Step {Math.min(step + 1, 4)} / 4</p>

        {step === 0 && (
          <div className="reveal">
            <h1 className="font-display text-5xl md:text-7xl mt-6">Who is it for?</h1>
            <div className="mt-12 grid grid-cols-2 gap-px bg-border">
              {recipients.map((r) => (
                <button
                  key={r}
                  onClick={() => { setRecipient(r); setStep(1); }}
                  className="bg-background hover:bg-secondary p-10 text-left font-display text-3xl transition-colors"
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="reveal">
            <h1 className="font-display text-5xl md:text-7xl mt-6">For what occasion?</h1>
            <div className="mt-12 grid grid-cols-2 gap-px bg-border">
              {occasions.map((o) => (
                <button
                  key={o}
                  onClick={() => { setOccasion(o); setStep(2); }}
                  className="bg-background hover:bg-secondary p-10 text-left font-display text-3xl transition-colors"
                >
                  {o}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="reveal">
            <h1 className="font-display text-5xl md:text-7xl mt-6">A budget?</h1>
            <div className="mt-12">
              <p className="font-display text-6xl">${budget}</p>
              <input
                type="range"
                min={150}
                max={500}
                step={5}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full mt-8 accent-foreground"
              />
              <button
                onClick={() => setStep(3)}
                className="mt-12 bg-foreground text-background px-10 py-4 text-xs uppercase tracking-luxe"
              >
                Reveal the gift →
              </button>
            </div>
          </div>
        )}

        {step === 3 && recommendation && (
          <div className="reveal relative">
            <Aura variant={recommendation.aura} intense className="!opacity-50" />
            <div className="relative z-10">
              <p className="text-xs uppercase tracking-luxe text-muted-foreground mt-6">For {recipient.toLowerCase()} · {occasion.toLowerCase()}</p>
              <h1 className="font-display text-6xl md:text-8xl mt-4">{recommendation.name}</h1>
              <p className="italic text-muted-foreground mt-4 text-xl">{recommendation.tagline}</p>
              <p className="mt-6 max-w-md">{recommendation.story}</p>
              <div className="mt-10 flex gap-3">
                <Link
                  to="/product/$id"
                  params={{ id: recommendation.id }}
                  className="bg-foreground text-background px-8 py-4 text-xs uppercase tracking-luxe"
                >
                  Discover · ${recommendation.price}
                </Link>
                <button
                  onClick={() => { setStep(0); setRecipient(""); setOccasion(""); }}
                  className="border border-border px-8 py-4 text-xs uppercase tracking-luxe link-underline"
                >
                  Start over
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
