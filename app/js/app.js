'use strict';
var MD5=function(s){function L(k,d){return(k<<d)|(k>>>(32-d))}function K(G,k){var I,d,F,H,x;F=(G&2147483648);H=(k&2147483648);I=(G&1073741824);d=(k&1073741824);x=(G&1073741823)+(k&1073741823);if(I&d){return(x^2147483648^F^H)}if(I|d){if(x&1073741824){return(x^3221225472^F^H)}else{return(x^1073741824^F^H)}}else{return(x^F^H)}}function r(d,F,k){return(d&F)|((~d)&k)}function q(d,F,k){return(d&k)|(F&(~k))}function p(d,F,k){return(d^F^k)}function n(d,F,k){return(F^(d|(~k)))}function u(G,F,aa,Z,k,H,I){G=K(G,K(K(r(F,aa,Z),k),I));return K(L(G,H),F)}function f(G,F,aa,Z,k,H,I){G=K(G,K(K(q(F,aa,Z),k),I));return K(L(G,H),F)}function D(G,F,aa,Z,k,H,I){G=K(G,K(K(p(F,aa,Z),k),I));return K(L(G,H),F)}function t(G,F,aa,Z,k,H,I){G=K(G,K(K(n(F,aa,Z),k),I));return K(L(G,H),F)}function e(G){var Z;var F=G.length;var x=F+8;var k=(x-(x%64))/64;var I=(k+1)*16;var aa=Array(I-1);var d=0;var H=0;while(H<F){Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=(aa[Z]| (G.charCodeAt(H)<<d));H++}Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=aa[Z]|(128<<d);aa[I-2]=F<<3;aa[I-1]=F>>>29;return aa}function B(x){var k="",F="",G,d;for(d=0;d<=3;d++){G=(x>>>(d*8))&255;F="0"+G.toString(16);k=k+F.substr(F.length-2,2)}return k}function J(k){k=k.replace(/rn/g,"n");var d="";for(var F=0;F<k.length;F++){var x=k.charCodeAt(F);if(x<128){d+=String.fromCharCode(x)}else{if((x>127)&&(x<2048)){d+=String.fromCharCode((x>>6)|192);d+=String.fromCharCode((x&63)|128)}else{d+=String.fromCharCode((x>>12)|224);d+=String.fromCharCode(((x>>6)&63)|128);d+=String.fromCharCode((x&63)|128)}}}return d}var C=Array();var P,h,E,v,g,Y,X,W,V;var S=7,Q=12,N=17,M=22;var A=5,z=9,y=14,w=20;var o=4,m=11,l=16,j=23;var U=6,T=10,R=15,O=21;s=J(s);C=e(s);Y=1732584193;X=4023233417;W=2562383102;V=271733878;for(P=0;P<C.length;P+=16){h=Y;E=X;v=W;g=V;Y=u(Y,X,W,V,C[P+0],S,3614090360);V=u(V,Y,X,W,C[P+1],Q,3905402710);W=u(W,V,Y,X,C[P+2],N,606105819);X=u(X,W,V,Y,C[P+3],M,3250441966);Y=u(Y,X,W,V,C[P+4],S,4118548399);V=u(V,Y,X,W,C[P+5],Q,1200080426);W=u(W,V,Y,X,C[P+6],N,2821735955);X=u(X,W,V,Y,C[P+7],M,4249261313);Y=u(Y,X,W,V,C[P+8],S,1770035416);V=u(V,Y,X,W,C[P+9],Q,2336552879);W=u(W,V,Y,X,C[P+10],N,4294925233);X=u(X,W,V,Y,C[P+11],M,2304563134);Y=u(Y,X,W,V,C[P+12],S,1804603682);V=u(V,Y,X,W,C[P+13],Q,4254626195);W=u(W,V,Y,X,C[P+14],N,2792965006);X=u(X,W,V,Y,C[P+15],M,1236535329);Y=f(Y,X,W,V,C[P+1],A,4129170786);V=f(V,Y,X,W,C[P+6],z,3225465664);W=f(W,V,Y,X,C[P+11],y,643717713);X=f(X,W,V,Y,C[P+0],w,3921069994);Y=f(Y,X,W,V,C[P+5],A,3593408605);V=f(V,Y,X,W,C[P+10],z,38016083);W=f(W,V,Y,X,C[P+15],y,3634488961);X=f(X,W,V,Y,C[P+4],w,3889429448);Y=f(Y,X,W,V,C[P+9],A,568446438);V=f(V,Y,X,W,C[P+14],z,3275163606);W=f(W,V,Y,X,C[P+3],y,4107603335);X=f(X,W,V,Y,C[P+8],w,1163531501);Y=f(Y,X,W,V,C[P+13],A,2850285829);V=f(V,Y,X,W,C[P+2],z,4243563512);W=f(W,V,Y,X,C[P+7],y,1735328473);X=f(X,W,V,Y,C[P+12],w,2368359562);Y=D(Y,X,W,V,C[P+5],o,4294588738);V=D(V,Y,X,W,C[P+8],m,2272392833);W=D(W,V,Y,X,C[P+11],l,1839030562);X=D(X,W,V,Y,C[P+14],j,4259657740);Y=D(Y,X,W,V,C[P+1],o,2763975236);V=D(V,Y,X,W,C[P+4],m,1272893353);W=D(W,V,Y,X,C[P+7],l,4139469664);X=D(X,W,V,Y,C[P+10],j,3200236656);Y=D(Y,X,W,V,C[P+13],o,681279174);V=D(V,Y,X,W,C[P+0],m,3936430074);W=D(W,V,Y,X,C[P+3],l,3572445317);X=D(X,W,V,Y,C[P+6],j,76029189);Y=D(Y,X,W,V,C[P+9],o,3654602809);V=D(V,Y,X,W,C[P+12],m,3873151461);W=D(W,V,Y,X,C[P+15],l,530742520);X=D(X,W,V,Y,C[P+2],j,3299628645);Y=t(Y,X,W,V,C[P+0],U,4096336452);V=t(V,Y,X,W,C[P+7],T,1126891415);W=t(W,V,Y,X,C[P+14],R,2878612391);X=t(X,W,V,Y,C[P+5],O,4237533241);Y=t(Y,X,W,V,C[P+12],U,1700485571);V=t(V,Y,X,W,C[P+3],T,2399980690);W=t(W,V,Y,X,C[P+10],R,4293915773);X=t(X,W,V,Y,C[P+1],O,2240044497);Y=t(Y,X,W,V,C[P+8],U,1873313359);V=t(V,Y,X,W,C[P+15],T,4264355552);W=t(W,V,Y,X,C[P+6],R,2734768916);X=t(X,W,V,Y,C[P+13],O,1309151649);Y=t(Y,X,W,V,C[P+4],U,4149444226);V=t(V,Y,X,W,C[P+11],T,3174756917);W=t(W,V,Y,X,C[P+2],R,718787259);X=t(X,W,V,Y,C[P+9],O,3951481745);Y=K(Y,h);X=K(X,E);W=K(W,v);V=K(V,g)}var i=B(Y)+B(X)+B(W)+B(V);return i.toLowerCase()};

// Declare app level module which depends on views, and components
var landingPageWiz = angular.module('landingPageWiz', [
  'ngRoute',
  'ngAnimate',
  'angular.filter',
  'ngOnload'
]);

landingPageWiz.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'partials/main.html',
      controller: 'mainCtrl',
      controllerAs: 'main',
      resolve: {
        appdata: function(fetchData){return fetchData.getCampaigns()}
      }
    }).
    when('/debug', {
      templateUrl: 'partials/debug.html',
      controller: 'debugCtrl',
      controllerAs: 'debug',
      resolve: {
        appdata: function(fetchData){return fetchData.getCampaigns()}
      }
    }).
    when('/tag', {
      templateUrl: 'partials/tagtool.html',
      controller: 'tagtoolCtrl',
      controllerAs: 'tagtool',
      resolve: {
        appdata: function(fetchData){return fetchData.getCampaigns()}
      }
    }).
    when('/:shortCode', {
      templateUrl: 'partials/detail.html',
      controller: 'detailCtrl',
      controllerAs: 'detail',
      resolve: {
        appdata: function(fetchData){return fetchData.getCampaigns()}
      }
    }).
  otherwise({redirectTo: '/'});
}]);

// Function for page loading spinner
landingPageWiz.run(function($rootScope, $timeout, $window) {
  $rootScope.$on('$routeChangeStart', function() {
    $rootScope.loadingView = true;
  });
  $rootScope.$on('$routeChangeSuccess', function() {
    $rootScope.loadingView = false;
    $timeout(function () {
      $window.scrollTo(0,0);
    }, 400);
  });
  $rootScope.appName = 'Landing Page Wizard'
});

landingPageWiz.directive('ngSpinner', function() {
  return {
    template: '<div class=\"sk-fading-circle\">\r\n<div class=\"sk-circle1 sk-circle\"><\/div>\r\n<div class=\"sk-circle2 sk-circle\"><\/div>\r\n<div class=\"sk-circle3 sk-circle\"><\/div>\r\n<div class=\"sk-circle4 sk-circle\"><\/div>\r\n<div class=\"sk-circle5 sk-circle\"><\/div>\r\n<div class=\"sk-circle6 sk-circle\"><\/div>\r\n<div class=\"sk-circle7 sk-circle\"><\/div>\r\n<div class=\"sk-circle8 sk-circle\"><\/div>\r\n<div class=\"sk-circle9 sk-circle\"><\/div>\r\n<div class=\"sk-circle10 sk-circle\"><\/div>\r\n<div class=\"sk-circle11 sk-circle\"><\/div>\r\n<div class=\"sk-circle12 sk-circle\"><\/div>\r\n<\/div>'
  };
});

landingPageWiz.controller('detailCtrl', ['$sce', '$routeParams', 'appdata', '$filter', '$scope', '$rootScope', function($sce, $routeParams, appdata, $filter, $scope, $rootScope) {
  var templates = appdata.templates;
  var campaigns = appdata.campaigns;

  // Collect url paramters into  variables
  var cid = $routeParams.shortCode;

  // Grab the appropriate campaign object from "campaigns" data
  var campaign = $filter('filter')(campaigns, {shortCode: cid})[0];

  // TEMP FIX FOR TESTING ************
  var tid = campaign.templateId;

  // Grab the appropriate template object from "templates" data
  // We filter the array by id, the result is an array so we select element 0
  var template = $filter('filter')(templates, {id: tid})[0];

  // Make an array containing other campaigns using this template
  var otherCampaigns = $filter('filter')(campaigns, {templateId: tid,
  shortCode: "!" + cid }); // Exclude current campaign

  // Pass variables needed on the front to $scope

  this.iframeURL = $sce.trustAsResourceUrl(campaign.url);

  this.template = template;
  this.campaign = campaign;

  this.otherCampaigns = otherCampaigns;

  // Functionality for "Custom" style classes
  if(template.custom) {
    this.customFlag = "Custom";
  } else {
    this.customFlag = "Standard";
  }
  // Config for sliding page left/right
  this.slide = function(transition) {
    $rootScope.pageTransition = transition;
  };
  this.frameLoaded = function(){
    document.getElementById('campaign-frame').style.display = 'block';
    document.getElementById('iframe-loader').style.display = 'none';
  };
}]); //---------END DETAILCTRL---------//

landingPageWiz.controller('mainCtrl', ['$routeParams', 'appdata', '$filter', '$scope', '$rootScope', function($routeParams, appdata, $filter, $scope, $rootScope) {
  var templates = appdata.templates;
  var campaigns = appdata.campaigns;

  // Loop through campaigns to add template title
  // from "templates" data (based on templateId)
  for (var i=0; i < campaigns.length; i++) {
    // Grab template
    var template = $filter('filter')(templates, {id: campaigns[i].templateId})[0];
    // Create a templateTitle property
    campaigns[i].templateTitle = template.title;
  }

  // Pass campaigns data to $scope for use on the front
  this.campaigns = campaigns;

  // Config for sliding page left/right
  this.slide = function(transition) {
    $rootScope.pageTransition = transition;
  };
}]); //---------END MAINCTRL---------//

landingPageWiz.controller('debugCtrl', ['appdata', function(appdata) {
  this.templates = appdata.templates;
  this.campaigns = appdata.campaigns;
  this.printdata = appdata;
}]); //---------END DEBUGCTRL---------//

landingPageWiz.controller('tagtoolCtrl', ['appdata', function(appdata) {
  this.templates = appdata.templates;
  this.campaigns = appdata.campaigns;
  this.printdata = appdata;
}]); //---------END TAGTOOLCTRL---------//

landingPageWiz.factory('fetchData', function($q, $http, $rootScope) {
  var cache;
  function getCampaigns() {
    var d = $q.defer();
    if (cache) {
      d.resolve(cache);
    } else {
      $rootScope.pageTransition = 'fadepage';
      $http({
        method: 'GET',
        url: 'http://web-q-hospital.prod.ehc.com/global/webq/report/campaign-pages/campaign-pages.json'
      }).then(
        function success(response) {
          cache = response.data;
          var c = cache.campaigns;
          for (var i=0; i < c.length; i++) {
            c[i].shortCode = MD5(c[i].id).substring(0, 6)
          }
          d.resolve(cache);
        },
        function failure(reason) {
          d.reject(reason);
        });
    }
    return d.promise;
  }
  function clearCache() {
    cache = null;
  }
  return {
    getCampaigns: getCampaigns,
    clearCache: clearCache,
    cache: cache
  };
});
