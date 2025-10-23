import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const muebles = [
  {
    "id": 1,
    "name": "Silla de Comedor Nórdica",
    "category": "Sillas",
    "price": 32000,
    "image": "https://images.unsplash.com/photo-1582582429413-4fa6e7fbb4ab",
    "material": "Madera maciza y asiento tapizado en lino beige",
    "description": "Silla ergonómica con estructura de madera natural, ideal para comedores modernos o escandinavos."
  },
  {
    "id": 2,
    "name": "Mesa Ratona Escandinava",
    "category": "Mesas",
    "price": 45000,
    "image": "https://images.unsplash.com/photo-1629203846698-8e748df8e0b0",
    "material": "Roble natural con patas torneadas",
    "description": "Mesa ratona de estilo nórdico, compacta y resistente. Ideal para salas de estar pequeñas."
  },
  {
    "id": 3,
    "name": "Sofá de 3 Cuerpos Minimalista",
    "category": "Sofás",
    "price": 125000,
    "image": "https://images.unsplash.com/photo-1616627986163-2f5b5f8b788e",
    "material": "Tapizado en lino gris claro con estructura de eucalipto",
    "description": "Sofá cómodo de tres cuerpos, líneas simples y respaldo firme. Perfecto para ambientes contemporáneos."
  },
  {
    "id": 4,
    "name": "Estantería Modular de Pino",
    "category": "Estanterías",
    "price": 68000,
    "image": "https://images.unsplash.com/photo-1598300056393-d8c5b82e60cb",
    "material": "Madera de pino natural con acabado satinado",
    "description": "Estantería versátil de cuatro niveles, ideal para libros, plantas y objetos decorativos."
  },
  {
    "id": 5,
    "name": "Escritorio Industrial de Metal y Madera",
    "category": "Escritorios",
    "price": 89000,
    "image": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
    "material": "Tablero de madera reciclada y estructura de acero negro",
    "description": "Escritorio robusto con diseño industrial, ideal para espacios de trabajo o estudio."
  },
  {
    "id": 6,
    "name": "Mesa de Luz Vintage",
    "category": "Mesas de Luz",
    "price": 37000,
    "image": "https://images.unsplash.com/photo-1595526114035-0d45ed16cf75",
    "material": "Madera de cedro con tiradores metálicos envejecidos",
    "description": "Mesa de luz con dos cajones, estilo vintage restaurado. Perfecta para dormitorios clásicos o retro."
  }
];


// Endpoint GET para devolver los usuarios
app.get("/api/productos", (req, res) => {
  setTimeout(()=>{
    res.json(muebles);
  }, 2000);
});

// Endpoint POST para agregar un mueble
app.post("/api/productos", (req, res) => {
  const nuevoMuebles = req.body;
  muebles.push(nuevoMuebles);
  res.json({ message: "Mueble Agregado", user: nuevoMuebles });
});

app.listen(4000, () => {
  console.log("Servidor escuchando en http://localhost:4000");
});
