"use strict";

var angular = require('angular'),
    mocks = require('angular-mocks'),
    module = window.module,
    inject = window.inject,
    TestPropertyWatcher = require('./fixtures/TestPropertyWatcher'),
    ViewModel = require('../lib/ViewModel');

angular.module('test', ['ngMock'])
    .controller('ViewModel', ViewModel);

describe('ViewModels', function () {

    beforeEach(module('test'));

    var controllerProvider = null,
        rootScope = null;

    beforeEach(inject(function (_$controller_, _$rootScope_) {
        controllerProvider = _$controller_;
        rootScope = _$rootScope_;
    }));

    it("should watch the property of a viewmodel", function () {
        var propertyWatcher = new TestPropertyWatcher();
        spyOn(propertyWatcher, "execute");
        var scope = rootScope.$new(),
            viewmodel = controllerProvider('ViewModel', {'$scope': scope, 'propertyWatcher': propertyWatcher});

        viewmodel.testProperty = 20;
        scope.$digest();

        expect(propertyWatcher.execute).toHaveBeenCalledWith(20, 20);
        expect(propertyWatcher.execute.calls.count()).toBe(1);
    });
});