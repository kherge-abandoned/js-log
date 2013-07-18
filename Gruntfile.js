module.exports = function (grunt) {
    "use strict";

    grunt.initConfig(
        {
            qunit: {
                "logjs": ["qunit.html"]
            },
            uglify: {
                options: {
                    compress: true,
                    mangle: true,
                    sourceMap: "build/log.min.js.map",
                    banner: "/**\n * Log - A simple log manager.\n * (c) 2013 Kevin Herrera.\n * https://github.com/herrera-io/js-log/\n */"
                },
                "logjs": {
                    files: {
                        "build/log.min.js": [
                            "src/lib/Herrera.js",
                            "src/lib/Herrera/Log.js",
                            "src/lib/Herrera/Log/Entry.js",
                            "src/lib/Herrera/Log/Entry/Attribute.js",
                            "src/lib/Herrera/Log/Entry/Attributes.js"
                        ]
                    }
                }
            }
        }
    );

    grunt.loadNpmTasks("grunt-contrib-qunit");
    grunt.loadNpmTasks("grunt-contrib-uglify");
};
