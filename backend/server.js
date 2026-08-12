import express from 'express'
import cors from 'cors'
import { db } from './db.js'
import { tasksRouter } from './routes/tasks.js'

// ============================================================================
// SERVIDOR EXPRESS — la API REST que consume el frontend de React.
// React (el navegador) y este servidor son DOS programas completamente
// separados que se comunican por HTTP. Por eso corres "npm run dev" en
// dos terminales distintas: una para el frontend (puerto 5173) y otra
// para este backend (puerto 4000).
// ============================================================================
const app = express()
const PORT = 4000

// cors() permite que el navegador (en localhost:5173) haga peticiones
// a este servidor (en localhost:4000). Sin esto, el navegador las
// bloquearía por política de "same-origin".
app.use(cors())

// express.json() lee el body de las peticiones POST/PUT como JSON
// y lo deja disponible en req.body.
app.use(express.json())

// Pequeño middleware de logging para que veas cada petición en la terminal
// mientras aprendes — así entiendes exactamente qué pide el frontend.
app.use((req, res, next) => {
  console.log(`${new Date().toLocaleTimeString()}  ${req.method} ${req.url}`)
  next()
})

// Todas las rutas de /api/tasks/* viven en routes/tasks.js
app.use('/api/tasks', tasksRouter)

// Endpoint de estadísticas para el Dashboard del frontend
app.get('/api/stats', async (req, res) => {
  await db.read()
  const { tasks } = db.data
  res.json({
    total: tasks.length,
    completadas: tasks.filter((t) => t.completed).length,
    pendientes: tasks.filter((t) => !t.completed).length,
    prioridadAlta: tasks.filter((t) => t.priority === 'alta' && !t.completed).length,
  })
})

app.get('/', (req, res) => {
  res.send('✅ API de TaskFlow funcionando. Prueba GET /api/tasks')
})

app.listen(PORT, () => {
  console.log(`🚀 Backend de TaskFlow corriendo en http://localhost:${PORT}`)
})
