"use strict";

module.exports = {
    "messages": {
        "Bus": require('./lib/messages/Bus'),
        "CompositeSubscription": require('./lib/messages/CompositeSubscription')
    },
    "rest": {
        "InterfaceConstructor": require('./lib/rest/InterfaceConstructor'),
        "RestAdapter": require('./lib/rest/RestAdapter')
    },
    "ComposableViewModel": require('./lib/viewmodels/ComposableViewModel'),
    "Registry": require('./lib/Registry'),
    "ViewModel": require('./lib/viewmodels/ViewModel')
};