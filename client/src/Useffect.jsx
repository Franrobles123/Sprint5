import { useState, useEffect } from "react";

function Ejemplo() {
  // 🟢 1️⃣ useState crea variables "reactivas" que React recuerda.
  const [nombre, setNombre] = useState("Francisco"); // valor inicial
  const [edad, setEdad] = useState(28); // otro estado para practicar

  // 🟣 2️⃣ useEffect se usa para ejecutar algo "de lado"
  // (por ejemplo, mostrar en consola o traer datos de una API)
  useEffect(() => {
    console.log("🔔 useEffect: el componente se mostró o cambió el nombre");
  }, [nombre]); // 👈 este efecto solo corre cuando cambia 'nombre'

  // 🟠 3️⃣ Otro efecto que se ejecuta UNA SOLA VEZ al iniciar el componente
  useEffect(() => {
    console.log("🏁 El componente se montó por primera vez");
  }, []); // 👈 el array vacío hace que se ejecute solo al principio

  // 🟡 4️⃣ Función para cambiar ambos estados
  const cambiarDatos = () => {
    setNombre("Sofía");
    setEdad(25);
  };

  return (
    <>
      <h2>Ejemplo de useState y useEffect</h2>

      <p>
        <strong>Nombre:</strong> {nombre}
      </p>
      <p>
        <strong>Edad:</strong> {edad}
      </p>

      <button onClick={cambiarDatos}>Cambiar datos</button>
    </>
  );
}

export default Ejemplo;

