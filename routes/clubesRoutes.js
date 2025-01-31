import express from "express";
import {
  getClubes,
  getClubesById,
  createClubes,
  updateClubes,
  deleteClubes,
  filterByProvincias,
  searchByCaracteristicas,
  searchByName,
  getClubesOrdenadosPorTitulos,
  getClubesPaginados,
} from "../controllers/clubesController.js";

const router = express.Router();

router.get("/", getClubes);
router.get("/:id", getClubesById);
router.get("/provincia/:provincia", filterByProvincias);
router.get("/search/caracteristicas", searchByCaracteristicas);
router.get("/search/nombre", searchByName);
router.get("/ordenados/titulos", getClubesOrdenadosPorTitulos);
router.get("/paginados", getClubesPaginados);
router.post("/", createClubes); // Requiere Auth::JWT
router.put("/:id", updateClubes); // Requiere Auth::JWT
router.delete("/:id", deleteClubes); // Requiere Auth::JWT

export default router;
