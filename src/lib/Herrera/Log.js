(function (Herrera) {

    "use strict";

    /**
     * Manages a collection of log entries.
     *
     * The log manager creates `console` compatible log entries, and stores them
     * for later rendering and/or serialization. The manager also serves as a very
     * simple event manager. The only event available is the "done" event. This
     * event is triggered whenever a log entry created by this manager is finished.
     *
     * @constructor
     */
    Herrera.Log = function () {

        /**
         * The "added" event.
         *
         * @type {Herrera.Log.Event}
         */
        var added = new Herrera.Log.Event();

        /**
         * The collection of entries.
         *
         * @type {Array<Herrera.Log.Entry>}
         */
        var entries = [];

        /**
         * The "done" event.
         *
         * @type {Herrera.Log.Event}
         */
        var done = new Herrera.Log.Event();

        /**
         * Self reference for private methods.
         *
         * @type {Herrera.Log}
         */
        var that = this;

        /**
         * Adds a new entry to the collection.
         *
         * @param {String}   type   The type of the entry.
         * @param {Array<*>} values The values for the entry.
         *
         * @return {Herrera.Log.Entry} The new entry.
         */
        var add = function (type, values) {
            var entry = new Herrera.Log.Entry(
                type,
                Array.prototype.slice.call(values, 0),
                that
            );

            entries.push(entry);

            added.notify(entry, that);

            return entry;
        };

        /**
         * Returns the "added" event.
         *
         * @returns {Herrera.Log.Event} The event.
         */
        this.added = function () {
            return added;
        };

        /**
         * @see Herrera.Log.log
         */
        this.debug = function () {
            return this.log.apply(this, arguments);
        };

        /**
         * Returns the "done" event.
         *
         * @param {Herrera.Log.Event} The event.
         */
        this.done = function () {
            return done;
        };

        /**
         * Returns a new "error" entry.
         *
         * @see console.error
         *
         * @return {Herrera.Log.Entry}
         */
        this.error = function () {
            return add("error", arguments);
        };

        /**
         * Returns the collection of entries.
         *
         * @returns {Array<Herrera.Log.Entry>} The collection.
         */
        this.getCollection = function () {
            return entries;
        };

        /**
         * Returns a new "info" entry.
         *
         * @see console.info
         *
         * @return {Herrera.Log.Entry}
         */
        this.info = function () {
            return add("info", arguments);
        };

        /**
         * Returns a new "log" entry.
         *
         * @see console.log
         *
         * @return {Herrera.Log.Entry}
         */
        this.log = function () {
            return add("log", arguments);
        };

        /**
         * Returns an array of object representations for the collection.
         *
         * @returns {Array<Object>} The object representations.
         */
        this.toArray = function () {
            var array = [];

            for (var i = 0; i < entries.length; i++) {
                array.push(entries[i].toObject());
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

            for (var i = 0; i < entries.length; i++) {
                if (0 < i) {
                    string += "\n";
                }

                string += entries[i].toString();
            }

            return string;
        };

        /**
         * Returns a new "warn" entry.
         *
         * @see console.warn
         *
         * @return {Herrera.Log.Entry}
         */
        this.warn = function () {
            return add("warn", arguments);
        };

    };

})(typeof global === "undefined" ? window.Herrera : global.Herrera);
