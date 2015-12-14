'use strict';

/**
 * Main module of the application.
 */
var app = angular.module('illiniMarketplace', [])
  
app.controller('MainCtrl', ['$scope',
  
  function($scope){
    $scope.condition = '';
    $scope.minPrice = '';
    $scope.maxPrice = '';
    $scope.author = '';
    $scope.format = '';

    $scope.bookListing = [
      { thumbnail: 'http://i.imgur.com/6MBGHZk.png', title: 'Calculus, Seventh Edition', isbn: '0840048254', author: 'James Stewart', format: 'Hardcover', condition: 'Poor', price: 35, sellerEmail: 'test@gmail.com', courses: 'Math 221, Math 231, Math 241, Calculus 1, Calculus 2, Calculus 3' },
      { thumbnail: 'http://ecx.images-amazon.com/images/I/410ZFNT2MVL._SX380_BO1,204,203,200_.jpg', title: 'Biology, Sixth Edition', isbn: '0321762436', author: 'James D. Watson', format: 'Paperback', condition: 'Like New', price: 45, sellerEmail: 'test@yahoo.com', courses: 'MCB 150, Micro Biology' },
      { thumbnail: 'http://ecx.images-amazon.com/images/I/51AvplHE2NL._SX384_BO1,204,203,200_.jpg', title: 'CoreMacroeconomics', isbn: '1429278498', author: 'Eric Chiang', format: 'Paperback', condition: 'Poor', price: 20, sellerEmail: 'test@aol.com', courses: 'Econ 102, Macroeconomics' },
      { thumbnail: 'http://ecx.images-amazon.com/images/I/51DzIdCKr0L._SX258_BO1,204,203,200_.jpg', title: 'Fundamentals of Anatomy', isbn: '0130422983', author: 'Frederic Martini', format: 'Hardcover', condition: 'New', price: 40, sellerEmail: 'test@gmail.com', courses: 'Anatomy and Physiology' },
      { thumbnail: 'http://www-fp.pearsonhighered.com/assets/hip/images/bigcovers/080532187X.jpg', title: 'University Physics', isbn: '0321696867', author: 'Hugh D. Young', format: 'Hardcover', condition: 'New', price: 70, sellerEmail: 'test@hotmail.com', courses: 'Phys 211, Phys 212, Phys 213, Phys 214' }
    ];

    $scope.sellBook = { thumbnail: '', title: '', author: '', format: '', isbn: 0, condition: '', price: 0, sellerEmail: '', courses: '' };
    $scope.sellBook2 = { thumbnail: '', title: '', author: '', format: '', isbn: 0, condition: '', price: 0, sellerEmail: '', courses: '' };

    $scope.shoppingCart = [];

    $scope.clearFilters = function() {
      $scope.condition = '';
      $scope.minPrice = '';
      $scope.maxPrice = '';
      $scope.author = '';
      $scope.format = '';
      $scope.filt = {};
    }

    $scope.sellBook = function() {
      if(!$scope.sellBook.thumbnail || $scope.sellBook.thumbnail == '') {
        $scope.sellError = 'Missing Book Thumbnail URL!';
        return;
      }
      if(!$scope.sellBook.title || $scope.sellBook.title == '') {
        $scope.sellError = 'Missing Book Title!';
        return;
      }
      if(!$scope.sellBook.author || $scope.sellBook.author == '') {
        $scope.sellError = 'Missing Book Author!';
        return;
      }
      if(!$scope.sellBook.isbn || $scope.sellBook.isbn == 0) {
        $scope.sellError = 'Missing Book ISBN!';
        return;
      }
      if(!$scope.sellBook.format || $scope.sellBook.format == '') {
        $scope.sellError = 'Missing Book Format!';
        return;
      }
      if(!$scope.sellBook.price || $scope.sellBook.price == 0) {
        $scope.sellError = 'Missing Book Price!';
        return;
      }
      if(!$scope.sellBook.sellerEmail || $scope.sellBook.sellerEmail == '') {
        $scope.sellError = 'Please enter the email buyers can contact you through!';
        return;
      }
      if(!$scope.sellBook.courses || $scope.sellBook.courses == '') {
        $scope.sellError = 'Please enter the courses this book is used for!';
        return;
      }
      $scope.sellError = '';
      $scope.bookListing.push($scope.sellBook);
      $scope.sellBook = $scope.sellBook2;
    }

    $scope.filterPrice = function(book) {
      if((!$scope.minPrice || $scope.minPrice == '') && (!$scope.maxPrice || $scope.maxPrice == ''))
        return book;
      
      if((!$scope.minPrice || $scope.minPrice == '') && ($scope.maxPrice || $scope.maxPrice != '')) {
        if(book.price <= $scope.maxPrice) 
          return book;
      }
      
      if(($scope.minPrice || $scope.minPrice != '') && (!$scope.maxPrice || $scope.maxPrice == '')) {
        if(book.price >= $scope.minPrice) 
          return book;
      }

      if(book.price >= $scope.minPrice && book.price <= $scope.maxPrice)
        return book;
    }

    $scope.setOpenBook = function(book) {
      $scope.openBook = book;
    }

    $scope.addToCart = function() {
      $scope.shoppingCart.push($scope.openBook);
    }

    $scope.isInCart = function(book) {
      var i = $scope.shoppingCart.indexOf(book);

      if(i != -1) {
        return true;
      }

      return false;
    }

    $scope.removeFromCart = function(book) {
      var i = $scope.shoppingCart.indexOf(book);

      if(i != -1) {
        $scope.shoppingCart.splice(i, 1);
      }
    }
  }

]);

app.filter('exact', function() {
  return function(items, match) {
    var matching = [], matches, falsely = true;

    // Return the items unchanged if all filtering attributes are falsy
    angular.forEach(match, function(value, key){
      falsely = falsely && !value;
    });
    if(falsely){
      return items;
    }

    angular.forEach(items, function(item){ // e.g. { title: "ball" }
      matches = true;
      angular.forEach(match, function(value, key){ // e.g. 'all', 'title'
        if(!!value){ // do not compare if value is empty
          matches = matches && (item[key] === value);  
        }
      });
      if(matches){
        matching.push(item);  
      }
    });
    return matching;
  }
});
