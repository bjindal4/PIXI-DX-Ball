'use strict';
var config = require("../gruntConfig.json");
module.exports = function updateGameDebug(grunt) {
    grunt.registerMultiTask('updateGameDebug', function () {
        var options = this.options({
                debug: true
            }),
            file = grunt.file.read(this.files[0].src);
        if (options.debug) {
            let strTemp = "";
            config.libIncludes.forEach(function (fileName) {
                strTemp += `<script src="js/${fileName}"></script>\n`;
            });
            file = file.replace('</head>', `${strTemp}</head>`);
            file = file.replace('js/game-debug.js', 'js/game-code.js');
        } else {
            file = file.replace('js/game-debug.js', 'js/game-min.js');
        }
        grunt.file.write(this.files[0].dest, file);
    });
    return config.updateGameDebug;
};