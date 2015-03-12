"use strict";

module.exports = function (method, url, type, config) {
    return {
        method: method,
        url: url,
        type: type,
        config: config
    };
};