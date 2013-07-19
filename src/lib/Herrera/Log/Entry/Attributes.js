(function (Herrera) {

    "use strict";

    /**
     * Manages a collection of attributes.
     *
     * @constructor
     */
    Herrera.Log.Entry.Attributes = function () {

        "use strict";

        /**
         * The collection of attributes.
         *
         * @type {Array<Herrera.Log.Entry.Attribute>}
         */
        var attributes = [];

        /**
         * Adds an existing attribute to the collection.
         *
         * @param {Herrera.Log.Entry.Attribute} attribute The attribute.
         *
         * @returns {Herrera.Log.Entry.Attributes} The manager.
         *
         * @throws TypeError If the attribute is not valid.
         */
        this.addExisting = function (attribute) {
            if ((typeof attributes !== "object")
                || !(attribute instanceof Herrera.Log.Entry.Attribute)) {
                throw new TypeError(
                    "Not an instance of Herrera.Log.Entry.Attribute"
                );
            }

            attributes.push(attribute);

            return this;
        };

        /**
         * Adds a new attribute to the collection.
         *
         * @param {String} [name] The name of the attribute.
         * @param {*}      value  The value of the attribute.
         *
         * @return {Herrera.Log.Entry.Attributes} The manager.
         */
        this.addNew = function (name, value) {
            attributes.push(new Herrera.Log.Entry.Attribute(name, value));

            return this;
        };

        /**
         * Returns the collection of attributes.
         *
         * @return {Array<Herrera.Log.Entry.Attribute>} The collection.
         */
        this.getCollection = function () {
            return attributes;
        };

        /**
         * Checks if the collection is empty.
         *
         * @returns {Boolean} TRUE if it is empty, FALSE if not.
         */
        this.isEmpty = function () {
            return (0 === attributes.length);
        };

        /**
         * Returns an array of object representations for the collection.
         *
         * @return {Array<Object>} The object representations.
         */
        this.toArray = function () {
            var array = [];

            for (var i = 0; i < attributes.length; i++) {
                array.push(attributes[i].toObject());
            }

            return array;
        };

        /**
         * Returns a string representation for the collection.
         *
         * @returns {String} The string representation.
         */
        this.toString = function () {
            var string = "";

            for (var i = 0; i < attributes.length; i++) {
                if (0 < i) {
                    string += " ";
                }

                string += attributes[i].toString();
            }

            return string;
        };

    };

})(typeof global === "undefined" ? window.Herrera : global.Herrera);
