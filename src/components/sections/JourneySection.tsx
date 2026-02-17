import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGSAP } from "../../lib/gsap-register";
import { milestones, achievements } from "../../data/journey";

/* ---------- Icons ---------- */

const iconPaths: Record<string, string> = {
  cog: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z",
  network: "M5 12.55a11 11 0 0 1 14.08 0 M1.42 9a16 16 0 0 1 21.16 0 M8.53 16.11a6 6 0 0 1 6.95 0 M12 20h.01",
  brain: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547Z",
  award: "M12 8a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z M8.21 13.89L7 23l5-3 5 3-1.21-9.12",
  "external-link": "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6 M15 3h6v6 M10 14L21 3",
};

function SvgIcon({ name, size = 20 }: { name: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={iconPaths[name] ?? ""} />
    </svg>
  );
}

/* ---------- Journey Section ---------- */

export default function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    registerGSAP();

    // Animate narrative text
    const narrative = sectionRef.current?.querySelector(".journey-narrative");
    if (narrative) {
      gsap.fromTo(
        narrative,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: narrative, start: "top 85%", once: true },
        }
      );
    }

    // Animate chapter cards with stagger
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".journey-card");
      gsap.fromTo(
        cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }

    // Animate connecting line
    if (lineRef.current) {
      const line = lineRef.current;
      const length = line.getTotalLength?.() || 0;
      if (length > 0) {
        gsap.set(line, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.to(line, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            once: true,
          },
        });
      }
    }

    // Animate achievement badges
    if (achievementsRef.current) {
      const badges = achievementsRef.current.children;
      gsap.fromTo(
        badges,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: achievementsRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="py-20 sm:py-24"
      aria-labelledby="journey-heading"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="mb-12">
          <h2
            id="journey-heading"
            className="text-2xl sm:text-3xl font-bold text-text-primary mb-3"
          >
            The Journey<span className="text-accent">.</span>
          </h2>
          <div className="h-1 w-16 rounded-full bg-accent" />
        </div>

        {/* Narrative */}
        <p className="journey-narrative text-text-secondary leading-relaxed mb-12 max-w-3xl text-lg">
          After completing my training as a product designer, I made a choice
          that surprised everyone — starting over in informatics. No safety
          net, just the conviction that software was where I belonged. That bet
          paid off, carrying me from enterprise networks to AI research labs.
        </p>

        {/* Chapter Cards */}
        <div ref={cardsRef} className="relative mb-16">
          {/* Connecting line (desktop only) */}
          <svg
            className="absolute top-1/2 left-0 right-0 -translate-y-1/2 hidden md:block pointer-events-none"
            height="2"
            style={{ width: "100%" }}
            aria-hidden="true"
          >
            <line
              ref={lineRef}
              x1="16.67%"
              y1="1"
              x2="83.33%"
              y2="1"
              stroke="var(--color-accent)"
              strokeWidth="2"
              strokeOpacity="0.3"
            />
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {milestones.map((milestone) => (
              <div
                key={milestone.phase}
                className="journey-card group relative rounded-2xl p-6 glass hover:border-accent/30 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Phase number */}
                <span className="text-xs font-mono text-accent/60 mb-3 block">
                  {milestone.phase}
                </span>

                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-accent-muted text-accent flex items-center justify-center mb-4">
                  <SvgIcon name={milestone.icon} size={20} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-text-primary mb-1">
                  {milestone.title}
                </h3>
                <p className="text-xs font-mono text-text-tertiary mb-3">
                  {milestone.period}
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievement Badges */}
        <div
          ref={achievementsRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {achievements.map((achievement) => (
            <div
              key={achievement.label}
              className="flex items-center gap-3 p-4 rounded-xl glass hover:border-accent/30 transition-all duration-300"
            >
              <div className="p-2 rounded-lg bg-accent-muted text-accent shrink-0">
                <SvgIcon name={achievement.icon} size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">
                  {achievement.label}
                </p>
                <p className="text-xs text-text-tertiary">
                  {achievement.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
