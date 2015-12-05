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
      { thumbnail: '', title: 'Calculus: Early Transcendentals, 7th Edition', author: 'James Stewart', format: 'Hardcover', condition: 'Poor', price: 35 },
      { thumbnail: '', title: 'Molecular Biology of the Gene, Sixth Edition', author: 'James D. Watson', format: 'Paperback', condition: 'Like New', price: 45 },
      { thumbnail: '', title: 'CoreMacroeconomics', author: 'Eric Chiang', format: 'Paperback', condition: 'Poor', price: 20},
      { thumbnail: '', title: 'Fundamentals of Anatomy & Physiology', author: 'Frederic Martini', format: 'Hardcover', condition: 'New', price: 40},
      { thumbnail: '', title: 'University Physics', author: 'Daniel Rubinfield', format: 'Hardcover', condition: 'New', price: 70}
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
