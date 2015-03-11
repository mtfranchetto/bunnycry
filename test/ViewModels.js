"use strict";

var angular = require('angular'),
    mocks = require('angular-mocks'),
    module = window.module,
    inject = window.inject,
    Command = require('../lib/Command'),
    Registry = require('../lib/Registry'),
    ViewModel = require('../lib/ViewModel');

angular.module('test', ['ngMock'])
    .controller('ViewModel', ViewModel);

describe('ViewModels', function () {

    beforeEach(module('test'));

    var controllerProvider = null,
        rootScope = null,
        propertiesRegistry = null,
        eventsRegistry = null;

    beforeEach(inject(function (_$controller_, _$rootScope_) {
        controllerProvider = _$controller_;
        rootScope = _$rootScope_;
        propertiesRegistry = new Registry();
        eventsRegistry = new Registry();
    }));

    it("should watch the property of a viewmodel", function () {
        var propertyCommand = new Command();
        propertiesRegistry.register('ViewModel', 'testProperty', propertyCommand);
        spyOn(propertyCommand, "execute");
        var scope = rootScope.$new(),
            viewmodel = controllerProvider('ViewModel', {
                'context': 'ViewModel',
                'scope': scope,
                'propertiesRegistry': propertiesRegistry,
                'eventsRegistry': eventsRegistry
            });

        viewmodel.testProperty = 20;
        scope.$digest();

        expect(propertyCommand.execute).toHaveBeenCalledWith(20, 20);
        expect(propertyCommand.execute.calls.count()).toBe(1);
    });

    it("should listen to an emit of an event", function () {
        var eventCommand = new Command();
        eventsRegistry.register('ViewModel', 'testEvent', eventCommand);
        spyOn(eventCommand, "execute");
        var scope = rootScope.$new(),
            viewmodel = controllerProvider('ViewModel', {
                'context': 'ViewModel',
                'scope': scope,
                'propertiesRegistry': propertiesRegistry,
                'eventsRegistry': eventsRegistry
            });

        scope.$emit('testEvent', {test: 10});

        expect(eventCommand.execute).toHaveBeenCalledWith({ test: 10});
        expect(eventCommand.execute.calls.count()).toBe(1);
    });
});