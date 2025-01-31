import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import usuariosModel from "../models/usuariosModel.js";

dotenv.config();
// Clave secreta para JWT (debe almacenarse en .env)
const secretKey = process.env.JWT_SECRET;

// Crear usuario
export const createUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Los campos son obligatorios");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const nuevoUsuario = new usuariosModel({
      email,
      password: hashedPassword,
    });

    await nuevoUsuario.save(); // Guardamos el usuario en la base de datos
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login y generación de token
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await usuariosModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  const validPassword = await bcrypt.compare(password, user.password); // booleano

  if (!validPassword) {
    return res.status(401).json({ message: "Contraseña incorrecta" });
  }

  const token = jwt.sign({ id: user._id, email: user.email }, secretKey, {
    expiresIn: "1h",
  });

  res.status(200).json({ token });
};

// Obtener todos los usuarios
export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await usuariosModel.find();
    if (usuarios.length === 0) {
      return res.status(404).json({ error: "No se encontraron usuarios." });
    }
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
