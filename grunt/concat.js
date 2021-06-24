'use strict';
var config = require("../gruntConfig.json");
module.exports = function concat(grunt) {
    return {
        js: {
            options: config.concat.options,
            src: getJsPath(grunt),
            dest: '<%= jsDestDir %><%=name%>-debug.js'
        }
    }
};

function getJsPath(grunt) {
    //console.log("running event ");
    if (grunt == void 0) {
        return;
    }
    var filesToConcat = [],
        libPath = config.paths.sourcePath + config.paths.libPath;
    for (var i = 0; i < config.libIncludes.length; i++) {
        filesToConcat.push(libPath + config.libIncludes[i]);
    }
    filesToConcat.push(libPath + "game-code.js");
    return filesToConcat;
}