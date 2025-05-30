const express = require('express');
const authRoutes = require('./auth');
const fileRoutes = require('./files');

const router = express.Router();

// API documentation route will be added here later

router.use('/auth', authRoutes);
router.use('/files', fileRoutes);

module.exports = router;

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Multimedia Upload API',
      version: '1.0.0',
      description: 'API for uploading and searching multimedia files',
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js', './controllers/*.js'],
};

const specs = swaggerJsdoc(options);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));