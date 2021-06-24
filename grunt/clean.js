'use strict';
var config = require("../gruntConfig.json");
module.exports = function clean(grunt) {
    return {
        options: config.clean.options,
        temp: [config.paths.temp],
        build: ['<%= buildPath %>'],
        js: ['<%= jsDestDir %><%=name%>-debug.js']
    }
};