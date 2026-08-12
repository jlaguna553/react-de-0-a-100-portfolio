import { useCallback, useEffect, useState } from 'react'

// import.meta.env.VITE_API_URL te permite apuntar a un backend distinto
// en producción (ver sección de despliegue de la guía) sin tocar el código.
// Si no defines esa variable, usamos localhost para desarrollo local.
const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/tasks`

// ============================================================================
// CUSTOM HOOK — la forma de reutilizar LÓGICA con estado entre componentes.
//
// Un custom hook es simplemente una función que:
//   1. Empieza con "use" (convención obligatoria para que React sepa
//      que puede usar otros hooks adentro).
//   2. Puede usar useState, useEffect, etc. por dentro.
//   3. Devuelve lo que el componente necesita (datos + funciones).
//
// Aquí encapsulamos TODA la comunicación con el backend (fetch, loading,
// errores) para que Dashboard.jsx, Tareas.jsx y TareaDetalle.jsx no tengan
// que repetir ese código. Esto es "separar lógica de presentación".
// ============================================================================
export function useTasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // useCallback evita que esta función se re-cree en cada render,
  // lo cual es importante porque la usamos dentro de un useEffect
  // que la tiene como dependencia (más abajo, en el componente que la usa).
  const fetchTasks = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(API_URL)
      if (!res.ok) throw new Error(`Error del servidor: ${res.status}`)
      const data = await res.json()
      setTasks(data)
    } catch (err) {
      setError(
        err.message.includes('fetch')
          ? 'No se pudo conectar con el backend. ¿Está corriendo en el puerto 4000?'
          : err.message,
      )
    } finally {
      setLoading(false)
    }
  }, [])

  // Al montar el componente que use este hook, cargamos las tareas una vez.
  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  async function createTask(task) {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    })
    if (!res.ok) throw new Error('No se pudo crear la tarea')
    const nueva = await res.json()
    // Actualización optimista del estado local: no esperamos a re-pedir
    // toda la lista, simplemente añadimos la tarea nueva al array.
    setTasks((prev) => [nueva, ...prev])
    return nueva
  }

  async function updateTask(id, cambios) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cambios),
    })
    if (!res.ok) throw new Error('No se pudo actualizar la tarea')
    const actualizada = await res.json()
    setTasks((prev) => prev.map((t) => (t.id === id ? actualizada : t)))
    return actualizada
  }

  async function deleteTask(id) {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('No se pudo eliminar la tarea')
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  async function toggleComplete(id) {
    const tarea = tasks.find((t) => t.id === id)
    if (!tarea) return
    await updateTask(id, { completed: !tarea.completed })
  }

  return {
    tasks,
    loading,
    error,
    refetch: fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleComplete,
  }
}
