/* EJERCICIO 1 
Consigna:
Crear un componente Catalogo que obtenga datos de una API y los muestre en pantalla.
API a usar: https://jsonplaceholder.typicode.com/posts?_limit=5
Requisitos:

Usar useState para guardar los posts (inicializar con array vacío)
Usar useEffect para hacer el fetch cuando el componente se monte
Usar async/await para manejar la petición
Mostrar el title de cada post en una lista
Manejar errores con try/catch (mostrar en console.error) */

/* Ejercicio 2

Consigna:
Mejorar el componente del ejercicio 1 para mostrar "Cargando..." mientras se obtienen los datos.
Requisitos:

Agregar un estado loading que empiece en true
Cambiar loading a false cuando termine el fetch (éxito o error)
Mostrar "Cargando posts..." mientras loading sea true
Mostrar la lista cuando loading sea false */
/* EJERCICIO 3

Consigna:
Mejorar el componente para manejar también los errores y mostrarlos al usuario.
Requisitos:

Mantener el estado loading del ejercicio anterior
Agregar un estado error para guardar mensajes de error
Si hay error, mostrar el mensaje al usuario
Manejar tres estados: cargando, error y éxito */

import React, { useState, useEffect } from 'react';

function Catalogo() {
  const [posts, setPosts] = useState([]);       // Datos
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null);     // Mensaje de error (null = sin error)

  useEffect(() => {
    async function fetchPosts() {
      try {
        // Arranca la carga
        setLoading(true);
        setError(null);

        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');

        // Si la respuesta no es correcta, forzamos un error
        if (!response.ok) {
          throw new Error('Error al obtener los posts');
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        // Si algo falla, guardamos el mensaje en "error"
        setError(error.message);
      } finally {
        // En cualquier caso, dejamos de cargar
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Lista de Posts</h2>

      {/* 👇 Tres estados posibles */}
      {loading ? (
        <p>Cargando posts...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>⚠️ {error}</p>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Catalogo;
