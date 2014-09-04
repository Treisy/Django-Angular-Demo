(function() {
'use strict;'

productSvc = function($http, djangoUrl){      // Define the service function, dependencies are injected.
  var create, list, read, update, remove      // List of methods provided by service as variables.
  var _curObject                              // Storage for current object

  this.list = function(callback){             // GET list of objects from server
    $http.get(djangoUrl.reverse('product_api'))
      .success(callback)                      // Callback was provided upon calling the function
  }
  this.create = function(data, callback){     // POST an object to server
    $http.post(djangoUrl.reverse('product_api'), data)
      .success(callback)
  }
  this.update = function(pk, data, callback){ // update one object by POST
    $http.post(djangoUrl.reverse('product_api') + "?pk=" + pk, data)
      .success(callback)
    }
  this.read = function(pk, callback){         // Get single object from server
    this.list(function(data) {
      var object = data.filter(function(item){
        return item.pk == pk;
      })[0]
      callback(object);
    })
  }
  this.remove = function(pk, callback){       // DELETE an object from server
    $http.delete(djangoUrl.reverse('product_api') + "?pk=" + pk)
      .success(callback)
    }
}

angular.module('products', []) // Module name. Use then injecing as a dependency in an app.
  .service('productSvc', [     // Service name, list of dependencies like Django.
    '$http',                   // Angular.js ajax library.
    'djangoUrl',               // URL reverse lookups provided by Django-Angular.
    productSvc,                // Actual service logic. When it causes an error, we know it's from here.
  ])
})();
