"use strict";

var EventBus = require('../lib/messages/EventBus');

describe('Event Bus', function () {

    it("should publish an event", function () {
        var eventBus = new EventBus(),
            subscriber = {
                action: function (data) {

                }
            };
        spyOn(subscriber, "action");

        eventBus.subscribe("TEST_NOTIFICATION", subscriber.action);
        eventBus.publish("TEST_NOTIFICATION", {test: 10});

        expect(subscriber.action).toHaveBeenCalledWith({test: 10});
        expect(subscriber.action.calls.count()).toBe(1);
    });

    it("should not receive the event if wrong type of event", function () {
        var eventBus = new EventBus(),
            subscriber = {
                action: function (data) {

                }
            };
        spyOn(subscriber, "action");

        eventBus.subscribe("TEST_NOTIFICATION_WRONG", subscriber.action);
        eventBus.publish("TEST_NOTIFICATION", {test: 10});

        expect(subscriber.action.calls.count()).toBe(0);
    });
});