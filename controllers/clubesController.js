import clubesModel from "../models/clubesModel.js";

export const getClubes = async (req, res) => {
  try {
    const clubes = await clubesModel.find();
    res.json(clubes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getClubesById = async (req, res) => {
  try {
    const club = await clubesModel.findById(req.params.id);
    if (!club) {
      return res.status(404).json(club);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createClubes = async (req, res) => {
  try {
    const club = new clubesModel({ ...req.body });
    const newClub = await club.save();
    res.json(newClub);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateClubes = async (req, res) => {
  try {
    const updated = await clubesModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteClubes = async (req, res) => {
  try {
    const deleted = await clubesModel.findByIdAndDelete(req.params.id);
    res.json(deleted);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
