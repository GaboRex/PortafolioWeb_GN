import { PROJECTS } from "@/data/projects";
import { Carousel } from "./carousel";
import { Reveal } from "./reveal";

export function Projects() {
  return (
    <section id="proyectos" className="border-t border-line py-16 md:py-24">
      <div className="shell">
        <Reveal>
          <h2 className="mb-9 font-display text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-tight">
            Proyectos
          </h2>
        </Reveal>

        <div className="grid gap-6">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1} className="flex">
             <article className="flex w-full flex-col overflow-hidden rounded-2xl border border-line bg-card transition-colors duration-200 hover:border-accent md:grid md:min-h-[560px] md:grid-cols-[7fr_5fr] lg:min-h-[640px]">
  {p.images?.length ? (
    <Carousel
      shots={p.images}
      title={p.title}
      variant={p.device === "mobile" ? "mobile" : "desktop"}
    />
  ) : (
    <div
      aria-hidden="true"
      className="flex aspect-[16/10] items-center justify-center border-b border-line bg-linear-to-br from-accent/20 to-accent2/20 font-display text-7xl font-extrabold text-accent/40 md:aspect-auto md:h-full md:border-b-0 md:border-r"
    >
      {p.title.charAt(0)}
    </div>
  )}
                <div className="flex flex-1 flex-col gap-3 p-6 md:justify-center md:gap-5 md:p-10 lg:p-12">
                  <h3 className="font-display text-2xl font-bold md:text-4xl">
                    {p.title}
                  </h3>
                  <p className="max-w-[55ch] text-base text-muted md:text-lg">
                    {p.description}
                  </p>

                  {p.highlights?.length ? (
                    <ul className="grid gap-2 text-[15px]">
                      {p.highlights.map((h) => (
                        <li key={h} className="flex gap-2.5">
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            className="mt-1 h-4 w-4 shrink-0 text-accent"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                          {h}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <ul
                    aria-label="Tecnologías"
                    className="flex flex-wrap gap-2 pt-1"
                  >
                    {p.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-line bg-paper px-3 py-1 text-[13px] font-medium text-ink"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  {(p.url || p.repo) && (
                    <div className="flex flex-wrap gap-4 pt-1 text-[15px] font-medium">
                      {p.url && (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-4 hover:text-accent"
                        >
                          Ver en vivo
                        </a>
                      )}
                      {p.repo && (
                        <a
                          href={p.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-4 hover:text-accent"
                        >
                          Ver código
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}