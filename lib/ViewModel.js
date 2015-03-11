"use strict";

var _ = require('lodash');

var ViewModel = function (context, scope, propertiesRegistry, eventsRegistry) {

    //Register properties listeners
    _.forEach(propertiesRegistry.obtain(context), function (command, property) {
        scope.$watch(_.bind(function () {
            return this[property];
        }, this), _.bind(_.ary(command.execute, 2), this));
    }, this);

    //Register events listeners
    _.forEach(eventsRegistry.obtain(context), function (command, event) {
        scope.$on(event, _.bind(function (event, data) {
            command.execute(data);
        }, this));
    }, this);
};

module.exports = ViewModel;