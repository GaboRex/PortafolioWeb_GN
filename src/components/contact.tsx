import { EMAIL, LINKEDIN } from "@/data/profile";

export function Contact() {
  return (
    <section id="contacto" className="border-t border-line py-16 md:py-24">
      <div className="shell">
          <h2 className="mb-6 font-display text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-tight">
            Contactame
          </h2>
          <p className="mb-8 max-w-[52ch] text-muted">
            ¿Tenés un proyecto o una idea? Escribime y lo conversamos.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="press rounded-[10px] border border-ink bg-ink px-5 py-3 font-medium text-paper hover:bg-ink/85"
            >
              Escribirme en LinkedIn
            </a>
            {EMAIL && (
              <a
                href={`mailto:${EMAIL}`}
                className="press rounded-[10px] border border-ink px-5 py-3 font-medium hover:bg-ink/8"
              >
                {EMAIL}
              </a>
            )}
          </div>
      </div>
    </section>
  );
}