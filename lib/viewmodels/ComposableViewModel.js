"use strict";

var inherits = require('inherits'),
    ViewModel = require('./ViewModel'),
    _ = require('lodash');

var ComposableViewModel = function (context, scope, propertiesRegistry, bus, eventsRegistry, viewModelsRegistry, controllerFactory) {

    //Register viewmodels
    _.forEach(viewModelsRegistry.obtain(context), function (constructor, namespace) {
        namespace = _.camelCase(namespace);
        var viewModel = controllerFactory(constructor, {'Context': context, 'Namespace': namespace});
        this[namespace] = viewModel;
        scope.$on('$destroy', function () {
            if (typeof viewModel.destroy === 'function') {
                viewModel.destroy();
            }
        });
    }, this);

    ViewModel.call(this, context, scope, propertiesRegistry, bus, eventsRegistry);
};

inherits(ComposableViewModel, ViewModel);

module.exports = ComposableViewModel;