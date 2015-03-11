"use strict";

var objectPath = require('object-path');

var Registry = function () {
    this._components = {};
};

Registry.prototype.register = function (context, type, component) {
    objectPath.set(this._components, context + "." + type, component);
};

Registry.prototype.obtain = function (context, type) {
    if (type)
        return objectPath.get(this._components, context + "." + type);
    else
        return objectPath.get(this._components, context);
};

module.exports = Registry;