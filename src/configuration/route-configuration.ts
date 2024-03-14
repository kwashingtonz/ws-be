var systemRoutes = require("../routes/system-routes");
var setupRoutes = require("../routes/setup-routes");
var readingRoutes = require("../routes/reading-routes");

import express, { Request, Response, Router } from "express";

export class RouteConfiguration {
  configRoutes(app: express.Application) {
    app.use("/service/system", systemRoutes);
    app.use("/service/setup", setupRoutes);
    app.use("/service/reading", readingRoutes);
  }
}
