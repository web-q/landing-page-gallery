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
