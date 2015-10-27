'use strict';

landingPageWiz.factory('appdata', function($http, $q, $timeout) {
  var
  templatesURL =
  "http://web-q-hospital.prod.ehc.com/global/webq/landing-page-wizard/v1/test-data/templates.json",
  campaignsURL =
  "http://web-q-hospital.prod.ehc.com/global/webq/landing-page-wizard/v1/test-data/campaigns.json";


  // var appdata = {};
  // appdata.templates = [];
  // appdata.campaigns = [];
  //
  // var HTTPtemplates = $http.get(templatesURL),
  //     HTTPcampaigns = $http.get(campaignsURL);
  // $q.all([HTTPtemplates,HTTPcampaigns]).then(function(responses){
  //     for (var i=0;i<responses[0].length;i++) {
  //       appdata.templates.push(responses[0][i]);
  //     }
  //     for (var j=0;j<responses[1].length;j++) {
  //       appdata.campaigns.push(responses[1][j]);
  //     }
  // });



  var getdata = {};
  var appdata = {};
  appdata.campaigns = [];
  appdata.templates = [];

  getdata.templates = {
      fetch: function() {
              return $http.get(templatesURL).then(function(response) {
                  return response.data.templates;
              });
      }
  };
  getdata.campaigns = {
      fetch: function() {
              return $http.get(campaignsURL).then(function(response) {
                  return response.data.campaigns;
              });
      }
  };
  getdata.campaigns.fetch().then(function(data) {
    for (var i=0;i<data.length;i++) {
      appdata.campaigns.push(data[i]);
    }
  });
  getdata.templates.fetch().then(function(data) {
    for (var i=0;i<data.length;i++) {
      appdata.templates.push(data[i]);
    }
  });
  return appdata;
});
