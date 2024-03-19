"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var setupController = require("../controllers/setup-controller");
const auth = require("../middleware/auth-middleware");
const router = express_1.default.Router();
// add authentication middleware
// router.use(auth);
/**
 * @swagger
 * components:
 *   schemas:
 *     CommonResponse:
 *          type: object
 *          properties:
 *            status:
 *              type: boolean
 *              description: Indicates the status of the response.
 *            code:
 *              type: string
 *              description: The response code.
 *            extra:
 *              oneOf:
 *                - type: object
 *                - type: string
 *                - type: array
 *              description: Reponse object.
 *            count:
 *              type: integer
 *              description: Number of items in the response.
 *          example:
 *              status: true
 *              code: '200'
 *              extra: Success
 *              count: 0
 */
/**
 * @swagger
 * tags:
 *   name: Setup
 *   description: Setup API
 */
/**
 * @swagger
 * /service/setup/initialSetup:
 *    get:
 *      summary: Initial Setup of the application db
 *      tags: [Setup]
 *      description: Initial Setup of the application db
 *      security:
 *          - apiKeyAuth: []
 *      responses:
 *              200:
 *                  description: Successful
 *                  content:
 *                    application/json:
 *                      schema:
 *                        $ref: '#/components/schemas/CommonResponse'
 *              400:
 *                  description: Not Available
*/
router.get("/initialSetup", setupController.initalSetup);
module.exports = router;
