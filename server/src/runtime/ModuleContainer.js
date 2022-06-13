"use strict";
exports.__esModule = true;
var awilix_1 = require("awilix");
var path = require("path");
var FileConfigurationProvider_1 = require("../config/FileConfigurationProvider");
var Configuration_1 = require("../config/Configuration");
var MySQLDatabasePort_1 = require("../repository/ports/MySQLDatabasePort");
var Task_1 = require("./Task");
var MailPort_1 = require("../repository/ports/MailPort");
var ModuleContainer = function () {
    var _container = (0, awilix_1.createContainer)({
        injectionMode: "PROXY"
    });
    _container.register({
        filePath: (0, awilix_1.asValue)(path.join(__dirname, "../../../config.".concat(process.env.NODE_ENV || "development", ".json"))),
        configurationProvider: (0, awilix_1.asFunction)(FileConfigurationProvider_1["default"]).singleton(),
        config: (0, awilix_1.asFunction)(Configuration_1["default"]).singleton(),
        mailPort: (0, awilix_1.asFunction)(MailPort_1["default"]),
        port: (0, awilix_1.asFunction)(MySQLDatabasePort_1["default"])
            .singleton()
            .inject(function () { return ({
            config: _container
                .resolve("config")
                .getDatabaseConfiguration()
        }); }),
        container: (0, awilix_1.asValue)(_container),
        task: (0, awilix_1.asClass)(Task_1["default"])
    });
    _container.loadModules([
        [
            "server/lib/src/repository/**/!(Repository).js",
            {
                lifetime: awilix_1.Lifetime.TRANSIENT,
                register: awilix_1.asFunction
            }
        ],
        [
            "server/lib/src/api/controller/**/*.js",
            {
                register: awilix_1.asClass
            }
        ]
    ], {
        formatName: "camelCase"
    });
    _container.loadModules([
        [
            "server/lib/src/interactor/**/!(Interactable).js",
            {
                register: awilix_1.asClass
            }
        ]
    ], {
        formatName: "camelCase"
    });
    _container.loadModules([
        [
            "server/lib/src/service/**/!(Service).js",
            {
                register: awilix_1.asFunction
            }
        ]
    ], {
        formatName: "camelCase"
    });
    _container.loadModules([
        [
            "server/lib/src/api/routes/**.js",
            {
                register: awilix_1.asFunction
            }
        ]
    ], {
        formatName: "camelCase"
    });
    return {
        resolve: function (name) {
            return _container.resolve(name);
        },
        createScope: function () {
            return _container.createScope();
        }
    };
};
exports["default"] = ModuleContainer;
