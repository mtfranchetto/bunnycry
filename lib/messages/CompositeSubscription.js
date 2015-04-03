"use strict";

var _ = require('lodash');

var CompositeSubscription = function () {
    this._subscriptions = [];
};

CompositeSubscription.prototype.add = function () {
    this._subscriptions = _.union(this._subscriptions, Array.prototype.slice.apply(arguments));
};

CompositeSubscription.prototype.unsubscribe = function () {
    _.invoke(this._subscriptions, 'unsubscribe');
};

module.exports = CompositeSubscription;