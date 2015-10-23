'use strict';

// Declare app level module which depends on views, and components
var landingPageWiz = angular.module('landingPageWiz', [
  'ngRoute'
]);

landingPageWiz.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'partials/main.html',
    }).
    when('/results', {
      templateUrl: 'partials/results.html',
      controller: 'resultsCtrl',
      controllerAs: 'results'
    }).
    when('/template/:templateId', {
      templateUrl: 'partials/detail.html',
      controller: 'detailCtrl',
      controllerAs: 'detail'
    }).
  otherwise({redirectTo: '/'});
}]);
