"use strict";

var _ = require('lodash'),
    common = require('ng-common'),
    Methods = common.net.Methods,
    GsonParser = common.net.GsonParser;

var RestAdapter = function (httpClient) {
    this._httpClient = httpClient;
    this._endpoint = "";
};

RestAdapter.prototype.create = function (RestInterface) {
    return _.mapValues(RestInterface.prototype, function (value) {
        return _.bind(function (ar) {
            var parser = null,
                args = Array.prototype.slice.apply(arguments);
            if (value.type)
                parser = new GsonParser([value.type]);
            _.forEach(args, function (arg) {
                value.url = value.url.replace(/\$\{\}/, arg);
            });
            var data = null;
            if (value.method === Methods.POST || value.method === Methods.PUT)
                data = _.last(args);
            return this._getNetworPromise(value.method, this._endpoint + value.url, data, parser);
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