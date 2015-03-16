"use strict";

var InterfaceConstructor = function (method, url, type, config) {
    return {
        method: method,
        url: url,
        type: type,
        config: config
    };
};

module.exports = InterfaceConstructor;