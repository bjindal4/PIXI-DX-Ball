'use strict';
var config = require("../gruntConfig.json");
module.exports = function uglify(grunt) {
    return {
        build: {
            options: config.uglify.options,
            src: '<%= jsDestDir %><%=name%>-debug.js',
            dest: '<%= jsDestDir %><%=name%>-min.js'
        }
    }
};