(function (Herrera) {

    "use strict";

    /**
     * Manages an individual event and its collection of observers.
     *
     * @constructor
     */
    Herrera.Log.Event = function () {

        /**
         * The collection of observers.
         *
         * @type {Array<Function>}
         */
        var observers = [];

        /**
         * Adds an observer to the event.
         *
         * Note that you can add the same observer more than once.
         *
         * @param {Function} observer The observer.
         *
         * @return {Herrera.Log.Event} The manager.
         *
         * @throws TypeError If the observer is not a function.
         */
        this.add = function (observer) {
            if (typeof observer !== "function") {
                throw new TypeError("The observer must be a function.");
            }

            observers.push(observer);

            return this;
        };

        /**
         * Returns the collection of observers.
         *
         * @return {Array<Function>} The collection.
         */
        this.getCollection = function () {
            return observers;
        };

        /**
         * Notifies the observers of an event update.
         *
         * @param {...*} arg An argument to pass on.
         */
        this.notify = function () {
            for (var i = 0; i < observers.length; i++) {
                if (false === observers[i].apply(null, arguments)) {
                    break;
                }
            }
        };

        /**
         * Removes an observer from the event.
         *
         * By default, only the first occurrence of the observer will be
         * removed. If `all` is set to `true`, then all occurrences of the
         * observer will be removed.
         *
         * @param {Function} observer The observer.
         * @param {Boolean}  [all]    Remove all occurrences?
         *
         * @return {Herrera.Log.Event} The manager.
         *
         * @throws TypeError If the observer is not a function.
         */
        this.remove = function (observer, all) {
            if (typeof observer !== "function") {
                throw new TypeError("The observer must be a function.");
            }

            if (!all || all === undefined) {
                all = false;
            }

            var i;

            while (-1 !== (i = observers.indexOf(observer))) {
                observers.splice(i, 1);

                if (!all) {
                    break;
                }
            }

            return this;
        };

    };

})(typeof global === "undefined" ? window.Herrera : global.Herrera);
