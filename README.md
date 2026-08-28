# Eugí's Garden 🌿

App de catálogo de plantas paraguayas para cotización de paisajismo. Pensada para usarse en **tablet**, es una SPA **100% offline** (sin servidor, sin backend): una vez abierta, no necesita conexión a internet.

## 🚀 Publicar en GitHub Pages (hosting gratis)

La app se publica con **GitHub Actions** automáticamente cada vez que pusheas a la rama principal. Después solo entrás desde el link.

### Paso 1 — Crear el repositorio en GitHub

1. Entrá a [github.com](https://github.com) y creá un repo **nuevo y vacío** (sin README, sin gitignore).
2. Escribí un nombre, por ejemplo `eugis-garden` (sin espacios).
3. Copiá la URL del repo (tipo `https://github.com/TU-USUARIO/eugis-garden.git`).

### Paso 2 — Subir el proyecto

Desde la carpeta del proyecto (la que contiene `package.json`), en la terminal:

```bash
git init
git add .
git commit -m "Primera versión - catálogo de plantas"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/eugis-garden.git
git push -u origin main
```

### Paso 3 — Activar GitHub Pages

1. En GitHub, entrá a tu repo → **Settings** → **Pages**.
2. En **Source**, elegí **"GitHub Actions"**.
3. Listo. El workflow corre solo y la app queda en:

```
https://TU-USUARIO.github.io/eugis-garden/
```

Abrí ese link en la tablet y guardalo como acceso directo / agregar a pantalla de inicio.

## 🧑‍💻 Desarrollo local

```bash
npm install
npm run dev      # abre en http://localhost:5173
```

## 🛠 Stack

- React + Vite
- Tailwind CSS v4
- Datos locales (sin backend, sin internet)
