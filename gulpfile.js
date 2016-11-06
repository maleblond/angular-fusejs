var browserify = require('browserify');
var gulp = require('gulp');
var glob = require('glob');
var source = require('vinyl-source-stream');
var webserver = require('gulp-webserver');

gulp.task('default', ['bundle-js', 'bundle-specs', 'bundle-demo-js', 'watch-js', 'dev-server']);

gulp.task('bundle-specs', function() {
  var testFiles = glob.sync('./spec/**/*.js');
  return browserify({entries: testFiles}).bundle()
    .pipe(source('bundle.js'))
    .on('error', function (err) {
      console.log(err.toString());
    })
    .pipe(gulp.dest('./dist/spec/'));
});

gulp.task('bundle-js', function() {
  return browserify({entries: './index.js'}).bundle()
    .pipe(source('bundle.js'))
    .on('error', function (err) {
      console.log(err.toString());
    })
    .pipe(gulp.dest('./dist/'))
});

gulp.task('bundle-demo-js', function() {
  return browserify({entries: './docs/assets/js/index.js'}).bundle()
    .pipe(source('bundle.js'))
    .on('error', function (err) {
      console.log(err.toString());
    })
    .pipe(gulp.dest('./docs/dist/'))
});

gulp.task('watch-js', function() {
  gulp.watch(['./index.js', 'src/**/*.js'], ['bundle-js', 'bundle-demo-js']);
  gulp.watch(['docs/assets/js/**/*.js'], ['bundle-demo-js']);
  gulp.watch(['spec/**/*.js'], ['bundle-specs']);

});


gulp.task('dev-server', function () {
  gulp.src('docs')
    .pipe(webserver({
      livereload: true
    }));
});