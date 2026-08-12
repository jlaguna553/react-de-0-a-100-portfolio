# Fundamentos — HTML, CSS y JavaScript antes de React

Estos seis ejemplos son el **requisito previo** para la parte de React del
proyecto. No necesitan instalar nada ni ejecutar `npm`: son archivos sueltos que
abres directamente en el navegador (doble clic en el `index.html`, o clic
derecho → "Abrir con" → tu navegador).

Corresponden a la **Parte I** de [`../GUIA-REACT-0-A-100.md`](../GUIA-REACT-0-A-100.md).
Lee la sección de la guía y abre el archivo correspondiente en tu editor
**y** en el navegador al mismo tiempo.

| # | Carpeta | Tema | Sección de la guía |
|---|---|---|---|
| 1 | [`01-html/`](01-html/index.html) | Estructura, semántica, formularios, accesibilidad | §2 |
| 2 | [`02-css/`](02-css/index.html) | Cascada, box model, flexbox, grid, responsive, variables | §3 |
| 3 | [`03-js-lenguaje/`](03-js-lenguaje/index.html) | Tipos, funciones, objetos, arrays, valor vs referencia | §4 |
| 4 | [`04-js-dom/`](04-js-dom/index.html) | DOM, eventos, formularios, localStorage | §5 |
| 5 | [`05-js-async/`](05-js-async/index.html) | Promesas, `async`/`await`, `fetch`, códigos HTTP | §6 |
| 6 | [`06-mini-app-vanilla/`](06-mini-app-vanilla/index.html) | Todo junto: la misma app del proyecto, sin React | §8 |

## Cómo trabajarlos

1. **Abre siempre la consola del navegador** (`F12` → pestaña *Console*). Los
   ejemplos 3, 4 y 5 imprimen ahí la mitad de su contenido.
2. **Lee los comentarios del código**, no solo el resultado en pantalla. La
   explicación está en los archivos, no en la página renderizada.
3. **Rómpelos.** Cambia un valor, guarda, recarga (`F5`). CSS y JavaScript se
   aprenden viendo qué se rompe y por qué.
4. Los marcados con ⚠️ en los comentarios son los que causan bugs reales en
   React si no se entienden antes.

## Notas

- El ejemplo **05** necesita el backend del proyecto corriendo
  (`cd backend && npm run dev`). Sin él verás un error de red controlado, que
  también forma parte de la lección.
- El ejemplo **06** guarda las tareas en `localStorage`, así que funciona sin
  backend y sobrevive a recargar la página.
- Los ejemplos 3–6 se cargan con `<script defer>` en vez de
  `<script type="module">` a propósito, para que funcionen abriendo el archivo
  con doble clic (los módulos ES requieren un servidor). En el proyecto React,
  todo son módulos ES.
- Si prefieres servirlos por HTTP (recomendado, y necesario si quieres
  convertirlos a módulos), usa la extensión **Live Server** de VS Code, o desde
  esta carpeta: `npx serve` o `python3 -m http.server 5500`.

## Cuándo pasar a React

Cuando puedas responder sin dudar y sin consultar:

- ¿Qué diferencia hay entre `padding` y `margin`, y qué hace `box-sizing: border-box`?
- ¿Cómo centro una caja vertical y horizontalmente?
- ¿Qué imprime `const b = a` si `a` es un objeto y luego modifico `b`?
- ¿Qué devuelve `.map()` y en qué se diferencia de `.forEach()`?
- ¿Por qué `push` es peligroso sobre el estado y `[...array, x]` no?
- ¿Qué hace `event.preventDefault()` en el `submit` de un formulario?
- ¿Por qué un `fetch` que recibe un 404 no entra en el `catch`?

La lista completa está en la sección §9 de la guía.
