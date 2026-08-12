import { useState } from 'react'

// ============================================================================
// 6. FORMULARIOS CONTROLADOS con validación simple
// ============================================================================
export default function FormulariosDemo() {
  const [form, setForm] = useState({ email: '', edad: '' })
  const [enviado, setEnviado] = useState(null)

  const errores = {
    email: form.email && !form.email.includes('@') ? 'Email inválido' : null,
    edad: form.edad && Number(form.edad) < 18 ? 'Debes ser mayor de edad' : null,
  }

  const formularioValido = form.email && form.edad && !errores.email && !errores.edad

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setEnviado(null)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setEnviado(form)
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 320 }}>
      <div style={{ marginBottom: 10 }}>
        <label>Email</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          style={{ display: 'block', width: '100%', padding: 8 }}
        />
        {errores.email && <small style={{ color: 'var(--danger)' }}>{errores.email}</small>}
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Edad</label>
        <input
          name="edad"
          type="number"
          value={form.edad}
          onChange={handleChange}
          style={{ display: 'block', width: '100%', padding: 8 }}
        />
        {errores.edad && <small style={{ color: 'var(--danger)' }}>{errores.edad}</small>}
      </div>

      <button type="submit" disabled={!formularioValido}>
        Enviar
      </button>

      {enviado && (
        <p style={{ color: 'var(--success)' }}>
          ✅ Enviado: {enviado.email}, {enviado.edad} años
        </p>
      )}
    </form>
  )
}
