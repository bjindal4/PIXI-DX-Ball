var config = require("./gruntConfig.json");
var fileSys = require("fs");
var buildConfig;
module.exports = function (grunt) {
    if (fileSys.existsSync("./buildpath.json")) {
        buildConfig = grunt.file.readJSON("./buildpath.json");
    }
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        name: "game",
        buildPath: (buildConfig) ? buildConfig.buildPath : config.paths.buildPath,
        sourcePath: config.paths.sourcePath,
        jsDir: config.paths.sourcePath + config.paths.jsPath,
        libDir: config.paths.sourcePath + config.paths.libPath,
        libDesDir: config.paths.buildPath + config.paths.libPath,
        tsDir: config.paths.sourcePath + config.paths.tsPath,       
        jsDestDir: "<%= buildPath %>" + config.paths.jsPath
    });
    console.log("Build Path Config ", grunt.config("buildPath"));
    require('load-grunt-tasks')(grunt);
    require('grunt-config-dir')(grunt, {
        configDir: require('path').resolve('grunt'),
        fileExtensions: ['js']
    }, function (err) {
        grunt.log.error(err)
    });
    grunt.registerTask('default', ["browserSync", "watch"]);
    grunt.registerTask('debug', ['copy', 'updateGameDebug:debug', 'ts', 'copy:debug']);
    grunt.registerTask('build', ['clean:build', 'copy:main', 'updateGameDebug:build', 'ts', 'concat', 'uglify:build', 'clean:js']);
};