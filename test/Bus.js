"use strict";

var Bus = require('../lib/messages/Bus');

describe('Event Bus', function () {

    it("should publish an event", function () {
        var bus = new Bus(),
            subscriber = {
                action: function (data) {

                }
            };
        spyOn(subscriber, "action");

        bus.subscribe("TEST_NOTIFICATION", subscriber.action);
        bus.publish("TEST_NOTIFICATION", {test: 10});

        expect(subscriber.action).toHaveBeenCalledWith({test: 10});
        expect(subscriber.action.calls.count()).toBe(1);
    });

    it("should not receive the event if wrong type of event", function () {
        var bus = new Bus(),
            subscriber = {
                action: function (data) {

                }
            };
        spyOn(subscriber, "action");

        bus.subscribe("TEST_NOTIFICATION_WRONG", subscriber.action);
        bus.publish("TEST_NOTIFICATION", {test: 10});

        expect(subscriber.action.calls.count()).toBe(0);
    });
});