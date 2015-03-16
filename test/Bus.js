"use strict";

var Bus = require('../lib/messages/Bus');

describe('Bus', function () {

    var bus, spy = null;

    beforeEach(function () {
        bus = new Bus();
        spy = jasmine.createSpy();
    });

    it("should publish an event", function () {
        bus.subscribe("context", "TEST_NOTIFICATION", spy);
        bus.publish("context", "TEST_NOTIFICATION", {test: 10});

        expect(spy).toHaveBeenCalledWith({test: 10});
        expect(spy.calls.count()).toBe(1);
    });

    it("should not receive the event if wrong type of event", function () {
        bus.subscribe("context", "TEST_NOTIFICATION_WRONG", spy);
        bus.publish("context", "TEST_NOTIFICATION", {test: 10});

        expect(spy.calls.count()).toBe(0);
    });

    it("should not receive the event if wrong context", function () {
        bus.subscribe("context", "TEST_NOTIFICATION", spy);
        bus.publish("context2", "TEST_NOTIFICATION", {test: 10});

        expect(spy.calls.count()).toBe(0);
    });
});