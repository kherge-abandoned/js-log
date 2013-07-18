var log;

module(
    "Herrera.Log",
    {
        setup: function () {
            "use strict";

            log = new Herrera.Log();
        }
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
    }
);

test(
    "doDone()",
    function () {
        "use strict";

        raises(
            function () {
                log.doDone(123);
            },
            TypeError,
            "Prevents non-object values from being used."
        );

        raises(
            function () {
                log.doDone(new Date());
            },
            TypeError,
            "Prevents non-Herrera.Log.Entry objects from being used."
        );

        var called = 0;
        var observer = function () { called++; };

        log
            .onDone(observer)
            .onDone(observer)
            .onDone(observer)
            .debug("test")
            .done();

        equal(called, 3, "The registered observers are called.");
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
    "getDoneObservers()",
    function () {
        "use strict";

        var a = function () { return 123; };
        var b = function () { return 456; };

        log
            .onDone(a)
            .onDone(b)
            .onDone(a);

        deepEqual(
            log.getDoneObservers(),
            [a, b, a],
            "The \"done\" observers are returned."
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
    }
);

test(
    "offDone()",
    function () {
        "use strict";

        raises(
            function () {
                log.offDone(123);
            },
            TypeError,
            "Prevents non-function values from being used."
        );

        var a = function () { return 123; };
        var b = function () { return 456; };

        log
            .onDone(a)
            .onDone(b)
            .onDone(a)
            .onDone(b);

        deepEqual(
            log.offDone(b),
            log,
            "The manager is returned."
        );

        deepEqual(
            log.getDoneObservers(),
            [a, a, b],
            "Only one occurrence of the same observer is removed."
        );

        log.offDone(a, true);

        deepEqual(
            log.getDoneObservers(),
            [b],
            "All occurrences of the same observer is removed."
        );
    }
);

test(
    "onDone()",
    function () {
        "use strict";

        raises(
            function () {
                log.onDone(123);
            },
            TypeError,
            "Prevents non-function values from being used."
        );

        var a = function () { return 123; };
        var b = function () { return 456; };

        deepEqual(
            log.onDone(a),
            log,
            "The manager is returned."
        );

        log
            .onDone(b)
            .onDone(a);

        deepEqual(
            log.getDoneObservers(),
            [a, b, a],
            "The observers are added (single and multiple occurrence)."
        );
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
    }
);
