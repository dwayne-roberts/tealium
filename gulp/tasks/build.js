//Build (concat, minify, publish)
var gulp = require('gulp'), 
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    config  = require('../config').production;

gulp.task('build', function() {
  return gulp.src(config.src)
    .pipe(concat(config.destFile))
    .pipe(gulp.dest(config.dest))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(config.dest))
    .pipe(notify({ message: 'Build task complete' }));
});
