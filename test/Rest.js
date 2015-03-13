"use strict";

var Promise = require('bluebird'),
    common = require('ng-common'),
    httpClient = new common.net.HttpClient(),
    RestAdapter = require('../lib/rest/RestAdapter'),
    TestInterface = require('./fixtures/TestInterface'),
    TestType = require('./fixtures/TestType');

describe('Rest', function () {

    it("should build a service for rest", function () {
        spyOn(httpClient, "get").and.returnValue(Promise.resolve());
        var restAdapter = new RestAdapter(httpClient),
            service = restAdapter.create(TestInterface);

        expect(service.getList).toBeDefined();
        expect(service.getList() instanceof Promise).toBe(true);
        expect(restAdapter._httpClient.get.calls.argsFor(0)[0]).toEqual("getListApi");
    });

    it("should build a service for rest with an endpoint", function () {
        spyOn(httpClient, "get").and.returnValue(Promise.resolve());
        var restAdapter = new RestAdapter(httpClient);
        restAdapter.setEndpoint("http://endpoint.com/");
        var service = restAdapter.create(TestInterface);

        service.getList();
        expect(restAdapter._httpClient.get.calls.argsFor(0)[0]).toEqual("http://endpoint.com/getListApi");
    });

    it("should create a post method on the service", function () {
        spyOn(httpClient, "post").and.returnValue(Promise.resolve());
        var restAdapter = new RestAdapter(httpClient);
        restAdapter.setEndpoint("http://endpoint.com/");
        var service = restAdapter.create(TestInterface);

        service.addList();
        expect(restAdapter._httpClient.post.calls.argsFor(0)[0]).toEqual("http://endpoint.com/addListApi");
    });

    it("should create a delete method on the service", function () {
        spyOn(httpClient, "delete").and.returnValue(Promise.resolve());
        var restAdapter = new RestAdapter(httpClient);
        restAdapter.setEndpoint("http://endpoint.com/");
        var service = restAdapter.create(TestInterface);

        service.deleteList();
        expect(restAdapter._httpClient.delete.calls.argsFor(0)[0]).toEqual("http://endpoint.com/deleteListApi");
    });

    it("should create a put method on the service", function () {
        spyOn(httpClient, "put").and.returnValue(Promise.resolve());
        var restAdapter = new RestAdapter(httpClient);
        restAdapter.setEndpoint("http://endpoint.com/");
        var service = restAdapter.create(TestInterface);

        service.updateList();
        expect(restAdapter._httpClient.put.calls.argsFor(0)[0]).toEqual("http://endpoint.com/updateListApi");
    });

    it("should create a jsonp method on the service", function () {
        spyOn(httpClient, "jsonp").and.returnValue(Promise.resolve());
        var restAdapter = new RestAdapter(httpClient);
        restAdapter.setEndpoint("http://endpoint.com/");
        var service = restAdapter.create(TestInterface);

        service.jsonpList();
        expect(restAdapter._httpClient.jsonp.calls.argsFor(0)[0]).toEqual("http://endpoint.com/jsonpListApi");
    });

    it("should parse the result with the parser specified", function () {
        spyOn(httpClient, "get").and.returnValue(Promise.resolve());
        var restAdapter = new RestAdapter(httpClient);
        restAdapter.setEndpoint("http://endpoint.com/");
        var service = restAdapter.create(TestInterface);

        service.getList();
        var args = restAdapter._httpClient.get.calls.argsFor(0);
        expect(args[0]).toEqual("http://endpoint.com/getListApi");
        expect(args[1]._gson._types[0]).toEqual(TestType);
    });

    it("should return the result as-is if no parser is specified", function (done) {
        spyOn(httpClient, "get").and.returnValue(Promise.resolve({'description': 'desc'}));
        var restAdapter = new RestAdapter(httpClient);
        restAdapter.setEndpoint("http://endpoint.com/");
        var service = restAdapter.create(TestInterface);

        service.getListNoParse().then(function (response) {
            var args = restAdapter._httpClient.get.calls.argsFor(0);
            expect(response.description).toEqual('desc');
            expect(args[0]).toEqual("http://endpoint.com/getListApi");
            expect(args[1]).toBe(null);
            done();
        });
    });

    it("should substitute the url param if matches", function () {
        
    });

    it("should substitute the query string param if matches", function () {

    });

    it("should pass an object to the body post", function () {

    });
});