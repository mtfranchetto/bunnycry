"use strict";

var _ = require('lodash'),
    Methods = require('ng-common').net.Methods;

var RestAdapter = function (httpClient) {
    this._httpClient = httpClient;
    this._endpoint = "";
};

RestAdapter.prototype.create = function (RestInterface) {
    return _.mapValues(RestInterface.prototype, function (value, key) {
        return _.bind(function () {
            return this._getNetworPromise(value.method, this._endpoint + value.url);
        }, this);
    }, this);
};

RestAdapter.prototype._getNetworPromise = function (method, url, data, parser) {
    switch (method) {
        case Methods.GET:
            return this._httpClient.get(url, parser);
        case Methods.POST:
            return this._httpClient.post(url, data, parser);
        case Methods.PUT:
            return this._httpClient.put(url, data, parser);
        case Methods.DELETE:
            return this._httpClient.delete(url, parser);
        case Methods.JSONP:
            return this._httpClient.jsonp(url, parser);
    }
};

RestAdapter.prototype.setEndpoint = function (endpoint) {
    this._endpoint = endpoint;
};

module.exports = RestAdapter;