(function() {
'use strict;'

angular.module('routes', [  // module name
    'ngRoute',              // Angular.js route module
    'products'
    ])
    .config(['$routeProvider',
        function($routeProvider) {
            // Like Django URLS
            $routeProvider
              .when('/', {
                templateUrl: 'includes/hero.html',
              })
              .when('/products/', {
                templateUrl: 'includes/list.html',
                controllerAs: 'product',
                controller: 'productListCtrl'
              })
              .when('/products/new/', {
                templateUrl: 'includes/form.html',
                controllerAs: 'product',
                controller: 'productFormCtrl'
              })
              .when('/products/:productPk/', {
                templateUrl: 'includes/product.html',
                controllerAs: 'product',
                controller: 'productListCtrl'
              })
              .otherwise({
                redirectTo: '/'
              })
        }])

})();
