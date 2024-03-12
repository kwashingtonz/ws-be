import express, { Router } from "express";
var systemController = require("../controllers/system-controller");
const auth = require("../middleware/auth-middleware");
const router: Router = express.Router();

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
 *   name: SystemHealth
 *   description: System Health API
 */

/**
 * @swagger
 * /service/system/health:
 *    get:
 *      summary: Returns the health of the application
 *      tags: [SystemHealth]
 *      description: Returns the health of the application
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
router.get("/health", systemController.getSystemHealth);

module.exports = router;
