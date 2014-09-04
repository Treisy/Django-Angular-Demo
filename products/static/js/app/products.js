(function() {
'use strict;'

productSvc = function($http, djangoUrl){      // dependencies go in here, actual javascript below
  var create, list, read, update, remove      // methods provided by service
  var _curObject

  this.create = function(data, callback){     // create an object
    $http.post(djangoUrl.reverse('product_api'), data)
      .success(callback)
  }
  this.list = function(callback){             // get list of all objects
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

angular.module('products', []) // module name, no external dependencies
  .service('productSvc', [     // service name, list of dependencies like Django
    '$http',                   // Angular.js ajax
    'djangoUrl',               // Django-Angular URL reverse lookups
    productSvc,                // Actual service logic assigned to variable and defined above
  ])

})();
