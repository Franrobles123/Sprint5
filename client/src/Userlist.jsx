// UserList.js
import React, { useState, useEffect } from 'react';
 
function UserList() {
  // 1. Estado para guardar la lista de usuarios. Inicialmente es un array vacío.
  const [users, setUsers] = useState([]);
 
  // 2. useEffect para buscar los datos cuando el componente se monta.
  useEffect(() => {
    // 3. Definimos una función asíncrona dentro del efecto.
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data); // 4. Guardamos los datos recibidos en nuestro estado.
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
 
    fetchUsers(); // 5. Llamamos a la función.
  }, []); // <-- El array vacío asegura que esto se ejecute solo una vez.
 
  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <ul>
        {/* 6. Mapeamos el estado 'users' para renderizar la lista. */}
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
 
export default UserList;