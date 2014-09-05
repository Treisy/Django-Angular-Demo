(function() {
'use strict;'

angular.module('routes', [   // module name
  'ngRoute',                 // Angular.js routing module
  'products'                 // Think of this like imports
  ])
  .config(['$routeProvider', // Think of this like Django URLS
    function($routeProvider) { 
      $routeProvider
        .when('/', {
          templateUrl: 'includes/hero.html',
        })
        .when('/products/', {
          templateUrl: 'includes/list.html',
          controllerAs: 'list',
          controller: 'productListCtrl'
        })
        .when('/products/new/', {
          templateUrl: 'includes/form.html',
          controllerAs: 'product',
          controller: 'productFormCtrl'
        })
        .when('/products/new/:productPk/', {
          templateUrl: 'includes/form.html',
          controllerAs: 'product',
          controller: 'productFormCtrl',
        })
        .when('/products/:productPk/', {
          templateUrl: 'includes/product.html',
          controllerAs: 'detail',
          controller: 'productDetailCtrl'
        })
        .otherwise({
          redirectTo: '/'
        })
    }])

productListCtrl = function($scope, productSvc) {
  productSvc.list(function(data){
    $scope.products = data;
  })
}

productFormCtrl = function($location, $routeParams, $scope, productSvc) {
  var save
  var intTypes = [ 'size', ]

  if ($routeParams.productPk != undefined) {
    if (productSvc._curObject == undefined) {
      $location.path("/products/")
    }
    object = productSvc._curObject
    for (key in object) {
      if (object.hasOwnProperty(key)) {
        intTypes.indexOf(key) >= 0 ? this[key] = parseInt(object[key]) : this[key] = object[key]
      }
    }
    this.save = function(){
    productSvc.update($routeParams.productPk, $scope.product, function(data) {
      $scope.response = data;
    })
    $location.path("/products/")
  }
  } else {
    this.save = function(){
      productSvc.create($scope.product, function(data){
        $scope.response = data;
      })
      $location.path("/products/")
    }
  }
}

productDetailCtrl = function($location, $routeParams, $scope, productSvc) {
  var remove

  productSvc.read($routeParams.productPk, function(data) {
    productSvc._curObject = data
    $scope.product = data
  })
  this.remove = function(pk){
    this.remove = productSvc.remove(pk, function(data) {
      $scope.response = data
    })
    $location.path("/products/")
  }
}

})();
