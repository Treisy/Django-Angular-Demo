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

  // Check if coming from product list as edit
  if ($routeParams.productPk != undefined) {
    // Redirect if object editing was accessed directly
    if (productSvc._curObject == undefined) {
      $location.path("/products/")
    }
    object = productSvc._curObject
    // Bind object keys and values to scope
    for (key in object) {
      if (object.hasOwnProperty(key)) {
        // Based on keys in array of intTypes, bind as number or string.
        intTypes.indexOf(key) >= 0 ? this[key] = parseInt(object[key]) : this[key] = object[key]
      }
    }
    // Scope has save functionality
    // Save means update
    this.save = function(){
    // Access Product Service for update functionality
      productSvc.update($routeParams.productPk, $scope.product, function(data) {
        $scope.response = data;
      })
      // Redirect after action
      $location.path("/products/")
    }
  } else {
    // Save means new object
    this.save = function(){
    // Access Product Service for create functionality
      productSvc.create($scope.product, function(data){
        $scope.response = data;
      })
      // Redirect after action
      $location.path("/products/")
    }
  }
}

productDetailCtrl = function($location, $routeParams, $scope, productSvc) {
  var remove

  // Access Product Service for read functionality
  productSvc.read($routeParams.productPk, function(data) {
    // Bind object to scope
    $scope.product = data
    // Store object in Product Service for use in editing
    productSvc._curObject = data
  })
  // Scope has remove functionality
  this.remove = function(pk){
    this.remove = productSvc.remove(pk, function(data) {
      // Server response
      $scope.response = data
    })
    // Redirect after action
    $location.path("/products/")
  }
}

})();
