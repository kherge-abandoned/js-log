/**
 * Manages an individual, immutable attribute.
 *
 * @param {String} [name] The name of the attribute.
 * @param {*}      value  The value of the attribute.
 *
 * @constructor
 */
Herrera.Log.Entry.Attribute = function (name, value) {

    "use strict";

    // set default value
    if (!name || name === undefined) {
        name = null;
    }

    /**
     * Returns the name of the attribute.
     *
     * @return {String} The name.
     */
    this.getName = function () {
        return name;
    };

    /**
     * Returns the value of the attribute.
     *
     * @return {*} The value.
     */
    this.getValue = function () {
        return value;
    };

    /**
     * Returns the object representation for the attribute.
     *
     * @return {Object} The object representation.
     */
    this.toObject = function () {
        return {
            name: name,
            value: value
        };
    };

    /**
     * Returns the string representation for the attribute.
     *
     * @return {String} The string representation.
     */
    this.toString = function () {
        var string = "[";

        if (name) {
            string += name +": ";
        }

        if (typeof value === "string") {
            string += value;
        } else if (typeof value.toString !== "undefined") {
            string += value.toString();
        } else {
            string += "(unsupported value)";
        }

        string += "]";

        return string;
    };

};
