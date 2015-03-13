"use strict";

var inherits = require('inherits'),
    ViewModel = require('./ViewModel'),
    _ = require('lodash');

var ComposableViewModel = function (context, scope, propertiesRegistry, bus, eventsRegistry, viewModelsRegistry, controllerFactory) {

    //Register viewmodels
    _.forEach(viewModelsRegistry.obtain(context), function (constructor, namespace) {
        namespace = _.camelCase(namespace);
        this[namespace] = controllerFactory(constructor, {'Context': context, 'Namespace': namespace});
    }, this);

    ViewModel.call(this, context, scope, propertiesRegistry, bus, eventsRegistry);
};

inherits(ComposableViewModel, ViewModel);

module.exports = ComposableViewModel;