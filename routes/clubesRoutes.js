import express from "express";
import { getClubes } from "../controllers/clubesController.js";

const router = express.Router();

router.get("/", getClubes);

export default router;
