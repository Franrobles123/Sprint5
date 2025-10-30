import { useState, useEffect } from "react";
import "./AddPersonForm.css"; // estilos del form

// --- API base (si preferís, sacalo a un archivo constants) ---
const API_BASE = "http://localhost:5000/api";

// --- Helper: verificación de email ---
async function checkMailExists(email) {
  const resp = await fetch(`${API_BASE}/check-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!resp.ok) {
    let msg = "Error al verificar el email";
    try {
      const data = await resp.json();
      msg = data?.error || msg;
    } catch {
      // si vino HTML por error de ruta, caemos acá
    }
    throw new Error(msg);
  }
  return resp.json(); // { exists:false }
}

const initialFormData = {
  name: "",
  email: "",
  image: "https://randomuser.me/api/portraits/men/1.jpg",
  description: "",
};

export default function AddPersonForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [emailError, setEmailError] = useState("");
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [debounceId, setDebounceId] = useState(null);
  const [submitMsg, setSubmitMsg] = useState("");

  // Validación de email con debounce (400 ms)
  useEffect(() => {
    const email = formData.email.trim();

    // limpiar estado si está vacío
    if (!email) {
      setEmailError("");
      if (debounceId) clearTimeout(debounceId);
      return;
    }

    if (debounceId) clearTimeout(debounceId);
    const id = setTimeout(async () => {
      try {
        setCheckingEmail(true);
        await checkMailExists(email);     // 200 -> libre
        setEmailError("");
      } catch (err) {                      // 409 -> ya existe
        setEmailError(err.message || "Error al verificar el email");
      } finally {
        setCheckingEmail(false);
      }
    }, 400);
    setDebounceId(id);

    return () => clearTimeout(id);
  }, [formData.email]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitMsg("");

    if (checkingEmail || emailError) {
      setSubmitMsg("Revisá el email antes de guardar.");
      return;
    }

    try {
      const resp = await fetch(`${API_BASE}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!resp.ok) throw new Error("No se pudo guardar el usuario.");
      setFormData(initialFormData);
      setEmailError("");
      setSubmitMsg("✅ Usuario agregado con éxito");
    } catch (e) {
      setSubmitMsg(`❌ ${e.message}`);
    }
  };

  return (
    <div className="form-wrap">
      <div className="card">
        <div className="form-header">
          <h1>Agregar Personas</h1>
          <div className="subtitle">Completá los campos para crear un registro</div>
        </div>

        <div className="hr" />

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div>
              <label htmlFor="name">Nombre *</label>
              <input
                className="input"
                type="text"
                id="name"
                name="name"
                placeholder="Nombre"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="email">Email *</label>
              <input
                className="input"
                type="email"
                id="email"
                name="email"
                placeholder="tu@email.com"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {checkingEmail && !emailError && (
                <span className="info">Verificando email…</span>
              )}
              {emailError && <span className="error">{emailError}</span>}
            </div>

            <div className="form-row-full">
              <label htmlFor="image">Imagen</label>
              <input
                className="input"
                type="text"
                id="image"
                name="image"
                placeholder="URL de la imagen"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>

            <div className="form-row-full">
              <label htmlFor="description">Descripción</label>
              <textarea
                className="textarea"
                id="description"
                name="description"
                placeholder="Descripción"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
          </div>

          <div className="actions">
            <button className="btn" type="submit" disabled={!!emailError || checkingEmail}>
              Agregar Persona
            </button>
          </div>

          {submitMsg && <div className="submit-msg">{submitMsg}</div>}
        </form>
      </div>
    </div>
  );
}

