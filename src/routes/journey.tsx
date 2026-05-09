import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { perfumes } from "@/data/perfumes";

export const Route = createFileRoute("/journey")({
  component: Journey,
  head: () => ({
    meta: [
      { title: "Scent Journey · THE AURA" },
      {
        name: "description",
        content: "Discover your fragrance through emotion, weather, and memory.",
      },
    ],
  }),
});

const steps = [
  {
    eyebrow: "Mood",
    q: "What mood do you wish to inhabit?",
    helper: "Start with the feeling you want the fragrance to carry.",
    opts: [
      {
        label: "Quiet & tender",
        detail: "Soft, intimate, close to skin.",
      },
      {
        label: "Mysterious",
        detail: "Dark, magnetic, evening-weight.",
      },
      {
        label: "Luminous",
        detail: "Clean, bright, quietly radiant.",
      },
      {
        label: "Confident",
        detail: "Polished, direct, memorable.",
      },
    ],
  },
  {
    eyebrow: "Weather",
    q: "Choose a weather.",
    helper: "Weather gives the scent its atmosphere.",
    opts: [
      {
        label: "First rain",
        detail: "Fresh, mineral, newly awakened.",
      },
      {
        label: "Summer dusk",
        detail: "Warm, golden, slow-moving.",
      },
      {
        label: "Winter morning",
        detail: "Crisp, clear, composed.",
      },
      {
        label: "Autumn smoke",
        detail: "Dry, ambered, quietly deep.",
      },
    ],
  },
  {
    eyebrow: "Place",
    q: "Choose a city.",
    helper: "Place gives the fragrance its rhythm.",
    opts: [
      {
        label: "Paris",
        detail: "Elegant, powdered, restrained.",
      },
      {
        label: "Marrakech",
        detail: "Spiced, warm, textured.",
      },
      {
        label: "Lisbon",
        detail: "Salted air, amber light.",
      },
      {
        label: "Kyoto",
        detail: "Still, wooded, ritualistic.",
      },
    ],
  },
  {
    eyebrow: "Texture",
    q: "Choose a fabric.",
    helper: "Texture decides how the scent should sit.",
    opts: [
      {
        label: "Bare linen",
        detail: "Clean, breathable, effortless.",
      },
      {
        label: "Velvet",
        detail: "Plush, sensual, enveloping.",
      },
      {
        label: "Silk",
        detail: "Smooth, luminous, fluid.",
      },
      {
        label: "Worn leather",
        detail: "Warm, bold, lived-in.",
      },
    ],
  },
];

function Journey() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const done = step >= steps.length;
  const progress = done ? 100 : ((step + 1) / steps.length) * 100;

  const recommendations = useMemo(() => {
    if (!done) return [];

    const answerText = answers.join(" ").toLowerCase();

    const scored = perfumes.map((perfume) => {
      const searchable = [
        perfume.name,
        perfume.tagline,
        perfume.family,
        perfume.story,
        perfume.aura,
        ...perfume.mood,
        ...perfume.notes.top,
        ...perfume.notes.heart,
        ...perfume.notes.base,
      ]
        .join(" ")
        .toLowerCase();

      let score = 0;

      if (answerText.includes("quiet") || answerText.includes("tender")) {
        if (searchable.includes("soft") || searchable.includes("floral") || searchable.includes("iris")) {
          score += 2;
        }
      }

      if (answerText.includes("mysterious") || answerText.includes("smoke") || answerText.includes("velvet")) {
        if (searchable.includes("oud") || searchable.includes("amber") || searchable.includes("oriental")) {
          score += 3;
        }
      }

      if (answerText.includes("luminous") || answerText.includes("linen") || answerText.includes("winter")) {
        if (searchable.includes("aromatic") || searchable.includes("citrus") || searchable.includes("bergamot")) {
          score += 2;
        }
      }

      if (answerText.includes("confident") || answerText.includes("leather")) {
        if (searchable.includes("woody") || searchable.includes("leather") || searchable.includes("vetiver")) {
          score += 2;
        }
      }

      if (answerText.includes("summer") || answerText.includes("lisbon")) {
        if (searchable.includes("warm") || searchable.includes("vanilla") || searchable.includes("amber")) {
          score += 1;
        }
      }

      return { perfume, score };
    });

    return scored
      .sort((a, b) => b.score - a.score)
      .map((item) => item.perfume)
      .slice(0, 4);
  }, [answers, done]);

  const select = (opt: string) => {
    setAnswers((current) => [...current, opt]);
    setStep((current) => current + 1);
  };

  const back = () => {
    if (step === 0) return;

    setAnswers((current) => current.slice(0, -1));
    setStep((current) => current - 1);
  };

  const reset = () => {
    setAnswers([]);
    setStep(0);
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-white text-zinc-950">
      {/* HERO */}
      <section className="bg-zinc-950 text-white border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 pt-28 md:pt-32 pb-14 md:pb-18">
          <div className="max-w-4xl">
            <p className="text-[10px] uppercase tracking-luxe text-white/45">
              Scent Journey
            </p>

            <h1 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight mt-5">
              {done ? "Composed for you." : "Find your fragrance."}
            </h1>

            <p className="mt-6 text-sm md:text-base leading-relaxed text-white/55 max-w-xl">
              Answer four quiet prompts. We will suggest scents by mood, weather, place, and texture.
            </p>
          </div>

          <div className="mt-10 max-w-xl">
            <div className="h-px bg-white/15">
              <div
                className="h-px bg-white transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-4 grid grid-cols-4 gap-4">
              {steps.map((item, i) => (
                <p
                  key={item.eyebrow}
                  className={`text-[9px] uppercase tracking-[0.22em] ${
                    i < step || done
                      ? "text-white"
                      : i === step
                        ? "text-white/60"
                        : "text-white/25"
                  }`}
                >
                  {item.eyebrow}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {!done ? (
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-6 lg:px-10 py-12 md:py-20">
            <div className="grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-20">
              {/* STATUS */}
              <aside>
                <div className="lg:sticky lg:top-28">
                  <p className="text-[10px] uppercase tracking-luxe text-zinc-400">
                    Step {step + 1} of {steps.length}
                  </p>

                  <h2 className="font-display text-4xl mt-4 leading-none">
                    {steps[step].eyebrow}
                  </h2>

                  <p className="mt-5 text-sm leading-relaxed text-zinc-500">
                    {steps[step].helper}
                  </p>

                  {answers.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-zinc-200">
                      <p className="text-[10px] uppercase tracking-luxe text-zinc-400 mb-4">
                        Selected
                      </p>

                      <div className="space-y-2">
                        {answers.map((answer) => (
                          <p key={answer} className="text-sm text-zinc-600">
                            {answer}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={back}
                    disabled={step === 0}
                    className="mt-8 inline-flex items-center gap-2 text-[10px] uppercase tracking-luxe text-zinc-500 disabled:opacity-30 disabled:pointer-events-none hover:text-zinc-950 transition-colors"
                  >
                    <ArrowLeft size={14} strokeWidth={1.5} />
                    Back
                  </button>
                </div>
              </aside>

              {/* QUESTION */}
              <div key={step} className="reveal">
                <p className="text-[10px] uppercase tracking-luxe text-zinc-400">
                  Choose one
                </p>

                <h2 className="font-display text-4xl md:text-6xl leading-tight mt-3 max-w-3xl">
                  {steps[step].q}
                </h2>

                <div className="mt-10 grid sm:grid-cols-2 border-t border-l border-zinc-200">
                  {steps[step].opts.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => select(opt.label)}
                      className="group min-h-[150px] border-r border-b border-zinc-200 bg-white p-6 md:p-8 text-left transition-colors hover:bg-zinc-950"
                    >
                      <h3 className="font-display text-3xl md:text-4xl transition-colors group-hover:text-white">
                        {opt.label}
                      </h3>

                      <p className="mt-4 text-sm leading-relaxed text-zinc-500 transition-colors group-hover:text-white/55 max-w-sm">
                        {opt.detail}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-6 lg:px-10 py-12 md:py-20">
            <div className="grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-20">
              {/* SUMMARY */}
              <aside>
                <div className="lg:sticky lg:top-28">
                  <p className="text-[10px] uppercase tracking-luxe text-zinc-400">
                    Your atmosphere
                  </p>

                  <h2 className="font-display text-4xl mt-4 leading-none">
                    {answers[0]}
                  </h2>

                  <p className="mt-5 text-sm leading-relaxed text-zinc-500">
                    From your {answers.join(", ").toLowerCase()}, THE AURA suggests these closest matches.
                  </p>

                  <button
                    onClick={reset}
                    className="mt-8 inline-flex items-center gap-2 text-[10px] uppercase tracking-luxe text-zinc-500 hover:text-zinc-950 transition-colors"
                  >
                    <RotateCcw size={14} strokeWidth={1.5} />
                    Begin again
                  </button>
                </div>
              </aside>

              {/* RESULTS */}
              <div>
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                  <div>
                    <p className="text-[10px] uppercase tracking-luxe text-zinc-400">
                      Recommended
                    </p>

                    <h2 className="font-display text-4xl md:text-5xl mt-3">
                      Your matches.
                    </h2>
                  </div>

                  <Link
                    to="/shop"
                    className="text-[10px] uppercase tracking-luxe text-zinc-500 hover:text-zinc-950 link-underline"
                  >
                    View all fragrances
                  </Link>
                </div>

                <div className="border-t border-l border-zinc-200">
                  {recommendations.map((p) => (
                    <Link
                      key={p.id}
                      to="/product/$id"
                      params={{ id: p.id }}
                      className="group grid grid-cols-[88px_1fr] md:grid-cols-[112px_1fr_auto] items-center gap-5 md:gap-8 border-r border-b border-zinc-200 bg-white p-4 md:p-5 transition-colors hover:bg-zinc-50"
                    >
                      <div className="aspect-square bg-zinc-50 overflow-hidden">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-full w-full object-contain p-3 transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-luxe text-zinc-400">
                          {p.family}
                        </p>

                        <h3 className="font-display text-3xl md:text-4xl mt-2">
                          {p.name}
                        </h3>

                        <p className="text-sm text-zinc-500 mt-1 line-clamp-2">
                          {p.tagline}
                        </p>
                      </div>

                      <div className="hidden md:flex items-center pr-3">
                        <span className="text-[10px] uppercase tracking-luxe text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          View →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}