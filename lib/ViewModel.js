"use strict";

var _ = require('lodash');

var ViewModel = function (context, scope, propertiesRegistry) {

    //Register properties listeners
    _.forEach(propertiesRegistry.obtain(context), function (command, property) {
        scope.$watch(_.bind(function () {
            return this[property];
        }, this), _.ary(command.execute, 2));
    }, this);
};

module.exports = ViewModel;