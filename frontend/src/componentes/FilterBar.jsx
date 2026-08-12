// Componente "tonto" (presentacional): no tiene estado propio, solo
// recibe el filtro actual y una función para cambiarlo. Todo el estado
// real vive en el componente padre (Tareas.jsx). Este patrón se llama
// "lifting state up" (levantar el estado al ancestro común).
export default function FilterBar({ filtro, setFiltro, total, completadas }) {
  const opciones = [
    { valor: 'todas', etiqueta: `Todas (${total})` },
    { valor: 'pendientes', etiqueta: `Pendientes (${total - completadas})` },
    { valor: 'completadas', etiqueta: `Completadas (${completadas})` },
  ]

  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
      {opciones.map((op) => (
        <button
          key={op.valor}
          onClick={() => setFiltro(op.valor)}
          style={{
            padding: '6px 14px',
            borderRadius: 999,
            border: '1px solid var(--border)',
            background: filtro === op.valor ? 'var(--primary)' : 'var(--bg-elevated)',
            color: filtro === op.valor ? '#fff' : 'var(--text)',
            fontSize: 13,
          }}
        >
          {op.etiqueta}
        </button>
      ))}
    </div>
  )
}
