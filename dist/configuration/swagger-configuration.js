"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
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
const openapiSpecification = (0, swagger_jsdoc_1.default)(options);
exports.default = openapiSpecification;
