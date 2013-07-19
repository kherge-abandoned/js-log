Usage
=====

Node.js
-------

To begin using Log in your Node.js project, you will first need to create
your own manager.

```javascript
var log = require("log").log;
```

Browser
-------

To begin using Log in your browser, you will first need to create your own
manager.

```javascript
var log = new Herrera.Log();
```

Common
------

This part of the usage guide covers both Node.js and browser usage.

### Manager Methods

This manager will allow you to create and retrieve log entries. Like most
browsers' `console` object, you will have access to the following methods:

- `debug()` (alias for `log()`)
- `error()`
- `info()`
- `log()`
- `warn()`

### Observing Log Entries

These methods accept the same arguments as their `console` counterparts. Note
however, unlike console, these are simply stored within the log manager. They
are not written to the console. Fortunately, there is a way to integrate your
browser's console if necessary:

```javascript
if (typeof console !== "undefined") {
    log.onDone(
        function (entry) {
            if (typeof console[entry.getType()] !== "undefined") {
                console[entry.getType()].apply(console, entry.getValues());
            }
        }
    );
}
```

The log manager controls a very simple event known as "done". This even is
triggered when the method `done()` is called on a log entry returned by your
log manager.

```javascript
log.debug("My debug message.").done();
```

The `done()` method is available due to a feature provided by the library. Each
entry you create can have its own collection of attributes. You can add as many
as you need, and even re-use an attribute's name. The value of the attribute can
be anything you need.

```javascript
log
    .debug("My debug message.")
    .attr("some", "attribute")
    .attr("numbers", 123)
    .attr("user", userObject)
    .done();
```

Since there is no way to detect the end of a chain of calls, the `done()`
method was made available. It notifies the log manager that the log entry is
finalized. Note that once the `done()` method is called, you may not add any
more attributes to the entry.

```javascript
var entry = log.debug("My sneaky attempt.");

entry.attr("some", "attribute");
entry.done();
entry.attr("another", "attribute"); // throws Error
```

### Retrieving Log Entries

There are three ways you can retrieve log entries.

- `log.getCollection()` will return an array of `Herrera.Log.Entry` instances.
  Each instance represents a single log entry and its attributes.
- `log.toArray()` will return an array of object representations. Each object
  in the array represents a single log entry and its attributes.
- `log.toString()` will return a string representation of all the log entries
  in the log manager.
