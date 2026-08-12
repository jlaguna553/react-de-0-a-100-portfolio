import { NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext.jsx'

// NavLink es como <a>, pero React Router le agrega automáticamente una
// clase/estilo especial cuando la ruta está activa (estamos en esa página).
// Esto es "SPA routing": el navegador NUNCA recarga la página completa,
// React simplemente intercambia qué componente se muestra.
export default function Navbar() {
  const { theme, toggleTheme } = useTheme()

  const linkStyle = ({ isActive }) => ({
    padding: '8px 14px',
    borderRadius: 8,
    textDecoration: 'none',
    color: isActive ? '#fff' : 'var(--text)',
    background: isActive ? 'var(--primary)' : 'transparent',
    fontWeight: isActive ? 600 : 400,
  })

  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 24px',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg-elevated)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <strong style={{ fontSize: 20 }}>⚡ TaskFlow</strong>
        <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>
          — Proyecto de aprendizaje React
        </span>
      </div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <NavLink to="/" style={linkStyle} end>
          Dashboard
        </NavLink>
        <NavLink to="/tareas" style={linkStyle}>
          Tareas
        </NavLink>
        <NavLink to="/aprende" style={linkStyle}>
          Aprende React
        </NavLink>

        <button
          onClick={toggleTheme}
          style={{
            marginLeft: 10,
            border: '1px solid var(--border)',
            background: 'var(--bg)',
            color: 'var(--text)',
            borderRadius: 8,
            padding: '8px 12px',
          }}
          title="Cambiar tema"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  )
}
