"use strict";
exports.__esModule = true;
var Configuration = function (_a) {
    var configurationProvider = _a.configurationProvider;
    return {
        getDatabaseConfiguration: function () {
            return configurationProvider.get("database");
        },
        getServerConfiguration: function () {
            return configurationProvider.get("server");
        },
        getEmailConfiguration: function () {
            return configurationProvider.get("email");
        }
    };
};
exports["default"] = Configuration;
