'use strict';
var config = require("../gruntConfig.json");
module.exports = function browserSync(grunt) {
    config.browserSync.dev.options["middleware"] = [
        require("compression")()
    ];
    return config.browserSync;
}