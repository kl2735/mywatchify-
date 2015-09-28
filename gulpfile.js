var gulp = require('gulp');

var browserify = require('browserify');
var source = require("vinyl-source-stream");
var livereload = require('gulp-livereload');
var gulpif = require('gulp-if');
var watchify = require('watchify');

var watch;

gulp.task('browserify-nowatch', function(){
  watch = false;
  browserifyShare();
});

gulp.task('browserify-watch', function(){
  watch = true;
  browserifyShare();
});

function browserifyShare(){
	var b = browserify({
		cache: {},
		packageCache: {},
		fullPaths: true
	});

	b = watchify(b);
	b.on('update', function () {
		bundleShare(b);
	});

	b.add('./main.js');
	bundleShare(b);
}

function bundleShare(b){
	b.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./dist'))
		.pipe(gulpif(watch, livereload()));
}


// define the browserify-watch as dependencies for this task
gulp.task('watch', ['browserify-watch'], function(){
  // watch other files, for example .less file
  gulp.watch('./less/*.less',
             ['compile-less']);

  // Start live reload server
  livereload.listen(35729);
});

