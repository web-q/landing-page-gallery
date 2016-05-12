landingPageGallery.factory('fetchData', function($q, $http, $rootScope) {
  var cache;
  function getCampaigns() {
    var d = $q.defer();
    if (cache) {
      d.resolve(cache);
    } else {
      $rootScope.loadingView = true;
      $rootScope.pageTransition = 'fadepage';
      $http({
        method: 'GET',
        url: 'http://web-q-hospital.prod.ehc.com/global/webq/report/campaign-pages/campaign-pages.json'
      }).then(
        function success(response) {
          $rootScope.dataFetched = true; console.log('Data Fetched');
          cache = response.data;
          for (var i=0; i < cache.campaigns.length; i++) {
            cache.campaigns[i].shortCode = MD5(cache.campaigns[i].id).substring(0, 6)
          }
          cache.campaigns = shuffleArray(cache.campaigns);
          $rootScope.$watch('splashFinished', function(){
            if($rootScope.splashFinished){
              console.log('Animation Complete');
              return d.resolve(cache);
            }
          });
          $rootScope.$watch('skipIntro', function(){
            if($rootScope.skipIntro){
              console.log('Skipping Introduction');
              return d.resolve(cache);
            }
          });
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


// Caching of search paramaters
landingPageGallery.factory('cacher', function($cacheFactory) {
  return $cacheFactory('cacher');
});
landingPageGallery.factory('appCache', function(cacher) {
  return {
      get: function(key) {
          var params = cacher.get(key);
          if(params) {
              return params;
          }
          return '';
      },
      set: function(key, value) {
          cacher.put(key, value);
      },
      clear: function(key) {
          cacher.put(key, '');
      }
  };
});
