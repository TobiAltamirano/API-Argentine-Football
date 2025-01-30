import express from "express";
import { getTorneos } from "../controllers/torneosController.js";

const router = express.Router();

router.get("/", getTorneos);

export default router;
