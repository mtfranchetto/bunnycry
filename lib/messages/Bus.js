"use strict";

var postal = require('postal'),
    _ = require('lodash');

var Bus = function () {

};

Bus.prototype.publish = function (context, type, message) {
    postal.publish({
        channel: context,
        topic: type,
        data: message
    });
};

Bus.prototype.subscribe = function (context, type, action) {
    return postal.subscribe({
        channel: context,
        topic: type,
        callback: _.ary(action, 1)
    });
};

module.exports = Bus;