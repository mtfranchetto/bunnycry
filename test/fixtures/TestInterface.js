"use strict";

var r = require('../../lib/rest/InterfaceConstructor'),
    Methods = require('ng-common').net.Methods,
    TestType = require('./TestType');

var TestInterface = function () {

};

TestInterface.prototype.getList = r(Methods.GET, "getListApi", TestType);

TestInterface.prototype.getListNoParse = r(Methods.GET, "getListApi");

TestInterface.prototype.getListWithId = r(Methods.GET, "getListApi/${}");

TestInterface.prototype.getListWithIdAndQuery = r(Methods.GET, "getListApi/${}?query=${}");

TestInterface.prototype.addList = r(Methods.POST, "addListApi");

TestInterface.prototype.addListWithIdAndData = r(Methods.POST, "addListApi/${}");

TestInterface.prototype.deleteList = r(Methods.DELETE, "deleteListApi");

TestInterface.prototype.updateList = r(Methods.PUT, "updateListApi");

TestInterface.prototype.updateListWithIdAndData = r(Methods.PUT, "updateListApi/${}");

TestInterface.prototype.jsonpList = r(Methods.JSONP, "jsonpListApi");

module.exports = TestInterface;