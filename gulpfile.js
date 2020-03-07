"use strict";

const fs = require("fs");
const gulp = require("gulp");
const screeps = require("gulp-screeps");
const rename = require("gulp-rename");
const insert = require("gulp-insert");
const clean = require("gulp-clean");
const minimist = require("minimist");
const git = require("git-rev-sync");

const args = minimist(process.argv.slice(2));
const commitdate = git.date();

function clean(cb) {
  gulp.src("dist/", { read: false }).pipe(clean());
  cb();
}
//  gulp.series(['clean']
function copy(cb) {
  let src;
  src = gulp.src("src/**/*.js");
  src
    .pipe(
      rename(path => {
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
      })
    )
    .pipe(
      insert.transform(function(contents, file) {
        let name = file.path.match(/[^/\\]+/g);
        name = name[name.length - 1];
        if (name === "version.js") {
          return `${contents}\nglobal.SCRIPT_VERSION = ${+commitdate}`; // jshint ignore:line
        }
        return contents;
      })
    )
    .pipe(gulp.dest("dist/"));
  cb();
}

// gulp.series(['copy']
function deploy(cb) {
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
// gulp.series(['ci-version']
function ciconfig(cb) {
  fs.writeFile(
    ".screeps.json",
    JSON.stringify({
      main: {
        ptr: !!process.env.SCREEPS_PTR,
        branch: process.env.SCREEPS_BRANCH,
        token: process.env.SCREEPS_TOKEN,
        host: process.env.SCREEPS_HOST,
        ssl: !!process.env.SCREEPS_SSL,
        port: process.env.SCREEPS_PORT
      }
    }),
    cb
  );
}

function civersion(cb) {
  let pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
  let seconds = commitdate.getHours() * 3600 + commitdate.getMinutes() * 60 + commitdate.getSeconds();
  let year = commitdate.getFullYear();
  let month = commitdate.getMonth() + 1;
  let day = commitdate.getDate();
  pkg.version = `${year}.${month}.${day}-${seconds}`;
  fs.writeFile("package.json", JSON.stringify(pkg, null, 2), cb);
}

gulp.task("default", gulp.series(["clean", "copy", "deploy"]));

const copySeries = gulp.series(clean, copy);
const deploySeries = gulp.series(copySeries, deploy);

module.exports = {
  default: deploySeries,
  deploy: deploySeries,
  stage: copySeries
};
