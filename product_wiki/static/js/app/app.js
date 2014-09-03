(function() {
'use strict;'

// Like Django INSTALLED_APPS or imports!
// but the first one is its name
angular
  .module('app', [
    'ui.router',
    'ng.django.urls',
    'products',
  ])

  .config([
    '$httpProvider',
    '$routeProvider',
    function($httpProvider, $routeProvider) {
      $httpProvider
        .defaults
          .headers
            .common['X-Requested-With'] = 'XMLHttpRequest';
      $routeProvider
        .when('/p/', {
          template: 'productList',
          controllerAs:'product',
          controller:'productCtrl'
        })
        .when('/img/', {
          template: 'imageList',
          controllerAs:'image',
          controller:'imageCtrl'
        })
        .otherwise('/');
    }])

})();
