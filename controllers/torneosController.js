import torneosModel from "../models/torneosModel.js";

export const getTorneos = async (req, res) => {
  try {
    const torneos = await torneosModel.find();
    res.json(torneos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getTorneosById = async (req, res) => {
  try {
    const torneo = await torneosModel.findById(req.params.id);
    if (!torneo) {
      return res.status(404).json(torneo);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createTorneos = async (req, res) => {
  try {
    const torneo = new torneosModel({ ...req.body });
    const newTorneo = await torneo.save();
    res.json(newTorneo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateTorneos = async (req, res) => {
  try {
    const updated = await torneosModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTorneos = async (req, res) => {
  try {
    const deleted = await torneosModel.findByIdAndDelete(req.params.id);
    res.json(deleted);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
