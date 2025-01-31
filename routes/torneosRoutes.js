import express from "express";
import {
  getTorneos,
  getTorneosById,
  createTorneos,
  updateTorneos,
  deleteTorneos,
  searchTorneoByName,
} from "../controllers/torneosController.js";

const router = express.Router();

router.get("/", getTorneos);
router.get("/:id", getTorneosById);
router.get("/search/nombre", searchTorneoByName);
router.post("/", createTorneos); // Requiere Auth::JWT
router.put("/:id", updateTorneos); // Requiere Auth::JWT
router.delete("/:id", deleteTorneos); // Requiere Auth::JWT

export default router;
