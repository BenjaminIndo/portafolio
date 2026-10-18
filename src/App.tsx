import { useEffect, useState, type ReactNode } from 'react'
import { docencia, experiencia, habilidades, perfil, proyectos, type Item } from './data'
import { GitHubIcon, LinkedInIcon, MailIcon, MoonIcon, SunIcon, DownloadIcon } from './icons'

type Tema = 'light' | 'dark'

function temaInicial(): Tema {
  const actual = document.documentElement.dataset.theme
  if (actual === 'light' || actual === 'dark') return actual
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function useTema() {
  const [tema, setTema] = useState<Tema>(temaInicial)
  useEffect(() => {
    document.documentElement.dataset.theme = tema
    try {
      localStorage.setItem('tema', tema)
    } catch {
      /* almacenamiento no disponible */
    }
  }, [tema])
  return [tema, () => setTema((t) => (t === 'dark' ? 'light' : 'dark'))] as const
}

const secciones = [
  { id: 'experiencia', label: 'Experiencia' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'docencia', label: 'Docencia' },
  { id: 'habilidades', label: 'Habilidades' },
  { id: 'contacto', label: 'Contacto' },
]

// Sección cuyo inicio ya pasó el tercio superior de la pantalla; al llegar al final, la última.
function useSeccionActiva(ids: string[]) {
  const [activa, setActiva] = useState<string | null>(null)
  useEffect(() => {
    const calcular = () => {
      const alFinal = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (alFinal) return setActiva(ids[ids.length - 1])
      let actual: string | null = null
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight / 3) actual = id
      }
      setActiva(actual)
    }
    calcular()
    window.addEventListener('scroll', calcular, { passive: true })
    window.addEventListener('resize', calcular)
    return () => {
      window.removeEventListener('scroll', calcular)
      window.removeEventListener('resize', calcular)
    }
  }, [ids])
  return activa
}

// Hace aparecer suavemente los elementos con clase .reveal cuando entran en pantalla.
function useReveal() {
  useEffect(() => {
    const elementos = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            observer.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
    )
    elementos.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

const idsSecciones = secciones.map((s) => s.id)

function Header() {
  const [tema, alternar] = useTema()
  const activa = useSeccionActiva(idsSecciones)
  return (
    <header className="header">
      <div className="header-inner">
        <a href="#inicio" className="logo">
          BI
        </a>
        <nav className="nav">
          {secciones.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={activa === s.id ? 'active' : undefined}
              aria-current={activa === s.id ? 'true' : undefined}
            >
              {s.label}
            </a>
          ))}
        </nav>
        <button
          className="icon-btn"
          onClick={alternar}
          aria-label={tema === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          title={tema === 'dark' ? 'Modo claro' : 'Modo oscuro'}
        >
          {tema === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </header>
  )
}

function Seccion({ id, titulo, children }: { id: string; titulo: string; children: ReactNode }) {
  return (
    <section id={id} className="section">
      <h2 className="section-title reveal">{titulo}</h2>
      {children}
    </section>
  )
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="tags">
      {tags.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  )
}

function Tarjeta({ item, meta }: { item: Item; meta?: string }) {
  const titulo = item.link ? (
    <a href={item.link} target="_blank" rel="noreferrer">
      {item.nombre} ↗
    </a>
  ) : (
    item.nombre
  )
  return (
    <article className="card reveal">
      <div className="card-head">
        <h4>{titulo}</h4>
        {meta && <span className="meta">{meta}</span>}
      </div>
      <p>{item.descripcion}</p>
      <Tags tags={item.tags} />
    </article>
  )
}

function Hero() {
  return (
    <section id="inicio" className="hero">
      <p className="eyebrow">Hola, soy</p>
      <h1>{perfil.nombre}</h1>
      <p className="subtitle">
        {perfil.titulo} en la <span className="accent">{perfil.universidad}</span>.
      </p>
      <p className="lead">{perfil.resumen}</p>
      <p className="lead muted">{perfil.enfoque}</p>
      <div className="actions">
        <a className="btn btn-primary" href={perfil.cv} target="_blank" rel="noreferrer">
          <DownloadIcon /> Ver CV
        </a>
        <a className="btn" href={`mailto:${perfil.correo}`}>
          <MailIcon /> Escríbeme
        </a>
        <a className="icon-btn" href={perfil.github} target="_blank" rel="noreferrer" aria-label="GitHub">
          <GitHubIcon />
        </a>
        <a className="icon-btn" href={perfil.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <LinkedInIcon />
        </a>
      </div>
    </section>
  )
}

export default function App() {
  useReveal()
  return (
    <>
      <Header />
      <main className="container">
        <Hero />

        <Seccion id="experiencia" titulo="Experiencia">
          <ol className="timeline">
            {experiencia.map((e) => (
              <li key={e.rol + e.lugar} className="timeline-item">
                <div className="reveal">
                  <div className="timeline-head">
                    <h3>{e.rol}</h3>
                    <span className="meta">{e.periodo}</span>
                  </div>
                  <p className="place">{e.lugar}</p>
                  {e.descripcion && <p>{e.descripcion}</p>}
                </div>
                {e.items.length > 0 && (
                  <div className="cards">
                    {e.items.map((i) => (
                      <Tarjeta key={i.nombre} item={i} />
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ol>
        </Seccion>

        <Seccion id="proyectos" titulo="Proyectos">
          <div className="cards">
            {proyectos.map((p) => (
              <Tarjeta key={p.nombre} item={p} meta={p.año} />
            ))}
          </div>
        </Seccion>

        <Seccion id="docencia" titulo="Docencia">
          <ul className="list">
            {docencia.map((d) => (
              <li key={d.curso} className="reveal">
                <div className="timeline-head">
                  <h3>Ayudante · {d.curso}</h3>
                  <span className="meta">{d.periodo}</span>
                </div>
                <p>{d.descripcion}</p>
              </li>
            ))}
          </ul>
        </Seccion>

        <Seccion id="habilidades" titulo="Habilidades">
          <dl className="skills">
            {habilidades.map((h) => (
              <div key={h.area} className="skill-row reveal">
                <dt>{h.area}</dt>
                <dd>
                  <Tags tags={h.items} />
                </dd>
              </div>
            ))}
          </dl>
        </Seccion>

        <Seccion id="contacto" titulo="Contacto">
          <p className="lead reveal">
            Busco oportunidades en desarrollo backend e IA aplicada. Si te interesa conversar, escríbeme.
          </p>
          <a className="mail-link reveal" href={`mailto:${perfil.correo}`}>
            {perfil.correo}
          </a>
          <div className="actions reveal">
            <a className="btn" href={perfil.linkedin} target="_blank" rel="noreferrer">
              <LinkedInIcon /> LinkedIn
            </a>
            <a className="btn" href={perfil.github} target="_blank" rel="noreferrer">
              <GitHubIcon /> GitHub
            </a>
          </div>
        </Seccion>
      </main>
      <footer className="footer">
        © {new Date().getFullYear()} {perfil.nombre} · {perfil.ubicacion}
      </footer>
    </>
  )
}
