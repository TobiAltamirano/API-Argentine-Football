import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import clubesRoutes from "./routes/clubesRoutes.js";
import torneosRoutes from "./routes/torneosRoutes.js";
import usuariosRoutes from "./routes/usuariosRoutes.js";

dotenv.config();

// console.log("MONGODB_URI:", process.env.MONGODB_URI);

const app = express();
const port = 3000;

mongoose
  .connect(process.env.MONGODB_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
    // dbName: "parcial1", // Nombre de la base de datos explícito
  })
  .then(() => console.log("La conexión fue exitosa"))
  .catch((err) => console.error("La conexión no fue establecida", err));

app.use(express.json());

app.use("/clubes", clubesRoutes);
app.use("/torneos", torneosRoutes);
app.use("/usuarios", usuariosRoutes);

// Servir el archivo index.html en la ruta raíz
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "./views/index.html"));
});

app.listen(port, () => console.log("http://localhost:" + port));
