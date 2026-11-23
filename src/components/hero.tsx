"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LINKEDIN } from "@/data/profile";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

// Única entrada animada del sitio. El título manda y es el que más recorre;
// el texto y los botones acompañan con menos recorrido, y los intervalos se
// acortan (0 → 80 → 200 → 280ms) para que se lea como una ola y no como una cola.
const STEPS = {
  title: { delay: 0, distance: 28 },
  accent: { delay: 0.08, distance: 28 },
  text: { delay: 0.2, distance: 14 },
  actions: { delay: 0.28, distance: 8 },
};

export function Hero() {
  const reduce = useReducedMotion();

  const enter = ({ delay, distance }: { delay: number; distance: number }) =>
    reduce
      ? // Movimiento reducido: solo fundido, sin desplazamiento.
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.3, ease: EASE_OUT },
        }
      : {
          // `transform` en texto en lugar de `y`: en framer-motion 14.0 `y`
          // corre en el hilo principal y pierde cuadros mientras carga la página.
          initial: { opacity: 0, transform: `translateY(${distance}px)` },
          animate: { opacity: 1, transform: "translateY(0px)" },
          transition: { duration: 0.6, delay, ease: EASE_OUT },
        };

  return (
    <div className="flex min-h-[calc(100svh-61px)] items-center">
      <div className="shell relative">
        <h1 className="font-display text-[clamp(2.1rem,9.5vw,10rem)] font-extrabold leading-none tracking-tighter">
          <motion.span className="block" {...enter(STEPS.title)}>
            Gabriel
          </motion.span>
          <motion.span className="block text-accent" {...enter(STEPS.accent)}>
            Solutions
          </motion.span>
        </h1>

        <motion.p
          className="mb-8 mt-6 max-w-2xl text-lg text-muted lg:text-xl"
          {...enter(STEPS.text)}
        >
          Fullstack & Systems Engineer. Construyo aplicaciones web completas con
          TypeScript y Next.js, y diseño agentes de IA que responden con el
          conocimiento de tu negocio.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-3"
          {...enter(STEPS.actions)}
        >
          <a
            href="#proyectos"
            className="press rounded-[10px] border border-ink bg-ink px-5 py-3 font-medium text-paper hover:bg-ink/85"
          >
            Ver proyectos
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="press rounded-[10px] border border-ink px-5 py-3 font-medium hover:bg-ink/8"
          >
            Mi LinkedIn
          </a>
        </motion.div>
      </div>
    </div>
  );
}
