"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteConfiguration = void 0;
var systemRoutes = require("../routes/system-routes");
class RouteConfiguration {
    configRoutes(app) {
        app.use("/service/system", systemRoutes);
    }
}
exports.RouteConfiguration = RouteConfiguration;
