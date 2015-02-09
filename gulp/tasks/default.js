// Default task
var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('default', function(callback) {
  //tasks are run synchronously
  runSequence('clean', 'jshint', 'test', 'build', callback);
});

