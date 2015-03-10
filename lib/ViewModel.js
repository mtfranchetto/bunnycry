"use strict";

var _ = require('lodash');

var ViewModel = function (scope, propertyWatcher) {

    if (propertyWatcher.name) {
        scope.$watch(_.bind(function () {
            return this[propertyWatcher.name];
        }, this), _.ary(propertyWatcher.execute, 2));
    }
};

module.exports = ViewModel;