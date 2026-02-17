import { useEffect, useRef } from "react";
import { gsap, registerGSAP } from "../../lib/gsap-register";
import { projects } from "../../data/projects";

/* ---------- Icons ---------- */

function SvgIcon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, string> = {
    "external-link": "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6 M15 3h6v6 M10 14L21 3",
    "check-circle": "M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3",
    "book-open": "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",
  };

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
      <path d={paths[name] ?? ""} />
    </svg>
  );
}

/* ---------- Featured Work Section ---------- */

export default function FeaturedWorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const pubRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    registerGSAP();

    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Stagger highlights
      const highlights = cardRef.current.querySelectorAll(".highlight-item");
      gsap.fromTo(
        highlights,
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }

    if (pubRef.current) {
      gsap.fromTo(
        pubRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: pubRef.current,
            start: "top 90%",
            once: true,
          },
        }
      );
    }
  }, []);

  const project = projects[0];
  if (!project) return null;

  return (
    <section
      ref={sectionRef}
      id="featured-work"
      className="py-20 sm:py-24"
      aria-labelledby="featured-work-heading"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="mb-12">
          <h2
            id="featured-work-heading"
            className="text-2xl sm:text-3xl font-bold text-text-primary mb-3"
          >
            Featured Work<span className="text-accent">.</span>
          </h2>
          <div className="h-1 w-16 rounded-full bg-accent" />
        </div>

        {/* Spotlight Card */}
        <div
          ref={cardRef}
          className="rounded-2xl glass p-8 sm:p-10 hover:border-accent/30 transition-all duration-300"
        >
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-mono text-accent tracking-wider mb-2">
                {project.role}
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-text-primary">
                {project.title}
              </h3>
            </div>
            <span className="text-sm font-mono text-text-tertiary shrink-0">
              {project.year}
            </span>
          </div>

          {/* Description */}
          <p className="text-text-secondary leading-relaxed mb-8 max-w-3xl">
            {project.longDescription}
          </p>

          {/* Highlights */}
          <div className="mb-8">
            <h4 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-4">
              Key Outcomes
            </h4>
            <ul className="space-y-3">
              {project.highlights.map((highlight, i) => (
                <li
                  key={i}
                  className="highlight-item flex items-start gap-3 text-sm text-text-secondary"
                >
                  <span className="text-accent mt-0.5 shrink-0">
                    <SvgIcon name="check-circle" size={16} />
                  </span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="inline-block px-3 py-1 text-xs font-mono rounded-full bg-accent-muted text-accent"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action links */}
          <div className="flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg border border-border text-text-secondary hover:border-accent hover:text-accent transition-all duration-200 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <SvgIcon name="external-link" size={16} />
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Publication callout */}
        {project.relatedPublication && (
          <div
            ref={pubRef}
            className="mt-6 rounded-xl glass p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <div className="p-2 rounded-lg bg-accent-muted text-accent shrink-0">
              <SvgIcon name="book-open" size={20} />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-1">
                Research Output
              </p>
              <p className="text-sm text-text-secondary italic leading-relaxed">
                {project.relatedPublication.citation}
              </p>
            </div>
            <a
              href={project.relatedPublication.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-accent hover:text-accent-hover transition-colors inline-flex items-center gap-1.5 shrink-0"
            >
              Read on arXiv
              <SvgIcon name="external-link" size={14} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
