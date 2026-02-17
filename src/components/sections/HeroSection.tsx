import { useEffect, useRef, useState } from "react";
import { gsap, registerGSAP } from "../../lib/gsap-register";
import { socials } from "../../data/socials";
import GradientMesh from "../ui/GradientMesh";
import AnimatedText from "../ui/AnimatedText";

/* ---------- Inline SVG Icons (React can't import .astro) ---------- */

function SvgIcon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, string> = {
    "arrow-right": "M5 12h14M12 5l7 7-7 7",
    download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
    "external-link": "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3",
    github: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22",
    gitlab: "M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z",
    linkedin: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
    "chevron-down": "M6 9l6 6 6-6",
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

/* ---------- Hero Section ---------- */

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    registerGSAP();

    // Photo entrance
    if (photoRef.current) {
      gsap.fromTo(
        photoRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, delay: 0.3, ease: "back.out(1.4)" }
      );

      // Subtle floating animation
      gsap.to(photoRef.current, {
        y: -8,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }

    // CTA buttons entrance
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.8, ease: "power2.out" }
      );
    }

    // Social links entrance
    if (socialsRef.current) {
      gsap.fromTo(
        socialsRef.current.children,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, delay: 1.1, ease: "power2.out" }
      );
    }

    // Scroll indicator pulse
    if (scrollRef.current) {
      gsap.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, delay: 1.5 }
      );
      gsap.to(scrollRef.current.querySelector(".scroll-chevron"), {
        y: 4,
        duration: 1.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center py-20 sm:py-24 overflow-hidden"
    >
      {/* Gradient mesh background */}
      <GradientMesh />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 w-full">
        <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            {/* Subtitle */}
            <div className="mb-3">
              <AnimatedText
                text="From Engineering to AI Research"
                as="p"
                mode="words"
                className="text-sm font-mono text-accent tracking-wider"
                delay={0.1}
                stagger={0.05}
              />
            </div>

            {/* Name */}
            <div className="mb-4">
              <AnimatedText
                text="Ivan Esau"
                as="h1"
                mode="letters"
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight bg-gradient-to-r from-text-primary via-accent to-text-primary bg-clip-text"
                delay={0.3}
                stagger={0.04}
                duration={0.5}
              />
            </div>

            {/* Tagline */}
            <div className="mb-8">
              <AnimatedText
                text="Research Associate & Lecturer at FH Südwestfalen. Building agentic AI systems for software engineering research."
                as="p"
                mode="words"
                className="text-lg sm:text-xl text-text-secondary max-w-lg mx-auto md:mx-0 leading-relaxed"
                delay={0.6}
                stagger={0.02}
                duration={0.4}
              />
            </div>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-wrap gap-3 justify-center md:justify-start mb-8">
              <a
                href="#featured-work"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg bg-accent text-bg-primary hover:bg-accent-hover transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                View My Work
                <SvgIcon name="arrow-right" size={16} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg border border-border text-text-secondary hover:border-accent hover:text-accent transition-all duration-200 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Get In Touch
              </a>
              <a
                href={`${import.meta.env.BASE_URL}Ivan_Esau_CV.pdf`}
                download
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg border border-border text-text-secondary hover:border-accent hover:text-accent transition-all duration-200 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <SvgIcon name="download" size={16} />
                Download CV
              </a>
            </div>

            {/* Social Links */}
            <div ref={socialsRef} className="flex gap-1 justify-center md:justify-start">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 rounded-lg text-text-tertiary hover:text-accent hover:bg-bg-tertiary/50 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <SvgIcon name={social.icon} size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Profile Photo */}
          <div ref={photoRef} className="shrink-0">
            <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-border/50 shadow-xl shadow-accent/10 relative glass-photo">
              {!imgError ? (
                <img
                  src={`${import.meta.env.BASE_URL}ivan-esau.jpg`}
                  alt="Ivan Esau — Software Engineer"
                  width={256}
                  height={256}
                  className="w-full h-full object-cover"
                  loading="eager"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-accent to-accent-muted flex items-center justify-center">
                  <span className="text-4xl sm:text-5xl font-bold text-bg-primary select-none">
                    IE
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-mono text-text-tertiary tracking-wider">
          Scroll
        </span>
        <div className="scroll-chevron text-text-tertiary">
          <SvgIcon name="chevron-down" size={20} />
        </div>
      </div>
    </section>
  );
}
