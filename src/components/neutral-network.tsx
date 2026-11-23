"use client";

import { useEffect, useRef } from "react";

type Dot = { x: number; y: number; vx: number; vy: number };

export function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: -999, y: -999 };
    let dots: Dot[] = [];
    let w = 0;
    let h = 0;
    let lastWidth = 0;
    let frame = 0;

    // El color se lee una vez y solo se vuelve a leer al cambiar de tema;
    // getComputedStyle en cada cuadro fuerza un recálculo de estilos 60 veces por segundo.
    const readColor = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--dot").trim();
    let rgb = readColor();
    const themeObserver = new MutationObserver(() => {
      rgb = readColor();
      if (calm) draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = window.innerWidth;
      h = window.innerHeight;
      lastWidth = w;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(70, Math.floor((w * h) / 14000));
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      }));
    };

    // En celular la barra del navegador cambia el alto al hacer scroll;
    // solo regeneramos los puntos si cambió el ancho.
    const onResize = () => {
      if (window.innerWidth !== lastWidth) {
        resize();
        if (calm) draw();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // 1 arriba de todo, baja hasta 0.4 al alejarte del hero
      const fade = 1 - 0.6 * Math.min(window.scrollY / (h * 0.8), 1);

      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];

        if (!calm) {
          a.x += a.vx;
          a.y += a.vy;
          if (a.x < 0 || a.x > w) a.vx *= -1;
          if (a.y < 0 || a.y > h) a.vy *= -1;
        }

        ctx.fillStyle = `rgba(${rgb}, ${0.7 * fade})`;
        ctx.beginPath();
        ctx.arc(a.x, a.y, 2, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 130) {
            ctx.strokeStyle = `rgba(${rgb}, ${0.25 * (1 - d / 130) * fade})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (md < 160) {
          ctx.strokeStyle = `rgba(${rgb}, ${0.6 * (1 - md / 160) * fade})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      if (!calm) frame = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -999;
      mouse.y = -999;
    };
    const onScroll = () => {
      if (calm) draw();
    };

    resize();
    draw();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      themeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}