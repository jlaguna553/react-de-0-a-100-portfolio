import { Link } from 'react-router-dom'

const COLORES_CATEGORIA = {
  trabajo: '#4f46e5',
  personal: '#16a34a',
  estudio: '#d97706',
  otro: '#6b7280',
}

// ============================================================================
// PROPS — cómo un componente PADRE le pasa datos a un componente HIJO.
// TaskCard no sabe nada de dónde vienen los datos (backend, mock, etc.),
// solo sabe que recibe un objeto `task` y dos funciones. Esto lo hace
// reutilizable y fácil de probar.
// ============================================================================
export default function TaskCard({ task, onToggle, onDelete }) {
  const colorCategoria = COLORES_CATEGORIA[task.category] || COLORES_CATEGORIA.otro

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        padding: 16,
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        boxShadow: 'var(--shadow)',
        opacity: task.completed ? 0.65 : 1,
      }}
    >
      {/* Checkbox controlado: su valor viene 100% del estado (task.completed),
          nunca del DOM. Por eso es un "componente controlado". */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        style={{ marginTop: 4, width: 18, height: 18 }}
      />

      <div style={{ flex: 1, minWidth: 0 }}>
        <Link
          to={`/tareas/${task.id}`}
          style={{
            fontWeight: 600,
            fontSize: 16,
            textDecoration: task.completed ? 'line-through' : 'none',
            color: 'var(--text)',
          }}
        >
          {task.title}
        </Link>

        {task.description && (
          <p style={{ margin: '4px 0 8px', color: 'var(--text-muted)', fontSize: 14 }}>
            {task.description}
          </p>
        )}

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: '#fff',
              background: colorCategoria,
              padding: '2px 8px',
              borderRadius: 999,
            }}
          >
            {task.category}
          </span>
          {task.priority === 'alta' && (
            <span style={{ fontSize: 12, color: 'var(--danger)', fontWeight: 600 }}>
              🔥 prioridad alta
            </span>
          )}
        </div>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        title="Eliminar tarea"
        style={{
          border: 'none',
          background: 'transparent',
          color: 'var(--danger)',
          fontSize: 18,
          padding: 4,
        }}
      >
        🗑️
      </button>
    </div>
  )
}
