"use strict";

var Bus = require('../lib/messages/Bus'),
    CompositeSubscription = require('../lib/messages/CompositeSubscription');

describe('Bus', function () {

    var bus, spy, compositeSubscription = null;

    beforeEach(function () {
        bus = new Bus();
        spy = jasmine.createSpy();
        compositeSubscription = new CompositeSubscription();
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

    it("should unsubscribe all the subscriptions", function () {
        var subscription1 = bus.subscribe("context", "TEST_NOTIFICATION", spy),
            subscription2 = bus.subscribe("context", "TEST_NOTIFICATION2", spy);
        spyOn(subscription1, "unsubscribe");
        spyOn(subscription2, "unsubscribe");
        compositeSubscription.add(subscription1, subscription2);
        compositeSubscription.unsubscribe();

        expect(subscription1.unsubscribe.calls.count()).toBe(1);
        expect(subscription2.unsubscribe.calls.count()).toBe(1);
    });

    it("should not dispose a subscription if it's a wrong object", function () {
        var subscription1 = bus.subscribe("context", "TEST_NOTIFICATION", spy),
            subscription2 = {
                "foo": function () {
                }
            };
        spyOn(subscription1, "unsubscribe");
        spyOn(subscription2, "foo");
        compositeSubscription.add(subscription1, subscription2);
        compositeSubscription.unsubscribe();

        expect(subscription1.unsubscribe.calls.count()).toBe(1);
        expect(subscription2.foo.calls.count()).toBe(0);
    });
});