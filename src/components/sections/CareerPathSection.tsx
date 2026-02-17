import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, registerGSAP } from "../../lib/gsap-register";
import {
  careerPath,
  type CareerPathPoint,
  type Chapter,
  type EducationEntry,
  type WorkEntry,
} from "../../data/careerPath";
import AchievementBadge from "../ui/AchievementBadge";

const chapterLabels: Record<Chapter, string> = {
  research: "AI Research",
  it: "IT & Networks",
  engineering: "Engineering",
};

const chapterColors: Record<Chapter, string> = {
  research: "text-sky-400",
  it: "text-emerald-400",
  engineering: "text-amber-400",
};

export default function CareerPathSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const eduCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const workCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    registerGSAP();

    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        },
      );
    }

    eduCardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          delay: i * 0.2,
          ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 85%", once: true },
        },
      );
    });

    workCardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          delay: i * 0.2,
          ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 85%", once: true },
        },
      );
    });

    dotsRef.current.forEach((dot, i) => {
      if (!dot) return;
      gsap.fromTo(
        dot,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          delay: i * 0.2 + 0.1,
          ease: "back.out(2)",
          scrollTrigger: { trigger: dot, start: "top 85%", once: true },
        },
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="path"
      className="py-20 sm:py-24"
      aria-labelledby="path-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <h2
            id="path-heading"
            className="text-2xl sm:text-3xl font-bold text-text-primary mb-3"
          >
            The Path<span className="text-accent">.</span>
          </h2>
          <div className="h-1 w-16 rounded-full bg-accent" />
        </div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div
            ref={lineRef}
            className="absolute left-[7px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent/40 via-accent/20 to-transparent origin-top"
            aria-hidden="true"
          />

          <div className="space-y-16 md:space-y-20">
            {careerPath.map((point, i) => (
              <TimelinePoint
                key={point.dateRange}
                point={point}
                dotRef={(el) => { dotsRef.current[i] = el; }}
                eduCardRef={(el) => { eduCardsRef.current[i] = el; }}
                workCardRef={(el) => { workCardsRef.current[i] = el; }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Timeline Point ─────────────────────────────────────────────── */

interface TimelinePointProps {
  point: CareerPathPoint;
  dotRef: (el: HTMLDivElement | null) => void;
  eduCardRef: (el: HTMLDivElement | null) => void;
  workCardRef: (el: HTMLDivElement | null) => void;
}

function TimelinePoint({ point, dotRef, eduCardRef, workCardRef }: TimelinePointProps) {
  return (
    <div className="relative">
      {/* Timeline dot */}
      <div
        ref={dotRef}
        className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-6 w-[15px] h-[15px] rounded-full border-2 border-accent bg-bg-primary z-10"
        aria-hidden="true"
      />

      {/* Date label — centered on desktop */}
      <div className="hidden md:flex justify-center mb-4">
        <span className="px-3 py-1 text-xs font-mono text-text-tertiary bg-bg-secondary/80 rounded-full border border-border">
          {point.dateRange}
        </span>
      </div>

      {/* Side-by-side cards */}
      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6 ml-8 md:ml-0">
        {/* Education (left on desktop) */}
        {point.education ? (
          <div
            ref={eduCardRef}
            className="w-full md:w-[calc(50%-1.5rem)] md:text-right"
          >
            <EducationCard entry={point.education} dateRange={point.dateRange} />
          </div>
        ) : (
          <div className="hidden md:block md:w-[calc(50%-1.5rem)]" />
        )}

        {/* Work (right on desktop) */}
        {point.work ? (
          <div
            ref={workCardRef}
            className="w-full md:w-[calc(50%-1.5rem)] md:ml-auto"
          >
            <WorkCard entry={point.work} dateRange={point.dateRange} />
          </div>
        ) : (
          <div className="hidden md:block md:w-[calc(50%-1.5rem)]" />
        )}
      </div>
    </div>
  );
}

/* ── Education Card ─────────────────────────────────────────────── */

function EducationCard({ entry, dateRange }: { entry: EducationEntry; dateRange: string }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? entry.bullets : entry.bullets.slice(0, 2);
  const hasMore = entry.bullets.length > 2;

  return (
    <div className="rounded-2xl p-6 glass hover:border-accent/30 transition-all duration-300 hover:-translate-y-0.5 text-left">
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="text-xs font-mono tracking-wider text-purple-400">Education</span>
        {entry.badge && (
          <span className="px-2 py-0.5 text-xs font-medium bg-accent-muted text-accent rounded-full inline-flex items-center gap-1">
            {entry.badge === "Current" && (
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            )}
            {entry.badge}
          </span>
        )}
      </div>

      <h3 className="text-lg font-semibold text-text-primary mb-1">{entry.title}</h3>
      <p className="text-sm font-medium text-accent mb-2">{entry.subtitle}</p>
      <p className="md:hidden text-xs text-text-tertiary font-mono mb-3">{dateRange}</p>

      {entry.achievements && entry.achievements.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {entry.achievements.map((a) => (
            <AchievementBadge key={a.label} label={a.label} icon={a.icon} />
          ))}
        </div>
      )}

      <ul className="space-y-2">
        {visible.map((bullet, i) => (
          <li key={i} className="flex gap-2 text-sm text-text-secondary">
            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-xs font-medium text-accent hover:text-accent-hover transition-colors cursor-pointer"
          aria-expanded={expanded}
        >
          {expanded ? "Show less" : `Show ${entry.bullets.length - 2} more`}
        </button>
      )}
    </div>
  );
}

/* ── Work Card ──────────────────────────────────────────────────── */

function WorkCard({ entry, dateRange }: { entry: WorkEntry; dateRange: string }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? entry.bullets : entry.bullets.slice(0, 2);
  const hasMore = entry.bullets.length > 2;

  return (
    <div className="rounded-2xl p-6 glass hover:border-accent/30 transition-all duration-300 hover:-translate-y-0.5">
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className={`text-xs font-mono tracking-wider ${chapterColors[entry.chapter]}`}>
          {chapterLabels[entry.chapter]}
        </span>
        {entry.badge && (
          <span className="px-2 py-0.5 text-xs font-medium bg-accent-muted text-accent rounded-full inline-flex items-center gap-1">
            {entry.badge === "Current" && (
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            )}
            {entry.badge}
          </span>
        )}
      </div>

      <h3 className="text-lg font-semibold text-text-primary mb-1">{entry.title}</h3>
      <p className="text-sm font-medium text-accent mb-2">{entry.subtitle}</p>

      <div className="text-xs text-text-tertiary font-mono mb-3">
        <span className="md:hidden">{dateRange} | </span>
        <span>{entry.location}</span>
      </div>

      <ul className="space-y-2">
        {visible.map((bullet, i) => (
          <li key={i} className="flex gap-2 text-sm text-text-secondary">
            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-xs font-medium text-accent hover:text-accent-hover transition-colors cursor-pointer"
          aria-expanded={expanded}
        >
          {expanded ? "Show less" : `Show ${entry.bullets.length - 2} more`}
        </button>
      )}
    </div>
  );
}
