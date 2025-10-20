// NewPostForm.js
import React, { useState } from 'react';
 
function NewPostForm() {
  const [title, setTitle] = useState('');
 
  const handleSubmit = async (event) => {
    event.preventDefault(); // Previene que la página se recargue al enviar el form
 
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          body: 'Contenido de ejemplo', // Podrías añadir más campos al formulario
          userId: 1,
        }),
      });
 
      if (!response.ok) throw new Error('Falló la creación del post');
 
      const data = await response.json();
      alert(`¡Post creado con ID: ${data.id}!`);
      setTitle(''); // Limpiamos el input después de enviar
    } catch (error) {
      alert(error.message);
    }
  };
 
  return (
    <form onSubmit={handleSubmit}>
      <h3>Crear Nuevo Post</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título del post"
        required
      />
      <button type="submit">Crear Post</button>
    </form>
  );
}
export default NewPostForm;