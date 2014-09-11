(function() {
'use strict;'

// This service deals with communicating with the product API for CRUD.
productSvc = function($http, djangoUrl){
  // API we are using for this service.
  var _api = 'product_api'

  var create, list, read, update, remove
  var _curObject

  this.list = function(callback){
    $http.get(djangoUrl.reverse(_api))
      .success(callback)
      // Callbacks were provided upon calling the function
  }
  this.read = function(pk, callback){
    $http.get(djangoUrl.reverse(_api) + "?pk=" + pk)
      .success(callback)
    }
/* This is another method of retrieving one object
    this.list(function(data) {
      var object = data.filter(function(item){
        return item.pk == pk;
      })[0]
      callback(object);
    })
*/
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
angular.module('products', [])
// Service name, list of dependencies like Django.
  .service('productSvc', [
    // Angular.js ajax library.
    '$http',
    // URL reverse lookups provided by Django-Angular.
    'djangoUrl',
    productSvc,
  ])
})();
