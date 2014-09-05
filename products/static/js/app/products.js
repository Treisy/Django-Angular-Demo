(function() {
'use strict;'

// Define the service function, dependencies are injected.
productSvc = function($http, djangoUrl){
  // List of methods provided by service as variables.
  var create, list, read, update, remove
  // Storage for current object
  var _curObject

  // GET list of objects from the server
  this.list = function(callback){
    $http.get(djangoUrl.reverse('product_api'))
      // Callback was provided upon calling the function
      .success(callback)
  }
  // POST a new object to the server
  this.create = function(data, callback){
    $http.post(djangoUrl.reverse('product_api'), data)
      .success(callback)
  }
  // Update one object by POSTing to its URL
  this.update = function(pk, data, callback){
    $http.post(djangoUrl.reverse('product_api') + "?pk=" + pk, data)
      .success(callback)
    }
  // GET objects from the server
  this.read = function(pk, callback){
    // Get an object with pk from array
    this.list(function(data) {
      var object = data.filter(function(item){
        return item.pk == pk;
      })[0]
      callback(object);
    })
  }
  // DELETE an object from server
  this.remove = function(pk, callback){
    $http.delete(djangoUrl.reverse('product_api') + "?pk=" + pk)
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
    // Store logic in variable. When it causes an error, we know it's from here.
    productSvc,
  ])
})();
