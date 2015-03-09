"use strict";

var inherits = require('inherits'),
    PropertyWatcher = require('../../lib/PropertyWatcher');

var TestPropertyWatcher = function () {

};

inherits(TestPropertyWatcher, PropertyWatcher);

TestPropertyWatcher.prototype.name = 'testProperty';

TestPropertyWatcher.prototype.execute = function (newValue, oldValue) {

};

module.exports = TestPropertyWatcher;