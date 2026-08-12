import { Link } from 'react-router-dom'

export default function NoEncontrado() {
  return (
    <div style={{ textAlign: 'center', padding: 60 }}>
      <h1>404</h1>
      <p>Esta página no existe.</p>
      <Link to="/" style={{ color: 'var(--primary)' }}>Volver al inicio</Link>
    </div>
  )
}
