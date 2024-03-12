import swaggerJsDoc from 'swagger-jsdoc';

const options = {
    swaggerDefinition: {
        openapi: '3.0.1',
        info: {
            title: 'WS-BE API Documentation',
            version: '1.0.0',
        },
        servers: [
            {
                url: "http://localhost:9090"
            }
            // ,
            // {
            //     url: "https://wstat.com"
            // }
        ],
    components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          }
        }
      },
    },
    apis: ['./src/routes/*.ts'],
};

const openapiSpecification = swaggerJsDoc(options);

export default openapiSpecification;