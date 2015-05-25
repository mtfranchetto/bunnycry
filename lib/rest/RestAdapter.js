"use strict";

var _ = require('lodash'),
    common = require('ng-common'),
    Methods = common.net.Methods,
    GsonParser = common.net.GsonParser;

var RestAdapter = function (httpClient) {
    this._httpClient = httpClient;
    this._parserHandler = function () {
        return null;
    };
    this._httpClientHandler = function () {
        return null;
    };
    this._endpoint = "";
};

RestAdapter.prototype.create = function (RestInterface) {
    return _.mapValues(RestInterface.prototype, function (value, api) {
        return _.bind(function () {
            var parser = null,
                data = null,
                args = Array.prototype.slice.apply(arguments),
                httpClient = this._httpClientHandler(value.config, api) || this._httpClient,
                gsonTypes = _.isArray(value.type) ? value.type : [value.type],
                url = this._endpoint + this._substituteParams(args, value.url);

            //Add parser
            if (value.type)
                parser = this._parserHandler(value.config, api, value.type) || new GsonParser(gsonTypes);
            //Add request body
            if (value.method === Methods.POST || value.method === Methods.PUT || value.method === Methods.MULTIPART)
                data = _.last(args);

            return this._getNetworkPromise(httpClient, value.method, url, data, parser);
        }, this);
    }, this);
};

RestAdapter.prototype._substituteParams = function (args, url) {
    var placeholderRegex = /\${\w*}/;
    for (var i = 0; ; i++) {
        var arg = typeof args[i] === 'undefined' || args[i] == null ? "" : args[i];
        if (url.match(placeholderRegex))
            url = url.replace(placeholderRegex, arg);
        else
            break;
    }
    return url;
};

RestAdapter.prototype._getNetworkPromise = function (httpClient, method, url, data, parser) {
    switch (method) {
        case Methods.GET:
            return httpClient.get(url, parser);
        case Methods.POST:
            return httpClient.post(url, data, parser);
        case Methods.PUT:
            return httpClient.put(url, data, parser);
        case Methods.DELETE:
            return httpClient.delete(url, parser);
        case Methods.JSONP:
            return httpClient.jsonp(url, parser);
        case Methods.MULTIPART:
            return httpClient.multipart(url, data, parser);
    }
};

RestAdapter.prototype.setEndpoint = function (endpoint) {
    this._endpoint = endpoint;
};

RestAdapter.prototype.setParserHandler = function (parserHandler) {
    this._parserHandler = parserHandler;
};

RestAdapter.prototype.setHttpClientHandler = function (httpClientHandler) {
    this._httpClientHandler = httpClientHandler;
};

module.exports = RestAdapter;