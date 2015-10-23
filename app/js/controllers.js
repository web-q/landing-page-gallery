landingPageWiz.controller('mainCtrl', ['$route', '$routeParams', '$location',
  function($route, $routeParams, $location) {
    this.$route = $route;
    this.$location = $location;
    this.$routeParams = $routeParams;
}]);

landingPageWiz.controller('detailCtrl', ['$routeParams', 'templates', '$filter', '$scope', function($routeParams, templates, $filter, $scope) {
  $scope.controllerName = "detailCtrl";
  this.params = $routeParams;
	// this.tid = this.params.templateId;
	$scope.template = templates[2];
	// We filter the array by id, the result is an array
	// so we select the element 0
	$scope.temp = $filter('filter')(templates, function (d){return d.id === 2;})[0];

	// If you want to see the result, just check the log
	// console.log(single_object);
}]);

landingPageWiz.controller('resultsCtrl', ['$routeParams', '$scope', 'templates', function($routeParams, $scope, templates) {
	$scope.templates = templates;
	$scope.controllerName = "resultsCtrl";
  this.params = $routeParams;
}]);
