"use strict";

var Bus = require('../lib/messages/Bus');

describe('Bus', function () {

    it("should publish an event", function () {
        var bus = new Bus(),
            spy = jasmine.createSpy();

        bus.subscribe("TEST_NOTIFICATION", spy);
        bus.publish("TEST_NOTIFICATION", {test: 10});

        expect(spy).toHaveBeenCalledWith({test: 10});
        expect(spy.calls.count()).toBe(1);
    });

    it("should not receive the event if wrong type of event", function () {
        var bus = new Bus(),
            spy = jasmine.createSpy();

        bus.subscribe("TEST_NOTIFICATION_WRONG", spy);
        bus.publish("TEST_NOTIFICATION", {test: 10});

        expect(spy.calls.count()).toBe(0);
    });
});