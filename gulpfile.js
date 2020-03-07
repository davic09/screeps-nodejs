"use strict";

const gulp = require("gulp");
const screeps = require("gulp-screeps");
const rename = require("gulp-rename");
const insert = require("gulp-insert");
const clean = require("gulp-clean");
const minimist = require("minimist");
const git = require("git-rev-sync");
const getReqd = require("./tools/getreqd");

const args = minimist(process.argv.slice(2));
const commitdate = git.date();

function cleanTask(cb) {
    gulp.src("dist/", { read: false, allowEmpty: true }).pipe(clean());
    cb();
}

function copyTask(cb) {
    let src;
    src = gulp.src("src/**/*.js");
    src.pipe(insert.transform(cleanRequirements))
        .pipe(rename(renameFiles))
        .pipe(insert.transform(appendVersion))

        .pipe(gulp.dest("dist/"));
    cb();
}

function renameFiles(path) {
    let parts = path.dirname.match(/[^/\\]+/g);
    let name = "";
    for (let i in parts) {
        if (parts[i] !== ".") {
            name += parts[i] + "_";
        }
    }
    name += path.basename;
    path.basename = name;
    path.dirname = "";
}

function appendVersion(contents, file) {
    let name = file.path.match(/[^/\\]+/g);
    name = name[name.length - 1];
    if (name === "version.js") {
        return `${contents}\nglobal.SCRIPT_VERSION = ${+commitdate}`; // jshint ignore:line
    }
    return contents;
}

function cleanRequirements(contents, file) {
    let updatedContents = "";
    const lines = contents.split("\n");
    for (let line of lines) {
        if (line.match(/[.]*\/\/ Compiler: IgnoreLine[.]*/)) {
            continue;
        }
        let reqStr = line.match(/(?:require\(")([^_a-zA-Z0-9]*)([^"]*)/);
        if (reqStr && reqStr != "") {
            const reqstring = reqStr[reqStr.length - 1];
            console.log('file path: ' + file.path)
            console.log('reqstring: ' + reqstring)
            let rePathed = getReqd.convertRequirePathToScreepsPath(file.path, reqstring, "src");
            line = line.replace(/require\("([\.\/]*)([^"]*)/, 'require("' + rePathed);

        }

        updatedContents += line + "\n";
    }

    return updatedContents;
}

function deployTask(cb) {
    let config = require("./.screeps.json");
    let opts = config[args.server || "main"];
    let options = {};
    if (!opts) {
        let err = new Error(`No configuration exists for server "${args.server || "main"}`);
        err.showStack = false;
        throw err;
    }

    // allow overrides from passed arguments
    for (let i in args) {
        // jshint ignore:line
        opts[i] = args[i];
    }

    options.ptr = opts.ptr || false;
    options.branch = opts.branch || "default";

    if (opts.token) {
        options.token = opts.token;
    } else {
        options.email = opts.email || opts.username;
        options.password = opts.password;
    }

    if (args.server && args.server !== "main" && !opts.host) {
        options.host = args.server;
    } else {
        options.host = opts.host || "screeps.com";
    }
    options.secure = !!opts.ssl || options.host === "screeps.com";
    options.port = opts.port || 443;

    gulp.src("dist/*.js").pipe(screeps(options));
    cb();
}

const copySeries = gulp.series(cleanTask, copyTask);
const deploySeries = gulp.series(copySeries, deployTask);

module.exports = {
    default: deploySeries,
    deploy: deploySeries,
    stage: copySeries
};
