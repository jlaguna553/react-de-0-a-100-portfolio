// ============================================================================
// 1. JSX — la sintaxis que mezcla HTML y JavaScript
// ============================================================================
// JSX NO es HTML. Es azúcar sintáctico que se transforma en llamadas a
// React.createElement(). Por eso puedes meter expresiones de JS dentro
// de llaves { }, usar className en vez de class, y todo tag debe cerrarse.
export default function JSXBasico() {
  const nombre = 'Felix'
  const numeros = [1, 2, 3]
  const esDeNoche = new Date().getHours() >= 19

  return (
    // Un componente SIEMPRE devuelve UN solo elemento raíz.
    // <> </> es un "Fragment": agrupa sin agregar un <div> extra al DOM.
    <>
      <p>Hola, {nombre} 👋 (esto es una expresión JS dentro de JSX)</p>

      <p>2 + 2 = {2 + 2}</p>

      <p>La suma del array {JSON.stringify(numeros)} es {numeros.reduce((a, b) => a + b, 0)}</p>

      <p>Ahora mismo {esDeNoche ? 'es de noche 🌙' : 'es de día ☀️'}</p>

      {/* Los comentarios en JSX van dentro de llaves, como este */}

      <div className="caja-demo" style={{ padding: 10, border: '1px dashed var(--border)' }}>
        <strong>className</strong> en vez de <code>class</code> (class es palabra reservada en JS)
      </div>
    </>
  )
}
