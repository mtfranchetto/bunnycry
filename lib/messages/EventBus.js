"use strict";

var postal = require('postal'),
    _ = require('lodash');

var EventBus = function () {

};

EventBus.prototype.publish = function (type, message) {
    postal.publish({
        channel: "app",
        topic: type,
        data: message
    });
};

EventBus.prototype.subscribe = function (type, action) {
    postal.subscribe({
        channel: "app",
        topic: type,
        callback: _.ary(action, 1)
    });
};

module.exports = EventBus;