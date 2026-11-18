"use client";

import { useState } from "react";
import { ThemeToggle } from "./theme-toogle";

const LINKS = [
  { href: "#sobre", label: "Sobre mí" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#contacto", label: "Contacto" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur">
      <nav className="shell flex h-[60px] items-center justify-between">
<a
  href="#top"
  aria-label="Gabriel Neme, volver al inicio"
  className="flex items-center gap-3"
>
  <span
    aria-hidden="true"
    className="relative grid h-9 w-9 place-items-center rounded-[10px] bg-ink font-display text-lg font-extrabold text-paper"
  >
    G
    <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-paper" />
  </span>
  <span className="hidden text-[15px] text-muted sm:inline">Portafolio</span>
</a>

        <div className="flex items-center gap-3 text-[15px] text-muted sm:gap-6">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hidden hover:text-ink sm:block"
            >
              {l.label}
            </a>
          ))}

          <button
            type="button"
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen(!open)}
            className="h-10 cursor-pointer rounded-full border border-line bg-card px-4 text-ink sm:hidden"
          >
            {open ? "Cerrar" : "Menú"}
          </button>

          <ThemeToggle />
        </div>
      </nav>

      {open && (
        <div id="menu-movil" className="border-t border-line sm:hidden">
          <ul className="shell flex flex-col py-2">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-lg"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}