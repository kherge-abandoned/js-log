var attribute, date;

module(
    "Herrera.Log.Entry.Attribute",
    {
        setup: function () {
            "use strict";

            date = new Date();
            attribute = new Herrera.Log.Entry.Attribute("date", date);
        }
    }
);

test(
    "getName()",
    function () {
        "use strict";

        equal(attribute.getName(), "date", "The name is returned.");

        var nullable = new Herrera.Log.Entry.Attribute(undefined, 123);

        deepEqual(nullable.getName(), null, "The name is null.");
    }
);

test(
    "getValue()",
    function () {
        "use strict";

        deepEqual(attribute.getValue(), date, "The value is returned.");
    }
);

test(
    "toObject()",
    function () {
        "use strict";

        deepEqual(
            attribute.toObject(),
            {
                name: "date",
                value: date
            },
            "The object representation is returned."
        );
    }
);

test(
    "toString()",
    function () {
        "use strict";

        equal(
            attribute.toString(),
            "[date: " + date.toString() + "]",
            "The string representation is returned."
        );
    }
);
