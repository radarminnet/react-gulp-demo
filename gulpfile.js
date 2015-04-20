var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var reactify = require("reactify");
var serve = require('gulp-serve');

var paths = {
  dist: "./src/bundle",
  scripts: ["./src/app/**/*.js", "./src/app/**/*.jsx"]
}

gulp.task("scripts", function () {
  var b = browserify({
    entries: './src/app/main.js',
    debug: true,
    transform: [reactify]
  });

  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest(paths.dist));
});

gulp.task("watch", function () {
  gulp.watch(paths.scripts, ["scripts"]);
});

gulp.task("serve", serve({
  root: "./src",
  port: 8080
}));

gulp.task("build", ["scripts"]);

gulp.task("dev", ["build", "watch", "serve"]);

gulp.task("default", ["build"]);
