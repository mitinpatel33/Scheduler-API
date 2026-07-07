const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Scheduler API",
      version: "1.0.0",
      description: "MERN Scheduler API with authentication, availability and public booking",
    },

    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Local Server",
      },
      {
        url: "https://your-api-live-url.onrender.com/api",
        description: "Production Server",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;