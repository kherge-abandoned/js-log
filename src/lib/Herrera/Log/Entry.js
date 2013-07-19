(function (Herrera) {

    "use strict";

    /**
     * Manages an individual log entry and its attributes.
     *
     * To finalize a log entry, the done() method must be called. This will
     * allow the log manager to trigger the "done" event, which will update
     * all registered observers. Note that once done, new attributes cannot
     * be added to the entry.
     *
     * @param {String}      type   The type of the entry.
     * @param {Array<*>}    values The values for the entry.
     * @param {Herrera.Log} [log]  The log manager.
     *
     * @constructor
     */
    Herrera.Log.Entry = function (type, values, log) {

        // default to null.
        if (!log || (log === undefined)) {
            log = null;
        }

        /**
         * The attributes manager.
         *
         * @type {Herrera.Log.Entry.Attributes}
         */
        var attributes = new Herrera.Log.Entry.Attributes();

        /**
         * The done state of the entry.
         *
         * @type {Boolean}
         */
        var done = false;

        /**
         * The time the entry was created.
         *
         * @type {Date}
         */
        var time = new Date();

        /**
         * Adds an attribute to the entry.
         *
         * @param {String} [name] The name of the attribute.
         * @param {*}      value  The value of the attribute.
         *
         * @return {Herrera.Log.Entry} The entry.
         *
         * @throws Error If the entry is frozen.
         */
        this.attr = function (name, value) {
            if (done) {
                throw new Error("The entry is finalized.");
            }

            attributes.addNew(name, value);

            return this;
        };

        /**
         * Finishes the log entry.
         */
        this.done = function () {
            if (!done) {
                done = true;

                if (log) {
                    log.doDone(this);
                }
            }
        };

        /**
         * Returns the attributes manager.
         *
         * @returns {Herrera.Log.Entry.Attributes} The manager.
         */
        this.getAttributes = function () {
            return attributes;
        };

        /**
         * Returns the log manager set for the entry.
         *
         * @returns {Herrera.Log} The manager.
         */
        this.getLog = function () {
            return log;
        };

        /**
         * Returns the time the entry was created.
         *
         * @returns {Date} The time.
         */
        this.getTime = function () {
            return time;
        };

        /**
         * Returns the type of the entry.
         *
         * @return {String} The type.
         */
        this.getType = function () {
            return type;
        };

        /**
         * Returns the values for the entry.
         *
         * @return {Array<*>} The values.
         */
        this.getValues = function () {
            return values;
        };

        /**
         * Checks if the log entry has been finalized.
         *
         * @returns {Boolean}
         */
        this.isDone = function () {
            return done;
        };

        /**
         * Returns the object representation for the entry.
         *
         * @return {Object} The object representation.
         */
        this.toObject = function () {
            return {
                attributes: attributes.toArray(),
                time: new Date(time.getTime()),
                type: type,
                values: values.slice(0)
            };
        };

        /**
         * Returns the string representation for the entry.
         *
         * @return {String} The string representation.
         */
        this.toString = function () {
            var string = "[" + time.toUTCString() + "] [" + type + "]";

            if (!attributes.isEmpty()) {
                string += " " + attributes.toString();
            }

            for (var i = 0; i < values.length; i++) {
                if (0 < i) {
                    string += ",";
                }

                string += " ";

                if (typeof values[i] === "string") {
                    string += values[i];
                } else if (typeof values[i].toString !== "undefined") {
                    string += values[i].toString();
                } else {
                    string += "(unsupported value)";
                }
            }

            return string;
        };

    };

})(typeof global === "undefined" ? window.Herrera : global.Herrera);
