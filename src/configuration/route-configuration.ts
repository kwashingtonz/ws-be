var systemRoutes = require("../routes/system-routes");
var setupRoutes = require("../routes/setup-routes");
var weatherDataRoutes = require("../routes/weather-data-routes");

import express from "express";

export class RouteConfiguration {
  configRoutes(app: express.Application) {
    app.use("/service/system", systemRoutes);
    app.use("/service/setup", setupRoutes);
    app.use("/service/weatherData", weatherDataRoutes);
  }
}
