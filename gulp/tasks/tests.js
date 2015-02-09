//Run Tests
var gulp = require('gulp'), 
    jasmine = require('gulp-jasmine'),
    notify = require('gulp-notify'),
    config  = require('../config').tests;

gulp.task('test', function () {
  return gulp.src(config.src)
    .pipe(jasmine(config.options))
    .on('error', notify.onError({
      title: 'Jasmine Test Failed',
      message: "<%= error.message %>"
    }));
});