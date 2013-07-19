Log
===

[![Build Status][]](https://travis-ci.org/herrera-io/js-log)

Log is a simple log manager designed to be used either with a browser (or
Node.js) console, or as a drop in alternative. The basic methods (debug, error,
info, log, warn) can all be used the same way, and can be either serialized and
sent somewhere, or dumped to the browser console.

```javascript
// browser
var log = new Herrera.Log();

// node
var log = require("h-log").log;
    log = new log();

log.done().add(
    function (entry) {
        // for pretty browser objects in console
        console[entry.getType()](entry.toObject());

        // for node
        console[entry.getType()](entry.toString());
    }
);

log
    .error("This object is bad!", badObject)
    .attr("my", "attribute")
    .done();
```

Documentation
=============

- [HTML Example][]
- [Install][]
- [Usage][]

[Build Status]: https://travis-ci.org/herrera-io/js-log.png?branch=master
[HTML Example]: https://github.com/herrera-io/js-log/blob/master/doc/example.html
[Install]: https://github.com/herrera-io/js-log/blob/master/doc/00-Install.md
[Usage]: https://github.com/herrera-io/js-log/blob/master/doc/01-Usage.md
