const { Cotizacion } = require('../models');

exports.getAllCotizaciones = async (req, res) => {
  try {
    const cotizaciones = await Cotizacion.findAll();
    res.json(cotizaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCotizacion = async (req, res) => {
  try {
    const cotizacion = await Cotizacion.create(req.body);
    res.status(201).json(cotizacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
