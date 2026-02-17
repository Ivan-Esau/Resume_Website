import { gsap, ScrollTrigger, registerGSAP } from "./gsap-register";

export type AnimationPreset =
  | "fade-up"
  | "fade-left"
  | "fade-right"
  | "scale-in"
  | "stagger-children";

interface AnimationConfig {
  trigger: HTMLElement;
  children?: HTMLElement[];
  preset: AnimationPreset;
  delay?: number;
  duration?: number;
  stagger?: number;
}

const presetDefaults: Record<
  AnimationPreset,
  { from: gsap.TweenVars; to: gsap.TweenVars }
> = {
  "fade-up": {
    from: { y: 40, opacity: 0 },
    to: { y: 0, opacity: 1 },
  },
  "fade-left": {
    from: { x: -60, opacity: 0 },
    to: { x: 0, opacity: 1 },
  },
  "fade-right": {
    from: { x: 60, opacity: 0 },
    to: { x: 0, opacity: 1 },
  },
  "scale-in": {
    from: { scale: 0.9, opacity: 0 },
    to: { scale: 1, opacity: 1 },
  },
  "stagger-children": {
    from: { y: 30, opacity: 0 },
    to: { y: 0, opacity: 1 },
  },
};

export function createScrollAnimation({
  trigger,
  children,
  preset,
  delay = 0,
  duration = 0.7,
  stagger = 0.1,
}: AnimationConfig): ScrollTrigger {
  registerGSAP();

  const { from, to } = presetDefaults[preset];
  const targets =
    preset === "stagger-children" && children?.length
      ? children
      : trigger;

  gsap.set(targets, from);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: "top 85%",
      once: true,
    },
  });

  tl.to(targets, {
    ...to,
    duration,
    delay,
    stagger: preset === "stagger-children" ? stagger : 0,
    ease: "power2.out",
  });

  return tl.scrollTrigger!;
}
