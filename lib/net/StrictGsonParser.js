"use strict";

var Parser = require('./Parser'),
    inherits = require('inherits'),
    StrictGson = require('../io/StrictGson');

var StrictGsonParser = function (types) {
    this._gson = new StrictGson(types);
};

inherits(StrictGsonParser, Parser);

StrictGsonParser.prototype.parse = function (data, Model) {
    return this._gson.deserialize(data, Model);
};

module.exports = StrictGsonParser;
