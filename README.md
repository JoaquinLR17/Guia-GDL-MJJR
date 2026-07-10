# Guía de Experiencias en Guadalajara

App de una sola página (React + Vite) con recomendaciones de la ciudad: eventos, hospedaje, qué hacer, gastronomía, mapa e información útil.

## Correr en local

```bash
npm install
npm run dev
```

Abre http://localhost:5173

## Desplegar en Vercel

**Opción A — con Git (recomendada):**
1. Sube esta carpeta a un repositorio de GitHub/GitLab/Bitbucket.
2. Entra a https://vercel.com/new e importa el repositorio.
3. Vercel detecta automáticamente que es un proyecto Vite:
   - Build Command: `npm run build` (o `vite build`)
   - Output Directory: `dist`
4. Deploy. Listo.

**Opción B — sin Git, con la CLI de Vercel:**
```bash
npm install -g vercel
cd boda-guadalajara
vercel
```
Sigue las instrucciones en pantalla (te va a preguntar si quieres desplegarlo, en qué cuenta, etc.). Con `vercel --prod` publicas directo a producción.

## Notas

- Las imágenes de Wikimedia Commons y el mapa embebido de Google Maps pueden no cargar bien en algunos entornos de preview/sandbox, pero funcionan correctamente una vez desplegado en Vercel.
- Todo el contenido (actividades, restaurantes, hospedaje, etc.) vive en arreglos de JavaScript dentro de `src/App.jsx`, para que sea fácil de editar.
- El proyecto está preparado para una futura migración a Next.js si se necesita (la estructura de datos ya está separada de la UI).
