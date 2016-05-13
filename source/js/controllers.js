landingPageGallery.controller('mainCtrl', ['$routeParams', 'appdata', '$filter', '$scope', '$rootScope', 'appCache', function($routeParams, appdata, $filter, $scope, $rootScope, appCache) {
  var ctrl = this;
  ctrl.filters = appCache.get('filters');
  var templates = appdata.templates;
  var campaigns = appdata.campaigns;
  var topics = [];
  var types = [];
  var templatesCurrent = [];


  // Loop through campaigns to add template title
  // from "templates" data (based on templateId)
  for (var i=0; i < campaigns.length; i++) {
    // Grab template
    var template = $filter('filter')(templates, {id: campaigns[i].templateId})[0];
    // Create a templateTitle property
    campaigns[i].templateTitle = template.title;
    topics = topics.concat(campaigns[i].topic);
    types = types.concat(campaigns[i].type);
    templatesCurrent = templatesCurrent.concat(template);
  }

  // Remove duplicates
  topics = $filter('unique')(topics,'toString()');
  types = $filter('unique')(types,'toString()');
  templatesCurrent = $filter('unique')(templatesCurrent,'id');
  // Sort by alpha ascending
  topics = $filter('orderBy')(topics,'toString()');
  types = $filter('orderBy')(types,'toString()');
  templatesCurrent = $filter('orderBy')(templatesCurrent,'title');

  // Pass campaigns data to controllerAs for use on the front
  ctrl.campaigns = campaigns;

  ctrl.topics = topics;
  ctrl.types = types;
  ctrl.templates = templatesCurrent;

  // Filter campaigns array
  ctrl.filterResults = function() {
    var temp =  $filter('filter')(campaigns, {$: ctrl.filters.quicksearch});
    ctrl.campaigns =  $filter('filter')(temp, {topic: ctrl.filters.topic || undefined, type: ctrl.filters.type || undefined, templateId: ctrl.filters.templateId || undefined}, true);
    appCache.set('filters', ctrl.filters);
  };
  ctrl.filterResults();

  ctrl.clearSearch = function() {
    ctrl.campaigns = campaigns;
    var filters = ctrl.filters;
    Object.keys(filters).forEach(function(prop, i, arr) {
      filters[prop] = '';
    });
    ctrl.filters = filters;
  }

  // Config for sliding page left/right
  ctrl.slide = function(transition) {
    $rootScope.pageTransition = transition;
  };
}]); //---------END MAINCTRL---------//

landingPageGallery.controller('detailCtrl', ['$window', '$sce', '$routeParams', 'appdata', '$filter', '$scope', '$rootScope', '$location', 'emailService', function($window, $sce, $routeParams, appdata, $filter, $scope, $rootScope, $location, emailService) {
  var ctrl = this;
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
  ctrl.iframeURL = $sce.trustAsResourceUrl(campaign.url);
  ctrl.template = template;
  ctrl.campaign = campaign;
  ctrl.otherCampaigns = otherCampaigns;

  ctrl.renderHTML = function(html) {
    var decoded = angular.element('<textarea />').html(html).text();
    return $sce.trustAsHtml(decoded);
  };

  ctrl.sendEmail = function(){
    var base = $location.protocol() + '://' + $location.host() + '/lpg/',
    errorURL = base + 'process-form.dot',
    returnURL = errorURL + '?submitted=true',
    landingPageURL = base + '#/' + ctrl.campaign.shortCode,
    fromAddress = 'no-reply@' + $location.host();
    var formData = {
      'from': fromAddress,
      'to': 'corp.digitalmarketing@hcahealthcare.com',
      'subject': 'Landing Page Gallery - Request',
      'returnUrl': returnURL,
      'errorURL': errorURL,
      'formType': 'Landing Page Gallery - Request a new landing page',
      'url': base,
      'First Name': $rootScope.lpgUser.firstName,
      'Last Name': $rootScope.lpgUser.lastName,
      'Division': $rootScope.lpgUser.division,
      'Email': $rootScope.lpgUser.email,
      'Campaign Example': ctrl.campaign.title,
      'Campaign Ex URL': ctrl.campaign.url,
      'Template Name': ctrl.template.title,
      'Build Time': ctrl.template.buildTime,
      'Gallery URL': landingPageURL,
      'order': 'subject,First Name,Last Name,Email,Division,Template Name,Build Time,Gallery URL,Campaign Example,Campaign Ex URL,url'
    };
    emailService.send(formData);
  }

  // Functionality for "Custom" style classes
  if(template.custom) {
    ctrl.customFlag = "Custom";
  } else {
    ctrl.customFlag = "Standard";
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
  ctrl.slide = function(transition) {
    $rootScope.pageTransition = transition;
  };

  // Show loading spinner until iframe is fully loaded
  ctrl.frameLoaded = function(){
    document.getElementById('campaign-frame').style.display = 'block';
    document.getElementById('iframe-loader').style.display = 'none';
  };
}]); //---------END DETAILCTRL---------//

landingPageGallery.controller('debugCtrl', ['appdata', function(appdata) {
  ctrl.templates = appdata.templates;
  ctrl.campaigns = appdata.campaigns;
  ctrl.printdata = appdata;
}]); //---------END DEBUGCTRL---------//

landingPageGallery.controller('tagtoolCtrl', ['appdata', function(appdata) {
  ctrl.templates = appdata.templates;
  ctrl.campaigns = appdata.campaigns;
}]); //---------END TAGTOOLCTRL---------//
