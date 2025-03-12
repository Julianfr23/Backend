const express = require('express');
const router = express.Router();
const cotizacionController = require('../controllers/cotizacion.controller');

router.get('/cotizaciones', cotizacionController.getAllCotizaciones);
router.post('/cotizaciones', cotizacionController.createCotizacion);
router.get('/cotizaciones/:id', cotizacionController.getCotizacionPorId);
router.put('/cotizaciones/:id', cotizacionController.updateCotizacion);
router.delete('/cotizaciones/:id', cotizacionController.deleteCotizacion);
router.get('/cotizaciones/buscar/:term', cotizacionController.searchCotizaciones);

module.exports = router;
