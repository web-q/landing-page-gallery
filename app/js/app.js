'use strict';

// Declare app level module which depends on views, and components
var landingPageWiz = angular.module('landingPageWiz', [
  'ngRoute',
  'ngAnimate',
  'angular.filter'
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
    when('/:templateId', {
      templateUrl: 'partials/detail.html',
      controller: 'detailCtrl',
      controllerAs: 'detail',
      resolve: {
        appdata: function(fetchData){return fetchData.getCampaigns()}
      }
    }).
    when('/:templateId/:campaignId', {
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
landingPageWiz.run(function($rootScope) {
  $rootScope.$on('$routeChangeStart', function(ev,data) {
    $rootScope.loadingView = true;
  });
  $rootScope.$on('$routeChangeSuccess', function(ev,data) {
    $rootScope.loadingView = false;
  });
});

landingPageWiz.controller('detailCtrl', ['$routeParams', 'appdata', '$filter', '$scope', '$rootScope', function($routeParams, appdata, $filter, $scope, $rootScope, $http) {
  var templates = appdata.templates;
  var campaigns = appdata.campaigns;

  // Collect url paramters into  variables
  var tid = $routeParams.templateId;
  var cid = $routeParams.campaignId;

  // Grab the appropriate template object from "templates" data
  // We filter the array by id, the result is an array so we select element 0
  var template = $filter('filter')(templates, {id: tid})[0];

  // If no campaignId declared use default from templates data
  if (!cid){
    cid = template.defaultCampaignId;
  }

  // Grab the appropriate campaign object from "campaigns" data
  var campaign = $filter('filter')(campaigns, {id: cid})[0];

  // Make an array containing other campaigns using this template
  var otherCampaigns = $filter('filter')(campaigns, {templateId: tid,
  id: "!" + cid }); // Exclude current campaign

  // Pass variables needed on the front to $scope
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
  // Set scroll back to top of page
  $rootScope.$on("$routeChangeSuccess", function (event, currentRoute, previousRoute) {
    window.scrollTo(0, 0);
  });
}]); //---------END DETAILCTRL---------//

landingPageWiz.controller('mainCtrl', ['$routeParams', '$scope', 'appdata', '$filter', '$rootScope', function($routeParams, $scope, appdata, $filter, $rootScope) {
  var templates = appdata.templates;
  var campaigns = appdata.campaigns;

  // Loop through campaigns to add template title
  // from "templates" data (based on templateId)
  for (var i=0; i < campaigns.length; i++) {
    // FAKE Fix until JSON is fixed
    campaigns[i].templateId = '1';
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
  // Set scroll back to top of page
  $rootScope.$on("$routeChangeSuccess", function (event, currentRoute, previousRoute) {
    window.scrollTo(0, 0);
  });
}]); //---------END MAINCTRL---------//

landingPageWiz.controller('debugCtrl', ['$routeParams', '$scope', 'appdata', '$filter', '$rootScope', function($routeParams, $scope, appdata, $filter, $rootScope) {
  this.templates = appdata.templates;
  this.campaigns = appdata.campaigns;
  this.printdata = appdata;
}]); //---------END DEBUGCTRL---------//

landingPageWiz.factory('fetchData', function($q, $http) {
  var cache;
  function getCampaigns() {
    var d = $q.defer();
    if (cache) {
      d.resolve(cache);
    } else {
      $http({
        method: 'GET',
        url: 'http://web-q-hospital.prod.ehc.com/global/webq/report/campaign-pages/campaign-pages.json'
      }).then(
        function success(response) {
          cache = response.data;
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
    clearCache: clearCache
  };
});
