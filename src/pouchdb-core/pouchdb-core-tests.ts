/// <reference path="./pouchdb-core.d.ts" />

function isString(someString: string) {
}
function isNumber(someNumber: number) {
}

function testAllDocs() {
    const db = new PouchDB<{ foo: number }>();

    db.allDocs().then(({ offset, total_rows, rows }) => {
        isNumber(offset);
        isNumber(total_rows);

        rows.forEach(({ id, key, value, doc }) => {
            isString(id);
            isString(key);
            isString(value.rev);

            // check document property
            isNumber(doc.foo);
        })
    });

    db.allDocs({ startkey: "a", endkey: "b" });
    db.allDocs({ startkey: "a", endkey: "b", inclusive_end: true });
    db.allDocs({ keys: ["a", "b", "c" ]});
    db.allDocs({ key: "a" });
    db.allDocs({
        attachments: true,
        binary: true,
        conflicts: true,
        descending: true,
        include_docs: true,
        limit: 5,
        skip: 1
    });
}
