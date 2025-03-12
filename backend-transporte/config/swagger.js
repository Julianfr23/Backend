// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuración de Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Cotizaciones',
      version: '1.0.0',
      description: 'Documentación de la API de cotizaciones de transporte',
    },
    components: {
      schemas: {
        Cotizacion: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID de la cotización',
              example: 1,
            },
            origen: {
              type: 'string',
              description: 'Ciudad de origen',
              example: 'Girardot',
            },
            destino: {
              type: 'string',
              description: 'Ciudad de destino',
              example: 'Medellín',
            },
            precio: {
              type: 'integer',
              description: 'Precio de la cotización',
              example: 150000,
            },
          },
        },
      },
    },
  },
  apis: ['./routes/cotizacion.routes.js', './controllers/cotizacion.controller.js'], // Rutas de tus archivos que contienen los comentarios @swagger
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
