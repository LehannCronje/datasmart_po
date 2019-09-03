// Main gulp taskrunner
var gulp = require('gulp');
// Prevents gulp crashing on errors
var plumber = require('gulp-plumber');
// scss compiler
var sass = require('gulp-sass');
// Minification
var cssnano = require('gulp-cssnano');
// Auto prefix of css attributes
var autoprefixer = require('gulp-autoprefixer');
// Concatenation of files
var concat = require('gulp-concat');
// GULP Babel to pipe ES6 Functions
var babel = require('gulp-babel');
// Javascript minify
var uglify = require('gulp-uglify');
// Renameing of compiled/minified files
var rename = require('gulp-rename');

gulp.task('compile-scss', function () {
	return gulp.src('./public/scss/*.scss')
	.pipe(plumber())
	.pipe(sass())
	.pipe(autoprefixer('last 10 versions'))
	.pipe(gulp.dest('./public/css_files'));
});

gulp.task('concat-css', function () {
	return gulp.src('./public/css_files/*.css')
	.pipe(plumber())
	.pipe(cssnano())
	.pipe(concat('style.min.css'))
	.pipe(gulp.dest('./public/css'));
});

gulp.task('combine-js-and-concat', function () {
	return gulp.src('./public/js_files/*.js')
	.pipe(plumber())
	.pipe(concat('main.js'))
	.pipe(babel({
      	presets: ['@babel/preset-env'].map(require.resolve)
	}))
    .pipe(uglify())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('./public/js'));
});

gulp.task('watch', function(){
	gulp.watch('./public/scss/*.scss', gulp.series('compile-scss'));
	gulp.watch('./public/css_files/*.css', gulp.series('concat-css'));
	gulp.watch('./public/js_files/*.js', gulp.series('combine-js-and-concat'));
});

gulp.task('default', gulp.series('compile-scss', 'concat-css', 'combine-js-and-concat', 'watch'));