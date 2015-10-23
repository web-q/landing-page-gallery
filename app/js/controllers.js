// landingPageWiz.controller('mainCtrl', ['$route', '$routeParams', '$location',
//   function($route, $routeParams, $location) {
//     this.$route = $route;
//     this.$location = $location;
//     this.$routeParams = $routeParams;
// }]);

landingPageWiz.controller('detailCtrl', ['$routeParams', 'templates', '$filter', '$scope', function($routeParams, templates, $filter, $scope) {
  $scope.controllerName = "detailCtrl";
  $scope.params = $routeParams;
	var tid = $routeParams.templateId;

	// We filter the array by id, the result is an array
	// so we select the element 0
	$scope.template = $filter('filter')(templates, function (d){return d.id === parseInt(tid);})[0];
}]);

landingPageWiz.controller('resultsCtrl', ['$routeParams', '$scope', 'templates', function($routeParams, $scope, templates) {
	$scope.controllerName = "resultsCtrl";
	$scope.templates = templates;
}]);
