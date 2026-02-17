import Lenis from "lenis";
import { gsap, ScrollTrigger, registerGSAP } from "./gsap-register";

let lenisInstance: Lenis | null = null;

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function initSmoothScroll(): Lenis | null {
  if (prefersReducedMotion()) return null;

  registerGSAP();

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    touchMultiplier: 2,
  });

  lenisInstance.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time: number) => {
    lenisInstance?.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function destroySmoothScroll(): void {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}
