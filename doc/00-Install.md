Install
=======

Browser
-------

### Minified

Download the library from the [**Releases**][] page and load it.

```html
<script type="text/javascript" src="log.min.js"></script>
```

### Non-Minified

Load all of the files in `src/lib/`, except for `main.js`. I recommend loading
the library scripts in the following order:

1. `Herrera.js`
1. `Herrera/Log.js`
1. `Herrera/Log/Entry.js`
1. `Herrera/Log/Entry/Attribute.js`
1. `Herrera/Log/Entry/Attributes.js`
1. `Herrera/Log/Event.js`

```html
<script type="text/javascript" src="Herrera.js"></script>
<script type="text/javascript" src="Herrera/Log.js"></script>
<script type="text/javascript" src="Herrera/Log/Entry.js"></script>
<script type="text/javascript" src="Herrera/Log/Entry/Attribute.js"></script>
<script type="text/javascript" src="Herrera/Log/Entry/Attributes.js"></script>
<script type="text/javascript" src="Herrera/Log/Event.js"></script>
```

Node.js
-------

Add it to your list of dependencies:

```json
{
    "dependencies": {
        "h-log": "latest"
    }
}
```

The manager will be available as `require("h-log").log`.

[**Releases**]: https://github.com/herrera-io/js-log/releases
