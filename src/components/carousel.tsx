"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Shot } from "@/data/projects";

type Props = {
  shots: Shot[];
  title: string;
  variant?: "desktop" | "mobile";
};

const svg = {
  "aria-hidden": true,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg {...svg} className="h-5 w-5">
      <path d={dir === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
    </svg>
  );
}

/** Pista visual de "ampliar" que aparece al pasar el mouse o con foco. */
function ZoomHint() {
  return (
    <span className="pointer-events-none absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
      <svg {...svg} className="h-4 w-4">
        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
      </svg>
    </span>
  );
}

/** Captura de escritorio dentro de un marco de navegador. */
function BrowserFrame({ shot, onOpen }: { shot: Shot; onOpen: () => void }) {
  const w = shot.width ?? 1920;
  const h = shot.height ?? 1080;
  return (
    // El ancho se limita también por la altura disponible (--maxh), así las
    // capturas casi cuadradas no se salen de la tarjeta.
    <div
      style={{ "--ar": w / h } as React.CSSProperties}
      className="w-[min(100%,860px,calc(var(--maxh)*var(--ar)))] overflow-hidden rounded-xl border border-line bg-card shadow-2xl shadow-black/20 [--maxh:400px] md:[--maxh:450px] lg:[--maxh:530px]"
    >
      <div
        aria-hidden="true"
        className="flex h-7 items-center gap-1.5 border-b border-line px-3"
      >
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      </div>
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Ampliar captura: ${shot.alt}`}
        className="group relative block w-full cursor-zoom-in"
      >
        <Image
          src={shot.src}
          alt={shot.alt}
          width={w}
          height={h}
          quality={90}
          sizes="(min-width: 1280px) 860px, (min-width: 768px) 55vw, 100vw"
          className="block h-auto w-full"
        />
        <ZoomHint />
      </button>
    </div>
  );
}

export function Carousel({ shots, title, variant = "desktop" }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState<Shot | null>(null);
  const many = shots.length > 1;
  const isMobile = variant === "mobile";

  const goTo = (i: number) => {
    const el = track.current;
    if (!el) return;
    const next = (i + shots.length) % shots.length;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({
      left: next * el.clientWidth,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const onScroll = () => {
    const el = track.current;
    if (el) setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") goTo(index + 1);
    if (e.key === "ArrowLeft") goTo(index - 1);
  };

  const open = (shot: Shot) => {
    setZoomed(shot);
    dialog.current?.showModal();
  };

  return (
    <div
      role="group"
      aria-roledescription="carrusel"
      aria-label={`Capturas de ${title}`}
      className="relative border-b border-line bg-linear-to-br from-accent/20 to-accent2/20 md:h-full md:border-b-0 md:border-r"
    >
      <div
        ref={track}
        tabIndex={0}
        onScroll={onScroll}
        onKeyDown={onKeyDown}
        className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] md:absolute md:inset-0 [&::-webkit-scrollbar]:hidden"
      >
        {shots.map((s, i) => {
          const framed = (s.device ?? variant) === "desktop";
          const fit = s.fit ?? (isMobile ? "contain" : "cover");
          return (
            <div
              key={s.src}
              role="group"
              aria-roledescription="diapositiva"
              aria-label={`${i + 1} de ${shots.length}`}
              className={`relative w-full shrink-0 snap-center md:h-full ${
                framed
                  ? "flex items-center justify-center px-4 pb-9 pt-5 md:px-8 md:pb-10 md:pt-8"
                  : isMobile
                    ? "aspect-[4/5] max-h-[620px] md:aspect-auto md:max-h-none"
                    : "aspect-[16/10] md:aspect-auto"
              }`}
            >
              {framed ? (
                <BrowserFrame shot={s} onOpen={() => open(s)} />
              ) : (
                <button
                  type="button"
                  onClick={() => open(s)}
                  aria-label={`Ampliar captura: ${s.alt}`}
                  className="group absolute inset-0 cursor-zoom-in"
                >
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    quality={90}
                    sizes="(min-width: 768px) 60vw, 100vw"
                    className={
                      fit === "contain"
                        ? "object-contain p-3 pb-8"
                        : "object-cover object-top"
                    }
                  />
                  <ZoomHint />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {many && (
        <>
          {/* En celular se navega deslizando; las flechas tapaban la captura. */}
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Imagen anterior"
            className="absolute left-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-line bg-paper/85 text-ink backdrop-blur transition-colors hover:border-accent hover:text-accent md:grid"
          >
            <Chevron dir="left" />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Imagen siguiente"
            className="absolute right-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-line bg-paper/85 text-ink backdrop-blur transition-colors hover:border-accent hover:text-accent md:grid"
          >
            <Chevron dir="right" />
          </button>

          <div className="absolute inset-x-0 bottom-1 flex justify-center">
            {shots.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ir a la imagen ${i + 1}`}
                aria-current={i === index}
                className="grid h-7 w-7 cursor-pointer place-items-center"
              >
                <span
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-5 bg-accent" : "w-2 bg-ink/30"
                  }`}
                />
              </button>
            ))}
          </div>
        </>
      )}

      {/* Visor a tamaño completo: Esc o clic fuera de la imagen lo cierran. */}
      <dialog
        ref={dialog}
        aria-label={zoomed ? `Captura ampliada: ${zoomed.alt}` : undefined}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
        onClose={() => setZoomed(null)}
        className="m-auto max-h-none max-w-none overflow-visible bg-transparent p-0 backdrop:bg-black/85 backdrop:backdrop-blur-sm"
      >
        {zoomed && (
          <div className="relative">
            <Image
              src={zoomed.src}
              alt={zoomed.alt}
              width={zoomed.width ?? 1920}
              height={zoomed.height ?? 1080}
              quality={90}
              sizes="95vw"
              className="block h-auto max-h-[90svh] w-auto max-w-[95vw] rounded-lg"
            />
            <button
              type="button"
              autoFocus
              onClick={() => dialog.current?.close()}
              aria-label="Cerrar captura ampliada"
              className="absolute -top-3 -right-3 grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-line bg-paper text-ink shadow-lg hover:text-accent"
            >
              <svg {...svg} className="h-5 w-5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </dialog>
    </div>
  );
}
