import clubesModel from "../models/clubesModel.js";

export const getClubes = async (req, res) => {
  try {
    const clubes = await clubesModel.find();
    if (clubes.length === 0) {
      return res.status(404).json({ error: "No se encontraron clubes." });
    }
    res.json(clubes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getClubesById = async (req, res) => {
  try {
    const club = await clubesModel.findById(req.params.id);
    if (!club) {
      return res.status(404).json({ error: "Club no encontrado." });
    }
    res.json(club);
  } catch (error) {
    res.status(400).json({ error: "ID de club inválido o error de servidor." });
  }
};

export const createClubes = async (req, res) => {
  try {
    // Validamos que se envíen los datos necesarios
    const { nombre, provincia, titulos } = req.body;
    if (!nombre || !provincia || !titulos) {
      return res
        .status(400)
        .json({
          error: "Faltan datos necesarios (nombre, provincia, titulos).",
        });
    }

    const club = new clubesModel({ ...req.body });
    const newClub = await club.save();
    res.status(201).json(newClub);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateClubes = async (req, res) => {
  try {
    // Validamos que la ID del club sea válida
    const club = await clubesModel.findById(req.params.id);
    if (!club) {
      return res.status(404).json({ error: "Club no encontrado." });
    }

    const updated = await clubesModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar el club." });
  }
};

export const deleteClubes = async (req, res) => {
  try {
    // Validamos que la ID del club sea válida
    const club = await clubesModel.findById(req.params.id);
    if (!club) {
      return res.status(404).json({ error: "Club no encontrado." });
    }

    const deleted = await clubesModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Club eliminado exitosamente.", deleted });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar el club." });
  }
};

export const filterByProvincias = async (req, res) => {
  try {
    const provincia = req.params.provincia;
    if (!provincia) {
      return res
        .status(400)
        .json({ error: "Debe proporcionar el nombre de la provincia." });
    }

    const clubes = await clubesModel.find({ provincia: provincia });
    if (clubes.length === 0) {
      return res
        .status(404)
        .json({ error: "No se encontraron clubes en esta provincia." });
    }

    res.json(clubes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const searchByCaracteristicas = async (req, res) => {
  try {
    // Validamos que haya características en la query
    if (!req.query.caracteristicas) {
      return res
        .status(400)
        .json({ error: "Debe proporcionar al menos una característica." });
    }

    // Convertimos la query en array
    const caracteristicas = req.query.caracteristicas.split(",");

    // Buscamos clubes que contengan al menos una de las características en el array
    const clubes = await clubesModel.find({
      caracteristicas: { $in: caracteristicas },
    });

    // Si no hay coincidencias, devolver un error 404
    if (clubes.length === 0) {
      return res
        .status(404)
        .json({ error: "No se encontraron clubes con estas características." });
    }

    res.json(clubes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const searchByName = async (req, res) => {
  try {
    // Extraemos el nombre desde los parámetros de la URL
    const nombre = req.query.nombre;

    // Validamos que se haya enviado un nombre
    if (!nombre) {
      return res
        .status(400)
        .json({ error: "Debe proporcionar un nombre para la búsqueda." });
    }

    // Buscamos un club cuyo nombre coincida exactamente (insensible a mayúsculas/minúsculas)
    const club = await clubesModel.findOne({
      nombre: { $regex: new RegExp(`^${nombre}$`, "i") },
    });

    // Si no se encuentra, enviamos un mensaje adecuado
    if (!club) {
      return res.status(404).json({ error: "Club no encontrado." });
    }

    res.json(club);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getClubesOrdenadosPorTitulos = async (req, res) => {
  try {
    const { orden = "desc" } = req.query; // Parámetro opcional para definir el orden

    const ordenamiento = orden === "asc" ? 1 : -1; // 1 = Ascendente | -1 = Descendente (por defecto)

    const clubes = await clubesModel.find().sort({ titulos: ordenamiento });

    if (clubes.length === 0) {
      return res.status(404).json({ error: "No hay clubes registrados." });
    }

    res.json(clubes);
  } catch (error) {
    console.error("Error en getClubesOrdenadosPorTitulos:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

export const getClubesPaginados = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query; // Definimos valores predeterminados

    page = parseInt(page);
    limit = parseInt(limit);

    if (page < 1 || limit < 1) {
      return res.status(400).json({
        error: "Los valores de 'page' y 'limit' deben ser mayores a 0.",
      });
    }

    // Conteo total de clubes
    const totalClubes = await clubesModel.countDocuments();
    const clubes = await clubesModel
      .find() // No se pasa el parámetro _id aquí, solo consulta sin restricciones
      .skip((page - 1) * limit) // Paginado, saltamos registros
      .limit(limit); // Limitamos los resultados

    res.json({
      total: totalClubes,
      page,
      limit,
      totalPages: Math.ceil(totalClubes / limit),
      clubes,
    });
  } catch (error) {
    console.error("Error en getClubesPaginados:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};
