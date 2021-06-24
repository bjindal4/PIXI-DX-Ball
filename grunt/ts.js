'use strict';
var config = require("../gruntConfig.json");
module.exports = function ts(grunt) {

    return {
        default: config.ts.default,
        options: config.ts.options
    }
};