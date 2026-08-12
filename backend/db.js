import { JSONFilePreset } from 'lowdb/node'
import { nanoid } from 'nanoid'

// ============================================================================
// "BASE DE DATOS" — usamos lowdb, que guarda los datos en un archivo JSON
// plano (backend/data/db.json). Es perfecta para aprender porque puedes
// ABRIR el archivo y ver exactamente qué se está guardando, sin instalar
// Postgres/MySQL/Mongo. La forma de usarla (await db.read(), db.data, y
// await db.write()) es MUY parecida a como usarías un ORM real, así que
// el código que escribes aquí se traduce casi 1:1 el día que migres a
// una base de datos real en producción.
// ============================================================================

const DATOS_INICIALES = {
  tasks: [
    {
      id: nanoid(8),
      title: 'Terminar el curso de React',
      description: 'Repasar hooks y Context API',
      category: 'estudio',
      priority: 'alta',
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: nanoid(8),
      title: 'Hacer el súper',
      description: 'Leche, huevos, café',
      category: 'personal',
      priority: 'normal',
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: nanoid(8),
      title: 'Enviar reporte semanal',
      description: '',
      category: 'trabajo',
      priority: 'normal',
      completed: true,
      createdAt: new Date().toISOString(),
    },
  ],
}

// JSONFilePreset crea el archivo si no existe (con los datos iniciales)
// y lo carga si ya existe, en una sola llamada.
export const db = await JSONFilePreset('data/db.json', DATOS_INICIALES)
