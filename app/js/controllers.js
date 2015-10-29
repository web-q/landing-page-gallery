'use strict';

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
    $rootScope.slidePage = transition;
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
    // Grab template
    var template = $filter('filter')(templates, {id: campaigns[i].templateId})[0];
    // Create a templateTitle property
    campaigns[i].templateTitle = template.title;
  }

  // Pass campaigns data to $scope for use on the front
  this.campaigns = campaigns;

  // Config for sliding page left/right
  this.slide = function(transition) {
    $rootScope.slidePage = transition;
  };
  // Set scroll back to top of page
  $rootScope.$on("$routeChangeSuccess", function (event, currentRoute, previousRoute) {
    window.scrollTo(0, 0);
  });
}]); //---------END MAINCTRL---------//
