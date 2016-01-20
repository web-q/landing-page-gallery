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
    imageResize = require('gulp-image-resize'),
    gutil = require('gulp-util'),
    del = require('del')
    ;

/*--- Set Sources ---*/
var SRC = {
  source: {
    index: 'source/index.html',
    partials: 'source/partials/*.html',
    styles: 'source/scss/**/*.scss',
    scripts: 'source/js/**/*.js'
  },
  pub: {
    root: 'app',
    index: 'app/',
    partials: 'app/partials',
    styles: 'app/css',
    scripts: 'app/js'
  },
  dep: {
    jslib: [
      'bower_components/angular/angular.min.js',
      'bower_components/angular-route/angular-route.min.js',
      'bower_components/angular-filter/dist/angular-filter.min.js',
      'bower_components/angular-animate/angular-animate.min.js',
      'bower_components/ng-onload/release/ng-onload.min.js'
    ],
    modernizr: 'bower_components/html5-boilerplate/dist/js/vendor/modernizr-*.min.js',
    boilerplate: 'bower_components/html5-boilerplate/dist/css/*.css',
  },
  screenshots: {
    root: '_screenshots',
    raw: '_screenshots/raw',
    pub: '_screenshots/pub'
  },
  appdata: 'http://web-q-hospital.prod.ehc.com/global/webq/report/campaign-pages/campaign-pages.json'
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

/*--- Take Screenshots ---*/
gulp.task('screenshots-scrape', function(cb) {
  process.stdout.write('\nCapturing screenshots... \n\n');
  var campaignURLs;
  request(SRC.appdata, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      campaignURLs = JSON.parse(body).campaigns;
    }
    var screenshot = new pageres({delay: 10}).dest(SRC.screenshots.raw);
    campaignURLs.forEach(function(c){
      var fnameLG = c.id + '-d',
          fnameSM = c.id + '-m';
      screenshot.src(c.url, ['1024x768'], {filename: fnameLG})
                    .src(c.url, ['750x1334'], {filename: fnameSM});
    });
    screenshot.run()
    .then(() => {return cb()});
  });
});

/*--- Resize Screenshots (!!! requires imagemagick !!!) ---*/
gulp.task('screenshots-save',['screenshots-scrape'], function() {
  gulp.src(SRC.screenshots.raw + '/*-d.png')
    .pipe(imageResize({
      width:300,
      height:300,
      crop:true,
      gravity: 'North',
      imageMagick: true
    }))
    .pipe(gulp.dest(SRC.screenshots.pub))
    ;
  gulp.src(SRC.screenshots.raw + '/*-d.png')
    .pipe(imageResize({
      width:700,
      height:800,
      crop:true,
      gravity: 'North',
      imageMagick: true
    }))
    .pipe(rename({suffix:'-lg'}))
    .pipe(gulp.dest(SRC.screenshots.pub))
    ;
  gulp.src(SRC.screenshots.raw +'/*-m.png')
    .pipe(imageResize({
      width:160,
      height:230,
      crop:true,
      gravity: 'North',
      imageMagick: true
    }))
    .pipe(gulp.dest(SRC.screenshots.pub))
    .pipe(notify({ message: "Screenshots Ready!", onLast: true }))
    ;
});

/*--- Delete Screenshots Folder ---*/
gulp.task('clear-screenshots', function() {
    return del([SRC.screenshots.root]);
});

/*--- CSS Compiler ---*/
gulp.task('styles', function () {
  return gulp.src(SRC.source.styles)
  .pipe(sass())
  .pipe(autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }))
  .pipe(gulp.dest(SRC.pub.styles))
  .pipe(minifyCss())
  .pipe(rename({suffix:'.min'}))
  .pipe(gulp.dest(SRC.pub.styles))
  .pipe(gutil.env.type !== 'ci' ? notify("CSS Compiled and Minified") : gutil.noop())
  ;
});

/*--- JS Compiler ---*/
gulp.task('scripts', function () {
  return gulp.src(SRC.source.scripts)
  .pipe(concat('app.js'))
  .pipe(gulp.dest(SRC.pub.scripts))
  .pipe(ngAnnotate())
  .pipe(uglify())
  .pipe(rename({suffix:'.min'}))
  .pipe(gulp.dest(SRC.pub.scripts))
  .pipe(gutil.env.type !== 'ci' ? notify("JS Compiled and Minified") : gutil.noop())
  ;
});

/*--- HTML Compiler ---*/
gulp.task('html', function () {
  return Promise.all([
    gulp.src(SRC.source.partials)
      .pipe(gulp.dest(SRC.pub.partials)),
    gulp.src(SRC.source.index)
      .pipe(gulp.dest(SRC.pub.index))
      .pipe(notify({ message: "HTML Saved", onLast: true }))
  ]);
});

/*--- Build Dependencies ---*/
gulp.task('build-dep', function () {
  return Promise.all([
    gulp.src(SRC.dep.jslib,{base: 'bower_components/'})
      .pipe(concat('lib.min.js'))
      .pipe(gulp.dest(SRC.pub.scripts)),
    gulp.src(SRC.dep.modernizr)
      .pipe(rename('modernizr.min.js'))
      .pipe(gulp.dest(SRC.pub.scripts)),
    gulp.src(SRC.dep.boilerplate)
      .pipe(concat('boilerplate.css'))
      .pipe(minifyCss())
      .pipe(rename({suffix:'.min'}))
      .pipe(gulp.dest(SRC.pub.styles))
  ]);
});

/*--- Delete App Folder ---*/
gulp.task('clean', function(cb) {
  return del([SRC.pub.root]);
});

/*--- Build All ---*/
gulp.task('build', ['html','build-dep','scripts','styles']);

/*--- Watcher: CSS, JSS, HTML, etc... ---*/
gulp.task('watch', ['build'], function() {
  watch(SRC.source.styles, function() {
    gulp.start('styles');
  });
  watch(SRC.source.scripts, function() {
    gulp.start('scripts');
  });
  watch("source/**/*.html", function() {
    gulp.start('html');
  });
});

/*-------------------------------
/ Serve up Browser Sync, watch
/ for changes & inject/reload
/-------------------------------*/
gulp.task('serve',['watch'], function() {
  browserSync.init({
        server: "./app"
    });
  watch("app/css/*.css", function() {
    return gulp.src("app/css/*.css")
      .pipe(browserSync.stream());
  });
  watch("app/**/*.html").on('change', browserSync.reload);
  watch("app/js/*.js").on('change', browserSync.reload);
});

/*--- Deploy to GH-Pages ---*/
gulp.task('gh-pages',['build'], function() {
  setTimeout(function() {
    return gulp.src('app/**/*')
      .pipe(ghPages({remoteUrl:'https://github.com/web-q/landing-page-wizard.git'}));
  }, 3000);
});

/*--- Default Gulp ---*/
gulp.task('default', ['serve']);
