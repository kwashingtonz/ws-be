"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteConfiguration = void 0;
var systemRoutes = require("../routes/system-routes");
var setupRoutes = require("../routes/setup-routes");
var weatherDataRoutes = require("../routes/weather-data-routes");
class RouteConfiguration {
    configRoutes(app) {
        app.use("/service/system", systemRoutes);
        app.use("/service/setup", setupRoutes);
        app.use("/service/weatherData", weatherDataRoutes);
    }
}
exports.RouteConfiguration = RouteConfiguration;
