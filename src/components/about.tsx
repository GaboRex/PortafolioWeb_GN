import { SERVICES, STACK } from "@/data/profile";
import { Reveal } from "./reveal";

const svg = {
  "aria-hidden": true,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const ICONS: Record<(typeof SERVICES)[number]["icon"], React.ReactNode> = {
  // Burbuja de chat con destellos: agente conversacional
  agent: (
    <svg {...svg} className="h-6 w-6">
      <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l.9-4.6A8 8 0 1 1 21 12z" />
      <path d="M12 8.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z" />
    </svg>
  ),
  // Ventana de navegador
  web: (
    <svg {...svg} className="h-6 w-6">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
    </svg>
  ),
  // Base de datos
  data: (
    <svg {...svg} className="h-6 w-6">
      <ellipse cx="12" cy="5.5" rx="8" ry="3" />
      <path d="M4 5.5v13c0 1.7 3.6 3 8 3s8-1.3 8-3v-13M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </svg>
  ),
};

export function About() {
  return (
    <section id="sobre" className="border-t border-line py-16 md:py-24">
      <div className="shell grid gap-14">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <h2 className="mb-9 font-display text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-tight">
              Sobre mí
            </h2>
            <p className="mb-4 max-w-[60ch]">
              Soy ingeniero fullstack y diseño agentes de inteligencia
              artificial. Me muevo del diseño de la base de datos al detalle de
              la interfaz, y me gusta entregar productos que funcionan de punta a
              punta.
            </p>
            <p className="mb-4 max-w-[60ch]">
              Construyo sistemas para negocios reales: una veterinaria, un
              consultorio odontológico, una tienda de galletas. También diseño
              agentes de conocimiento que permiten consultar la documentación
              de un módulo de SAP Business One con preguntas en lenguaje
              natural.
            </p>
            <p className="max-w-[60ch] text-muted">
              Mi enfoque: entender el problema del negocio primero y después
              elegir la tecnología, no al revés.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="grid content-start gap-6">
            {STACK.map(({ group, items }) => (
              <div key={group}>
                <h3 className="mb-2.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-muted">
                  {group}
                </h3>
                <ul aria-label={group} className="flex flex-wrap gap-2">
                  {items.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-lg border border-line bg-card px-3.5 py-2 text-[15px] font-medium"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal>
          <h3 className="mb-6 font-display text-2xl font-bold md:text-3xl">
            Qué hago
          </h3>
          <ul className="grid gap-4 md:grid-cols-3">
            {SERVICES.map((s) => (
              <li
                key={s.title}
                className="flex flex-col gap-3 rounded-2xl border border-line bg-card p-6 transition-colors duration-200 hover:border-accent"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/12 text-accent">
                  {ICONS[s.icon]}
                </span>
                <h4 className="font-display text-xl font-bold">{s.title}</h4>
                <p className="text-[15px] text-muted">{s.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
