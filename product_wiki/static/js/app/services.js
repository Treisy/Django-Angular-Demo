(function() {
  var services;

  services = angular.module('App.services', []);

  services.factory('ProductImage', function($http, $log) {
    var ProductImage;
    ProductImage = (function() {
      function ProductImage(data) {
        this.product = data.product;
        this.id = data.id;
        this.image = data.image;
      }

      ProductImage.prototype.update = function() {
        var data,
          _this = this;
        data = {
          'image': this.image,
          'product': this.product
        };
        return $http({
          method: 'PUT',
          url: '/products/images/?pk=' + this.id,
          data: data
        }).success(function(data) {
          return $log.info("Succesfully voted");
        }).error(function(data) {
          return $log.info("Failed to vote.");
        });
      };

      return ProductImage;

    })();
    return ProductImage;
  });

  services.factory('Product', function(ProductImage, $http, $log) {
    var Product;
    Product = (function() {
      function Product(data) {
        if (data !== null) {
          this.init(data);
        }
      }

      Product.prototype.init = function(data) {
        var p, choice, _i, _len, _ref, _results;
        this.name = data.name;
        this.id = data.id;
        this.images = [];
        _ref = this.images;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          choice = _ref[_i];
          p = new ProductImage(image);
          this.totalVotes += p.votes;
          _results.push(this.images.push(new ProductImage(image)));
        }
        return _results;
      };

      Product.prototype.get = function(questionId) {
        var _this = this;
        return $http({
          method: 'GET',
          url: '/products/list/?pk=' + productId
        }).success(function(data) {
          _this.init(data);
          return $log.info("Succesfully fetched product");
        }).error(function(data) {
          return $log.info("Failed to fetch product.");
        });
      };

      return Product;

    })();
    return Product;
  });

  services.factory('Products', function($log, $http, Product) {
    var products;
    products = {
      all: []
    };
    return {
      fromServer: function(data) {
        var product, _i, _len, _results;
        products['all'].length = 0;
        _results = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          product = data[_i];
          _results.push(products['all'].push(new Product(product)));
        }
        return _results;
      },
      fetch: function() {
        var _this = this;
        return $http({
          method: 'GET',
          url: '/products/list/'
        }).success(function(data) {
          _this.fromServer(data);
          return $log.info("Succesfully fetched products.");
        }).error(function(data) {
          return $log.info("Failed to fetch products.");
        });
      },
      data: function() {
        return products;
      }
    };
  });

}).call(this);
