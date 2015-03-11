"use strict";

var Registry = function () {
    this._components = {};
};

Registry.prototype.register = function (context, type, component) {
    this._components[context] = this._components[context] || {};
    this._components[context][type] = component;
};

Registry.prototype.obtain = function (context, type) {
    if (type) {
        return this._components[context][type];
    } else {
        return this._components[context];
    }
};

module.exports = Registry;