"use strict";

var angular = require('angular'),
    mocks = require('angular-mocks'),
    module = window.module,
    inject = window.inject,
    Command = require('../lib/Command'),
    Registry = require('../lib/Registry'),
    ViewModel = require('../lib/ViewModel'),
    Bus = require('../lib/messages/Bus');

angular.module('test', ['ngMock'])
    .controller('ViewModel', ViewModel);

describe('ViewModels', function () {

    beforeEach(module('test'));

    var controllerProvider = null,
        rootScope = null,
        propertiesRegistry = null,
        eventsRegistry = null,
        bus = null;

    beforeEach(inject(function (_$controller_, _$rootScope_) {
        controllerProvider = _$controller_;
        rootScope = _$rootScope_;
        propertiesRegistry = new Registry();
        eventsRegistry = new Registry();
        bus = new Bus();
    }));

    it("should watch the property of a viewmodel", function () {
        var spy = jasmine.createSpy();
        propertiesRegistry.register('ViewModel', 'testProperty');
        bus.subscribe('ViewModel', 'testProperty', spy);
        var scope = rootScope.$new(),
            viewmodel = controllerProvider('ViewModel', {
                'context': 'ViewModel',
                'scope': scope,
                'propertiesRegistry': propertiesRegistry,
                'eventsRegistry': eventsRegistry,
                'bus': bus
            });

        viewmodel.testProperty = 20;
        scope.$digest();

        expect(spy).toHaveBeenCalledWith({newValue: 20, oldValue: 20});
        expect(spy.calls.count()).toBe(1);
    });

    it("should listen to an emit of an event", function () {
        var spy = jasmine.createSpy();
        eventsRegistry.register('ViewModel', 'testEvent');
        bus.subscribe('ViewModel', 'testEvent', spy);
        var scope = rootScope.$new(),
            viewmodel = controllerProvider('ViewModel', {
                'context': 'ViewModel',
                'scope': scope,
                'bus': bus,
                'propertiesRegistry': propertiesRegistry,
                'eventsRegistry': eventsRegistry
            });

        scope.$emit('testEvent', {test: 10});

        expect(spy).toHaveBeenCalledWith({data: {test: 10}});
        expect(spy.calls.count()).toBe(1);
    });
});