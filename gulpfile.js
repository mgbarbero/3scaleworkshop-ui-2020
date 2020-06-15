// Generated on 2018-06-25 using generator-static-angular v0.0.6
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    connect = require('gulp-connect'),
    htmlmin = require('gulp-htmlmin'),
    replace = require('gulp-string-replace');


gulp.task('html', function () {
    var assets = useref.assets();

    return gulp.src('dev/*.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', autoprefixer({
            browsers: ['last 2 versions', 'ie 8', 'ie 9']
        })))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulpif('*.html', htmlmin({collapseWhitespace: true})))
        .pipe(gulp.dest('dist'));
});

gulp.task('env_vars', function (){
  return gulp.src('dev/*.html')
    .pipe(replace('API_BACKEND_URL', process.env.API_BACKEND_URL || 'API_BACKEND_URL'))
    .pipe(replace('SSO_URL', process.env.SSO_URL || 'SSO_URL'))
    .pipe(replace('SSO_REALM', process.env.SSO_REALM || 'SSO_REALM'))
    .pipe(replace('CLIENT_ID', process.env.CLIENT_ID || 'CLIENT_ID'))
    .pipe(gulp.dest('dev'));
});

gulp.task('reload', function () {
  return gulp.src('dev/**/**.*')
    .pipe(connect.reload());
});

gulp.task('connect', function (done) {
  connect.server({
    host: process.env.HOSTNAME || 'localhost',
    root: 'dev',
    port: 8080,
    livereload: false
  });
});

gulp.task('watch', function () {
  gulp.watch('dev/**/**.*', ['reload']);
});

gulp.task('serve', ['connect', 'watch']);
gulp.task('default', ['html']);
