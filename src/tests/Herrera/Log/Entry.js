var entry, log;

module(
    "Herrera.Log.Entry",
    {
        setup: function () {
            "use strict";

            log = new Herrera.Log();
            entry = new Herrera.Log.Entry("log", ["test", 123], log);
        }
    }
);

test(
    "attr()",
    function () {
        "use strict";

        var finalizedEntry = new Herrera.Log.Entry("log", ["test", 123]);

        finalizedEntry.done();

        raises(
            function () {
                finalizedEntry.attr(null, 123);
            },
            Error,
            "Prevents a new attribute from being added after done()."
        );

        deepEqual(
            entry.attr("a", 123),
            entry,
            "The entry is returned."
        );

        var attributes = entry.getAttributes().getCollection();

        deepEqual(
            attributes[0].toObject(),
            {
                name: "a",
                value: 123
            },
            "The attribute is added."
        );
    }
);

test(
    "done()",
    function () {
        "use strict";

        var called = 0;

        log.done().add(
            function (input) {
                if (input instanceof Herrera.Log.Entry) {
                    called++;
                }
            }
        );

        entry.done();
        entry.done(); // should do nothing

        equal(called, 1, "The log's \"done\" event is triggered.");

        deepEqual(entry.isDone(), true, "The entry is finalized.");
    }
);

test(
    "getAttributes()",
    function () {
        "use strict";

        ok(
            entry.getAttributes() instanceof Herrera.Log.Entry.Attributes,
            "The attributes manager is returned."
        );
    }
);

test(
    "getLog()",
    function () {
        "use strict";

        var noLogEntry = new Herrera.Log.Entry("log", ["test", 123]);

        deepEqual(noLogEntry.getLog(), null, "The log manager is not set.");

        deepEqual(entry.getLog(), log, "The log manager is returned.");
    }
);

test(
    "getTime()",
    function () {
        "use strict";

        ok(entry.getTime() instanceof Date, "The time is returned.");
    }
);

test(
    "getType()",
    function () {
        "use strict";

        equal(entry.getType(), "log", "The type is returned.");
    }
);

test(
    "getValues()",
    function () {
        "use strict";

        deepEqual(
            entry.getValues(),
            ["test", 123],
            "The values are returned."
        );
    }
);

test(
    "isDone()",
    function () {
        "use strict";

        deepEqual(entry.isDone(), false, "The entry is not finalized.");

        entry.done();

        deepEqual(entry.isDone(), true, "The entry is finalized.");
    }
);

test(
    "toObject()",
    function () {
        "use strict";

        var attribute = new Herrera.Log.Entry.Attribute(null, 123);

        entry.getAttributes().addExisting(attribute);

        deepEqual(
            entry.toObject(),
            {
                attributes: [attribute.toObject()],
                time: entry.getTime(),
                type: "log",
                values: ["test", 123]
            },
            "The object representation is returned."
        );
    }
);

test(
    "toString()",
    function () {
        "use strict";

        entry.attr("abc", 123);

        equal(
            entry.toString(),
            "[" + entry.getTime().toUTCString() + "] [log] [abc: 123] test, 123",
            "The string representation is returned."
        );
    }
);
