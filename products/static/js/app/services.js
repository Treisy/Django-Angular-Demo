(function() {
'use strict;'

// This service deals with communicating with the product API for CRUD.
productSvc = function($http, djangoUrl){
  // API we are using for this service.
  var _api = 'product_api'

  var create, list, read, update, remove
  var _curObject

  // Callbacks were provided upon calling the function
  this.list = function(callback){
    $http.get(djangoUrl.reverse(_api))
      .success(callback)
  }
  this.create = function(data, callback){
    $http.post(djangoUrl.reverse(_api), data)
      .success(callback)
  }
  this.read = function(pk, callback){
    $http.get(djangoUrl.reverse(_api) + "?pk=" + pk)
      .success(callback)
    }
  this.update = function(pk, data, callback){
    $http.post(djangoUrl.reverse(_api) + "?pk=" + pk, data)
      .success(callback)
    }
  this.remove = function(pk, callback){
    $http.delete(djangoUrl.reverse(_api) + "?pk=" + pk)
      .success(callback)
    }
}

// This service deals with communicating with the image API for CRUD.
imageSvc = function($http, djangoUrl){
  // API we are using for this service.
  var _api = 'image_api'

  var create, list, read, update, remove

  // Callbacks were provided upon calling the function
  this.list = function(callback){
    $http.get(djangoUrl.reverse(_api))
      .success(callback)
  }
  this.read = function(pk, callback){
    // Get list then filter objects
    this.list(function(data) {
      var product = data.filter(function(entry){
        return entry.product == pk;
      })
      callback(product);
    })
  }
  this.create = function(data, callback){
    $http.post(djangoUrl.reverse(_api), data)
      .success(callback)
  }
  this.update = function(pk, data, callback){
    $http.post(djangoUrl.reverse(_api) + "?pk=" + pk, data)
      .success(callback)
    }
  this.remove = function(pk, callback){
    $http.delete(djangoUrl.reverse(_api) + "?pk=" + pk)
      .success(callback)
    }
}

// Module name. Use this when injecting as a dependency in an app.
angular.module('services', [])
// Service name, list of dependencies like Django.
  .service('productSvc', [
    // Angular.js ajax library.
    '$http',
    // URL reverse lookups provided by Django-Angular.
    'djangoUrl',
    productSvc,
  ])
  .service('imageSvc', [
    '$http',
    'djangoUrl',
    imageSvc,
  ])

})();
