import React, { useState, useEffect } from "react";

function Catalogo() {
  // 🧩 Estados del componente
  const [productos, setProductos] = useState([]);   // Guarda la lista de productos traída desde la API
  const [loading, setLoading] = useState(true);     // Indica si los datos están cargando
  const [error, setError] = useState(null);         // Guarda un mensaje de error si ocurre algo

  // 🔁 useEffect se ejecuta una sola vez (cuando el componente se monta)
  useEffect(() => {
    // 🔹 Función asincrónica para traer los productos desde una API
    const fetchUsers = async () => {
      try {
        setError(null);      // Reinicia el error antes de intentar cargar
        setLoading(true);    // Activa el estado de carga

        // 🌐 Llamada a la API (trae 8 posts de ejemplo)
        const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=8");

        // ⚠️ Si la respuesta no es correcta (por ejemplo, 404 o 500), lanza un error
        if (!response.ok) {
          throw new Error("Error al cargar los productos");
        }

        // 📦 Convierte la respuesta a formato JSON
        const data = await response.json();

        // ✅ Guarda los datos en el estado
        setProductos(data);
      } catch (error) {
        // ❌ Si algo falla, guarda el mensaje del error en el estado
        setError(error.message);
        console.error("Error fetching users:", error);
      } finally {
        // ⏹️ Cuando termina (haya o no error), desactiva el estado de carga
        setLoading(false);
      }
    };

    // ▶️ Llama a la función definida arriba
    fetchUsers();
  }, []); // El array vacío hace que esto se ejecute solo una vez

  // 🎨 Renderizado condicional
  return (
    <div>
      <h1>Lista de Productos</h1>

      {/* 🕓 Si está cargando, muestra el mensaje */}
      {loading ? (
        <p>Cargando posts...</p>
      ) : error ? (
        // ⚠️ Si hay error, muestra el mensaje en rojo
        <p style={{ color: "red" }}>⚠️ {error}</p>
      ) : (
        // ✅ Si todo salió bien, muestra la lista de productos
        <ul>
          {productos.map((producto) => (
            <li key={producto.id}>{producto.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Catalogo;

