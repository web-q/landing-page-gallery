'use strict';

landingPageWiz.controller('detailCtrl', ['$routeParams', 'templates', 'campaigns', '$filter', '$scope', '$rootScope', function($routeParams, templates, campaigns, $filter, $scope, $rootScope) {
  // Collect url paramters into  variables
	var tid = $routeParams.templateId;
  var cid = $routeParams.campaignId;

  // Grab the appropriate template object from "templates" data
	// We filter the array by id, the result is an array
	// so we select the element 0
	var template = $filter('filter')(templates, {id: tid})[0];

  // If no campaignId declared use default from templates data
  if (!cid){
    cid = template.defaultCampaignId;
  }

  // Grab the appropriate campaign object from "campaigns" data
  var campaign = $filter('filter')(campaigns, {id: cid})[0];

  // Make an array containing other campaigns using this template
  var otherCampaigns = $filter('filter')(campaigns, {templateId: tid,
  // Exclude current campaign
  id: "!" + cid });

  // Pass variables needed on the front to $scope
  $scope.template = template;
  $scope.campaign = campaign;
  $scope.otherCampaigns = otherCampaigns;

  // Functionality for "Custom" style classes
  if(template.custom) {
    $scope.customFlag = "Custom";
  } else {
    $scope.customFlag = "Standard";
  }
	$scope.slide = function(transition) {
		$rootScope.slidePage = transition;
	};
	$rootScope.$on("$routeChangeSuccess", function (event, currentRoute, previousRoute) {
    window.scrollTo(0, 0);
	});
}]);

landingPageWiz.controller('mainCtrl', ['$routeParams', '$scope', 'templates', 'campaigns', '$filter', '$rootScope', function($routeParams, $scope, templates, campaigns, $filter, $rootScope) {
  // Loop through campaigns to add template title
  // from "templates" data (based on templateId)
  for (var i=0; i < campaigns.length; i++) {
    // Grab template
    var template = $filter('filter')(templates, {id: campaigns[i].templateId})[0];
    // Create a templateTitle property
    campaigns[i].templateTitle = template.title;
  }

  // Pass campaigns data to $scope for use on the front
  $scope.campaigns = campaigns;
	$scope.slide = function(transition) {
		$rootScope.slidePage = transition;
	};
	$rootScope.$on("$routeChangeSuccess", function (event, currentRoute, previousRoute) {
    window.scrollTo(0, 0);
	});
}]);
