import express, { Router } from "express";
var weatherDataController = require("../controllers/weather-data-controller");
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
 *              code: 200
 *              extra: Success
 *              count: 0
 *     saveDataReq:
 *          type: object
 *          properties:
 *            countryId:
 *              type: number
 *              description: Country Id
 *            districtId:
 *              type: number
 *              description: District Id
 *            weatherStationId:
 *              type: number
 *              description: Weather Station Id
 *            temperature:
 *              type: number
 *              description: temperature
 *            pressure:
 *              type: number
 *              description: pressure
 *            humidity:
 *              type: number
 *              description: humidity
 *            dateTime:
 *              type: string
 *              description: Date and Time
 *              format: date-time
 *          example:
 *              countryId: 1
 *              districtId: 1
 *              weatherStationId: 1
 *              temperature: 30
 *              pressure: 900
 *              humidity: 50
 *              dateTime: 2023-01-01 00:00:00
 */

/**
 * @swagger
 * tags:
 *   name: WeatherData
 *   description: WeatherData API
 */

/**
 * @swagger
 * /service/weatherData/saveData:
 *    post:
 *      summary: Save weather data to the db
 *      tags: [WeatherData]
 *      description: Save weather data to the db
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/saveDataReq'
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
router.post("/saveData",auth, weatherDataController.saveData);

/**
 * @swagger
 * /service/weatherData/getWeatherData:
 *    get:
 *      summary: Get weather data
 *      tags: [WeatherData]
 *      description: Get weather data
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
router.get("/getWeatherData",auth, weatherDataController.getWeatherData);

module.exports = router;
