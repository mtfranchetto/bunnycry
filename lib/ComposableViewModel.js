"use strict";

var inherits = require('inherits'),
    ViewModel = require('./ViewModel'),
    _ = require('lodash');

var ComposableViewModel = function (context, scope, propertiesRegistry, bus, eventsRegistry, viewModelsRegistry, controllerFactory) {
    ViewModel.call(this, context, scope, propertiesRegistry, bus, eventsRegistry);

    //Register viewmodels
    _.forEach(viewModelsRegistry.obtain(context), function (constructor, namespace) {
        this[namespace] = controllerFactory(constructor);
    }, this);
};

inherits(ComposableViewModel, ViewModel);

module.exports = ComposableViewModel;