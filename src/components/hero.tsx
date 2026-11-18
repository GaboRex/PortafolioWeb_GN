"use client";

import { motion, useReducedMotion } from "framer-motion";

const LINKEDIN =
  "https://www.linkedin.com/in/gabriel-giovanni-neme-benitez-5ab54a256";

export function Hero() {
  const reduce = useReducedMotion();

  const enter = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: "easeOut" as const },
  });

  return (
    <div className="flex min-h-[calc(100svh-61px)] items-center">

      <div className="shell relative">
        <h1 className="font-display text-[clamp(2.1rem,9.5vw,10rem)] font-extrabold leading-none tracking-tighter">
          <motion.span className="block" {...enter(0)}>
            Gabriel
          </motion.span>
          <motion.span className="block text-accent" {...enter(0.15)}>
            Solutions
          </motion.span>
        </h1>

        <motion.p
          className="mb-8 mt-6 max-w-2xl text-lg text-muted lg:text-xl"
          {...enter(0.4)}
        >
          Fullstack & Systems Engineer. Construyo aplicaciones web completas con
          TypeScript y Next.js, y diseño agentes de IA que responden con el
          conocimiento de tu negocio.
        </motion.p>

        <motion.div className="flex flex-wrap gap-3" {...enter(0.55)}>
          <a
            href="#proyectos"
            className="rounded-[10px] border border-ink bg-ink px-5 py-3 font-medium text-paper transition-transform hover:-translate-y-0.5"
          >
            Ver proyectos
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[10px] border border-ink px-5 py-3 font-medium transition-transform hover:-translate-y-0.5"
          >
            Mi LinkedIn
          </a>
        </motion.div>
      </div>
    </div>
  );
}