"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Pause, Play } from "@phosphor-icons/react";

import { Photo } from "@/components/ui/photo";
import { cn } from "@/lib/utils";

export type RingCard =
  | { kind: "photo"; photo: string; label: string; eyebrow?: string }
  | { kind: "type"; tone: "lime" | "ink" | "cream"; eyebrow: string; label: string };

/** Cards per second the curved strip slides by. */
const SPEED = 0.16;

/** Where card i sits on the drum, in card widths from the centre. */
function slot(i: number, offset: number, n: number) {
  return ((((i - offset) % n) + n) % n) - n / 2;
}

// Slow in, slow out, so the rise reads across the whole pinned scroll.
const smoothstep = (t: number) => t * t * (3 - 2 * t);

/**
 * The landing page's one scroll moment.
 *
 * A strip of real photos bent into a drum (CSS 3D, no library) slides past
 * forever; a browser window showing a real Bazar shop sits in front. On large
 * screens the stage pins while you scroll: the words lift away, the drum
 * flattens and drops, and the shop window rises to fill the screen.
 *
 * One requestAnimationFrame loop writes two CSS variables (--u per card,
 * --p on the stage); React state is never touched per frame. Without
 * JavaScript, on phones, or with reduced motion it is a still, readable page.
 */
export function HeroStage({
  copy,
  cards,
  preview,
}: {
  /** Badge, heading, search: rendered on the server. */
  copy: React.ReactNode;
  cards: RingCard[];
  /** The shop window in front of the drum. */
  preview: React.ReactNode;
}) {
  const stageRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const offsetRef = useRef(0);
  const [paused, setPaused] = useState(false);
  const [canAnimate, setCanAnimate] = useState(false);
  const n = cards.length;

  // Keep the drum where it was after any re-render (pause toggles).
  useLayoutEffect(() => {
    cardRefs.current.forEach((el, i) =>
      el?.style.setProperty("--u", String(slot(i, offsetRef.current, n))),
    );
  });

  useEffect(() => {
    const stage = stageRef.current;
    const copyEl = copyRef.current;
    if (!stage || !copyEl) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 64rem)");

    const sync = () => {
      setCanAnimate(!reduce.matches);
      const copyH = copyEl.offsetHeight;
      // Pin only when the drum still gets a decent band under the words.
      const fits = window.innerHeight - copyH >= 260;
      if (!reduce.matches && wide.matches && fits) {
        stage.style.setProperty("--copy-h", `${copyH}px`);
        stage.dataset.stage = "on";
      } else {
        delete stage.dataset.stage;
        stage.style.removeProperty("--p");
        stage.style.removeProperty("--copy-h");
      }
    };
    sync();
    const resize = new ResizeObserver(sync);
    resize.observe(copyEl);
    window.addEventListener("resize", sync);
    reduce.addEventListener("change", sync);
    wide.addEventListener("change", sync);
    return () => {
      resize.disconnect();
      window.removeEventListener("resize", sync);
      reduce.removeEventListener("change", sync);
      wide.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !canAnimate) return;
    let raf = 0;
    let last = performance.now();
    let lastP = -1;

    const frame = (now: number) => {
      const dt = Math.min(now - last, 64) / 1000;
      last = now;

      if (!paused && !document.hidden) {
        offsetRef.current = (offsetRef.current + dt * SPEED) % n;
        cardRefs.current.forEach((el, i) =>
          el?.style.setProperty("--u", slot(i, offsetRef.current, n).toFixed(4)),
        );
      }

      if (stage.dataset.stage === "on") {
        const rect = stage.getBoundingClientRect();
        const travel = rect.height - window.innerHeight;
        const raw = travel > 0 ? Math.min(Math.max(-rect.top / travel, 0), 1) : 0;
        const p = smoothstep(raw);
        if (Math.abs(p - lastP) > 0.0005) {
          stage.style.setProperty("--p", p.toFixed(4));
          lastP = p;
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [canAnimate, paused, n]);

  return (
    <section
      ref={stageRef}
      aria-labelledby="hero-title"
      className="hero-stage relative bg-ink-900 text-white"
    >
      <div className="hero-pin">
        <div aria-hidden="true" className="hero-glow" />
        <div ref={copyRef} className="hero-copy relative z-10">
          {copy}
        </div>

        <div className="hero-ring-wrap">
          <ul aria-hidden="true" className="hero-ring">
            {cards.map((card, i) => (
              <li
                key={i}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className={cn(
                  "hero-card",
                  card.kind === "type" && card.tone === "lime" && "bg-lime-400 text-ink-900",
                  card.kind === "type" && card.tone === "ink" && "bg-ink-800 text-white ring-1 ring-white/10",
                  card.kind === "type" && card.tone === "cream" && "bg-cream-100 text-ink-900",
                )}
                style={{ "--u": slot(i, 0, n) } as React.CSSProperties}
              >
                {card.kind === "photo" ? (
                  <>
                    <Photo name={card.photo} alt="" sizes="200px" />
                    <span className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-transparent" />
                    <span className="absolute inset-x-2.5 bottom-2.5">
                      {card.eyebrow ? (
                        <span className="mb-1 inline-block rounded-full bg-lime-400 px-1.5 py-px text-[10px] font-bold uppercase tracking-[0.08em] text-ink-900">
                          {card.eyebrow}
                        </span>
                      ) : null}
                      <span className="block font-heading text-[13px] font-bold leading-tight text-white tablet:text-sm">
                        {card.label}
                      </span>
                    </span>
                  </>
                ) : (
                  <span className="flex h-full flex-col justify-between p-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] opacity-70">
                      {card.eyebrow}
                    </span>
                    <span className="font-heading text-[15px] font-extrabold uppercase leading-[1.05] tracking-[-0.02em] tablet:text-lg">
                      {card.label}
                    </span>
                  </span>
                )}
              </li>
            ))}
          </ul>
          {canAnimate ? (
            <button
              type="button"
              onClick={() => setPaused((v) => !v)}
              aria-pressed={paused}
              className="hero-pause absolute bottom-2 right-3 z-20 grid size-9 place-items-center rounded-full bg-ink-900/80 text-white ring-1 ring-white/20 hover:bg-ink-800 focus-visible:outline-lime-400 tablet:right-6"
            >
              {paused ? (
                <Play aria-hidden="true" className="size-4" weight="fill" />
              ) : (
                <Pause aria-hidden="true" className="size-4" weight="fill" />
              )}
              <span className="sr-only">
                {paused ? "Play the moving photos" : "Pause the moving photos"}
              </span>
            </button>
          ) : null}
        </div>

        <div className="hero-window relative z-10">{preview}</div>
      </div>
    </section>
  );
}
