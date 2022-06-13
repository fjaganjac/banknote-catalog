"use strict";
exports.__esModule = true;
var Server_1 = require("./api/server/Server");
var ModuleContainer_1 = require("./runtime/ModuleContainer");
var _container = (0, ModuleContainer_1["default"])();
var _config = _container.resolve("config");
var _routeAreas = ["home"].map(_container.resolve);
var _server = (0, Server_1["default"])({
    task: _container.resolve("task"),
    config: _config.getServerConfiguration(),
    routeAreas: _routeAreas
});
_server.start().then(function () {
    console.log("success");
});
