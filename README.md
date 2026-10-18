# Portafolio · Benjamín Indo

Página personal en React + TypeScript (Vite). Una sola página, modo claro/oscuro.

## Editar contenido

Todo el texto (experiencia, proyectos, docencia, habilidades, links) está en `src/data.ts`.
Para enlazar un proyecto, agrega `link: 'https://...'` al ítem.
El CV está en `public/cv.pdf`.

## Desarrollo

```bash
npm install
npm run dev
```

## Publicar en users.dcc.uchile.cl/~bindo/

```bash
npm run build
```

Luego sube el **contenido** de `dist/` a tu carpeta `public_html` del DCC (la misma que usas hoy), por ejemplo:

```bash
scp -r dist/* bindo@<servidor-dcc>:~/public_html/
```

El build usa rutas relativas (`base: './'`), así que funciona bajo `/~bindo/` sin configuración extra.
