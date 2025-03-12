const { Cotizacion } = require('../models');

const getAllCotizaciones = async (req, res) => {
  try {
    const cotizaciones = await Cotizacion.findAll();
    res.json(cotizaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCotizacion = async (req, res) => {
  try {
    const cotizacion = await Cotizacion.create(req.body);
    res.status(201).json(cotizacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCotizacionPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const cotizacion = await Cotizacion.findByPk(id);

    if (!cotizacion) {
      return res.status(404).json({ error: 'Cotización no encontrada' });
    }

    res.json(cotizacion);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const updateCotizacion = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, precio } = req.body;

        const cotizacion = await Cotizacion.findByPk(id);
        if (!cotizacion) {
            return res.status(404).json({ message: 'Cotización no encontrada' });
        }

        cotizacion.nombre = nombre;
        cotizacion.precio = precio;

        await cotizacion.save();
        res.json({ message: 'Cotización actualizada correctamente', cotizacion });
    } catch (error) {
        console.error("Error al actualizar la cotización:", error);
        res.status(500).json({ message: 'Error al actualizar la cotización', error });
    }
};

module.exports = {
  getAllCotizaciones,
  createCotizacion,
  getCotizacionPorId,
  updateCotizacion
};