var browserify = require('browserify');
var gulp = require('gulp');
var glob = require('glob');
var source = require('vinyl-source-stream');

gulp.task('default', ['bundle-js', 'bundle-specs', 'watch-js']);

gulp.task('bundle-specs', function() {
  var testFiles = glob.sync('./spec/**/*.js');
  return browserify({entries: testFiles}).bundle()
    .pipe(source('bundle.js'))
    .on('error', function (err) {
      console.log(err.toString());
      this.emit("end");
    })
    .pipe(gulp.dest('./dist/spec/'));
});

gulp.task('bundle-js', function() {
  console.log('Bundling js');
  return browserify({entries: './index.js'}).bundle()
    .pipe(source('bundle.js'))
    .on('error', function (err) {
      console.log(err.toString());
      this.emit("end");
    })
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch-js', ['bundle-js'], function() {
  gulp.watch(['./index.js', 'src/**/*.js'], ['bundle-js']);
  gulp.watch(['spec/**/*.js'], ['bundle-specs']);

});