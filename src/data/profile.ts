export const LINKEDIN =
  "https://www.linkedin.com/in/gabriel-giovanni-neme-benitez-5ab54a256";

// Si querés mostrar un botón de correo, escribí tu email acá. Vacío = no aparece.
export const EMAIL = "gabrielsolutions11@gmail.com";

/** Lo que ofrezco; se muestra como tarjetas en "Sobre mí". */
export const SERVICES = [
  {
    icon: "agent",
    title: "Diseño de agentes de IA",
    text: "Agentes de conocimiento que responden en lenguaje natural sobre la documentación de tu empresa, solo con fuentes aprobadas y citándolas.",
  },
  {
    icon: "web",
    title: "Aplicaciones web a medida",
    text: "Sistemas completos para negocios: reservas, pedidos, historias clínicas y paneles de administración, pensados primero para el celular.",
  },
  {
    icon: "data",
    title: "Bases de datos y backend",
    text: "Modelo los datos, diseño la base relacional y construyo la lógica que conecta todo, de la consulta SQL a la interfaz.",
  },
] as const;

export const STACK = [
  {
    group: "Frontend",
    items: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    group: "Backend y datos",
    items: ["SQL", "PostgreSQL", "Prisma", "Supabase"],
  },
  {
    group: "Inteligencia artificial",
    items: ["Agentes de IA", "RAG", "Botpress"],
  },
];
