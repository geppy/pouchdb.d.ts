// Type definitions for pouchdb-adapter-localstorage v5.4.4
// Project: https://pouchdb.com/
// Definitions by: Andy Brown <https://github.com/AGBrown>, Brian Geppert <https://github.com/geppy>, Frederico Galvão <https://github.com/fredgalvao>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference path="../pouchdb-core/pouchdb-core.d.ts" />

declare namespace PouchDB {
    namespace LocalStorageAdapter {
        interface LocalStorageAdapterConfiguration extends Configuration.LocalDatabaseConfiguration {
            adapter: 'localstorage';
        }
    }

    interface Static {
        new<Content>(name?: string, options?: LocalStorageAdapter.LocalStorageAdapterConfiguration): Database<Content>;
        new(name?: string, options?: LocalStorageAdapter.LocalStorageAdapterConfiguration): Database<any>;
    }
}

declare module 'pouchdb-adapter-localstorage' {
    const plugin: PouchDB.Plugin;
    export = plugin;
}
