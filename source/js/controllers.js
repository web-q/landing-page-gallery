landingPageWiz.controller('detailCtrl', ['$sce', '$routeParams', 'appdata', '$filter', '$scope', '$rootScope', function($sce, $routeParams, appdata, $filter, $scope, $rootScope) {
  var templates = appdata.templates;
  var campaigns = appdata.campaigns;

  // Collect url paramters into  variables
  var cid = $routeParams.shortCode;

  // Grab the appropriate campaign object from "campaigns" data
  var campaign = $filter('filter')(campaigns, {shortCode: cid})[0];

  // TEMP FIX FOR TESTING ************
  var tid = campaign.templateId;

  // Grab the appropriate template object from "templates" data
  // We filter the array by id, the result is an array so we select element 0
  var template = $filter('filter')(templates, {id: tid})[0];

  // Make an array containing other campaigns using this template
  var otherCampaigns = $filter('filter')(campaigns, {templateId: tid,
  shortCode: "!" + cid }); // Exclude current campaign

  // Pass variables needed on the front to $scope

  this.iframeURL = $sce.trustAsResourceUrl(campaign.url);

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
  this.frameLoaded = function(){
    document.getElementById('campaign-frame').style.display = 'block';
    document.getElementById('iframe-loader').style.display = 'none';
  };
}]); //---------END DETAILCTRL---------//

landingPageWiz.controller('mainCtrl', ['$routeParams', 'appdata', '$filter', '$scope', '$rootScope', function($routeParams, appdata, $filter, $scope, $rootScope) {
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
    $rootScope.pageTransition = transition;
  };
}]); //---------END MAINCTRL---------//

landingPageWiz.controller('debugCtrl', ['appdata', function(appdata) {
  this.templates = appdata.templates;
  this.campaigns = appdata.campaigns;
  this.printdata = appdata;
}]); //---------END DEBUGCTRL---------//

landingPageWiz.controller('tagtoolCtrl', ['appdata', function(appdata) {
  this.templates = appdata.templates;
  this.campaigns = appdata.campaigns;
  this.printdata = appdata;
}]); //---------END TAGTOOLCTRL---------//
