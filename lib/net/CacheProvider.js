"use strict";

var CacheProvider = function () {

};

CacheProvider.prototype.setData = function (tag, data) { };
CacheProvider.prototype.getData = function (tag) {return null; };
CacheProvider.prototype.setExpireTime = function (milliseconds) { };
CacheProvider.prototype.expire = function (tag) { };
CacheProvider.prototype.expireAll = function () { };

module.exports = CacheProvider;
