"use strict";

var _ = require('lodash'),
    Promise = require('bluebird');

var RestAdapter = function (httpClient) {
    this._httpClient = httpClient;
    this._endpoint = "";
};

RestAdapter.prototype.create = function (RestInterface) {
    var service = {};
    _.forEach(RestInterface.prototype, function (value, key) {
        service[key] = _.bind(function () {
            return this._httpClient.get(this._endpoint + value.url);
        }, this);
    }, this);
    return service;
};

RestAdapter.prototype.setEndpoint = function (endpoint) {
    this._endpoint = endpoint;
};

module.exports = RestAdapter;