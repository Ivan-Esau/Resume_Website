import { useEffect, useRef } from "react";
import { gsap, registerGSAP } from "../../lib/gsap-register";
import { skills, type GridSpan } from "../../data/skills";

/* ---------- Icons ---------- */

const iconPaths: Record<string, string> = {
  brain: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547Z",
  terminal: "M4 17l6-6-6-6M12 19h8",
  code: "M16 18l6-6-6-6M8 6l-6 6 6 6",
  globe: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z",
  network: "M5 12.55a11 11 0 0 1 14.08 0 M1.42 9a16 16 0 0 1 21.16 0 M8.53 16.11a6 6 0 0 1 6.95 0 M12 20h.01",
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

/* ---------- Grid span CSS mapping ---------- */

const spanClasses: Record<GridSpan, string> = {
  "1x1": "",
  "2x1": "md:col-span-2",
  "1x2": "md:row-span-2",
};

/* ---------- Skills Section ---------- */

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    registerGSAP();

    // Animate cards with stagger
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".bento-card");
      gsap.fromTo(
        cards,
        { scale: 0.92, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Animate badges within each card after card appears
      cards.forEach((card, i) => {
        const badges = card.querySelectorAll(".skill-badge");
        gsap.fromTo(
          badges,
          { y: 10, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.05,
            delay: 0.15 + i * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-20 sm:py-24"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="mb-12">
          <h2
            id="skills-heading"
            className="text-2xl sm:text-3xl font-bold text-text-primary mb-3"
          >
            Skills<span className="text-accent">.</span>
          </h2>
          <div className="h-1 w-16 rounded-full bg-accent" />
        </div>

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-min"
        >
          {skills.map((category) => (
            <div
              key={category.title}
              className={`bento-card rounded-2xl p-6 glass hover:border-accent/30 transition-all duration-300 hover:-translate-y-0.5 ${spanClasses[category.gridSpan]}`}
              style={{ opacity: 0 }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-accent-muted text-accent flex items-center justify-center">
                  <SvgIcon name={category.icon} size={18} />
                </div>
                <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
                  {category.title}
                </h3>
              </div>

              {/* Skill badges */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`skill-badge inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-full whitespace-nowrap transition-colors duration-200 ${
                      skill.level === "strong"
                        ? "bg-accent-muted text-accent hover:bg-accent/20"
                        : "border border-border text-text-tertiary hover:border-accent/40 hover:text-text-secondary"
                    }`}
                    style={{ opacity: 0 }}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        skill.level === "strong"
                          ? "bg-accent"
                          : "border border-text-tertiary"
                      }`}
                    />
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
