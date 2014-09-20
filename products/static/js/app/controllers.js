(function() {
'use strict;'

productListCtrlFn = function($scope, productSvc) {
  var s = productSvc
  s._curObject = undefined
  s.list(function(data){
    $scope.products = data;
  })
}

productFormCtrlFn = function($location, $routeParams, $scope, productSvc) {
  var s = productSvc
  var save
  // List of keys in object which have numerical values.
  var _numTypes = [
    'size',
  ]

  if ($routeParams.productPk != undefined) {
    if (s._curObject == undefined) {
      $location.path("/products/")
    }

    object = s._curObject
    for (key in object) {
      if (object.hasOwnProperty(key)) {
        // Bind to form as number or string as needed.
        _numTypes.indexOf(key) >= 0 ? this[key] = parseInt(object[key]) : this[key] = object[key]
      }
    }

    this.save = function(){
      s.update(object.pk, $scope.product, function(data) {
        $scope.response = data;
      })
      $location.path("/products/")
    }
  } else {
    this.save = function(){
      s.create($scope.product, function(data){
        $scope.response = data;
      })
      $location.path("/products/")
    }
  }
}

productDetailCtrlFn = function($location, $routeParams, $scope, productSvc, imageSvc) {
  var remove

  productSvc.read($routeParams.productPk, function(data) {
    if (data.message == "Products matching the query do not exist.") {
      $scope.response = data.message
      $location.path("/products/")
    }
    $scope.product = data
    productSvc._curObject = data
  })

  imageSvc.read($routeParams.productPk, function(data) {
    $scope.images = data
  })

  this.remove = function(pk){
    this.remove = s.remove(pk, function(data) {
      $scope.response = data
    })
    $location.path("/products/")
  }
}

tagListCtrlFn = function($scope, tagSvc) {
  var s = tagSvc
  s._curObject = undefined
  s.list(function(data){
    $scope.products = data;
  })
}

productFormCtrlFn = function($location, $routeParams, $scope, productSvc) {
  var s = productSvc
  var save
  // List of keys in object which have numerical values.
  var _numTypes = [
    'size',
  ]

  if ($routeParams.productPk != undefined) {
    if (s._curObject == undefined) {
      $location.path("/products/")
    }

    object = s._curObject
    for (key in object) {
      if (object.hasOwnProperty(key)) {
        // Bind to form as number or string as needed.
        _numTypes.indexOf(key) >= 0 ? this[key] = parseInt(object[key]) : this[key] = object[key]
      }
    }

    this.save = function(){
      s.update(object.pk, $scope.product, function(data) {
        $scope.response = data;
      })
      $location.path("/products/")
    }
  } else {
    this.save = function(){
      s.create($scope.product, function(data){
        $scope.response = data;
      })
      $location.path("/products/")
    }
  }
}


imageCtrlFn = function($location, $routeParams, $scope, imageSvc) {
  var s = imageSvc
  var save

  this.save = function(){
//    var product = $scope.image.product
//    $scope.image.product = {"name": product }
    var data = $scope.image
    console.log(data)
    s.create($scope.image, function(data){
      $scope.response = data;
    })
  }
}

angular.module('controllers', [
  // Think of this like imports.
  'services',
  ])

})();
