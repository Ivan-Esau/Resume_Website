import { useEffect, useRef, type ReactNode } from "react";
import { createScrollAnimation, type AnimationPreset } from "../../lib/scroll-animations";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: AnimationPreset;
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
  as?: keyof HTMLElementTagNameMap;
}

export default function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 0.7,
  stagger = 0.1,
  className = "",
  as: Tag = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    const children =
      animation === "stagger-children"
        ? Array.from(el.children) as HTMLElement[]
        : undefined;

    const st = createScrollAnimation({
      trigger: el,
      children,
      preset: animation,
      delay,
      duration,
      stagger,
    });

    return () => {
      st.kill();
    };
  }, [animation, delay, duration, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
