"use strict";

var postal = require('postal'),
    _ = require('lodash');

var Bus = function () {

};

Bus.prototype.publish = function (type, message) {
    postal.publish({
        channel: "app",
        topic: type,
        data: message
    });
};

Bus.prototype.subscribe = function (type, action) {
    postal.subscribe({
        channel: "app",
        topic: type,
        callback: _.ary(action, 1)
    });
};

module.exports = Bus;