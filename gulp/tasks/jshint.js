//JS Hint
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    config  = require('../config').jshint;

gulp.task('jshint', function() {
  return gulp.src(config.src)
    .pipe(jshint(config.jshintrc))
    .pipe(jshint.reporter('default'));
});