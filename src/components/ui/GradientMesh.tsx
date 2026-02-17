import { useEffect, useRef } from "react";

interface Blob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

function getThemeColors(): string[] {
  const isDark = document.documentElement.classList.contains("dark");
  if (isDark) {
    return [
      "rgba(56, 189, 248, 0.15)",  // sky-400
      "rgba(99, 102, 241, 0.12)",  // indigo-500
      "rgba(14, 165, 233, 0.10)",  // sky-500
      "rgba(139, 92, 246, 0.08)",  // violet-500
      "rgba(6, 182, 212, 0.10)",   // cyan-500
    ];
  }
  return [
    "rgba(2, 132, 199, 0.08)",   // sky-600
    "rgba(79, 70, 229, 0.06)",   // indigo-600
    "rgba(14, 165, 233, 0.06)",  // sky-500
    "rgba(124, 58, 237, 0.05)",  // violet-600
    "rgba(8, 145, 178, 0.06)",   // cyan-600
  ];
}

function createBlobs(width: number, height: number): Blob[] {
  const colors = getThemeColors();
  const count = window.innerWidth < 768 ? 3 : 5;

  return Array.from({ length: count }, (_, i) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    radius: Math.min(width, height) * (0.25 + Math.random() * 0.2),
    color: colors[i % colors.length],
  }));
}

export default function GradientMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const blobsRef = useRef<Blob[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx!.scale(dpr, dpr);
      blobsRef.current = createBlobs(canvas.offsetWidth, canvas.offsetHeight);
    }

    resize();
    window.addEventListener("resize", resize);

    function animate() {
      if (!canvas || !ctx) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      ctx.clearRect(0, 0, w, h);

      for (const blob of blobsRef.current) {
        blob.x += blob.vx;
        blob.y += blob.vy;

        if (blob.x < -blob.radius) blob.x = w + blob.radius;
        if (blob.x > w + blob.radius) blob.x = -blob.radius;
        if (blob.y < -blob.radius) blob.y = h + blob.radius;
        if (blob.y > h + blob.radius) blob.y = -blob.radius;

        const gradient = ctx.createRadialGradient(
          blob.x, blob.y, 0,
          blob.x, blob.y, blob.radius
        );
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    const observer = new MutationObserver(() => {
      blobsRef.current.forEach((blob, i) => {
        const colors = getThemeColors();
        blob.color = colors[i % colors.length];
      });
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
