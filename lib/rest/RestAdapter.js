"use strict";

var _ = require('lodash'),
    Methods = require('../../lib/net/Methods'),
    GsonParser = require('../../lib/net/GsonParser');

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
    return _.mapValues(RestInterface.prototype, _.bind(function (spec, api) {
        return this.generateService(spec, api);
    }, this));
};

RestAdapter.prototype.generateService = function (spec, api) {
    var service = _.bind(function () {
        var parser = null,
            data = null,
            args = Array.prototype.slice.apply(arguments),
            httpClient = this._httpClientHandler(spec.config, api) || this._httpClient,
            gsonTypes = _.isArray(spec.type) ? spec.type : [spec.type],
            url = this._endpoint + this._substituteParams(args, spec.url);

        //Add parser
        if (spec.type)
            parser = this._parserHandler(spec.config, api, spec.type) || new GsonParser(gsonTypes);
        //Add request body
        if (spec.method === Methods.POST || spec.method === Methods.PUT || spec.method === Methods.MULTIPART)
            data = _.last(args);

        service.loading = true;
        return this._getNetworkPromise(httpClient, spec.method, url, data, parser)
            .finally(function () {
                service.loading = false;
            });
    }, this);
    return service;
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