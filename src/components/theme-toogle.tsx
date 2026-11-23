"use client";

import { useTheme } from "next-themes";

const icon = {
  "aria-hidden": true,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

// Se muestran ambos íconos y el CSS (variante dark:) elige cuál ver, así no hace
// falta esperar al montaje para evitar diferencias de hidratación.
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Cambiar entre modo claro y oscuro"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="press grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-line bg-card text-ink hover:border-accent hover:text-accent"
    >
      {/* Luna: visible en modo claro */}
      <svg {...icon} className="h-[18px] w-[18px] dark:hidden">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
      {/* Sol: visible en modo oscuro */}
      <svg {...icon} className="hidden h-[18px] w-[18px] dark:block">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    </button>
  );
}
