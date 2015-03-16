"use strict";

var Promise = require('bluebird'),
    common = require('ng-common'),
    httpClient = new common.net.HttpClient(),
    RestAdapter = require('../lib/rest/RestAdapter'),
    TestInterface = require('./fixtures/TestInterface'),
    TestType = require('./fixtures/TestType'),
    TestType2 = require('./fixtures/TestType2');

describe('Rest', function () {

    it("should build a service for rest", function () {
        spyOn(httpClient, "get").and.returnValue(Promise.resolve());
        var restAdapter = new RestAdapter(httpClient),
            service = restAdapter.create(TestInterface);

        expect(service.getList).toBeDefined();
        expect(service.getList() instanceof Promise).toBe(true);
        expect(httpClient.get.calls.argsFor(0)[0]).toEqual("getListApi");
    });

    it("should build a service for rest with an endpoint", function () {
        spyOn(httpClient, "get").and.returnValue(Promise.resolve());
        var restAdapter = new RestAdapter(httpClient);
        restAdapter.setEndpoint("http://endpoint.com/");
        var service = restAdapter.create(TestInterface);

        service.getList();
        expect(httpClient.get.calls.argsFor(0)[0]).toEqual("http://endpoint.com/getListApi");
    });

    it("should create a post method on the service", function () {
        spyOn(httpClient, "post").and.returnValue(Promise.resolve());
        var restAdapter = new RestAdapter(httpClient);
        restAdapter.setEndpoint("http://endpoint.com/");
        var service = restAdapter.create(TestInterface);

        service.addList();
        expect(httpClient.post.calls.argsFor(0)[0]).toEqual("http://endpoint.com/addListApi");
    });

    it("should create a delete method on the service", function () {
        spyOn(httpClient, "delete").and.returnValue(Promise.resolve());
        var restAdapter = new RestAdapter(httpClient);
        restAdapter.setEndpoint("http://endpoint.com/");
        var service = restAdapter.create(TestInterface);

        service.deleteList();
        expect(httpClient.delete.calls.argsFor(0)[0]).toEqual("http://endpoint.com/deleteListApi");
    });

    it("should create a put method on the service", function () {
        spyOn(httpClient, "put").and.returnValue(Promise.resolve());
        var restAdapter = new RestAdapter(httpClient);
        restAdapter.setEndpoint("http://endpoint.com/");
        var service = restAdapter.create(TestInterface);

        service.updateList();
        expect(httpClient.put.calls.argsFor(0)[0]).toEqual("http://endpoint.com/updateListApi");
    });

    it("should create a jsonp method on the service", function () {
        spyOn(httpClient, "jsonp").and.returnValue(Promise.resolve());
        var restAdapter = new RestAdapter(httpClient);
        restAdapter.setEndpoint("http://endpoint.com/");
        var service = restAdapter.create(TestInterface);

        service.jsonpList();
        expect(httpClient.jsonp.calls.argsFor(0)[0]).toEqual("http://endpoint.com/jsonpListApi");
    });

    it("should parse the result with the parser specified", function () {
        spyOn(httpClient, "get").and.returnValue(Promise.resolve());
        var restAdapter = new RestAdapter(httpClient);
        restAdapter.setEndpoint("http://endpoint.com/");
        var service = restAdapter.create(TestInterface);

        service.getList();
        var args = httpClient.get.calls.argsFor(0);
        expect(args[0]).toEqual("http://endpoint.com/getListApi");
        expect(args[1]._gson._types[0]).toEqual(TestType);
    });

    it("should return the result as-is if no parser is specified", function (done) {
        spyOn(httpClient, "get").and.returnValue(Promise.resolve({'description': 'desc'}));
        var restAdapter = new RestAdapter(httpClient);
        restAdapter.setEndpoint("http://endpoint.com/");
        var service = restAdapter.create(TestInterface);

        service.getListNoParse().then(function (response) {
            var args = httpClient.get.calls.argsFor(0);
            expect(response.description).toEqual('desc');
            expect(args[0]).toEqual("http://endpoint.com/getListApi");
            expect(args[1]).toBe(null);
            done();
        });
    });

    it("should substitute the url param if matches", function () {
        spyOn(httpClient, "get").and.returnValue(Promise.resolve({'description': 'desc'}));
        var restAdapter = new RestAdapter(httpClient);
        restAdapter.setEndpoint("http://endpoint.com/");
        var service = restAdapter.create(TestInterface);

        service.getListWithId(55);
        expect(httpClient.get.calls.argsFor(0)[0]).toEqual("http://endpoint.com/getListApi/55");
    });

    it("should substitute the query string param if matches", function () {
        spyOn(httpClient, "get").and.returnValue(Promise.resolve({'description': 'desc'}));
        var restAdapter = new RestAdapter(httpClient);
        restAdapter.setEndpoint("http://endpoint.com/");
        var service = restAdapter.create(TestInterface);

        service.getListWithIdAndQuery(55, 'couch');
        expect(httpClient.get.calls.argsFor(0)[0]).toEqual("http://endpoint.com/getListApi/55?query=couch");
    });

    it("should pass an object to the body post", function () {
        spyOn(httpClient, "post").and.returnValue(Promise.resolve({'description': 'desc'}));
        var restAdapter = new RestAdapter(httpClient);
        restAdapter.setEndpoint("http://endpoint.com/");
        var service = restAdapter.create(TestInterface);

        service.addListWithIdAndData(60, {
            "description": "test list"
        });

        expect(httpClient.post).toHaveBeenCalledWith("http://endpoint.com/addListApi/60", {
            "description": "test list"
        }, null);
    });

    it("should pass an object also to the put body", function () {
        spyOn(httpClient, "put").and.returnValue(Promise.resolve({'description': 'desc'}));
        var restAdapter = new RestAdapter(httpClient);
        restAdapter.setEndpoint("http://endpoint.com/");
        var service = restAdapter.create(TestInterface);

        service.updateListWithIdAndData(60, {
            "description": "test list"
        });

        expect(httpClient.put).toHaveBeenCalledWith("http://endpoint.com/updateListApi/60", {
            "description": "test list"
        }, null);
    });

    it("should substitute the url params also if the placeholder has a name", function () {
        spyOn(httpClient, "get").and.returnValue(Promise.resolve({'description': 'desc'}));
        var restAdapter = new RestAdapter(httpClient);
        restAdapter.setEndpoint("http://endpoint.com/");
        var service = restAdapter.create(TestInterface);

        service.getListWithIdName(55);
        expect(httpClient.get.calls.argsFor(0)[0]).toEqual("http://endpoint.com/getListApi/55");
    });

    it("should parse an array of types", function () {
        spyOn(httpClient, "get").and.returnValue(Promise.resolve());
        var restAdapter = new RestAdapter(httpClient);
        restAdapter.setEndpoint("http://endpoint.com/");
        var service = restAdapter.create(TestInterface);

        service.getListMultiParse();
        var args = httpClient.get.calls.argsFor(0);
        expect(args[0]).toEqual("http://endpoint.com/getListApi");
        expect(args[1]._gson._types[0]).toEqual(TestType);
        expect(args[1]._gson._types[1]).toEqual(TestType2);
    });
});