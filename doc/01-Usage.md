Usage
=====

Setup
-----

To use the library, you must first set up your own log manager. This is achieved
by creating an instance of the `Herrera.Log` class. Since the library supports
both using a web browser and Node.js, I will demonstrate how you can do this
in both scenarios.

### Browser

```javascript
var manager = new Herrera.Log();
```

### Node.js

```javascript
// load the class
var Log = require("h-log").log;

var manager = new Log();
```

Logging
-------

The library supports a subset of the methods provided by the [`console`][]
object. These methods accept the same arguments the original methods do.

- `debug()` (an alias for `log()`)
- `error()`
- `info()`
- `log()`
- `warn()`

```javascript
manager.debug("Debug message");
manager.error("Error message");
manager.info("Informative message");
manager.log("Debug message");
manager.warn("Warning message");
```

Entry
-----

### Attributes

A feature provided by the library is the ability to add attributes to individual
log entries. An attribute consists of a string name (optional), and any type of
value. The attribute name can be re-used within the same log entry.

```javascript
manager
    .debug("Debug message")
    .attr("user", theUser)
    .attr("user", anotherUser)
    .attr("numbers", 123)
    .attr(null, "just a value"); // etc
```

### Finalizing

To finalize a log entry, you need to call `done()`.

```javascript
manager
    .debug("Debug message")
    .done();

manager
    .debug("Debug message")
    .attr("my", "attribute")
    .done();
```

Finalizing a log entry is useful if you need to make use of the end result.
By finalizing an entry, you freeze it, preventing any more attributes from
being added, and you alert the log manager of this event.

Events
------

The log manager provides two events that can be observed: **added** and
**done**. The added event is fired when a new log entry is added to the manager.
The **done** event is fired when a log entry is finalized using the `done()`
method. The managers for these events can be retrieved via thei respective
methods: `manager.added()` and `manager.done()`.

### Observing

To observe an event, you will need to add your observer function:

```javascript
var observer = function (entry, manager) {
    console.log("A log entry was added.");
};

manager
    .added()
    .add(observer);
```

As you may have noticed, the new log entry is passed as the first parameger,
and the log manager is passed as the second.

You also have the option of removing your observer from an event:

```javascript
manager
    .added()
    .remove(observer);
```

Note that if you added the same observer more than once, the `remove()` method
will only remove the earliest occurrence of the observer. To remove all of the
occurrences, you will need to pass `true` as the second argument:

```javascript
manager
    .added()
    .remove(observer, true);
```

### Why?

So why is there a simple event manager? By itself, the log manager is pretty
useless. It collects a bunch of entries, but then what? You can serialize the
log entries returned by the manager, but this is only useful to the person/
server receiving it.

The `console` object is one example.

```javascript
if (typeof console !== "undefined") {
    manager.done().add(
        function (entry) {
            console[entry.getType()].apply(
                console,
                [].concat(
                    entry.getValues(),
                    [entry.getAttributes().toArray()]
                )
            );
        }
    );
}
```

The example above will write the log entry to the console, once it has been
finalized. It will place nice with how the `console` object is implemented by
your browser (or Node.js), and will also added the entry's list of attributes
to the end. You can see this in action by loading Chrome or Firefox, and then
opening the `doc/example.html` file.

> You may need to clone the project first before opening the example file.
> While you do not need to compile anything to run the example, it does not
> play nice with how GitHub hosts files.

[`console`]: https://developer.mozilla.org/en-US/docs/Web/API/console
