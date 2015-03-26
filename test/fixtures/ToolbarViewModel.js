"use strict";

var ToolbarViewModel = function (context, namespace) {
    this._namespace = namespace;
    this._context = context;
};

ToolbarViewModel.prototype.destroy = function () {};

ToolbarViewModel.prototype.order = 'asc';

module.exports = ToolbarViewModel;