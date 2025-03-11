const express = require('express');
const router = express.Router();
const { getAllCotizaciones, createCotizacion } = require('../controllers/cotizacion.controller');

router.get('/cotizaciones', getAllCotizaciones);
router.post('/cotizaciones', createCotizacion);

module.exports = router;
