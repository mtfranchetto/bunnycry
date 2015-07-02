"use strict";

var Logger = require('./Logger'),
    inherits = require('inherits');

var ConsoleLogger = function () {
    this._console = window.console;
};

inherits(ConsoleLogger, Logger);

ConsoleLogger.prototype.debug = function (data) {
    this._console.dir(data);
};

ConsoleLogger.prototype.warning = function () {
    this._console.warn(data);
};

ConsoleLogger.prototype.error = function (data) {
    this._console.error(data);
};

module.exports = ConsoleLogger;