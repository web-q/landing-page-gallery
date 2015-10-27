'use strict';

landingPageWiz.factory('appdata', function($http, $q) {
  var
  templatesURL =
  "http://web-q-hospital.prod.ehc.com/global/webq/landing-page-wizard/v1/test-data/templates.json",
  campaignsURL =
  "http://web-q-hospital.prod.ehc.com/global/webq/landing-page-wizard/v1/test-data/campaigns.json";
  var appdata = {};
  appdata.templates = [];
  appdata.campaigns = [];

  var HTTPtemplates = $http.get(templatesURL),
      HTTPcampaigns = $http.get(campaignsURL);
  $q.all([HTTPtemplates,HTTPcampaigns]).then(function(responses){
      var tmp = [];
      angular.forEach(responses, function(response) {
        tmp.push(response.data);
      });
      return tmp;
    }).then(function(tmpResult){
      var templateData = tmpResult[0].templates;
      for (var i=0;i<templateData.length;i++) {
        appdata.templates.push(templateData[i]);
      }
      return tmpResult;
    }).then(function(tmpResult){
      var campData = tmpResult[1].campaigns;
      for (var j=0;j<campData.length;j++) {
        appdata.campaigns.push(campData[j]);
      }
    });
  return appdata;
});
