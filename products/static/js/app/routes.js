(function() {
'use strict;'

productListCtrl = function($scope, productSvc) {
  productSvc._curObject = undefined
  productSvc.list(function(data){
    $scope.products = data;
  })
}

productFormCtrl = function($location, $routeParams, $scope, productSvc) {
  var save
  // List of keys in model which have numerical values.
  var numTypes = [
    'size',
  ]

  if ($routeParams.productPk != undefined) {
    if (productSvc._curObject == undefined) {
      $location.path("/products/")
    }

    object = productSvc._curObject
    for (key in object) {
      if (object.hasOwnProperty(key)) {
        // Bind to form as number or string as needed.
        numTypes.indexOf(key) >= 0 ? this[key] = parseInt(object[key]) : this[key] = object[key]
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
    if (data.message == "Product matching query does not exist.") {
      $scope.response = data.message
      $location.path("/products/")
    }
    $scope.product = data
    productSvc._curObject = data
  })

  this.remove = function(pk){
    this.remove = productSvc.remove(pk, function(data) {
      $scope.response = data
    })
    $location.path("/products/")
  }
}

// Think of this like Django URLS.
URLS = function($routeProvider) { 
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
}

// This is the module name.
angular.module('routes', [
  // Angular.js routing module.
  'ngRoute',
  // Think of this like imports.
  'products'
  ])
  .config(URLS)

})();
