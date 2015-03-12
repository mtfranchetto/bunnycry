"use strict";

var ToolbarViewModel = function (context, namespace, bus) {
    this._namespace = namespace;
    this._context = context;
};

ToolbarViewModel.prototype.order = 'asc';

module.exports = ToolbarViewModel;