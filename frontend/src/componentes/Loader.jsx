export default function Loader({ texto = 'Cargando...' }) {
  return (
    <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
      {texto}
    </div>
  )
}
