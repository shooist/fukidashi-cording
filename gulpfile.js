var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var pug = require("gulp-pug");
var rename = require("gulp-rename");
var browserSync = require('browser-sync');
var merge = require('merge-stream');
var sassGlob = require("gulp-sass-glob");
var concat = require('gulp-concat');

// Sass
gulp.task("sass", function () {
  return gulp.src('src/sass/style.scss')
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});

gulp.task("assets", function () {
  return gulp.src(["src/img/**/*.*"])
    .pipe(gulp.dest('public/img'));
});

gulp.task("js", function () {
  return gulp.src(["src/js/**/*.js"])
    .pipe(concat('script.js'))
    .pipe(gulp.dest('public/js/'));
});

// EJS
gulp.task("pug", function () {
  var option = {
    pretty: true
  }
  return gulp.src(["src/pug/**/*.pug", '!' + "src/pug/**/_*.pug"])
    .pipe(pug(option))
    .pipe(gulp.dest("public/"));
});

// Static Server + watching scss/html files
gulp.task('watch', function () {
  browserSync.init({
    server: "./public",
    startPath: "index.html"
  });

  gulp.watch("src/sass/**/*.*", gulp.task('sass'));
  gulp.watch("src/sass/style.scss", gulp.task('sass'));
  gulp.watch("src/img/**/*.*", gulp.task(['assets']));
  gulp.watch("src/js/**/*.ts", gulp.task(['ts']));
  gulp.watch("src/js/**/*.js", gulp.task(['js']));
  gulp.watch("src/pug/**/*.pug", gulp.task(['pug']));
  gulp.watch("public/**/*.*").on('change', browserSync.reload);
});

gulp.task('default', gulp.series(['sass', 'pug', 'js', 'assets', 'watch']));