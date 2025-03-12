
const express = require('express');
const cors = require('cors');
const cotizacionRoutes = require('./routes/cotizacion.routes');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', cotizacionRoutes);

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0', // Versión de OpenAPI
    info: {
      title: 'API de Cotizaciones',
      version: '1.0.0',
      description: 'API para gestionar cotizaciones de transporte',
    },
    servers: [
      {
        url: 'http://localhost:3000/', // URL de tu API
      },
    ],
  },
  apis: ['./routes/cotizacion.routes.js', './controllers/cotizacion.controller.js'], // Ruta de los archivos de rutas y controladores
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middleware para servir la documentación de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
