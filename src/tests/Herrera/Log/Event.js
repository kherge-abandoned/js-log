var event, observer, counter;

module(
    "Herrera.Log.Event",
    {
        setup: function () {
            "use strict";

            counter = 0;
            event = new Herrera.Log.Event();
            observer = function (arg1, arg2) {
                if ((123 === arg1) && ("test" === arg2)) {
                    counter++;
                }
            };
        }
    }
);

test(
    "add()",
    function () {
        "use strict";

        deepEqual(event.add(observer), event, "The manager is returned.");

        event
            .add(observer)
            .add(observer);

        deepEqual(
            event.getCollection(),
            [observer, observer, observer],
            "The observers are added."
        );

        raises(
            function () {
                event.add(123);
            },
            TypeError,
            "Prevents non-functions from being added."
        );
    }
);

test(
    "getCollection()",
    function () {
        "use strict";

        event
            .add(observer)
            .add(observer);

        deepEqual(
            event.getCollection(),
            [observer, observer],
            "The observers are returned."
        );
    }
);

test(
    "notify()",
    function () {
        "use strict";

        event.add(observer).notify(123, "test");

        equal(counter, 1, "The observers are called with all arguments.");

        event.add(
            function () {
                return false;
            }
        );

        event.add(observer).notify(123, "test");

        equal(counter, 2, "The observers can interrupt the event.");
    }
);

test(
    "remove()",
    function () {
        "use strict";

        var another = function () {};

        event
            .add(observer)
            .add(another)
            .add(observer)
            .add(observer);

        deepEqual(event.remove(observer), event, "The manager is returned.");

        deepEqual(
            event.getCollection(),
            [another, observer, observer],
            "A single occurrence of an observer is removed."
        );

        event.remove(observer, true);

        deepEqual(
            event.getCollection(),
            [another],
            "All occurrences of the observer is removed."
        );

        raises(
            function () {
                event.remove(123);
            },
            TypeError,
            "Prevents non-functions from being removed."
        );
    }
);
