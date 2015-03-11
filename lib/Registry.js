"use strict";

var objectPath = require('object-path');
var FLAG_NO_TYPE = "REGISTRY::NO_TYPE";

var Registry = function () {
    this._components = {};
};

Registry.prototype.register = function (context, type, component) {
    if (!component) {
        component = type;
        type = FLAG_NO_TYPE;
    }
    objectPath.push(this._components, context + "." + type, component);
};

Registry.prototype.obtain = function (context, type) {
    if (!type)
        type = FLAG_NO_TYPE;
    return objectPath.get(this._components, context + "." + type);
};

module.exports = Registry;