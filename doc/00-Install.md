Install
=======

There are two types of installations:

Debug
-----

The debugging installation uses the non-minified JavaScript files. To use this
setup, you will need to load the files located in `src/lib/`. You will also
need to load them in the following order:

1. `Herrera.js`
1. `Herrera/Log.js`
1. `Herrera/Log/Entry.js`
1. `Herrera/Log/Entry/Attribute.js`
1. `Herrera/Log/Entry/Attributes.js`

Minified
--------

To use a minified version of the library, you will want to check out the
[**Releases**][] page. You may then select the version you want to install.
The benefit of using the minified version is that you load fewer files, and
it is much smaller.

[**Releases**]: https://github.com/herrera-io/js-log/releases
