/* global require */
"use strict";

var gulp = require("gulp");
var connect = require("gulp-connect");
// var jade = require("gulp-jade");
var sass = require("gulp-sass");

// gulp.task("jade", function() {
//   gulp.src("./src/*.jade")
//   .pipe(jade({
//     locals: {}
//   }))
//   .pipe(gulp.dest("./src"))
//   .pipe(connect.reload());
// });

gulp.task("sass", function () {
  gulp.src("./src/styles/*.scss")
  .pipe(sass().on("error", sass.logError))
  .pipe(gulp.dest("./src/styles"))
  .pipe(connect.reload());
});

gulp.task("connect", function() {
  connect.server({
    root: "src",
    port: 8080,
    livereload: true
  });
});

gulp.task("html", function () {
  gulp.src("./src/*.html").pipe(connect.reload());
});

gulp.task("js", function () {
  gulp.src("./src/scripts/*.js").pipe(connect.reload());
});

// gulp.task("css", function () {
//   gulp.src("./src/styles/*.css").pipe(connect.reload());
// });

gulp.task("watch", function () {
  gulp.watch(["./src/*.html"], ["html"]);
  // gulp.watch(["./src/*.jade"], ["jade"]);

  // gulp.watch(["./src/*.css"], ["css"]);
  gulp.watch(["./src/styles/*.scss"], ["sass"]);

  gulp.watch(["./src/scripts/*.js"], ["js"]);
});

gulp.task("default", ["connect", "watch"]);