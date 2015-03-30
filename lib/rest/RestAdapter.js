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
        return _.bind(function () {
            var parser = null,
                data = null,
                args = Array.prototype.slice.apply(arguments),
                url = _.clone(value.url);
            //Add parser
            if (value.type)
                parser = new GsonParser(_.isArray(value.type) ? value.type : [value.type]);
            //Add request body
            if (value.method === Methods.POST || value.method === Methods.PUT)
                data = _.last(args);
            //Replace url params
            var placeholderRegex = /\${\w*}/;
            for (var i = 0; ; i++) {
                var arg = typeof args[i] === 'undefined' || args[i] == null ? "" : args[i];
                if (url.match(placeholderRegex))
                    url = url.replace(placeholderRegex, arg);
                else
                    break;
            }
            return this._getNetworkPromise(value.method, this._endpoint + url, data, parser);
        }, this);
    }, this);
};

RestAdapter.prototype._getNetworkPromise = function (method, url, data, parser) {
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