// Type definitions for pouchdb-core v5.4.4
// Project: https://pouchdb.com/
// Definitions by: Andy Brown <https://github.com/AGBrown>, Brian Geppert <https://github.com/geppy>, Frederico Galvão <https://github.com/fredgalvao>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare namespace PouchDB {
    namespace Core {
        interface Callback<E, R> {
            (error: E | void, result: R | void): void;
        }
        type AnyCallback = Callback<any, any>;
        type DocumentId = string;
        type RevisionId = string;
        type Availability = 'available' | 'compacted' | 'not compacted' | 'missing';

        interface Options {
          ajax?: Configuration.RemoteRequesterConfiguration;
        }
        interface DatabaseInfo {
        }

        interface Revision<Content> {
            ok: Document<Content> & RevisionIdMeta;
        }
        interface RevisionInfo {
            rev: RevisionId;
            status: Availability;
        }

        interface IdMeta {
            _id: DocumentId;
        }
        interface RevisionIdMeta {
            _rev: RevisionId;
        }
        interface GetMeta {
            /** Conflicting leaf revisions.
             *
             * Only present if `GetOptions.conflicts` is `true`
             */
            _conflicts?: RevisionId[];
            _rev?: RevisionId;
            /** Only present if `GetOptions.revs` is `true` */
            _revs_info?: RevisionInfo[];
            /** Only present if `GetOptions.revs_info` is `true` */
            _revisions?: {
                ids: RevisionId[];
                start: number;
            }
        }
        type NewDocument<Content> = Content;
        type Document<Content> = Content & IdMeta;

        interface DestroyOptions extends Options {
        }

        interface GetOptions extends Options {
            /** Include list of conflicting leaf revisions. */
            conflicts?: boolean;
            /** Specific revision to fetch */
            rev?: RevisionId;
            /** Include revision history of the document. */
            revs?: boolean;
            /** Include a list of revisions of the document, and their
             * availability. */
            revs_info?: boolean;
        }
        interface GetOpenRevisions extends Options {
            /** Fetch all leaf revisions if open_revs="all" or fetch all leaf
             * revisions specified in open_revs array. Leaves will be returned
             * in the same order as specified in input array. */
            open_revs: 'all' | Core.RevisionId[];
        }

        interface InfoOptions extends Options {
        }
    }

    /**
     * Pass this to `PouchDB.plugin()`.
     */
    export type Plugin = 'This should be passed to PouchDB.plugin()';

    namespace Configuration {
        interface CommonDatabaseConfiguration {
            /**
             * Database name.
             */
            name?: string;
            /**
             * Database adapter to use.
             *
             * If unspecified, PouchDB will infer this automatically, preferring
             * IndexedDB to WebSQL in browsers that support both (i.e. Chrome,
             * Opera and Android 4.4+).
             */
            adapter?: string;
        }

        interface LocalDatabaseConfiguration extends CommonDatabaseConfiguration {
            /**
             * Enables auto compaction, which means compact() is called after
             * every change to the database.
             *
             * Defaults to false.
             */
            auto_compaction?: boolean;
            /**
             * How many old revisions we keep track (not a copy) of.
             */
            revs_limit?: number;
        }

        interface RemoteRequesterConfiguration {
            /**
             * Time before HTTP requests time out (in ms).
             */
            timeout?: number;
            /**
             * Appends a random string to the end of all HTTP GET requests to avoid
             * them being cached on IE. Set this to true to prevent this happening.
             */
            cache?: boolean;
            /**
             * HTTP headers to add to requests.
             */
            headers?: {
                [name: string]: string;
            }
            username?: string;
            password?: string;
            /**
             * Enables transferring cookies and HTTP Authorization information.
             *
             * Defaults to true.
             */
            withCredentials?: boolean;
            /**
             * Disables automatic creation of databases.
             */
            skip_setup?: boolean;
        }

        interface RemoteDatabaseConfiguration extends CommonDatabaseConfiguration {
            ajax?: RemoteRequesterConfiguration;
        }

        type DatabaseConfiguration = LocalDatabaseConfiguration | RemoteDatabaseConfiguration;
    }



    interface Static {
        plugin(plugin: Plugin): Static;

        new<Content>(name: string, options?: Configuration.DatabaseConfiguration): Database<Content>;
        new(name: string, options?: Configuration.DatabaseConfiguration): Database<any>;
    }

    interface Database<Content>  {
        /** Fetch a document */
        get(docId: Core.DocumentId, options: Core.GetOpenRevisions): Promise<Core.Revision<Content>[]>;
        get(docId: Core.DocumentId, options: Core.GetOpenRevisions, callback: Core.Callback<any, Core.Revision<Content>[]>): void;
        get(docId: Core.DocumentId, options: Core.GetOptions): Promise<Core.Document<Content> & Core.GetMeta>;
        get(docId: Core.DocumentId, options: Core.GetOptions, callback: Core.Callback<any, Core.Document<Content> & Core.GetMeta>): void;
        get(docId: Core.DocumentId, options: void, callback: Core.Callback<any, Core.Document<Content>>): void;
        get(docId: Core.DocumentId): Promise<Core.Document<Content>>;

        /** Destroy the database */
        destroy(options: Core.DestroyOptions | void, callback: Core.AnyCallback): void;
        destroy(options?: Core.DestroyOptions | void): Promise<void>;

        /** Get database information */
        info(options: Core.InfoOptions | void, callback: Core.Callback<any, Core.DatabaseInfo>): void;
        info(options?: Core.InfoOptions): Promise<Core.DatabaseInfo>;
    }
}

declare module 'pouchdb-core' {
  const PouchDb: PouchDB.Static;
  export = PouchDb;
}

declare var PouchDB: PouchDB.Static;
