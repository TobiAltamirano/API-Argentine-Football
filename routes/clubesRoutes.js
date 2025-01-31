import express from "express";
import {
  getClubes,
  getClubesById,
  createClubes,
  updateClubes,
  deleteClubes,
} from "../controllers/clubesController.js";

const router = express.Router();

router.get("/", getClubes);
router.get("/:id", getClubesById);
router.post("/", createClubes); // Requiere Auth::JWT
router.put("/:id", updateClubes); // Requiere Auth::JWT
router.delete("/:id", deleteClubes); // Requiere Auth::JWT
// Filtrado 1
// Filtrado 2
// Búsqueda nombre
// Ordenar datos (títulos)
// Paginado

export default router;
