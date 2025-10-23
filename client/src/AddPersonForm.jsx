
function AddPersonForm() {
  // Maneja el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault(); // evita que la página se recargue

    // Capturamos los valores de los campos
    const name = event.target.name.value;
    const email = event.target.email.value;
    const image = event.target.image.value;
    const description = event.target.description.value;

    // Enviamos los datos a la API
    await fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        image,
        description,
      }),
    });

    // Limpiamos el formulario
    event.target.reset();

    // Recargamos la página para ver el nuevo usuario
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Nombre *</label>
      <input type="text" id="name" name="name" placeholder="Nombre" required />

      <label htmlFor="email">Email *</label>
      <input type="email" id="email" name="email" placeholder="Email" required />

      <label htmlFor="image">Imagen</label>
      <input
        type="text"
        id="image"
        name="image"
        placeholder="URL de la imagen"
        defaultValue="https://randomuser.me/api/portraits/men/1.jpg"
      />

      <label htmlFor="description">Descripción</label>
      <textarea
        id="description"
        name="description"
        placeholder="Descripción"
      ></textarea>

      <button type="submit">Agregar Persona</button>
    </form>
  );
}

export default AddPersonForm;