const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js']; // entry point for routes

swaggerAutogen(outputFile, endpointsFiles).then(() => {
  require('./server.js'); // start server after swagger-output.json is generated
});