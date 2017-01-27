const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const watch = require('gulp-watch');

var sourcesJs = [
    './bower_components/vue/dist/vue.js',
    './bower_components/wow/dist/wow.js',
    './src/js/quotes.js',
    './src/js/data.js',
    './src/js/vue.js'
];

gulp.task('default', ['sources', 'styles'], function() {
    gulp.watch('./src/js/*.js', ['sources']);
    gulp.watch('./src/sass/**/*.scss', ['styles']);
});

gulp.task('sources', function() {
    return gulp.src(sourcesJs)
        .pipe(sourcemaps.init())
        .pipe(concat('pboutin.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./assets/js'));
});

gulp.task('styles', function() {
    return gulp.src('./src/sass/pboutin.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./assets/css'));
});
