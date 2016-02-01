landingPageGallery.controller('mainCtrl', ['$timeout', '$routeParams', 'appdata', '$filter', '$scope', '$rootScope', function($timeout, $routeParams, appdata, $filter, $scope, $rootScope) {
  var templates = appdata.templates;
  var campaigns = appdata.campaigns;
  var topics = [];
  var types = [];

  // Loop through campaigns to add template title
  // from "templates" data (based on templateId)
  for (var i=0; i < campaigns.length; i++) {
    // Grab template
    var template = $filter('filter')(templates, {id: campaigns[i].templateId})[0];
    // Create a templateTitle property
    campaigns[i].templateTitle = template.title;
    topics = topics.concat(campaigns[i].topic);
    types = types.concat(campaigns[i].type);
  }

  // Pass campaigns data to controllerAs for use on the front
  this.campaigns = campaigns;
  this.topics = topics;
  this.types = types;
  this.templates = templates;

  // Filter campaigns array
  this.filterResults = function() {
    var temp =  $filter('filter')(campaigns, {$: this.quicksearch});
    this.campaigns =  $filter('filter')(temp, {topic: this.filters.topic || undefined, type: this.filters.type || undefined, templateId: this.filters.templateId || undefined}, true);
    $timeout(function () {
      $rootScope.$emit('lazyImg:refresh');
    }, 200);
  };

  // Config for sliding page left/right
  this.slide = function(transition) {
    $rootScope.pageTransition = transition;
  };
}]); //---------END MAINCTRL---------//

landingPageGallery.controller('detailCtrl', ['$window', '$sce', '$routeParams', 'appdata', '$filter', '$scope', '$rootScope', function($window, $sce, $routeParams, appdata, $filter, $scope, $rootScope) {
  var templates = appdata.templates;
  var campaigns = appdata.campaigns;

  // Collect url paramters into variables
  var cid = $routeParams.shortCode;

  // Grab the appropriate campaign object from "campaigns" data
  var campaign = $filter('filter')(campaigns, {shortCode: cid})[0];
  var tid = campaign.templateId;

  // Grab the appropriate template object from "templates" data
  // We filter the array by id, the result is an array so we select element 0
  var template = $filter('filter')(templates, {id: parseInt(tid)}, true)[0];

  // Make an array containing other campaigns using this template
  var otherCampaigns = $filter('filter')(campaigns, {templateId: tid,
  shortCode: "!" + cid }, true); // Exclude current campaign
  // Randomize results
  otherCampaigns = shuffleArray(otherCampaigns);

  // Pass variables needed on the front to controllerAs
  this.iframeURL = $sce.trustAsResourceUrl(campaign.url);
  this.template = template;
  this.campaign = campaign;
  this.otherCampaigns = otherCampaigns;

  this.renderHTML = function(html) {
    var decoded = angular.element('<textarea />').html(html).text();
    return $sce.trustAsHtml(decoded);
  };

  // Functionality for "Custom" style classes
  if(template.custom) {
    this.customFlag = "Custom";
  } else {
    this.customFlag = "Standard";
  }

  // Detect window width for displaying the iframe preview
  $scope.windowWidth = $window.innerWidth;
  angular.element($window).bind('resize', function(){
    $scope.windowWidth = $window.innerWidth;
    // manuall $digest required as resize event
    // is outside of angular
    $scope.$digest();
  });

  // Config for sliding page left/right
  this.slide = function(transition) {
    $rootScope.pageTransition = transition;
  };

  // Show loading spinner until iframe is fully loaded
  this.frameLoaded = function(){
    document.getElementById('campaign-frame').style.display = 'block';
    document.getElementById('iframe-loader').style.display = 'none';
  };
}]); //---------END DETAILCTRL---------//

landingPageGallery.controller('debugCtrl', ['appdata', function(appdata) {
  this.templates = appdata.templates;
  this.campaigns = appdata.campaigns;
  this.printdata = appdata;
}]); //---------END DEBUGCTRL---------//

landingPageGallery.controller('tagtoolCtrl', ['appdata', function(appdata) {
  this.templates = appdata.templates;
  this.campaigns = appdata.campaigns;
}]); //---------END TAGTOOLCTRL---------//
