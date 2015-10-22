'use strict';

// Declare app level module which depends on views, and components
var landingPageWiz = angular.module('landingPageWiz', [
  'ngRoute'
]);

landingPageWiz.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/main', {
      templateUrl: 'partials/main.html',
    }).
    when('/results', {
      templateUrl: 'partials/results.html',
    }).
    when('/detail', {
      templateUrl: 'partials/detail.html',
    }).
  otherwise({redirectTo: '/main'});
}]);
