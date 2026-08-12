# TaskFlow — De 0 a 100: HTML, CSS, JavaScript y React

Proyecto completo para aprender desarrollo web front-end **desde los
fundamentos**, terminando en una app full-stack real: un gestor de tareas.

Tiene tres capas, pensadas para recorrerse **en este orden**:

1. **`fundamentos/`** — HTML, CSS y JavaScript puro. Seis ejemplos comentados
   que se abren con doble clic, sin instalar nada. Terminan con la misma app de
   tareas escrita **sin frameworks**, para que sientas exactamente qué problema
   resuelve React.
2. **`frontend/`** — la app en React (Vite), más 8 ejemplos aislados de cada
   concepto fundamental (JSX, props, estado, listas, `useEffect`, formularios,
   custom hooks, Context API).
3. **`backend/`** — la API REST (Express + lowdb) que consume el frontend.

Lee **[`GUIA-REACT-0-A-100.md`](GUIA-REACT-0-A-100.md)** para la teoría
completa: Parte I (fundamentos, §1–9), Parte II (React, §10–27) y Parte III
(backend, base de datos y despliegue, §28–32).

## Paso 1 — Fundamentos (no requiere instalar nada)

Abre `fundamentos/01-html/index.html` en tu navegador y sigue el orden de
[`fundamentos/README.md`](fundamentos/README.md). Ten siempre abierta la consola
del navegador (`F12`).

Al final de esa parte hay un **checklist** (§9 de la guía). Si lo pasas, estás
listo para React; si no, ya sabes exactamente qué repasar.

## Paso 2 — La app React (necesitas Node)

### Requisitos

- Node.js 18 o superior (`node --version` para comprobarlo)
- npm (viene con Node)

### Cómo correrlo (necesitas 2 terminales)

**Terminal 1 — Backend:**

```bash
cd backend
npm install
npm run dev
```

Debe imprimir: `🚀 Backend de TaskFlow corriendo en http://localhost:4000`

**Terminal 2 — Frontend:**

```bash
cd frontend
npm install
npm run dev
```

Abre la URL que te indique la terminal (normalmente `http://localhost:5173`).
La ruta `/aprende` tiene los 8 ejemplos de React aislados y funcionando.

## Estructura del proyecto

```
react-de-0-a-100/
├── fundamentos/               HTML, CSS y JS puro — sin instalar nada
│   ├── 01-html/               Estructura, semántica, formularios, accesibilidad
│   ├── 02-css/                Cascada, box model, flexbox, grid, responsive
│   ├── 03-js-lenguaje/        Tipos, funciones, objetos, arrays, inmutabilidad
│   ├── 04-js-dom/             DOM, eventos, formularios, localStorage
│   ├── 05-js-async/           Promesas, async/await, fetch, HTTP
│   └── 06-mini-app-vanilla/   La misma app, sin React (el puente)
├── frontend/                  Aplicación React (Vite)
│   └── src/
│       ├── ejemplos/          8 ejemplos aislados, uno por concepto
│       ├── componentes/       Piezas reutilizables (TaskCard, TaskForm...)
│       ├── paginas/           Las "pantallas" de la app (rutas)
│       ├── hooks/             Custom hooks (useTasks: habla con el backend)
│       └── context/           Context API (tema claro/oscuro)
├── backend/                   API REST (Express + lowdb)
│   ├── server.js              Punto de entrada del servidor
│   ├── db.js                  Configuración de la base de datos (JSON)
│   ├── routes/tasks.js        Endpoints CRUD de /api/tasks
│   └── data/db.json           Los datos persistidos (se crea solo)
└── GUIA-REACT-0-A-100.md      Guía teórica completa (fundamentos → React → deploy)
```

---

## Desarrollado por Francisco Javier Laguna

Full-stack developer · React · Vue · .NET · PHP

[GitHub](https://github.com/jlaguna553) · [LinkedIn](https://www.linkedin.com/in/francisco-javier-laguna-mondrag%C3%B3n-80a798154/) · [CV Online](https://cv-online.jlaguna553.workers.dev/v/xrdcnyej)
