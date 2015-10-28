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
      controllerAs: 'main'
    }).
    when('/template/:templateId', {
      templateUrl: 'partials/detail.html',
      controller: 'detailCtrl',
      controllerAs: 'detail'
    }).
    when('/template/:templateId/c/:campaignId', {
      templateUrl: 'partials/detail.html',
      controller: 'detailCtrl',
      controllerAs: 'detail'
    }).
  otherwise({redirectTo: '/'});
}]);
