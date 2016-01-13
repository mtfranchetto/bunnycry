"use strict";

module.exports = {
    messages: {
        Bus: require('./lib/messages/Bus'),
        CompositeSubscription: require('./lib/messages/CompositeSubscription')
    },
    rest: {
        InterfaceConstructor: require('./lib/rest/InterfaceConstructor'),
        RestAdapter: require('./lib/rest/RestAdapter')
    },
    Registry: require('./lib/Registry'),
    Bootstrapper: require('./lib/Bootstrapper'),
    ValueHolder: require('./lib/ValueHolder'),
    DataRetriever: require('./lib/DataRetriever'),
    BaseExecutor: require('./lib/BaseExecutor'),
    Watcher: require('./lib/Watcher'),
    viewmodels: {
        ViewModel: require('./lib/viewmodels/ViewModel'),
        ComposableViewModel: require('./lib/viewmodels/ComposableViewModel')
    },
    util: {
        ConsoleLogger: require('./lib/util/ConsoleLogger'),
        Logger: require('./lib/util/Logger')
    },
    io: {
        Gson: require('./lib/io/Gson'),
        StrictGson: require('./lib/io/StrictGson'),
        JSONSerializer: require('./lib/io/JSONSerializer'),
        Serializer: require('./lib/io/Serializer'),
        SettingsManager: require('./lib/io/SettingsManager')
    },
    net: {
        CacheProvider: require('./lib/net/CacheProvider'),
        MemCacheProvider: require('./lib/net/MemCacheProvider'),
        BaseHttpClient: require('./lib/net/BaseHttpClient'),
        MemCacheHttpClient: require('./lib/net/CacheHttpClient'),
        CacheHttpClient: require('./lib/net/CacheHttpClient'),
        HttpClient: require('./lib/net/HttpClient'),
        GsonParser: require('./lib/net/GsonParser'),
        StrictGsonParser: require('./lib/net/StrictGsonParser'),
        Parser: require('./lib/net/Parser'),
        Methods: require('./lib/net/Methods'),
        QueryStringSerializer: require('./lib/net/QueryStringSerializer')
    },
    angular: {
        ScopeInvoker: require('./lib/angular/ScopeInvoker'),
        ProviderTypes: require('./lib/angular/ProviderTypes'),
        DirectiveCreator: require('./lib/angular/DirectiveCreator'),
        AngularUtil: require('./lib/angular/AngularUtil'),
        NavigationChangeWatcher: require('./lib/angular/NavigationChangeWatcher')
    }
};