var added, log;

module(
    "Herrera.Log",
    {
        setup: function () {
            "use strict";

            added = 0;
            log = new Herrera.Log();

            log.added().add(
                function (entry, manager) {
                    if (entry instanceof Herrera.Log.Entry) {
                        if (manager instanceof Herrera.Log) {
                            added++;
                        }
                    }
                }
            );
        }
    }
);

test(
    "added()",
    function () {
        "use strict";

        ok(log.added() instanceof Herrera.Log.Event, "The event is returned.");
    }
);

test(
    "debug()",
    function () {
        "use strict";

        var result = log.debug("test", 123);

        ok(result instanceof Herrera.Log.Entry, "The log entry is returned.");

        equal(result.getType(), "log", "The proper type is set.");

        deepEqual(
            result.getValues(),
            ["test", 123],
            "The proper values are set."
        );

        deepEqual(result.getLog(), log, "The log manager is set.");

        equal(added, 1, "The \"added\" event is triggered.");
    }
);

test(
    "done()",
    function () {
        "use strict";

        ok(log.done() instanceof Herrera.Log.Event, "The event is returned.");
    }
);

test(
    "error()",
    function () {
        "use strict";

        var result = log.error("test", 123);

        ok(result instanceof Herrera.Log.Entry, "The log entry is returned.");

        equal(result.getType(), "error", "The proper type is set.");

        deepEqual(
            result.getValues(),
            ["test", 123],
            "The proper values are set."
        );

        deepEqual(result.getLog(), log, "The log manager is set.");

        equal(added, 1, "The \"added\" event is triggered.");
    }
);

test(
    "getCollection()",
    function () {
        "use strict";

        deepEqual(log.getCollection(), [], "The collection is empty.");

        var a = log.debug("debug");
        var b = log.error("error");

        deepEqual(
            log.getCollection(),
            [a, b],
            "The collection is returned."
        );
    }
);

test(
    "info()",
    function () {
        "use strict";

        var result = log.info("test", 123);

        ok(result instanceof Herrera.Log.Entry, "The log entry is returned.");

        equal(result.getType(), "info", "The proper type is set.");

        deepEqual(
            result.getValues(),
            ["test", 123],
            "The proper values are set."
        );

        deepEqual(result.getLog(), log, "The log manager is set.");

        equal(added, 1, "The \"added\" event is triggered.");
    }
);

test(
    "log()",
    function () {
        "use strict";

        var result = log.error("test", 123);

        ok(result instanceof Herrera.Log.Entry, "The log entry is returned.");

        equal(result.getType(), "error", "The proper type is set.");

        deepEqual(
            result.getValues(),
            ["test", 123],
            "The proper values are set."
        );

        deepEqual(result.getLog(), log, "The log manager is set.");

        equal(added, 1, "The \"added\" event is triggered.");
    }
);

test(
    "toArray()",
    function () {
        "use strict";

        var a = log.debug("debug");
        var b = log.error("error");
        var c = log.info("info");
        var d = log.log("log");

        deepEqual(
            log.toArray(),
            [
                a.toObject(),
                b.toObject(),
                c.toObject(),
                d.toObject()
            ],
            "The array of object representations is returned."
        );
    }
);

test(
    "toString()",
    function () {
        "use strict";

        var a = log.debug("debug");
        var b = log.error("error");
        var c = log.info("info");
        var d = log.log("log");

        equal(
            log.toString(),
            a.toString() + "\n" +
            b.toString() + "\n" +
            c.toString() + "\n" +
            d.toString(),
            "The string representation is returned."
        );
    }
);

test(
    "warn()",
    function () {
        "use strict";

        var result = log.warn("test", 123);

        ok(result instanceof Herrera.Log.Entry, "The log entry is returned.");

        equal(result.getType(), "warn", "The proper type is set.");

        deepEqual(
            result.getValues(),
            ["test", 123],
            "The proper values are set."
        );

        deepEqual(result.getLog(), log, "The log manager is set.");

        equal(added, 1, "The \"added\" event is triggered.");
    }
);
