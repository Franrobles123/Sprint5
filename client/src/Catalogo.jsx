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
