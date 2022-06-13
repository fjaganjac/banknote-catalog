"use strict";
exports.__esModule = true;
var nconf = require("nconf");
var configs;
var FileConfigurationProvider = function (_a) {
    var filePath = _a.filePath;
    configs = new nconf.Provider({
        env: true,
        argv: true,
        store: {
            type: 'file',
            file: filePath
        }
    });
    return configs;
};
exports["default"] = FileConfigurationProvider;
