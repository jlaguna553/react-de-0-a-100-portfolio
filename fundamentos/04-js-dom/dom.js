// ============================================================================
// FUNDAMENTO 4 — EL DOM Y LOS EVENTOS
// ============================================================================
// El DOM (Document Object Model) es el árbol de objetos que el navegador
// construye al leer tu HTML. Cada etiqueta se vuelve un objeto de JavaScript
// con propiedades y métodos. Modificar ese árbol modifica la pantalla.
//
// ⚠️ ESTE ES EL ARCHIVO MÁS IMPORTANTE PARA ENTENDER POR QUÉ EXISTE REACT.
// Todo lo que haces aquí a mano ("busca el elemento, cámbialo") es justo lo
// que React automatiza: tú declaras cómo se ve la interfaz según los datos, y
// él calcula qué tocar del DOM. Sufre un poco aquí y React se sentirá un regalo.
// ============================================================================

// ----------------------------------------------------------------------------
// 1. SELECCIONAR ELEMENTOS
// ----------------------------------------------------------------------------
// querySelector acepta cualquier selector CSS y devuelve el PRIMER match
// (o null si no hay ninguno). querySelectorAll devuelve todos.
const saludo = document.querySelector('#saludo') // por id
const datos = document.querySelectorAll('.dato') // por clase → NodeList

// Existen también getElementById / getElementsByClassName, más viejos.
// Con querySelector te basta para todo: usa un solo API y ya.

// Modificar contenido:
//   textContent → texto plano. SEGURO: lo que pongas nunca se interpreta
//                 como HTML, así que no se puede inyectar código.
//   innerHTML   → interpreta HTML. ⚠️ Nunca le pases texto escrito por un
//                 usuario sin sanitizar: es la puerta de entrada a un ataque
//                 XSS. React bloquea esto por defecto (y por eso la única
//                 forma de hacerlo allí se llama dangerouslySetInnerHTML).
saludo.textContent = '✅ JavaScript ya cambió este texto (con textContent).'

// Una NodeList NO es un array de verdad: tiene forEach, pero no map ni filter.
// Para convertirla: Array.from(datos) o [...datos]
document.querySelector('#btn-pintar').addEventListener('click', () => {
  datos.forEach((el, indice) => {
    el.style.color = ['crimson', 'seagreen', 'royalblue'][indice % 3]
    el.style.fontWeight = '700'
  })
})

// ----------------------------------------------------------------------------
// 2. EVENTOS
// ----------------------------------------------------------------------------
// addEventListener(tipo, función). La función ("callback" o "manejador") se
// ejecuta cada vez que ocurre el evento. Fíjate que pasas la FUNCIÓN, no su
// resultado: nada de addEventListener('click', miFuncion()).
let cuenta = 0
const salidaCuenta = document.querySelector('#cuenta')

// Una sola función para los dos botones. `event.currentTarget` es el elemento
// que tiene el listener; dataset lee los atributos data-* del HTML.
function cambiarCuenta(event) {
  const paso = Number(event.currentTarget.dataset.paso)
  cuenta = cuenta + paso
  salidaCuenta.textContent = cuenta // ← repintado manual. React hace esto solo.
}

document.querySelector('#btn-mas').addEventListener('click', cambiarCuenta)
document.querySelector('#btn-menos').addEventListener('click', cambiarCuenta)

// El evento `input` se dispara en CADA tecla; `change` solo al perder el foco.
// event.target.value es el texto actual del input. Esta línea es, exactamente,
// lo que en React se escribe como onChange={(e) => setTexto(e.target.value)}
const entrada = document.querySelector('#entrada')
const eco = document.querySelector('#eco')
entrada.addEventListener('input', (event) => {
  eco.textContent = event.target.value || '—'
})

// Eventos frecuentes: click, dblclick, input, change, submit, keydown, keyup,
// focus, blur, mouseenter, mouseleave, scroll, resize (estos dos en window).
document.addEventListener('keydown', (event) => {
  // event.key es la tecla ('Escape', 'Enter', 'a'...)
  if (event.key === 'Escape') console.log('Pulsaste Escape')
})

// ----------------------------------------------------------------------------
// 3. CREAR ELEMENTOS Y DELEGACIÓN
// ----------------------------------------------------------------------------
const lista = document.querySelector('#lista')
let siguiente = 1

document.querySelector('#btn-agregar').addEventListener('click', () => {
  // Crear un elemento desde cero: crear → configurar → insertar.
  const li = document.createElement('li')
  li.textContent = `Elemento ${siguiente}`
  li.dataset.id = String(siguiente)
  li.style.cursor = 'pointer'
  lista.appendChild(li) // insertar al final del padre
  siguiente++
})

// BURBUJEO (bubbling): un evento en un elemento sube por sus ancestros. Gracias
// a eso, UN listener en el <ul> atiende clics de todos los <li>, incluidos los
// que se crearán después. Eso es la DELEGACIÓN de eventos.
//   event.target        → el elemento donde ocurrió el clic (el <li>)
//   event.currentTarget → donde está puesto el listener (el <ul>)
lista.addEventListener('click', (event) => {
  const li = event.target.closest('li') // closest sube buscando el ancestro
  if (!li) return // clic en el hueco del ul: ignorar
  console.log('borrando', li.dataset.id)
  li.remove()
})

// ----------------------------------------------------------------------------
// 4. FORMULARIOS
// ----------------------------------------------------------------------------
const formulario = document.querySelector('#formulario')
const resultado = document.querySelector('#resultado-form')

formulario.addEventListener('submit', (event) => {
  // ⚠️ Por defecto, enviar un formulario RECARGA la página. En una app de una
  // sola página eso lo destruye todo. preventDefault() lo evita.
  // En React escribirás esta misma línea en cada onSubmit.
  event.preventDefault()

  // FormData recoge todos los campos con `name` del formulario.
  const datosFormulario = new FormData(formulario)
  const valores = Object.fromEntries(datosFormulario) // → { nombre: '...', color: '...' }

  console.log('enviado →', valores)
  resultado.textContent = `Recibido: ${valores.nombre || '(sin nombre)'} — ${valores.color}`

  formulario.reset()
})

// ----------------------------------------------------------------------------
// 5. CLASES Y ESTILOS
// ----------------------------------------------------------------------------
// classList es la forma correcta de manipular clases (no toques className
// a mano: pisarías las demás clases del elemento).
//   .add('x')  .remove('x')  .toggle('x')  .contains('x')
const caja = document.querySelector('#caja-toggle')

document.querySelector('#btn-oculta').addEventListener('click', () => {
  caja.classList.toggle('oculto')
  // Como no hay una clase .oculto en el CSS, la definimos aquí al vuelo:
  caja.style.display = caja.classList.contains('oculto') ? 'none' : 'block'
})

// Cambiar variables de CSS desde JavaScript: así funciona un selector de tema.
// El proyecto React hace lo mismo poniendo data-theme en <html>.
let oscuro = false
document.querySelector('#btn-tema').addEventListener('click', () => {
  oscuro = !oscuro
  const raiz = document.documentElement // el elemento <html>
  raiz.style.setProperty('--bg', oscuro ? '#14151f' : '#f6f7fb')
  raiz.style.setProperty('--surface', oscuro ? '#1e2030' : '#ffffff')
  raiz.style.setProperty('--text', oscuro ? '#eef0f7' : '#1a1d29')
  raiz.style.setProperty('--border', oscuro ? '#2c2e42' : '#e2e4ec')
})

// ----------------------------------------------------------------------------
// 6. localStorage — persistencia en el navegador
// ----------------------------------------------------------------------------
// Guarda pares clave/valor que sobreviven a recargas y a cerrar el navegador.
// ⚠️ Solo guarda STRINGS: para objetos, JSON.stringify al escribir y
// JSON.parse al leer. Nunca guardes ahí datos sensibles: cualquier script de
// la página puede leerlos.
const nota = document.querySelector('#nota')

nota.value = localStorage.getItem('mi-nota') ?? ''
nota.addEventListener('input', () => {
  localStorage.setItem('mi-nota', nota.value)
})
document.querySelector('#btn-borrar-nota').addEventListener('click', () => {
  localStorage.removeItem('mi-nota')
  nota.value = ''
})

// Guardar un objeto:
//   localStorage.setItem('tareas', JSON.stringify(arrayDeTareas))
//   const tareas = JSON.parse(localStorage.getItem('tareas') ?? '[]')

// ----------------------------------------------------------------------------
// 7. LA MORALEJA
// ----------------------------------------------------------------------------
console.log(
  '%c⚠️ Fíjate en el patrón de todo este archivo:\n' +
    '   "busca el elemento → cámbialo a mano" en CADA interacción.\n' +
    'Con 3 elementos es manejable; con 30 que dependen del mismo dato es un\n' +
    'infierno de sincronización. Ese dolor exacto es el que resuelve React.',
  'color:#d97706;font-size:13px'
)
