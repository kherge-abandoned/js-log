module("Herrera");

test(
    "namespace",
    function () {
        "use strict";

        deepEqual({Log: Herrera.Log}, Herrera, "The namespace is available.");
    }
);
