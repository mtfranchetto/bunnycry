"use strict";

var inherits = require('inherits'),
    Command = require('../../lib/Command');

var TestPropertyCommand = function () {

};

inherits(TestPropertyCommand, Command);

TestPropertyCommand.prototype.execute = function (newValue, oldValue) {

};

module.exports = TestPropertyCommand;