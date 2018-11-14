var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var del = require('del');
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var image = require('gulp-image');

gulp.task('styles', function () {
	return gulp.src('./css/*.css')
		.pipe(autoprefixer({browsers: [
			'ie >= 10',
			'ie_mob >= 10',
			'ff >= 30',
			'chrome >= 34',
			'safari >= 7',
			'opera >= 23',
			'ios >= 7',
			'android >= 4.4',
			'bb >= 10'
		]}))
		.pipe(csso())
		.pipe(gulp.dest('./dist/css'))
});

gulp.task('scripts', function() {
	return gulp.src('./js/*.js')
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js'))
});

gulp.task('vendor-scripts', function() {
	return gulp.src('./js/vendor/*.js')
		.pipe(gulp.dest('./dist/js/vendor'))
});

gulp.task('images', function () {
	gulp.src('./img/*')
		.pipe(image())
		.pipe(gulp.dest('./dist/img'));
});

gulp.task('pages', function() {
	return gulp.src(['./index.html'])
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true
		}))
		.pipe(gulp.dest('./dist'));
});

gulp.task('clean', () => del(['dist']));

gulp.task('default', ['clean'], function () {
	runSequence(
		'styles',
		'images',
		'scripts',
		'vendor-scripts',
		'pages'
	);
});
