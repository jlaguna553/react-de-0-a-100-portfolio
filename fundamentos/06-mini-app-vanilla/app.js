// ============================================================================
// FUNDAMENTO 6 — MINI TASKFLOW EN JAVASCRIPT PURO
// ============================================================================
// Objetivo doble:
//   1. Juntar todo lo anterior en algo que funcione de verdad.
//   2. Que sientas en carne propia por qué existe React.
//
// Fíjate en la estructura: `estado` (los datos) + `render()` (dibujar la
// interfaz a partir de los datos) + manejadores que cambian el estado y
// vuelven a llamar a render(). Es EXACTAMENTE el modelo mental de React...
// solo que aquí render() lo escribes, lo llamas y lo optimizas tú.
// ============================================================================

// ----------------------------------------------------------------------------
// 1. EL ESTADO: la única fuente de verdad
// ----------------------------------------------------------------------------
// Toda la app se dibuja a partir de este objeto. Si algo se ve en pantalla,
// tiene que salir de aquí. Nunca leas "el estado" del DOM (por ejemplo,
// contando los <li>): el DOM es el resultado, no el origen.
const estado = {
  tareas: cargarDeLocalStorage(),
  filtro: 'todas', // 'todas' | 'pendientes' | 'completadas'
  busqueda: '',
}

// ----------------------------------------------------------------------------
// 2. REFERENCIAS AL DOM (se buscan una sola vez, no en cada render)
// ----------------------------------------------------------------------------
const elLista = document.querySelector('#lista')
const elVacio = document.querySelector('#vacio')
const elResumen = document.querySelector('#resumen')
const elFormulario = document.querySelector('#form-tarea')
const elErrorForm = document.querySelector('#error-form')
const elFiltros = document.querySelector('#filtros')
const elBuscar = document.querySelector('#buscar')

// ----------------------------------------------------------------------------
// 3. PERSISTENCIA
// ----------------------------------------------------------------------------
const CLAVE = 'mini-taskflow'

function cargarDeLocalStorage() {
  try {
    // localStorage solo guarda strings: hay que parsear.
    return JSON.parse(localStorage.getItem(CLAVE)) ?? tareasDeEjemplo()
  } catch {
    // Si el JSON guardado está corrupto, no rompas la app: empieza de cero.
    return tareasDeEjemplo()
  }
}

function guardar() {
  localStorage.setItem(CLAVE, JSON.stringify(estado.tareas))
}

function tareasDeEjemplo() {
  return [
    { id: 'a1', titulo: 'Repasar el box model', categoria: 'estudio', completada: true },
    { id: 'a2', titulo: 'Practicar flexbox y grid', categoria: 'estudio', completada: false },
    { id: 'a3', titulo: 'Entender valor vs referencia', categoria: 'estudio', completada: false },
  ]
}

// ----------------------------------------------------------------------------
// 4. LÓGICA PURA: datos → datos (sin tocar el DOM)
// ----------------------------------------------------------------------------
// Separar el cálculo del pintado es lo que hace testeable y legible el código.
// Esta función es idéntica al useMemo que verás en Tareas.jsx.
function tareasVisibles() {
  const texto = estado.busqueda.trim().toLowerCase()

  return estado.tareas
    .filter((t) => {
      if (estado.filtro === 'pendientes') return !t.completada
      if (estado.filtro === 'completadas') return t.completada
      return true
    })
    .filter((t) => t.titulo.toLowerCase().includes(texto))
}

// ----------------------------------------------------------------------------
// 5. RENDER: estado → pantalla
// ----------------------------------------------------------------------------
// ⚠️ Aquí está el precio de no usar un framework: en cada cambio, por mínimo
// que sea, borramos la lista entera y la reconstruimos. Es simple de escribir
// pero desperdicia trabajo, pierde el foco del teclado y la posición del
// scroll. La alternativa —actualizar solo lo que cambió— es justo el código
// tedioso y lleno de bugs que React escribe por ti (su "diffing" del
// Virtual DOM).
function render() {
  const visibles = tareasVisibles()

  elLista.innerHTML = '' // 💥 destruir todo y volver a empezar

  for (const tarea of visibles) {
    elLista.appendChild(crearElementoTarea(tarea))
  }

  elVacio.hidden = visibles.length > 0

  // Cada trozo de interfaz derivado del estado hay que actualizarlo a mano.
  // Olvidar UNA de estas líneas = una parte de la pantalla desincronizada.
  // Ese bug, en React, es imposible por construcción.
  const pendientes = estado.tareas.filter((t) => !t.completada).length
  elResumen.textContent = `${estado.tareas.length} tareas · ${pendientes} pendientes`

  // Marcar el botón de filtro activo
  for (const boton of elFiltros.querySelectorAll('[data-filtro]')) {
    boton.classList.toggle('activo', boton.dataset.filtro === estado.filtro)
  }
}

// Un "componente" hecho a mano: recibe datos y devuelve un elemento del DOM.
// Compáralo con TaskCard.jsx, que hace lo mismo en 15 líneas declarativas.
function crearElementoTarea(tarea) {
  const li = document.createElement('li')
  li.className = `tarea${tarea.completada ? ' completada' : ''}`
  li.dataset.id = tarea.id // ← el equivalente manual de la prop `key` de React
  li.dataset.categoria = tarea.categoria

  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.checked = tarea.completada
  // aria-label: el checkbox no tiene <label> visible, así que hay que decirle
  // al lector de pantalla qué está marcando.
  checkbox.setAttribute('aria-label', `Marcar "${tarea.titulo}" como completada`)

  const cuerpo = document.createElement('div')
  cuerpo.className = 'tarea__cuerpo'

  const titulo = document.createElement('span')
  titulo.className = 'tarea__titulo'
  // textContent, NO innerHTML: el título lo escribe el usuario. Con innerHTML,
  // escribir <img src=x onerror=alert(1)> ejecutaría código. Eso es un XSS.
  titulo.textContent = tarea.titulo

  const meta = document.createElement('span')
  meta.className = 'tarea__meta'
  meta.textContent = tarea.categoria

  const borrar = document.createElement('button')
  borrar.className = 'tarea__borrar'
  borrar.type = 'button'
  borrar.textContent = '🗑'
  borrar.setAttribute('aria-label', `Borrar "${tarea.titulo}"`)

  cuerpo.append(titulo, meta)
  li.append(checkbox, cuerpo, borrar)
  return li
}

// ----------------------------------------------------------------------------
// 6. ACCIONES: cambian el estado y piden un re-render
// ----------------------------------------------------------------------------
// Nota el patrón inmutable de cada una (map/filter/spread, nunca push ni
// mutación directa). Aquí no es obligatorio... pero es exactamente lo que
// React SÍ exige, así que vale la pena adquirir el hábito ahora.
// Generar un id único. crypto.randomUUID() es el API moderno del navegador;
// el `?.` con `??` de reserva evita romper en navegadores viejos (§4).
function nuevoId() {
  return crypto.randomUUID?.() ?? `id-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function agregarTarea(titulo, categoria) {
  const nueva = {
    id: nuevoId(),
    titulo,
    categoria,
    completada: false,
  }
  estado.tareas = [nueva, ...estado.tareas]
  guardar()
  render()
}

function alternarTarea(id) {
  estado.tareas = estado.tareas.map((t) =>
    t.id === id ? { ...t, completada: !t.completada } : t
  )
  guardar()
  render()
}

function borrarTarea(id) {
  estado.tareas = estado.tareas.filter((t) => t.id !== id)
  guardar()
  render()
}

// ----------------------------------------------------------------------------
// 7. EVENTOS
// ----------------------------------------------------------------------------
elFormulario.addEventListener('submit', (event) => {
  event.preventDefault() // sin esto, la página se recarga y se pierde todo

  const datos = Object.fromEntries(new FormData(elFormulario))
  const titulo = datos.titulo.trim()

  if (!titulo) {
    elErrorForm.textContent = 'El título no puede estar vacío.'
    return
  }

  elErrorForm.textContent = ''
  agregarTarea(titulo, datos.categoria)
  elFormulario.reset()
  document.querySelector('#titulo').focus() // detalle de usabilidad
})

// DELEGACIÓN: un solo listener en el <ul> cubre todas las tareas, presentes y
// futuras. Sin esto habría que añadir (y quitar) dos listeners por tarea en
// cada render — otra fuente clásica de fugas de memoria.
elLista.addEventListener('click', (event) => {
  const li = event.target.closest('.tarea')
  if (!li) return
  const id = li.dataset.id

  if (event.target.matches('.tarea__borrar')) borrarTarea(id)
  if (event.target.matches('input[type="checkbox"]')) alternarTarea(id)
})

elFiltros.addEventListener('click', (event) => {
  const boton = event.target.closest('[data-filtro]')
  if (!boton) return
  estado.filtro = boton.dataset.filtro
  render()
})

elBuscar.addEventListener('input', (event) => {
  estado.busqueda = event.target.value
  render()
})

// ----------------------------------------------------------------------------
// 8. ARRANQUE
// ----------------------------------------------------------------------------
render()

console.log(
  '%c🎓 Cuenta las veces que aparece render() en este archivo.\n' +
    'Cada una es un "acuérdate de repintar" que puedes olvidar.\n' +
    'En React no existe render(): cambias el estado con setX(...) y ya.',
  'color:#4f46e5;font-size:13px'
)
