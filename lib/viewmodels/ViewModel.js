"use strict";

var _ = require('lodash'),
    objectPath = require('object-path');

var ViewModel = function (context, scope, propertiesRegistry, bus, eventsRegistry) {

    //Register properties listeners
    _.forEach(propertiesRegistry.obtain(context), function (command, property) {
        scope.$watch(_.bind(function () {
            return objectPath.get(this, property);
        }, this), function (newValue, oldValue) {
            bus.publish(context, property, {newValue: newValue, oldValue: oldValue});
        });
    }, this);

    //Register events listeners
    _.forEach(eventsRegistry.obtain(context), function (command, type) {
        scope.$on(type, function (event, data) {
            bus.publish(context, type, {
                data: data
            });
        });
    }, this);
};

module.exports = ViewModel;