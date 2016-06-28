// Type definitions for pouchdb-adapter-websql v5.4.4
// Project: https://pouchdb.com/
// Definitions by: Andy Brown <https://github.com/AGBrown>, Brian Geppert <https://github.com/geppy>, Frederico Galvão <https://github.com/fredgalvao>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference path="../pouchdb-core/pouchdb-core.d.ts" />

declare namespace PouchDB {
    namespace Core {
        interface DatabaseInfo {
            sqlite_plugin?: boolean;
            websql_encoding?: 'UTF-8' | 'UTF-16';
        }
    }

    namespace AdapterWebSql {
        interface Configuration extends Configuration.LocalDatabaseConfiguration {
            /**
             * Amount in MB to request for storage.
             */
            size?: number;
            adapter: 'websql';
        }
    }

    interface Static {
        new<Content>(name?: string, options?: AdapterWebSql.Configuration): Database<Content>;
        new(name?: string, options?: AdapterWebSql.Configuration): Database<any>;
    }
}

declare module 'pouchdb-adapter-websql' {
    const plugin: PouchDB.Plugin;
    export = plugin;
}
