import { useEffect, useState } from 'react'

// A diferencia de Tareas.jsx (que usa el custom hook useTasks), aquí
// hacemos el fetch "a mano" con useEffect + useState directamente.
// Es intencional: así puedes comparar ambos estilos y entender qué
// problema resuelve exactamente un custom hook (evitar repetir este
// patrón en cada componente que necesite datos del servidor).
export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Una función async no puede pasarse directo a useEffect (useEffect
    // no acepta que su callback devuelva una Promise), así que definimos
    // una función interna y la invocamos.
    let cancelado = false

    async function cargarStats() {
      try {
        const base = import.meta.env.VITE_API_URL || 'http://localhost:4000'
        const res = await fetch(`${base}/api/stats`)
        if (!res.ok) throw new Error('Error al obtener estadísticas')
        const data = await res.json()
        if (!cancelado) setStats(data)
      } catch (err) {
        if (!cancelado) setError(err.message)
      }
    }

    cargarStats()

    // Función de "limpieza": si el componente se desmonta antes de que
    // termine el fetch, evitamos actualizar estado de un componente
    // que ya no existe (esto previene warnings y bugs sutiles).
    return () => {
      cancelado = true
    }
  }, []) // Array vacío = se ejecuta solo una vez, al montar el componente

  return (
    <div>
      <h1>Dashboard</h1>
      <p style={{ color: 'var(--text-muted)' }}>
        Resumen general de tus tareas, calculado en el backend.
      </p>

      {error && (
        <div style={{ padding: 12, background: '#fee2e2', color: '#991b1b', borderRadius: 8 }}>
          ⚠️ {error}. ¿Corriste <code>npm run dev</code> dentro de la carpeta <code>backend/</code>?
        </div>
      )}

      {!error && !stats && <p>Cargando estadísticas...</p>}

      {stats && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14 }}>
          <Tarjeta titulo="Total" valor={stats.total} color="var(--primary)" />
          <Tarjeta titulo="Pendientes" valor={stats.pendientes} color="var(--warning)" />
          <Tarjeta titulo="Completadas" valor={stats.completadas} color="var(--success)" />
          <Tarjeta titulo="Prioridad alta" valor={stats.prioridadAlta} color="var(--danger)" />
        </div>
      )}
    </div>
  )
}

// Componente pequeño y reutilizable que solo recibe props. Definirlo
// en el mismo archivo está bien cuando es muy específico de esta página.
function Tarjeta({ titulo, valor, color }) {
  return (
    <div
      style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: 20,
        boxShadow: 'var(--shadow)',
      }}
    >
      <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{titulo}</div>
      <div style={{ fontSize: 32, fontWeight: 700, color }}>{valor}</div>
    </div>
  )
}
