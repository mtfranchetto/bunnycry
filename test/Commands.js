"use strict";

var Command = require('../lib/Command');

describe('Commands', function () {

    it("should execute a command", function () {
        var command = new Command();
        spyOn(command, "execute");

        command.execute('test', 20);
        expect(command.execute).toHaveBeenCalledWith('test', 20);
        expect(command.execute.calls.count()).toBe(1);
    });
});