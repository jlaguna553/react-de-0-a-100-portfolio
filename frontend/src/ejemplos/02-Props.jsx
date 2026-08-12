// ============================================================================
// 2. PROPS — cómo un componente recibe datos de su padre
// ============================================================================
// Las props son de solo lectura: un componente NUNCA debe modificar sus
// propias props. Fluyen en una sola dirección: de padre a hijo ("unidirectional
// data flow"). Si un hijo necesita "cambiar" algo del padre, el padre le
// pasa una FUNCIÓN como prop (lo verás en el ejemplo de Estado).

// Tarjeta recibe props por destructuring directo en los parámetros.
// `children` es una prop especial: es lo que se pone ENTRE las etiquetas
// de apertura y cierre al usar el componente, como <Tarjeta>esto</Tarjeta>.
function Tarjeta({ titulo, children, destacada = false }) {
  return (
    <div
      style={{
        border: destacada ? '2px solid var(--primary)' : '1px solid var(--border)',
        borderRadius: 10,
        padding: 14,
        marginBottom: 8,
      }}
    >
      <h4 style={{ margin: '0 0 6px' }}>{titulo}</h4>
      <div>{children}</div>
    </div>
  )
}

export default function PropsDemo() {
  return (
    <>
      <Tarjeta titulo="Tarjeta normal">
        Este texto llega como la prop especial <code>children</code>.
      </Tarjeta>

      <Tarjeta titulo="Tarjeta destacada" destacada>
        Esta usa <code>destacada</code> (shorthand de <code>destacada={'{true}'}</code>).
      </Tarjeta>

      {/* Renderizamos 3 tarjetas a partir de un array, cada una con props distintas */}
      {['Café', 'Té', 'Agua'].map((bebida) => (
        <Tarjeta key={bebida} titulo={bebida}>
          Una tarjeta generada dinámicamente para "{bebida}".
        </Tarjeta>
      ))}
    </>
  )
}
