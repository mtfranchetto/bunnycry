"use strict";

var construct = require('../../lib/rest/InterfaceConstruct'),
    Methods = require('ng-common').net.Methods,
    TestType = require('./TestType');

var TestInterface = function () {

};

TestInterface.prototype.getList = construct(Methods.GET, "getListApi", TestType);

TestInterface.prototype.getListNoParse = construct(Methods.GET, "getListApi");

TestInterface.prototype.getListWithId = construct(Methods.GET, "getListApi/:$:");

TestInterface.prototype.addList = construct(Methods.POST, "addListApi");

TestInterface.prototype.deleteList = construct(Methods.DELETE, "deleteListApi");

TestInterface.prototype.updateList = construct(Methods.PUT, "updateListApi");

TestInterface.prototype.jsonpList = construct(Methods.JSONP, "jsonpListApi");

module.exports = TestInterface;