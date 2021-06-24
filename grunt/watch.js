'use strict';
var config = require("../gruntConfig.json");
module.exports = function watch(grunt) {
    return {
        options: config.watch.options,
        scripts: {
            files: ['<%= tsDir %>**', 'gruntConfig.json'],
            tasks: ['ts', 'copy:debug', 'updateGameDebug:debug'],
            options: {
                spawn: true
            }
        },
        libDir: {
            files: ["<%= libDir %>**"],
            tasks: ['copy:debug']
        },        
        copy: {
            files: ['<%= assetsDir %>/**', '<%= sourcePath %>*.html', '<%= sourcePath %>*.js', '<%= sourcePath %>*.json'],
            tasks: ['copy:main','updateGameDebug:debug']
        }
    }
};