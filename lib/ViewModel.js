"use strict";

var _ = require('lodash');

var ViewModel = function (scope, propertyWatcher) {

    if (propertyWatcher.name) {
        scope.$watch(_.bind(function () {
            return this[propertyWatcher.name];
        }, this), function (newValue, oldValue) {
            propertyWatcher.execute(newValue, oldValue);
        });
    }
};

module.exports = ViewModel;