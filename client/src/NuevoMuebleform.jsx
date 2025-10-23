import React, { useState } from "react";

function NuevoMueble() {
  // 🧩 Estado para almacenar el valor del campo "nombre"
  const [nombre, setNombre] = useState("");

  // 🔁 Se ejecuta cada vez que el usuario escribe en el input
  const handleChange = (event) => {
    setNombre(event.target.value);
  };

  // 📨 Maneja el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página

    try {
      // 🔹 Enviamos el nuevo mueble al backend
      const response = await fetch("http://localhost:4000/api/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Enviamos un objeto con las propiedades del nuevo mueble
          id: Date.now(), // ID temporal (solo como ejemplo)
          name: nombre,   // <- el backend espera "name", no "nombre"
          category: "Sin categoría",
          price: 0,
          image: "",
          material: "",
          description: "Nuevo mueble agregado desde el formulario"
        }),
      });

      const data = await response.json(); // Convertimos la respuesta en JSON

      // 🟢 Mostramos el mensaje que devuelve el backend
      alert(`✅ ${data.message}: ${data.user.name}`);

      // 🔄 Limpiamos el campo del formulario
      setNombre("");
    } catch (error) {
      console.error("Error al guardar el mueble:", error);
      alert("❌ Error al enviar el mueble al servidor");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="nombre">Nombre del Mueble *</label>
      <input
        type="text"
        id="nombre"
        name="nombre"
        placeholder="Nombre"
        required
        value={nombre}           // ← El input refleja el valor del estado
        onChange={handleChange}  // ← Cada tecla actualiza el estado
      />

      <button type="submit">Guardar</button>
    </form>
  );
}

export default NuevoMueble;
