(function() {
'use strict;'

productSvc = function($http, djangoUrl){      // dependencies go in here, actual javascript below
  var create, list, read, update, remove      // methods provided by service
  var _error = "Something went wrong. Sorry."

  this.create = function(data, callback){     // create an object
    $http.post(djangoUrl.reverse('product_api'), data)
      .success(callback)
      .error(console.log(_error))
  }

  this.list = function(callback){             // get list of all objects
    $http.get(djangoUrl.reverse('product_api'))
      .success(callback)
      .error(callback)
  }

  this.read = function(pk, callback){         // read one object from list
    this.list(function(data) {
      var product = data.filter(function(item){
        return item.pk == pk;
      })[0]
      callback(product);
    })
  }

  this.update = function(pk, data, callback){ // update one object
    $http.post(djangoUrl.reverse('product_api') + "?pk=" + pk, data)
      .success(callback)
      .error(callback)
    }

  this.remove = function(pk, callback){       // remove one object
    $http.delete(djangoUrl.reverse('product_api') + "?pk=" + pk)
      .success(callback)
      .error(callback)
    }
}

angular.module('products', []) // module name, no external dependencies
  .service('productSvc', [     // service name, list of dependencies like Django
    '$http',                   // Angular.js ajax
    'djangoUrl',               // Django-Angular URL reverse lookups
    productSvc,                // Actual service logic assigned to variable and defined above
  ])

productListCtrl = function($scope, productSvc) {
  productSvc.list(function(data){
    $scope.products = data;
  })
}

productFormCtrl = function($location, $routeParams, $scope, productSvc) {
  var save, create, edit
  pk = $routeParams.productPk

  this.create = function(){
    productSvc.create($scope.product, function(data){
      $scope.response = data;
    })
    $location.path("/products/")
  }

  this.edit = function(){
    productSvc.update(pk, $scope.product, function(data) {
      $scope.response = data;
    })
    $location.path("/products/")
  }

  $routeParams.productPk == undefined ? this.save = this.create : this.save = this.edit
}

productDetailCtrl = function($location, $routeParams, $scope, productSvc) {
  var remove

  productSvc.read($routeParams.productPk, function(data) {
    $scope.product = data;
  })

  this.remove = function(pk){
    this.remove = productSvc.remove(pk, function(data) {
      $scope.response = data;
    })
    $location.path("/products/")
  }
}

})();
