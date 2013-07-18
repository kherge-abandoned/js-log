var attributes;

module(
    "Herrera.Log.Entry.Attributes",
    {
        setup: function () {
            "use strict";

            attributes = new Herrera.Log.Entry.Attributes();
        }
    }
);

test(
    "addExisting()",
    function () {
        "use strict";

        raises(
            function () {
                attributes.addExisting(123);
            },
            TypeError,
            "Prevents non-object values from being added."
        );

        raises(
            function () {
                attributes.addExisting(new Date());
            },
            TypeError,
            "Prevents non-Herrera.Log.Entry.Attribute objects from being added."
        );

        var a = new Herrera.Log.Entry.Attribute(null, "a");
        var b = new Herrera.Log.Entry.Attribute(null, "b");

        deepEqual(
            attributes.addExisting(a),
            attributes,
            "The manager is returned."
        );

        attributes.addExisting(b);

        deepEqual(
            attributes.getCollection(),
            [a, b],
            "The existing attributes are added."
        );
    }
);

test(
    "addNew()",
    function () {
        "use strict";

        deepEqual(
            attributes.addNew("a", 123),
            attributes,
            "The manager is returned."
        );

        attributes.addNew("b", 456);

        ok(
            (function () {
                var collection = attributes.getCollection();

                if ("a" === collection[0].getName()) {
                    if (123 === collection[0].getValue()) {
                        if ("b" === collection[1].getName()) {
                            if (456 === collection[1].getValue()) {
                                return true;
                            }
                        }
                    }
                }

                return false;
            })(),
            "The new attributes are added."
        );
    }
);

test(
    "getCollection()",
    function () {
        "use strict";

        var a = new Herrera.Log.Entry.Attribute(null, "a");
        var b = new Herrera.Log.Entry.Attribute(null, "b");

        attributes
            .addExisting(a)
            .addExisting(b);

        deepEqual(
            attributes.getCollection(),
            [a, b],
            "The collection is returned."
        );
    }
);

test(
    "isEmpty()",
    function () {
        "use strict";

        deepEqual(attributes.isEmpty(), true, "The collection is empty.");

        attributes.addNew(null, 123);

        deepEqual(attributes.isEmpty(), false, "The collection is not empty.");
    }
);

test(
    "toArray()",
    function () {
        "use strict";

        var a = new Herrera.Log.Entry.Attribute(null, "a");
        var b = new Herrera.Log.Entry.Attribute(null, "b");

        attributes
            .addExisting(a)
            .addExisting(b);

        deepEqual(
            attributes.toArray(),
            [
                a.toObject(),
                b.toObject()
            ],
            "The array of object representations is returned."
        );
    }
);

test(
    "toString()",
    function () {
        "use strict";

        var a = new Herrera.Log.Entry.Attribute(null, "a");
        var b = new Herrera.Log.Entry.Attribute(null, "b");

        attributes
            .addExisting(a)
            .addExisting(b);

        equal(
            attributes.toString(),
            "[a] [b]",
            "The string representation is returned."
        );
    }
);
