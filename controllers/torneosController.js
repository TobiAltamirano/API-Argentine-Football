import torneosModel from "../models/torneosController.js";

export const getTorneos = async (req, res) => {
  try {
    const torneos = await torneosModel.find();
    res.json(torneos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
