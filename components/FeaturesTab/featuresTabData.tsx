import { FeatureTab } from "@/types/featureTab";

const featuresTabData: FeatureTab[] = [
  {
    id: "tabOne",
    title: "Investigación y Planificación",
    desc1: `Define tu pregunta/hipótesis:
Ejemplo: "¿Cómo afecta la contaminación por microplásticos a la reproducción de los corales en el Caribe?"`,
    desc2: `  Metodología: Decide si será experimental, teórica o revisión sistemática.
Herramientas útiles: Zotero (para gestionar referencias), Excel (para datos preliminares).`,
    image: "/images/features/planing.jpeg",
    imageDark: "/images/features/planing.jpeg",
  },
  {
    id: "tabTwo",
    title: "Redacción Estructurada",
    desc1: `Introducción: Contexto + objetivos (10% del texto).

Métodos: Detalles replicables (20%).
Incluye: Materiales, protocolos, software usado (ej: Python para análisis estadístico).`,
    desc2: `    Resultados: Datos crudos + gráficos (30%). Usa herramientas como GraphPad Prism o Tableau.

Discusión: Interpretación + limitaciones (30%). Responde: "¿Por qué importan estos hallazgos?"

Resumen (Abstract): Último en escribirse, pero va al inicio (máx. 250 palabras).`,
    image: "/images/features/writing.jpeg",
    imageDark: "/images/features/writing.jpeg",
  },
  {
    id: "tabThree",
    title: "Validación y Publicación",
    desc1: `Revisión por pares: Pide feedback a colegas o usa plataformas como arXiv (preprints).

Selección de revista:

    Usa Journal Finder (Elsevier/Springer) o Scimago Journal Rank para elegir según tu impacto objetivo.

    Verifica requisitos de formato (ej: APA, Vancouver).`,
    desc2: `Envío y seguimiento: Prepara una cover letter persuasiva y responde a revisiones con datos adicionales si es necesario.`,
    image: "/images/features/publish.jpeg",
    imageDark: "/images/features/publish.jpeg",
  },
];

export default featuresTabData;
