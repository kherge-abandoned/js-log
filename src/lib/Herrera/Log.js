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
         * The collection of entries.
         *
         * @type {Array<Herrera.Log.Entry>}
         */
        var entries = [];

        /**
         * The event observers.
         *
         * @type {Array<Function>}
         */
        var observers = [];

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

            return entry;
        };

        /**
         * @see Herrera.Log.log
         */
        this.debug = function () {
            return this.log.apply(this, arguments);
        };

        /**
         * Triggers the "done" event.
         *
         * @param {Herrera.Log.Entry} entry The entry.
         *
         * @throws TypeError If the argument is not a valid entry.
         */
        this.doDone = function (entry) {
            if ((typeof entry !== "object")
                || !(entry instanceof Herrera.Log.Entry)) {
                throw new TypeError("Not an instance of Herrera.Log.Entry.");
            }

            for (var i = 0; i < observers.length; i++) {
                observers[i](entry, this);
            }
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
         * Returns the registered "done" observers.
         *
         * Note that the list of registered observers may include multiple
         * instances of the same observer. This is indicates that the same
         * observer was registered more than once.
         *
         * @returns {Array<Function>}
         */
        this.getDoneObservers = function () {
            return observers;
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
         * Removes  the "done" observer callback.
         *
         * By default, only a single occurrence of a callback (that has been
         * registered multiple times) will be removed. If `all` is set to true,
         * all occurrences of the same observer will be removed.
         *
         * @param {Function} callback The observer callback.
         * @param {Boolean}  [all]    Remove all occurrences?
         *
         * @returns {Herrera.Log} The manager.
         *
         * @throws TypeError If the callback is not a function.
         */
        this.offDone = function (callback, all) {
            if (typeof callback !== "function") {
                throw new TypeError("The callback must be a function.");
            }

            var i;

            while (-1 !== (i = observers.indexOf(callback))) {
                observers.splice(i, 1);

                if (!all || all === undefined) {
                    break;
                }
            }

            return this;
        };

        /**
         * Adds an observer callback to the "done" event.
         *
         * Note that the same observer can be added more than once.
         *
         * @param {Function} callback The observer callback.
         *
         * @returns {Herrera.Log} The manager.
         *
         * @throws TypeError If the callback is not a function.
         */
        this.onDone = function (callback) {
            if (typeof callback !== "function") {
                throw new TypeError("The callback must be a function.");
            }

            observers.push(callback);

            return this;
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
