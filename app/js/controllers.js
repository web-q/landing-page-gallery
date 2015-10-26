'use strict';

// landingPageWiz.controller('mainCtrl', ['$route', '$routeParams', '$location',
//   function($route, $routeParams, $location) {
//     this.$route = $route;
//     this.$location = $location;
//     this.$routeParams = $routeParams;
// }]);

landingPageWiz.controller('detailCtrl', ['$routeParams', 'templates', 'campaigns', '$filter', '$scope', function($routeParams, templates, campaigns, $filter, $scope) {
  $scope.controllerName = "detailCtrl";
  $scope.params = $routeParams;
	var tid = $routeParams.templateId;
  var cid = $routeParams.campaignId;

	// We filter the array by id, the result is an array
	// so we select the element 0
	var template = $filter('filter')(templates, {id: tid})[0];
  var campaign = $filter('filter')(campaigns, {id: cid})[0];
  $scope.template = template;
  $scope.campaign = campaign;
  if(template.custom) {
    $scope.customFlag = "Custom";
  } else {
    $scope.customFlag = "Standard";
  }
}]);

landingPageWiz.controller('resultsCtrl', ['$routeParams', '$scope', 'templates', 'campaigns', '$filter', function($routeParams, $scope, templates, campaigns, $filter) {
	$scope.controllerName = "resultsCtrl";
  for (var i=0; i < campaigns.length; i++) {
    var tid = campaigns[i].templateId;
    var template = $filter('filter')(templates, {id: tid})[0];
    campaigns[i].templateTitle = template.title;
  }
  $scope.campaigns = campaigns;
}]);
