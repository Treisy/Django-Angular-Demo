(function() {
'use strict;'

productSvc = function($http, djangoUrl){      // Define the service function, dependencies are injected.
  var create, list, read, update, remove      // List of methods provided by service as variables.
  var _curObject                              // Storage for current object

  this.create = function(data, callback){     // POST to create an object
    $http.post(djangoUrl.reverse('product_api'), data)
      .success(callback)
  }
  this.list = function(callback){             // GET list of all objects
    $http.get(djangoUrl.reverse('product_api'))
      .success(callback)
  }
  this.read = function(pk, callback){         // read one object from list
    this.list(function(data) {
      var object = data.filter(function(item){
        return item.pk == pk;
      })[0]
      callback(object);
    })
  }
  this.update = function(pk, data, callback){ // update one object
    $http.post(djangoUrl.reverse('product_api') + "?pk=" + pk, data)
      .success(callback)
    }
  this.remove = function(pk, callback){       // remove one object
    $http.delete(djangoUrl.reverse('product_api') + "?pk=" + pk)
      .success(callback)
    }
}

angular.module('products', []) // Module name. Use then injecing as a dependency in an app.
  .service('productSvc', [     // Service name, list of dependencies like Django.
    '$http',                   // Angular.js ajax library.
    'djangoUrl',               // URL reverse lookups provided by Django-Angular.
    productSvc,                // Actual service logic assigned to variable so we know when it's the cause of error.
  ])
})();
