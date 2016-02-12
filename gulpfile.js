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
    phantom = require('phantom'),
    async = require('async'),
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
    styles: 'source/scss/app.scss',
    scripts: 'source/js/**/*.js',
    img: 'source/img/**/*'
  },
  pub: {
    root: 'app',
    index: 'app/',
    partials: 'app/partials',
    styles: 'app/css',
    scripts: 'app/js',
    img: 'app/img'
  },
  dep: {
    jslib: [
      'bower_components/angular/angular.min.js',
      'bower_components/angular-route/angular-route.min.js',
      'bower_components/angular-filter/dist/angular-filter.min.js',
      'bower_components/angular-animate/angular-animate.min.js',
      'bower_components/ng-onload/release/ng-onload.min.js',
      // 'bower_components/angulargrid/angulargrid.min.js',
      'bower_components/gsap/src/minified/TweenMax.min.js'
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

/* For printing time in messages */
var now = function() {
  var i = new Date().toLocaleTimeString('en-GB',{hour12:false});
  return i;
};

/* WIP - Suppress stdout from phantomjs */
function p_onConsoleMessage(msg, lineNum, sourceId) {
//    log_event({e: "console", w: this.serial, u: this.url, d: msg});
};
function p_onError(msg, trace) {
//    log_event({e: "jserror", w: this.serial, u: this.url, d: msg});
};
function p_onAlert(msg) {
//    log_event({e: "alert",   w: this.serial, u: this.url, d: msg});
};
function p_onConfirm(msg) {
//    log_event({e: "confirm", w: this.serial, u: this.url, d: msg});
    return true;
};
function p_onPrompt(msg) {
//    log_event({e: "prompt",  w: this.serial, u: this.url, d: msg});
    return "derp";
};

/* Function that uses phantomjs to take a screenshot */
var takeScreenshot = function(url,w,h,dest,filename,callback) {
  phantom.create("--ignore-ssl-errors=yes", "--ssl-protocol=any", function (ph) {
    ph.createPage(function (page) {
      page.onAlert = p_onAlert.bind(page);
      page.onConfirm = p_onConfirm.bind(page);
      page.onPrompt = p_onPrompt.bind(page);
      page.onConsoleMessage = p_onConsoleMessage.bind(page);
      page.onError = p_onError.bind(page);
      page.set('viewportSize', {width:w,height:h}, function(){
        page.set('clipRect', {top:0,left:0,width:w,height:h}, function(){
          page.open(url, function(status) {
            setTimeout(function(){
              page.render(dest+'/'+filename, function(finished){
                console.log('[\x1b[30m\x1b[1m'+now()+'\x1b[0m] Captured \'\x1b[32m'+url+'\x1b[0m\' at \x1b[34m'+w+'x'+h+'\x1b[0m');
                ph.exit();
                callback();
              });
            }, 10000);
          });
        });
      });
    });
  });
};

/*--- Take Screenshots ---*/
gulp.task('screenshots-scrape', function(cb) {
  var campaignURLs;
  request(SRC.appdata, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      campaignURLs = JSON.parse(body).campaigns;
    }
    async.mapSeries(campaignURLs, function(c, cback) {
      var fnameLG = c.id + '-d.png',
          fnameSM = c.id + '-m.png';
      async.series([
          function(callback) {
            takeScreenshot(c.url, 1024, 1300, SRC.screenshots.raw, fnameLG, callback)
          },
          function(callback) {
            takeScreenshot(c.url, 360, 900, SRC.screenshots.raw, fnameSM, callback)
          }
        ],
        function(err, results) {
          return cback();
        }
      );
    }, function(err, results) {
      return cb();
    });
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

/*--- IMG Setup ---*/
gulp.task('img', function () {
  return gulp.src(SRC.source.img)
      .pipe(gulp.dest(SRC.pub.img));
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
gulp.task('build', ['html','build-dep','img','scripts','styles']);

/*--- Watcher: CSS, JSS, HTML, etc... ---*/
gulp.task('watch', ['build'], function() {
  watch("source/**/*.scss", function() {
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
    return gulp.src('app/**/*')
      .pipe(ghPages({remoteUrl:'https://github.com/web-q/landing-page-gallery.git'}));
});

/*--- Default Gulp ---*/
gulp.task('default', ['serve']);
