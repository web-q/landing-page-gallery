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
    del = require('del'),
    fs = require('fs')
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
      './bower_components/angular-local-storage/dist/angular-local-storage.min.js',
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
  appdata: 'http://web-q-hospital.prod.ehc.com/global/webq/report/campaign-pages/campaign-pages.json',
  appcache: '.campaigns.cache'
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
var prettyLog = function(log) {
  var t = new Date().toLocaleTimeString('en-GB',{hour12:false});
  t = '\x1b[0m[\x1b[30m\x1b[1m'+t+'\x1b[0m] ';
  console.log(t + log + '\x1b[0m');
}

var arrayDiff = function(base, more) {
  var b = {};
  base.forEach(function(obj) {
    b[obj.id] = obj;
  });
  return more.filter(function(obj) {
    return !(obj.id in b);
  });
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
/*
var takeScreenshot = function(url,w,h,dest,filename,callback) {
  var _ph, _page, _outObj;
  phantom.create(["--ignore-ssl-errors=yes", "--ssl-protocol=any"])
  .then( ph => {
    _ph = ph;
    return _ph.createPage();
    })
  .then( page => {
      _page = page;
      _page.property('viewportSize', {width: w, height: h});
      _page.property('clipRect', {top:0,left:0,width:w,height:h});
      return _page.open(url);
    })
  .then(status => {
    console.log(status);
    return _page.property('content')
  })
  .then(content => {
    //console.log(content);
    setTimeout(function(){
      _page.render(dest+'/'+filename);
      prettyLog('Captured \'\x1b[32m'+url+'\x1b[0m\' at \x1b[34m'+w+'x'+h);
      _ph.exit();
      callback();
    }, 3000);

  })
  .catch(error => {
      prettyLog(error)
      _ph.exit();
  });
};
*/

var takeScreenshot = function(url,w,h,dest,filename,callback) {  
  
  httpsurl = "https:" + url;
  //httpsurl = url;
  prettyLog("Scraping "+ httpsurl);

  var _ph, _page, _outObj;  
  phantom.create(["--ignore-ssl-errors=yes", "--ssl-protocol=any"])
  .then( ph => {
    _ph = ph;
    return _ph.createPage();
    })
  .then( page => {
      _page = page;
      _page.property('viewportSize', {width: w, height: h});
      _page.property('clipRect', {top:0,left:0,width:w,height:h});
      var status = _page.open(httpsurl);
      return status;
    })  
  .then(status => new Promise(resolve => setTimeout(() => resolve(status), 5000)))
  .then(status => {        
    prettyLog('page opened:' + status);
    return _page.render(dest+'/'+filename);         
  })
  .then(() => {
     prettyLog('Captured \'\x1b[32m'+httpsurl+'\x1b[0m\' at \x1b[34m'+w+'x'+h);                    
    _ph.exit();
    callback();    
  })
  .catch(error => {
      prettyLog('ERROR:'  + error);
      _ph.exit();
  });

};

/*--- Take Screenshots ---*/
gulp.task('screenshots-scrape', function(cb) {
  var campaignURLs,fetchedURLs;
  request(SRC.appdata, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      fetchedURLs = JSON.parse(body).campaigns;
      fs.readFile(SRC.appcache, function(err, data){
        if(!err){
          var cachedURLs = JSON.parse(data);
          campaignURLs = arrayDiff(cachedURLs,fetchedURLs);
        } else {
          prettyLog('\x1b[33mWARNING:\x1b[0m CampaignURLs cache not found.');
          campaignURLs = fetchedURLs;
        }
        if(campaignURLs.length > 0){
          var remaining = campaignURLs.length;
          prettyLog('Scraping \x1b[32m'+remaining+'\x1b[0m new campaign pages.'); 
          async.mapSeries(campaignURLs, function(c, cback) {
            var fnameLG = c.id + '-d.png',
                fnameSM = c.id + '-m.png';
            async.series([
                function(callback) {
                  takeScreenshot(c.url, 1024, 1300, SRC.screenshots.raw, fnameLG, callback)
                },
                function(callback) {
                  takeScreenshot(c.url, 360, 900, SRC.screenshots.raw, fnameSM, callback)
                },
                function(callback) {
                  remaining--;
                  prettyLog('\x1b[32m'+remaining+'\x1b[0m pages remaining.');
                  callback();
                }
              ],
              function(err, results) {
                return cback();
              }
            );
          }, function(err, results) {
            fs.writeFile(SRC.appcache, JSON.stringify(fetchedURLs), function(err) {
              if (err) return console.log(err);
              prettyLog('\x1b[32mCampaign URLs Cached');
              return cb();
            });
          });
        } else {
          prettyLog('\x1b[33mThere are no new campaign pages at this time.');
          var err = new Error('no new campaign pages');
          throw err;
        }
      });
    } else {
      prettyLog('\x1b[31mUnable to fetch URLs');
      prettyLog('\x1b[31m'+error);
      var err = new Error('screenshots-scrape failed');
      throw err;
    }
  });
});

/*--- Resize Screenshots (!!! requires imagemagick !!!) ---*/
gulp.task('screenshots-save',['screenshots-scrape'], function() {
  return Promise.all([
  gulp.src(SRC.screenshots.raw + '/*-d.png')
    .pipe(imageResize({
      width:300,
      height:300,
      crop:true,
      gravity: 'North',
      imageMagick: true
    }))
    .pipe(gulp.dest(SRC.screenshots.pub)),
  gulp.src(SRC.screenshots.raw + '/*-d.png')
    .pipe(imageResize({
      width:700,
      height:800,
      crop:true,
      gravity: 'North',
      imageMagick: true
    }))
    .pipe(rename({suffix:'-lg'}))
    .pipe(gulp.dest(SRC.screenshots.pub)),
  gulp.src(SRC.screenshots.raw +'/*-m.png')
    .pipe(imageResize({
      width:160,
      height:230,
      crop:true,
      gravity: 'North',
      imageMagick: true
    }))
    .pipe(gulp.dest(SRC.screenshots.pub))
  ]);  
});


gulp.task('screenshots-resize-only', function() {
  return Promise.all([
  gulp.src(SRC.screenshots.raw + '/*-d.png')
    .pipe(imageResize({
      width:300,
      height:300,
      crop:true,
      gravity: 'North',
      imageMagick: true
    }))
    .pipe(gulp.dest(SRC.screenshots.pub)),
  gulp.src(SRC.screenshots.raw + '/*-d.png')
    .pipe(imageResize({
      width:700,
      height:800,
      crop:true,
      gravity: 'North',
      imageMagick: true
    }))
    .pipe(rename({suffix:'-lg'}))
    .pipe(gulp.dest(SRC.screenshots.pub)),
  gulp.src(SRC.screenshots.raw +'/*-m.png')
    .pipe(imageResize({
      width:160,
      height:230,
      crop:true,
      gravity: 'North',
      imageMagick: true
    }))
    .pipe(gulp.dest(SRC.screenshots.pub))
  ]);  
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
  //.pipe(uglify())
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
