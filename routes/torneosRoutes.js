import express from "express";
import { auth } from "../middlewares/auth.js";
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
router.post("/", auth, createTorneos); // Requiere Auth::JWT
router.put("/:id", auth, updateTorneos); // Requiere Auth::JWT
router.delete("/:id", auth, deleteTorneos); // Requiere Auth::JWT

export default router;
