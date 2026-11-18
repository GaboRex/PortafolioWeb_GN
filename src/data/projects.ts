export type Shot = {
  src: string;
  alt: string;
  fit?: "contain" | "cover";
  device?: "desktop" | "mobile";
  /** Tamaño real en px; lo usa el marco de navegador para respetar la proporción. */
  width?: number;
  height?: number;
};

export type Project = {
  title: string;
  description: string;
  tags: string[];
  images?: Shot[];
  /** Logros o cifras concretas; se muestran como lista con check. */
  highlights?: string[];
  device?: "mobile" | "desktop"; // por defecto "desktop"
  url?: string;
  repo?: string;
};

export const PROJECTS: Project[] = [
  {
    title: "Knowledge Hub",
    description:
      "Agentes de IA desplegados que responden, en lenguaje natural, consultas sobre el módulo de Activos Fijos de SAP Business One.",
    highlights: [
      "2 agentes especializados: módulo nativo y addon",
      "Respuestas solo con documentación aprobada y fuentes citadas",
      "15 preguntas sugeridas organizadas en 5 temas",
    ],
    tags: ["Agentes de IA", "Botpress", "RAG", "SAP Business One"],
    images: [
      {
        src: "/projects/KnowledgeHub/inicio.png",
        width: 1876,
        height: 990,
        alt: "Pantalla de inicio de Knowledge Hub para elegir entre el agente del módulo nativo y el del addon",
        device: "desktop",
        fit: "contain",
      },
      {
        src: "/projects/KnowledgeHub/modulo-nativo.png",
        width: 1890,
        height: 987,
        alt: "Chat con el agente de Activos Fijos y panel de preguntas sugeridas por tema",
        device: "desktop",
        fit: "contain",
      },
    ],
    // url: "https://...",
    // repo: "https://github.com/...",
  },

  {
    title: "Angys Cookies WebApp",
    description:
      "Plataforma web para la gestión y realización de pedidos de Angy's Cookies, con catálogo de productos, selección de sabores y flujo de compra integrado con WhatsApp.",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    device: "mobile",
    images: [
      {
        src: "/projects/AngysCookies/inicio.jpg",
        alt: "Angy's Cookies WebApp en celular",
        device: "mobile",
        fit: "contain",
      },
      {
        src: "/projects/AngysCookies/menu_sabores.jpg",
        alt: "Catalogo de Angy's Cookies",
        device: "mobile",
        fit: "contain",
      },
            {
        src: "/projects/AngysCookies/menu_combo.jpg",
        alt: "Combos de Angy's Cookies",
        device: "mobile",
        fit: "contain",
      },

            {
        src: "/projects/AngysCookies/admin2.png",
        alt: "Panel de administración de Angy's Cookies",
        device: "mobile",
        fit: "contain",
      },
    ],
    // url: "https://...",
    // repo: "https://github.com/...",
  },

  {
    title: "Odonto-WebApp",
    description:
      "Aplicación web para la gestión y reserva de citas de un centro odontológico, con integración de calendario y una experiencia adaptada a dispositivos móviles.",
    tags: ["Next.js", "TypeScript", "Prisma", "Google Calendar"],
    images: [
      {
        src: "/projects/BenitezWeb/desktop.png",
        width: 2560,
        height: 1600,
        alt: "Odonto-WebApp en escritorio",
        device: "desktop",
        fit: "contain",
      },
      {
        src: "/projects/BenitezWeb/reservar.png",
        alt: "Reserva de cita en Odonto-WebApp: selección de fecha y horario",
        device: "desktop",
        width: 843,
        height: 927,
      },
    ],
    // url: "https://...",
    // repo: "https://github.com/...",
  },

  {
    title: "VetCare",
    description:
      "Sistema web para la gestión de historias clínicas veterinarias, pacientes, propietarios y consultas médicas.",
    highlights: [
      "Búsqueda de pacientes, propietarios e historial clínico",
      "Consultas con adendas y documentos adjuntos",
      "Informes médicos listos para imprimir o guardar en PDF",
    ],
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Supabase"],
    images: [
      {
        src: "/projects/VetCare/inicio2.png",
        alt: "Panel de inicio de VetCare con accesos rápidos a historial, pacientes y clientes",
        device: "desktop",
        width: 1884,
        height: 936,
      },
      {
        src: "/projects/VetCare/consulta2.png",
        alt: "Consulta clínica abierta con ficha, adendas y carga de documentos",
        device: "desktop",
        width: 810,
        height: 456,
      },
      {
        src: "/projects/VetCare/reporte2.png",
        alt: "Informe médico veterinario listo para imprimir o guardar en PDF",
        device: "desktop",
        width: 1166,
        height: 656,
      },
    ],
  },
];