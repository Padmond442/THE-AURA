import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles } from "lucide-react";
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
    helper: "Begin with the emotional atmosphere you want the fragrance to create.",
    opts: [
      {
        label: "Quiet & tender",
        detail: "Soft skin, close conversation, gentle presence.",
      },
      {
        label: "Mysterious",
        detail: "Shadowed rooms, late hours, magnetic restraint.",
      },
      {
        label: "Luminous",
        detail: "Clean air, open windows, morning clarity.",
      },
      {
        label: "Confident",
        detail: "Tailored energy, direct gaze, lasting impression.",
      },
    ],
  },
  {
    eyebrow: "Weather",
    q: "Choose a weather.",
    helper: "Weather changes how memory feels. Choose the climate of your scent.",
    opts: [
      {
        label: "First rain",
        detail: "Mineral, clean, intimate, newly awakened.",
      },
      {
        label: "Summer dusk",
        detail: "Warm air, golden skin, slow brightness.",
      },
      {
        label: "Winter morning",
        detail: "Crisp light, silence, polished freshness.",
      },
      {
        label: "Autumn smoke",
        detail: "Dry leaves, amber heat, quiet depth.",
      },
    ],
  },
  {
    eyebrow: "Place",
    q: "Choose a city.",
    helper: "A place gives the fragrance its architecture and rhythm.",
    opts: [
      {
        label: "Paris",
        detail: "Powder, polish, elegance, restraint.",
      },
      {
        label: "Marrakech",
        detail: "Spice, heat, texture, glowing walls.",
      },
      {
        label: "Lisbon",
        detail: "Salt air, tiled streets, amber light.",
      },
      {
        label: "Kyoto",
        detail: "Stillness, incense, woods, quiet ritual.",
      },
    ],
  },
  {
    eyebrow: "Texture",
    q: "Choose a fabric.",
    helper: "Texture decides how the scent should sit on the skin.",
    opts: [
      {
        label: "Bare linen",
        detail: "Clean, breathable, effortless, close.",
      },
      {
        label: "Velvet",
        detail: "Deep, plush, sensual, evening-weight.",
      },
      {
        label: "Silk",
        detail: "Smooth, luminous, refined, fluid.",
      },
      {
        label: "Worn leather",
        detail: "Warm, lived-in, bold, intimate.",
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
    <main className="min-h-[calc(100vh-4rem)] bg-white text-zinc-950 overflow-hidden">
      {/* HERO */}
      <section className="theme-noir relative overflow-hidden border-b border-white/10 bg-zinc-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_34%),radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_28%),linear-gradient(to_bottom,rgba(255,255,255,0.04),transparent)] pointer-events-none" />
        <div className="absolute inset-0 grain opacity-20 pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 pt-28 md:pt-32 pb-14 md:pb-20">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <p className="text-[10px] uppercase tracking-luxe text-white/45">
                Scent Journey
              </p>

              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight mt-5 max-w-4xl text-white">
                {done ? "Composed for you." : "Find the scent your mood remembers."}
              </h1>
            </div>

            <div className="lg:col-span-5">
              <p className="text-sm md:text-base leading-relaxed text-white/55 max-w-md lg:ml-auto">
                Answer four sensory prompts. We translate mood, weather, place, and texture into a fragrance direction you can wear.
              </p>

              <div className="mt-8 grid grid-cols-4 gap-2 max-w-md lg:ml-auto">
                {steps.map((item, i) => (
                  <div key={item.eyebrow}>
                    <div
                      className={`h-1 rounded-full transition-colors ${
                        i < step || done
                          ? "bg-white"
                          : i === step
                            ? "bg-white/50"
                            : "bg-white/15"
                      }`}
                    />
                    <p className="mt-2 text-[9px] uppercase tracking-[0.24em] text-white/35 hidden sm:block">
                      {item.eyebrow}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {!done ? (
        <section className="relative bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12 md:py-20">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
              {/* LEFT PANEL */}
              <aside className="lg:col-span-4">
                <div className="lg:sticky lg:top-28 p-6 md:p-8">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] uppercase tracking-luxe text-zinc-500">
                      Step {step + 1} of {steps.length}
                    </p>

                    <span className="text-[10px] uppercase tracking-luxe text-zinc-400">
                      {Math.round(progress)}%
                    </span>
                  </div>

                  <div className="mt-5 h-1 bg-zinc-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-zinc-950 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <h2 className="font-display text-4xl md:text-5xl leading-none mt-8">
                    {steps[step].eyebrow}
                  </h2>

                  <p className="mt-5 text-sm leading-relaxed text-zinc-500">
                    {steps[step].helper}
                  </p>

                  {answers.length > 0 && (
                    <div className="mt-8 border-t border-zinc-200 pt-6">
                      <p className="text-[10px] uppercase tracking-luxe text-zinc-400 mb-4">
                        Your trail
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {answers.map((answer) => (
                          <span
                            key={answer}
                            className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-zinc-600"
                          >
                            {answer}
                          </span>
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

              {/* QUESTION AREA */}
              <div className="lg:col-span-8">
                <div key={step} className="reveal">
                  <p className="text-[10px] uppercase tracking-luxe text-zinc-400">
                    Choose one
                  </p>

                  <h2 className="font-display text-4xl md:text-6xl leading-tight mt-3 max-w-3xl">
                    {steps[step].q}
                  </h2>

                  <div className="mt-10 grid sm:grid-cols-2 gap-4">
                    {steps[step].opts.map((opt, index) => (
                      <button
                        key={opt.label}
                        onClick={() => select(opt.label)}
                        className="group relative min-h-[180px] overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 md:p-8 text-left transition-all duration-500 hover:-translate-y-1 hover:border-zinc-950 hover:shadow-[0_30px_80px_-50px_rgb(0_0_0/0.45)]"
                      >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,oklch(0.92_0_0),transparent_42%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10 flex h-full flex-col justify-between">
                          <div>
                            <p className="text-[10px] uppercase tracking-luxe text-zinc-400">
                              0{index + 1}
                            </p>

                            <h3 className="font-display text-3xl md:text-4xl mt-4">
                              {opt.label}
                            </h3>
                          </div>

                          <div className="mt-8 flex items-end justify-between gap-6">
                            <p className="text-sm leading-relaxed text-zinc-500 max-w-xs">
                              {opt.detail}
                            </p>

                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-zinc-200 group-hover:border-zinc-950 group-hover:bg-zinc-950 group-hover:text-white transition-all">
                              <ArrowRight size={15} strokeWidth={1.5} />
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12 md:py-20">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              {/* SUMMARY */}
              <aside className="lg:col-span-4">
                <div className="lg:sticky lg:top-28 rounded-3xl bg-zinc-950 text-white p-6 md:p-8 overflow-hidden relative">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_42%)]" />

                  <div className="relative z-10">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5">
                      <Sparkles size={17} strokeWidth={1.5} />
                    </div>

                    <p className="mt-8 text-[10px] uppercase tracking-luxe text-white/40">
                      Your atmosphere
                    </p>

                    <h2 className="font-display text-4xl md:text-5xl leading-none mt-3">
                      A private composition emerges.
                    </h2>

                    <p className="mt-6 text-sm leading-relaxed text-white/60">
                      From your {answers.join(", ").toLowerCase()}, THE AURA suggests fragrances with matching emotional weight and texture.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-2">
                      {answers.map((answer) => (
                        <span
                          key={answer}
                          className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-white/70"
                        >
                          {answer}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={reset}
                      className="mt-10 inline-flex items-center gap-2 text-[10px] uppercase tracking-luxe text-white/60 hover:text-white transition-colors"
                    >
                      <RotateCcw size={14} strokeWidth={1.5} />
                      Begin again
                    </button>
                  </div>
                </div>
              </aside>

              {/* RESULTS */}
              <div className="lg:col-span-8">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                  <div>
                    <p className="text-[10px] uppercase tracking-luxe text-zinc-400">
                      Recommended scents
                    </p>
                    <h2 className="font-display text-4xl md:text-5xl mt-3">
                      Your closest matches.
                    </h2>
                  </div>

                  <Link
                    to="/shop"
                    className="text-[10px] uppercase tracking-luxe text-zinc-500 hover:text-zinc-950 link-underline"
                  >
                    View all fragrances
                  </Link>
                </div>

                <div className="grid gap-4">
                  {recommendations.map((p, index) => (
                    <Link
                      key={p.id}
                      to="/product/$id"
                      params={{ id: p.id }}
                      className="group grid grid-cols-[96px_1fr] md:grid-cols-[128px_1fr_auto] items-center gap-5 md:gap-8 rounded-3xl border border-zinc-200 bg-white p-4 md:p-5 transition-all duration-500 hover:border-zinc-950 hover:shadow-[0_30px_80px_-55px_rgb(0_0_0/0.5)]"
                    >
                      <div className="relative aspect-square rounded-2xl bg-zinc-50 overflow-hidden">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-full w-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] uppercase tracking-luxe text-zinc-400">
                            0{index + 1}
                          </span>
                          <span className="h-px w-8 bg-zinc-200" />
                          <span className="text-[10px] uppercase tracking-luxe text-zinc-400">
                            {p.family}
                          </span>
                        </div>

                        <h3 className="font-display text-3xl md:text-4xl mt-3">
                          {p.name}
                        </h3>

                        <p className="text-sm text-zinc-500 mt-2 line-clamp-2">
                          {p.tagline}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {p.mood.slice(0, 3).map((m) => (
                            <span
                              key={m}
                              className="rounded-full border border-zinc-200 px-3 py-1 text-[9px] uppercase tracking-[0.18em] text-zinc-500"
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="hidden md:flex items-center pr-3">
                        <span className="text-[10px] uppercase tracking-luxe text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          Discover →
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