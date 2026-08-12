import { useMemo, useState } from 'react'
import { useTasks } from '../hooks/useTasks.js'
import TaskCard from '../componentes/TaskCard.jsx'
import TaskForm from '../componentes/TaskForm.jsx'
import FilterBar from '../componentes/FilterBar.jsx'
import Loader from '../componentes/Loader.jsx'

export default function Tareas() {
  // Toda la complejidad de fetch/estado vive en el custom hook.
  // Este componente solo se preocupa de "cómo se ve" la página.
  const { tasks, loading, error, createTask, deleteTask, toggleComplete } = useTasks()
  const [filtro, setFiltro] = useState('todas')

  // useMemo evita recalcular el filtrado en cada render si `tasks` y
  // `filtro` no cambiaron. Con listas pequeñas no es indispensable,
  // pero es el patrón correcto a conocer para listas grandes.
  const tareasFiltradas = useMemo(() => {
    if (filtro === 'pendientes') return tasks.filter((t) => !t.completed)
    if (filtro === 'completadas') return tasks.filter((t) => t.completed)
    return tasks
  }, [tasks, filtro])

  const completadas = tasks.filter((t) => t.completed).length

  return (
    <div>
      <h1>Mis tareas</h1>

      <TaskForm onCreate={createTask} />

      {error && (
        <div style={{ padding: 12, background: '#fee2e2', color: '#991b1b', borderRadius: 8, marginBottom: 16 }}>
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <Loader texto="Cargando tareas..." />
      ) : (
        <>
          <FilterBar
            filtro={filtro}
            setFiltro={setFiltro}
            total={tasks.length}
            completadas={completadas}
          />

          {tareasFiltradas.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>No hay tareas en este filtro.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {/* .map() para renderizar listas. La `key` DEBE ser única y
                  estable (el id de la tarea, nunca el índice del array
                  si la lista puede reordenarse o filtrarse). */}
              {tareasFiltradas.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={toggleComplete}
                  onDelete={deleteTask}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
