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
          var c = cache.campaigns;
          for (var i=0; i < c.length; i++) {
            c[i].shortCode = MD5(c[i].id).substring(0, 6)
          }
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
landingPageGallery.factory('searchCache', function($cacheFactory) {
  return $cacheFactory('searchCache');
});
landingPageGallery.factory('searchParams', function(searchCache) {
  return {
      get: function(key) {
          var params = searchCache.get(key);
          if(params) {
              return params;
          }
          return '';
      },
      set: function(key, value) {
          searchCache.put(key, value);
      },
      clear: function(key) {
          searchCache.put(key, '');
      }
  };
});
