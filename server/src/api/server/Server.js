"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var Hapi = require("hapi");
var PLUGIN_BASE_PATH = "../plugins/";
var Server = function (_a) {
    var task = _a.task, config = _a.config, routeAreas = _a.routeAreas;
    var _config = config;
    var _task = task;
    var _cache;
    var port = _config.port, routePrefix = _config.routePrefix, plugins = _config.plugins, host = _config.host;
    var _server = new Hapi.Server({
        port: port,
        host: host,
        routes: {
            cors: true
        },
        debug: { request: process.env.NODE_ENV === "production" ? false : ["*"] }
    });
    _server.ext("onPreResponse", function (request, h) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                response = request.response;
                if (!response ||
                    !response.isBoom ||
                    response.statusCode === "400") {
                    return [2 /*return*/, h["continue"]];
                }
                return [2 /*return*/, h["continue"]];
            });
        });
    });
    var registerPlugin = function (name) { return __awaiter(void 0, void 0, void 0, function () {
        var plugin;
        return __generator(this, function (_a) {
            plugin = require(PLUGIN_BASE_PATH + name)["default"](config);
            console.log("Register plugin ".concat(plugin.info().name, " v").concat(plugin.info().version));
            return [2 /*return*/, plugin.register(_server)];
        });
    }); };
    var registerPlugins = function (plugins) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, Promise.all(plugins.map(registerPlugin))];
        });
    }); };
    var registerAreas = function (routes) {
        if (routes === void 0) { routes = []; }
        routes.forEach(function (item) { return item.registerRoutes(_server, _config); });
    };
    return {
        get port() {
            return port;
        },
        get routePrefix() {
            return routePrefix;
        },
        start: function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (routePrefix) {
                                _server.realm.modifiers.route.prefix = routePrefix;
                            }
                            return [4 /*yield*/, registerPlugins(plugins)];
                        case 1:
                            _a.sent();
                            registerAreas(routeAreas);
                            return [2 /*return*/, _server.start()];
                    }
                });
            });
        },
        route: _server.route
    };
};
exports["default"] = Server;
