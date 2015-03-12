"use strict";

var construct = require('../../lib/rest/InterfaceConstruct'),
    inherits = require('inherits'),
    Methods = require('ng-common').net.Methods,
    TestType = require('./TestType');

var TestInterface = function () {

};

TestInterface.prototype.getList = construct(Methods.GET, "getListApi", TestType);

module.exports = TestInterface;