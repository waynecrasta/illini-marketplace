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
      { thumbnail: 'http://i.imgur.com/6MBGHZk.png', title: 'Calculus, Seventh Edition', isbn: '0840048254', author: 'James Stewart', format: 'Hardcover', condition: 'Poor', price: 35 },
      { thumbnail: 'http://ecx.images-amazon.com/images/I/410ZFNT2MVL._SX380_BO1,204,203,200_.jpg', title: 'Biology, Sixth Edition', isbn: '0321762436', author: 'James D. Watson', format: 'Paperback', condition: 'Like New', price: 45 },
      { thumbnail: 'http://ecx.images-amazon.com/images/I/51AvplHE2NL._SX384_BO1,204,203,200_.jpg', title: 'CoreMacroeconomics', isbn: '1429278498', author: 'Eric Chiang', format: 'Paperback', condition: 'Poor', price: 20},
      { thumbnail: 'http://ecx.images-amazon.com/images/I/51DzIdCKr0L._SX258_BO1,204,203,200_.jpg', title: 'Fundamentals of Anatomy', isbn: '0130422983', author: 'Frederic Martini', format: 'Hardcover', condition: 'New', price: 40},
      { thumbnail: 'http://www-fp.pearsonhighered.com/assets/hip/images/bigcovers/080532187X.jpg', title: 'University Physics', isbn: '0321696867', author: 'Hugh D. Young', format: 'Hardcover', condition: 'New', price: 70}
    ];

    $scope.sellBook = { thumbnail: '', title: '', author: '', format: '', condition: '', price: 0};

    $scope.sellBook = function() {
      if($scope.sellBook.title == '' || $scope.sellBook.author == '' || $scope.sellBook.format == '' || $scope.sellBook.price == '')
        return;

      $scope.bookListing.push($scope.sellBook);
    }
  }

]);

app.filter('exact', function(){
  return function(items, match){
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
