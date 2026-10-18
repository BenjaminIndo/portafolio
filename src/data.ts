// Contenido de la página. Para actualizar la información basta con editar este archivo.

export const perfil = {
  nombre: 'Benjamín Indo',
  titulo: 'Estudiante de Ingeniería Civil en Computación',
  universidad: 'Universidad de Chile',
  ubicacion: 'Santiago, Chile',
  resumen:
    'Estudiante de 5º año. Me dedico al desarrollo backend en Python/Django y a pipelines de IA aplicada: integro LLMs locales y en la nube como etapas de flujos de datos, evalúo modelos y tomo decisiones de costo y privacidad.',
  enfoque:
    'Trabajo con especificaciones primero (OpenSpec) y agentes de código (Claude Code, Codex), siempre con revisión, tests y pull requests.',
  correo: 'benjamin.indo@ug.uchile.cl',
  linkedin: 'https://www.linkedin.com/in/benjaminIndo',
  github: 'https://github.com/BenjaminIndo',
  cv: 'cv.pdf',
}

export type Item = {
  nombre: string
  descripcion: string
  tags: string[]
  link?: string
}

export type Experiencia = {
  rol: string
  lugar: string
  periodo: string
  descripcion?: string
  items: Item[]
}

export const experiencia: Experiencia[] = [
  {
    rol: 'Interno de Proyectos de IA',
    lugar: 'Oficina de Inteligencia Artificial, VTI · U. de Chile',
    periodo: 'jun. 2026 — actualidad',
    items: [
      {
        nombre: 'ICAI · Plataforma de investigación',
        descripcion:
          'Diseñé ingesta2, un pipeline de 6 fases que convierte papers en PDF en datos consultables por un RAG, idempotente y reanudable. Llevé la inferencia a modelos locales (Qwen vía vLLM en el clúster NLHPC) y la contrasté con OpenAI mediante benchmarks reproducibles.',
        tags: ['Python', 'PostgreSQL', 'Qdrant', 'vLLM', 'Docling'],
      },
      {
        nombre: 'DGDP · Reportes de teletrabajo',
        descripcion:
          'Pipeline con LLMs que extrajo 459.804 actividades desde 90.000 reportes en texto libre y las agrupó en 95 familias con embeddings locales, con privacidad por defecto y un mapa interactivo de resultados.',
        tags: ['LLMs', 'Embeddings', 'UMAP', 'HDBSCAN'],
      },
      {
        nombre: 'docencIA · Prompts pedagógicos',
        descripcion:
          'Plataforma de punta a punta donde docentes crean, adaptan y curan prompts, con foro moderado, Google OAuth, auditoría y 89 tests.',
        tags: ['Django', 'PostgreSQL', 'Docker'],
      },
      {
        nombre: 'Puente IA · Aprendizaje adaptativo PAES',
        descripcion:
          'App con diagnóstico de Matemática, rutas personalizadas y progreso con XP y rachas, a partir de un prototipo open source.',
        tags: ['React Native', 'Expo', 'TypeScript', 'Supabase'],
      },
      {
        nombre: 'Curso «IA para docentes»',
        descripcion:
          'Módulos interactivos, como un simulador de prompts y un laboratorio de auditoría de alucinaciones y sesgos.',
        tags: ['React', 'TypeScript'],
      },
    ],
  },
  {
    rol: 'Practicante FullStack Developer',
    lugar: 'SAWA',
    periodo: 'ene. 2026 — mar. 2026',
    descripcion:
      'Rediseñé flujos de datos financieros con procesos batch automatizados, ahorrando $1.000.000 mensuales y eliminando esperas de hasta 90 segundos. Corregí patrones N+1, mejoré la integridad de archivos en GCP con URLs firmadas e idempotencia y desplegué releases con CI y Kubernetes.',
    items: [],
  },
]

export const proyectos: (Item & { año: string })[] = [
  {
    nombre: 'Sistema de Facturación · NIC Chile',
    año: '2026',
    descripcion:
      'Coordino al equipo y la relación con la contraparte; desarrollo funcionalidades apoyándome en agentes de IA, revisando el código generado.',
    tags: ['Angular', 'Bootstrap', 'Jira'],
  },
  {
    nombre: 'Eventos Beauchef',
    año: '2025',
    descripcion:
      'Gestión de eventos universitarios con roles, filtros y estadísticas. Coordiné a un equipo de 6 personas.',
    tags: ['Django', 'SQLite', 'JavaScript'],
  },
  {
    nombre: 'GameBoxd',
    año: '2025',
    descripcion:
      'Plataforma social para gamers. Implementé autenticación, tests de integración y componentes del frontend.',
    tags: ['React', 'Redux', 'Node.js', 'MongoDB'],
  },
  {
    nombre: 'Clasificación de rendimiento estudiantil',
    año: '2025',
    descripcion: 'Modelos de clasificación para predecir la calificación final de estudiantes.',
    tags: ['Python', 'pandas', 'scikit-learn'],
  },
]

export const docencia = [
  {
    curso: 'CC5003 · Desarrollo de Aplicaciones Web Reactivas',
    periodo: 'ago. 2026 — actualidad',
    descripcion: 'Examino laboratorios de live programming y evalúo proyectos fullstack en React.',
  },
  {
    curso: 'CC3002 · Metodologías de Diseño y Programación',
    periodo: 'mar. 2026 — ago. 2026',
    descripcion: 'Corrección de evaluaciones sobre diseño orientado a objetos, patrones de diseño y testing.',
  },
]

export const habilidades: { area: string; items: string[] }[] = [
  { area: 'Lenguajes', items: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'C', 'Scala'] },
  {
    area: 'Backend y datos',
    items: ['Django', 'SQLAlchemy', 'APIs REST', 'PostgreSQL', 'MongoDB', 'Qdrant', 'Supabase', 'pandas'],
  },
  {
    area: 'IA aplicada',
    items: ['LLMs', 'vLLM', 'RAG', 'Embeddings', 'UMAP / HDBSCAN', 'scikit-learn', 'Benchmarking'],
  },
  {
    area: 'Infraestructura',
    items: ['Docker', 'Kubernetes', 'GCP', 'Slurm / HPC', 'Apptainer', 'CI/CD', 'Vercel'],
  },
  { area: 'Frontend y móvil', items: ['React', 'Redux Toolkit', 'Angular', 'React Native', 'Expo'] },
]
