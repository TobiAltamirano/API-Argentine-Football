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
    // Validación: Verificar que el ID sea válido
    if (!req.params.id) {
      return res.status(400).json({ error: "El ID del torneo es requerido." });
    }

    const torneo = await torneosModel.findById(req.params.id);
    if (!torneo) {
      return res.status(404).json({ error: "Torneo no encontrado." });
    }

    res.json(torneo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createTorneos = async (req, res) => {
  try {
    // Validación: Verificar que los datos requeridos estén presentes
    const { nombre, fechaInicio, fechaFin } = req.body;
    if (!nombre || !fechaInicio || !fechaFin) {
      return res
        .status(400)
        .json({ error: "Debe proporcionar nombre, fechaInicio y fechaFin." });
    }

    const torneo = new torneosModel({ ...req.body });
    const newTorneo = await torneo.save();
    res.json(newTorneo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateTorneos = async (req, res) => {
  try {
    // Validación: Verificar que el ID del torneo esté presente
    if (!req.params.id) {
      return res.status(400).json({ error: "El ID del torneo es requerido." });
    }

    const updated = await torneosModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: "Torneo no encontrado." });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTorneos = async (req, res) => {
  try {
    // Validación: Verificar que el ID del torneo esté presente
    if (!req.params.id) {
      return res.status(400).json({ error: "El ID del torneo es requerido." });
    }

    const deleted = await torneosModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Torneo no encontrado." });
    }

    res.json(deleted);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const searchTorneoByName = async (req, res) => {
  try {
    // Validación: Verificar que se haya proporcionado el nombre del torneo
    const nombre = req.query.nombre;
    if (!nombre) {
      return res.status(400).json({
        error: "Debe proporcionar un nombre de torneo para la búsqueda.",
      });
    }

    // Buscar el torneo y popular las referencias
    const torneo = await torneosModel
      .findOne({ nombre: { $regex: new RegExp(`^${nombre}$`, "i") } })
      .populate("campeones", "nombre")
      .populate("clasificados", "nombre");

    if (!torneo) {
      return res.status(404).json({ error: "Torneo no encontrado." });
    }

    res.json(torneo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
