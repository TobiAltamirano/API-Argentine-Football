import clubesModel from "../models/clubesModel.js";

export const getClubes = async (req, res) => {
  try {
    const clubes = await clubesModel.find();
    res.json(clubes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
