import { useEffect, useRef } from "react";
import { gsap, registerGSAP } from "../../lib/gsap-register";

interface AnimatedTextProps {
  text: string;
  as?: "h1" | "h2" | "p" | "span";
  mode?: "letters" | "words";
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
}

export default function AnimatedText({
  text,
  as: Tag = "span",
  mode = "words",
  className = "",
  delay = 0,
  duration = 0.6,
  stagger = 0.04,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current || !containerRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      containerRef.current.querySelectorAll(".anim-unit").forEach((el) => {
        (el as HTMLElement).style.transform = "none";
        (el as HTMLElement).style.opacity = "1";
      });
      return;
    }

    registerGSAP();
    hasAnimated.current = true;

    const units = containerRef.current.querySelectorAll(".anim-unit");
    gsap.fromTo(
      units,
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration,
        stagger,
        delay,
        ease: "power3.out",
      }
    );
  }, [delay, duration, stagger]);

  const units = mode === "letters" ? text.split("") : text.split(" ");

  return (
    <Tag ref={containerRef as React.RefObject<never>} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline">
        {units.map((unit, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <span
              className="anim-unit inline-block"
              style={{ opacity: 0, transform: "translateY(100%)" }}
            >
              {unit === " " ? "\u00A0" : unit}
              {mode === "words" && i < units.length - 1 ? "\u00A0" : ""}
            </span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
