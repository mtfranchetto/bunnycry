"use strict";

var Promise = require('bluebird'),
    common = require('ng-common'),
    httpClient = new common.net.HttpClient(),
    RestAdapter = require('../lib/rest/RestAdapter'),
    TestInterface = require('./fixtures/TestInterface');

describe('Rest', function () {

    it("should build a service for rest", function () {
        spyOn(httpClient, "get").and.returnValue(Promise.resolve());
        var restAdapter = new RestAdapter(httpClient),
            service = restAdapter.create(TestInterface);

        expect(service.getList).toBeDefined();
        expect(service.getList() instanceof Promise).toBe(true);
        expect(restAdapter._httpClient.get).toHaveBeenCalledWith("getListApi");
    });

    it("should build a service for rest with an endpoint", function () {
        spyOn(httpClient, "get").and.returnValue(Promise.resolve());
        var restAdapter = new RestAdapter(httpClient);
        restAdapter.setEndpoint("http://endpoint.com/");
        var service = restAdapter.create(TestInterface);

        service.getList();
        expect(restAdapter._httpClient.get).toHaveBeenCalledWith("http://endpoint.com/getListApi");
    });

    it("should create a get method on the service", function () {

    });

    it("should create a post method on the service", function () {

    });

    it("should create a delete method on the service", function () {

    });

    it("should create an update method on the service", function () {

    });

    it("should parse the result with the parser specified", function () {

    });

    it("should return the result as-is if no parser is specified", function () {

    });

    it("should substitute the url param if matches", function () {

    });

    it("should substitute the query string param if matches", function () {

    });

    it("should pass an object to the body post", function () {

    });
});