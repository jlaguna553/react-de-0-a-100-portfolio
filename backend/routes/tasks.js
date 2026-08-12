import { Router } from 'express'
import { nanoid } from 'nanoid'
import { db } from '../db.js'

// Un Router agrupa rutas relacionadas (todo lo de "tareas") en un solo
// archivo, en vez de amontonar todo en server.js. Esto es simplemente
// organización de código: server.js hace `app.use('/api/tasks', router)`.
export const tasksRouter = Router()

// GET /api/tasks  → lista todas las tareas (con filtros opcionales por query string)
tasksRouter.get('/', async (req, res) => {
  await db.read()
  let { tasks } = db.data

  const { completed, category } = req.query
  if (completed !== undefined) {
    tasks = tasks.filter((t) => String(t.completed) === completed)
  }
  if (category) {
    tasks = tasks.filter((t) => t.category === category)
  }

  // Más recientes primero
  tasks = [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  res.json(tasks)
})

// GET /api/tasks/:id → una sola tarea
tasksRouter.get('/:id', async (req, res) => {
  await db.read()
  const tarea = db.data.tasks.find((t) => t.id === req.params.id)
  if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' })
  res.json(tarea)
})

// POST /api/tasks → crear una nueva tarea
tasksRouter.post('/', async (req, res) => {
  const { title, description = '', category = 'otro', priority = 'normal' } = req.body

  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'El campo "title" es obligatorio' })
  }

  const nuevaTarea = {
    id: nanoid(8),
    title: title.trim(),
    description,
    category,
    priority,
    completed: false,
    createdAt: new Date().toISOString(),
  }

  await db.read()
  db.data.tasks.push(nuevaTarea)
  await db.write() // Persiste el cambio en data/db.json

  res.status(201).json(nuevaTarea)
})

// PUT /api/tasks/:id → actualizar (parcial) una tarea existente
tasksRouter.put('/:id', async (req, res) => {
  await db.read()
  const tarea = db.data.tasks.find((t) => t.id === req.params.id)
  if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' })

  // Object.assign fusiona solo los campos que vengan en el body,
  // dejando el resto de la tarea intacta (actualización parcial tipo PATCH).
  Object.assign(tarea, req.body)
  await db.write()

  res.json(tarea)
})

// DELETE /api/tasks/:id → eliminar una tarea
tasksRouter.delete('/:id', async (req, res) => {
  await db.read()
  const antes = db.data.tasks.length
  db.data.tasks = db.data.tasks.filter((t) => t.id !== req.params.id)

  if (db.data.tasks.length === antes) {
    return res.status(404).json({ error: 'Tarea no encontrada' })
  }

  await db.write()
  res.status(204).send() // 204 = éxito, sin contenido que devolver
})
