// Clean
var gulp = require('gulp');
var del = require('del');

gulp.task('clean', function(cb) {
    del(['dist/assets/js'], cb)
});