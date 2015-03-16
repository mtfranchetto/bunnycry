"use strict";

var Registry = require('../lib/Registry');

describe('Registries', function () {

    var registry = null;

    beforeEach(function () {
        registry = new Registry();
    });

    it("should register a component to a context with a type", function () {
        registry.register('app', 'section1', {
            execute: 'exe'
        });

        expect(registry.obtain('app', 'section1')).toEqual({
            execute: 'exe'
        });
    });

    it("should obtain a dictionary of components bound to a context", function () {
        registry.register('app', 'section1', {
            execute: 'exe'
        });

        expect(registry.obtain('app')).toEqual({
            'section1': {
                execute: 'exe'
            }
        });
    });

    it("should register correctly a component with a type that contains a dot", function () {
        registry.register('app', 'viewModel.login', {
            execute: 'exe'
        });

        expect(registry.obtain('app')).toEqual({
            'viewModel.login': {
                execute: 'exe'
            }
        });
    });
});