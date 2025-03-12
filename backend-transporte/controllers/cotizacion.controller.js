const { stack } = require('sequelize/lib/utils');
const { Cotizacion } = require('../models');
const { Op } = require('sequelize');

/**
 * @swagger
 * tags:
 *   name: Cotizaciones
 *   description: Las operaciones relacionadas con las cotizaciones de transporte
 */
/**
 * @swagger
 * /api/cotizaciones:
 *   get:
 *     summary: Obtener todas las cotizaciones
 *     tags: [Cotizaciones]
 *     responses:
 *       200:
 *         description: Lista de cotizaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cotizacion'
 *       500:
 *         description: Error interno del servidor
 */
const getAllCotizaciones = async (req, res) => {
  try {
    const cotizaciones = await Cotizacion.findAll();
    res.json(cotizaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/cotizaciones:
 *   post:
 *     summary: Crea una nueva cotización
 *     description: Crea una nueva cotización de transporte
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               origen:
 *                 type: string
 *                 example: "Bogotá"
 *               destino:
 *                 type: string
 *                 example: "Medellín"
 *               precio:
 *                 type: number
 *                 format: float
 *                 example: 150000
 *     responses:
 *       201:
 *         description: Cotización creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 origen:
 *                   type: string
 *                   example: "Bogotá"
 *                 destino:
 *                   type: string
 *                   example: "Medellín"
 *                 precio:
 *                   type: number
 *                   format: float
 *                   example: 150000
 *       400:
 *         description: Error en los datos de la cotización
 *       500:
 *         description: Error en el servidor
 */
const createCotizacion = async (req, res) => {
  try {
    const cotizacion = await Cotizacion.create(req.body);
    res.status(201).json(cotizacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/cotizaciones/{id}:
 *   get:
 *     summary: Obtener una cotización por ID
 *     tags: [Cotizaciones]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la cotización
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cotización encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cotizacion'
 *       404:
 *         description: Cotización no encontrada
 */
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

/**
 * @swagger
 * /api/cotizaciones/{id}:
 *   put:
 *     summary: Actualiza una cotización existente
 *     description: Actualiza la cotización de transporte con el ID especificado
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la cotización a actualizar
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               origen:
 *                 type: string
 *                 example: "Bogotá"
 *               destino:
 *                 type: string
 *                 example: "Medellín"
 *               precio:
 *                 type: number
 *                 format: float
 *                 example: 150000
 *     responses:
 *       200:
 *         description: Cotización actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 origen:
 *                   type: string
 *                   example: "Bogotá"
 *                 destino:
 *                   type: string
 *                   example: "Medellín"
 *                 precio:
 *                   type: number
 *                   format: float
 *                   example: 150000
 *       400:
 *         description: Error en los datos de la cotización
 *       404:
 *         description: Cotización no encontrada
 *       500:
 *         description: Error en el servidor
 */
const updateCotizacion = async (req, res) => {
  try {
    const { id } = req.params;
    const { origen, destino, precio } = req.body;

    const cotizacion = await Cotizacion.findByPk(id);
    if (!cotizacion) {
      return res.status(404).json({ message: 'Cotización no encontrada' });
    }

    cotizacion.origen = origen;
    cotizacion.destino = destino;
    cotizacion.precio = precio;

    await cotizacion.save();
    res.json({ message: 'Cotización actualizada correctamente', cotizacion });
  } catch (error) {
    console.error("Error al actualizar la cotización:", error);
    res.status(500).json({ message: 'Error al actualizar la cotización', error });
  }
};

/**
 * @swagger
 * /api/cotizaciones/{id}:
 *   delete:
 *     summary: Eliminar una cotización por ID
 *     tags: [Cotizaciones]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la cotización a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cotización eliminada correctamente
 *       404:
 *         description: Cotización no encontrada
 *       500:
 *         description: Error interno del servidor
 */
const deleteCotizacion = async (req, res) => {
  try {
    const { id } = req.params;
    const cotizacion = await Cotizacion.findByPk(id);

    if (!cotizacion) {
      return res.status(404).json({ error: 'Cotización no encontrada' });
    }

    await cotizacion.destroy();
    res.json({ message: 'Cotización eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la cotización:', error);
    res.status(500).json({ error: 'Error al eliminar la cotización', details: error.message });
  }
};

/**
 * @swagger
 * /api/cotizaciones/buscar/{term}:
 *   get:
 *     summary: Buscar cotizaciones por término (origen)
 *     tags: [Cotizaciones]
 *     parameters:
 *       - name: term
 *         in: path
 *         required: true
 *         description: Término de búsqueda para buscar en el campo "origen"
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cotizaciones encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cotizacion'
 *       400:
 *         description: Error en la solicitud, término de búsqueda requerido
 *       404:
 *         description: No se encontraron cotizaciones
 *       500:
 *         description: Error interno del servidor
 */
const searchCotizaciones = async (req, res) => {
  const { term } = req.params;  // Usar params para obtener el término de la ruta

  if (!term) {
    return res.status(400).json({ error: 'Se requiere un término de búsqueda' });
  }

  try {
    const cotizaciones = await Cotizacion.findAll({
      where: {
        [Op.or]: [ 
          { origen: { [Op.like]: `%${term}%` } }, 
        ]
      }
    });

    if (cotizaciones.length === 0) {
      return res.status(404).json({ message: 'No se encontraron cotizaciones' });
    }

    res.json(cotizaciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar las cotizaciones', details: error.message });
  }
};

module.exports = {
  getAllCotizaciones,
  createCotizacion,
  getCotizacionPorId,
  updateCotizacion,
  deleteCotizacion,
  searchCotizaciones
};