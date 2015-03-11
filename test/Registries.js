"use strict";

var Registry = require('../lib/Registry');

describe('Registries', function () {

    var registry = null;

    beforeEach(function () {
        registry = new Registry();
    });

    it("should register a component to a context", function () {
        registry.register('app', {
            execute: 'exe'
        });

        expect(registry.obtain('app')[0]).toEqual({
            execute: 'exe'
        });
    });

    it("should register a component to a context with a type", function () {
        registry.register('app', 'section1', {
            execute: 'exe'
        });

        expect(registry.obtain('app', 'section1')[0]).toEqual({
            execute: 'exe'
        });
    });
});