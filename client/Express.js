// server.js
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let users = [
  {
    name: "Juan",
    email: "juan@example.com",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    description: "Juan es un desarrollador web con 5 años de experiencia."
  },
  {
    name: "Ana",
    email: "ana@example.com",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    description: "Ana es una diseñadora gráfica creativa."
  },
  {
    name: "Luis",
    email: "luis@example.com",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    description: "Luis es especialista en marketing digital."
  }
];

// Endpoint GET para devolver los usuarios
app.get("/api/users", (req, res) => {
  setTimeout(()=>{
    res.json(users);
    //error;
    //res.status(500).json({error:"Error al obtener los usuarios"});
  }, 2000);
});

// Endpoint POST para agregar un usuario
app.post("/api/users", (req, res) => {
  const nuevoUsuario = req.body;
  users.push(nuevoUsuario);
  res.json({ message: "Usuario agregado", user: nuevoUsuario });
});

app.listen(5000, () => {
  console.log("Servidor escuchando en http://localhost:5000");
});
