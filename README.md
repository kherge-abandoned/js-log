Log
===

[![Build Status][]](https://travis-ci.org/herrera-io/js-log)

Log is a simple log manager designed to be used either with a browser (or
Node.js) console, or as a drop in alternative. The basic methods (debug, error,
info, log, warn) can all be used the same way, and can be either serialized and
sent somewhere, or dumped to the browser console.

```javascript
var log = new Herrera.Log();

log.onDone(
    function (entry) {
        console[entry.getType()](entry.toObject());
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
[HTML Example]: doc/example.html
[Install]: doc/00-Install.md
[Usage]: doc/01-Usage.md
