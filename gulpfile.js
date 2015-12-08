var gulp = require('gulp'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync')
    ;

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'Safari >= 7',
  'Opera >= 23',
  'iOS >= 7',
  'ChromeAndroid >= 4.4',
  'bb >= 10'
];

var SRC = {
  scss: 'source/scss/**/*.scss',
  css: 'app/css'
}

/*--- CSS Compiler ---*/
gulp.task('sass', function () {
  gulp.src(SRC.scss)
  .pipe(sass())
  .pipe(autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }))
  .pipe(gulp.dest(SRC.css))
  .pipe(minifyCss())
  .pipe(rename({suffix:'.min'}))
  .pipe(gulp.dest(SRC.css))
  ;
});

/*--- Watcher: CSS, JSS, etc... ---*/
gulp.task('watch', function() {
  watch('source/scss/**/*.scss', function() {
    gulp.start('sass');
  });
});

/*-------------------------------
/ Serve up Browser Sync, watch
/ for changes & inject/reload
/-------------------------------*/
gulp.task('serve', ['watch'], function() {
  browserSync.init({
        server: "./app"
    });

  watch("app/css/*.css", function() {
    return gulp.src("app/css/*.css")
      .pipe(browserSync.stream());
  });
  watch("app/**/*.html").on('change', browserSync.reload);
});

/*--- Default Gulp ---*/
gulp.task('default', ['serve']);
