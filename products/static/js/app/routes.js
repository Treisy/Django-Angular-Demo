(function() {
'use strict;'

// Think of this like Django URLS.
URLS = function($routeProvider) { 
  $routeProvider
    .when('/', {
      templateUrl: 'includes/hero.html',
    })
    .when('/products/', {
      templateUrl: 'includes/list.html',
      controllerAs: 'list',
      controller: 'productListCtrlFn'
    })
    .when('/products/new/:productPk?', {
      templateUrl: 'includes/product_form.html',
      controllerAs: 'product',
      controller: 'productFormCtrlFn',
    })
    .when('/products/:productPk/', {
      templateUrl: 'includes/product.html',
      controllerAs: 'detail',
      controller: 'productDetailCtrlFn'
    })
    .when('/images/new/:imagePk?', {
      templateUrl: 'includes/image_form.html',
      controllerAs: 'image',
      controller: 'imageCtrlFn'
    })
    .otherwise({
      redirectTo: '/'
    })
}

// This is the module name.
angular.module('routes', [
  // Angular.js routing module.
  'ngRoute',
  // Think of this like imports.
  'services',
  ])
  .config(URLS)

})();
