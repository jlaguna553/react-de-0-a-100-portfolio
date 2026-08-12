import { useState } from 'react'

const ESTADO_INICIAL = {
  title: '',
  description: '',
  category: 'trabajo',
  priority: 'normal',
}

// ============================================================================
// FORMULARIOS CONTROLADOS
// "Controlado" significa que el VALOR de cada input vive en el estado de
// React (value={form.title}), y cada tecla que el usuario presiona dispara
// onChange, que actualiza ese estado. React es la única fuente de verdad;
// el DOM solo refleja lo que React le dice.
// ============================================================================
export default function TaskForm({ onCreate }) {
  const [form, setForm] = useState(ESTADO_INICIAL)
  const [enviando, setEnviando] = useState(false)

  // Un solo handler genérico para todos los campos: usamos el atributo
  // `name` del input para saber qué parte del estado actualizar.
  // El spread (...) copia las demás propiedades y solo sobreescribe una.
  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault() // Evita que el navegador recargue la página (comportamiento por defecto de <form>)
    if (!form.title.trim()) return

    setEnviando(true)
    try {
      await onCreate(form)
      setForm(ESTADO_INICIAL) // Limpiamos el formulario tras crear con éxito
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 10,
        padding: 16,
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        marginBottom: 20,
      }}
    >
      <input
        name="title"
        placeholder="¿Qué hay que hacer?"
        value={form.title}
        onChange={handleChange}
        style={{ flex: '1 1 220px', padding: 10, borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}
        required
      />

      <input
        name="description"
        placeholder="Descripción (opcional)"
        value={form.description}
        onChange={handleChange}
        style={{ flex: '1 1 220px', padding: 10, borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}
      />

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        style={{ padding: 10, borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}
      >
        <option value="trabajo">Trabajo</option>
        <option value="personal">Personal</option>
        <option value="estudio">Estudio</option>
        <option value="otro">Otro</option>
      </select>

      <select
        name="priority"
        value={form.priority}
        onChange={handleChange}
        style={{ padding: 10, borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}
      >
        <option value="normal">Prioridad normal</option>
        <option value="alta">Prioridad alta</option>
      </select>

      <button
        type="submit"
        disabled={enviando}
        style={{
          padding: '10px 18px',
          borderRadius: 8,
          border: 'none',
          background: 'var(--primary)',
          color: '#fff',
          fontWeight: 600,
        }}
      >
        {enviando ? 'Creando...' : '+ Agregar tarea'}
      </button>
    </form>
  )
}
