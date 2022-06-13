"use strict";
exports.__esModule = true;
var mysql = require("promise-mysql");
var database;
var options = {};
var MySQLDatabasePort = function (_a) {
    var config = _a.config;
    if (!database) {
        database = mysql.createPool({
            host: config.host,
            user: config.user,
            port: config.port,
            password: config.password,
            database: config.database,
            connectionLimit: config.connectionLimit,
            debug: process.env.NODE_ENV === "production" ? false : ["ComQueryPacket"]
        });
    }
    return database;
};
exports["default"] = MySQLDatabasePort;
