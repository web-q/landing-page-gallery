var gulp = require('gulp'),
    notify = require('gulp-notify'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    browserSync = require('browser-sync'),
    ghPages = require('gulp-gh-pages'),
    pageres = require('pageres'),
    request = require('request'),
    imageResize = require('gulp-image-resize')
    ;

/*--- Set Sources ---*/
var SRC = {
  scss: 'source/scss/**/*.scss',
  css: 'app/css',
  devjs: 'source/js/**/*.js',
  distjs: 'app/js',
  jslib: ['bower_components/angular/angular.min.js',
          'bower_components/angular-route/angular-route.min.js',
          'bower_components/angular-filter/dist/angular-filter.min.js',
          'bower_components/angular-animate/angular-animate.min.js'],
  modernizr: 'bower_components/html5-boilerplate/dist/js/vendor/modernizr-*.min.js',
  boilerplate: 'bower_components/html5-boilerplate/dist/css/*.css',
  URLs: 'http://web-q-hospital.prod.ehc.com/global/webq/report/campaign-pages/campaign-pages.json',
  screenshotsRaw: '_screenshots/raw',
  screenshotsPub: '_screenshots/pub'
};

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

// var campaignURLs = [
//   {
//     "shortCode":"1",
//     "url":"http://hcanorthflorida.com/campaigns/ems.dot"
//   },
//   {
//     "shortCode":"2",
//     "url":"http://alaskaregional.com/campaigns/alaska-regional-nursing-careers"
//   }
// ];



gulp.task('grabshots', function() {
  var campaignURLs;
  request(SRC.URLs, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      campaignURLs = JSON.parse(body).campaigns;
    }
    var screenshot = new pageres({delay: 10}).dest(SRC.screenshotsRaw);
    campaignURLs.forEach(function(c){
      var fnameLG = c.id + '-lg',
          fnameSM = c.id + '-sm';
      screenshot.src(c.url, ['1024x768'], {filename: fnameLG})
                    .src(c.url, ['750x1334'], {filename: fnameSM});
    });
    screenshot.run();
    process.stdout.write('Capturing screenshots...')
  });
});

gulp.task('resizeshots', function() {
  gulp.src(SRC.screenshotsRaw + '/*-lg.png')
    .pipe(imageResize({
      width:300,
      height:300,
      crop:true,
      gravity: 'North',
      imageMagick: true
    }))
    .pipe(gulp.dest(SRC.screenshotsPub));
  gulp.src(SRC.screenshotsRaw +'/*-sm.png')
    .pipe(imageResize({
      width:160,
      height:230,
      crop:true,
      gravity: 'North',
      imageMagick: true
    }))
    .pipe(gulp.dest(SRC.screenshotsPub));
});

/*--- CSS Compiler ---*/
gulp.task('sass', function () {
  gulp.src(SRC.scss)
  .pipe(sass())
  .pipe(autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }))
  .pipe(gulp.dest(SRC.css))
  .pipe(minifyCss())
  .pipe(rename({suffix:'.min'}))
  .pipe(gulp.dest(SRC.css))
  .pipe(notify("CSS Compiled and Minified"))
  ;
});

/*--- JS Compiler ---*/
gulp.task('scripts', function () {
  gulp.src(SRC.devjs)
  .pipe(concat('app.js'))
  .pipe(gulp.dest(SRC.distjs))
  .pipe(ngAnnotate())
  .pipe(uglify())
  .pipe(rename({suffix:'.min'}))
  .pipe(gulp.dest(SRC.distjs))
  .pipe(notify("JS Compiled and Minified"))
  ;
});

/*--- Compile Libraries ---*/
gulp.task('build-lib', function () {
  gulp.src(SRC.jslib,{base: 'bower_components/'})
  .pipe(concat('lib.min.js'))
  .pipe(gulp.dest(SRC.distjs))
  ;
  gulp.src(SRC.modernizr)
  .pipe(rename('modernizr.min.js'))
  .pipe(gulp.dest(SRC.distjs))
  ;
  gulp.src(SRC.boilerplate)
  .pipe(concat('boilerplate.css'))
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
  watch('source/js/**/*.js', function() {
    gulp.start('scripts');
  });
});

/*-------------------------------
/ Serve up Browser Sync, watch
/ for changes & inject/reload
/-------------------------------*/
gulp.task('serve', ['build-lib','watch'], function() {
  browserSync.init({
        server: "./app"
    });

  watch("app/css/*.css", function() {
    return gulp.src("app/css/*.css")
      .pipe(browserSync.stream());
  });
  watch("app/**/*.html").on('change', browserSync.reload);
});

/*--- Deploy to GH-Pages ---*/
gulp.task('gh-pages', function() {
  return gulp.src('app/**/*')
    .pipe(ghPages({remoteUrl:'https://github.com/web-q/landing-page-wizard.git'}));
});

/*--- Default Gulp ---*/
gulp.task('default', ['serve']);
