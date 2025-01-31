import express from "express";
import { auth } from "../middlewares/auth.js";
import {
  createUser,
  login,
  getUsuarios,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/create", createUser);
router.get("/", auth, getUsuarios);

export default router;
