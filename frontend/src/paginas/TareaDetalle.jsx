import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTasks } from '../hooks/useTasks.js'
import Loader from '../componentes/Loader.jsx'

// useParams lee los parámetros dinámicos de la URL (definidos en App.jsx
// como "/tareas/:id"). useNavigate nos deja redirigir por código,
// por ejemplo después de borrar una tarea.
export default function TareaDetalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { tasks, loading, updateTask, deleteTask } = useTasks()
  const [guardando, setGuardando] = useState(false)

  const task = tasks.find((t) => String(t.id) === id)

  if (loading) return <Loader texto="Cargando tarea..." />

  if (!task) {
    return (
      <div>
        <p>No se encontró la tarea con id "{id}".</p>
        <button onClick={() => navigate('/tareas')}>Volver a tareas</button>
      </div>
    )
  }

  async function handleGuardar(e) {
    e.preventDefault()
    const form = new FormData(e.target)
    setGuardando(true)
    try {
      await updateTask(task.id, {
        title: form.get('title'),
        description: form.get('description'),
      })
    } finally {
      setGuardando(false)
    }
  }

  async function handleEliminar() {
    await deleteTask(task.id)
    navigate('/tareas') // redirige tras eliminar
  }

  return (
    <div style={{ maxWidth: 520 }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: 16, background: 'none', border: 'none', color: 'var(--primary)' }}>
        ← Volver
      </button>

      <h1>Editar tarea</h1>

      <form onSubmit={handleGuardar} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <label>
          Título
          <input
            name="title"
            defaultValue={task.title}
            style={{ display: 'block', width: '100%', padding: 10, marginTop: 4, borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}
          />
        </label>

        <label>
          Descripción
          <textarea
            name="description"
            defaultValue={task.description}
            rows={4}
            style={{ display: 'block', width: '100%', padding: 10, marginTop: 4, borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}
          />
        </label>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            type="submit"
            disabled={guardando}
            style={{ padding: '10px 16px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: '#fff' }}
          >
            {guardando ? 'Guardando...' : 'Guardar cambios'}
          </button>
          <button
            type="button"
            onClick={handleEliminar}
            style={{ padding: '10px 16px', borderRadius: 8, border: '1px solid var(--danger)', background: 'transparent', color: 'var(--danger)' }}
          >
            Eliminar tarea
          </button>
        </div>
      </form>
    </div>
  )
}
