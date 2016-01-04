landingPageWiz.factory('fetchData', function($q, $http, $rootScope) {
  var cache;
  function getCampaigns() {
    var d = $q.defer();
    if (cache) {
      d.resolve(cache);
    } else {
      $rootScope.pageTransition = 'fadepage';
      $http({
        method: 'GET',
        url: 'http://web-q-hospital.prod.ehc.com/global/webq/report/campaign-pages/campaign-pages.json'
      }).then(
        function success(response) {
          cache = response.data;
          var c = cache.campaigns;
          for (var i=0; i < c.length; i++) {
            c[i].shortCode = MD5(c[i].id).substring(0, 6)
          }
          d.resolve(cache);
        },
        function failure(reason) {
          d.reject(reason);
        });
    }
    return d.promise;
  }
  function clearCache() {
    cache = null;
  }
  return {
    getCampaigns: getCampaigns,
    clearCache: clearCache,
    cache: cache
  };
});
