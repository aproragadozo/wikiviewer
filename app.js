var app = angular.module('plunker', []);

app.controller('MainCtrl', ['$scope', '$http', '$sce', function($scope, $http, $sce) {
  
  $scope.query = false;
  
  $scope.search = function() {
    $scope.results = [];
    var api = 'https://en.wikipedia.org/w/api.php?format=json&pithumbsize=500&action=query&generator=search&gsrlimit=15&gsrwhat=text&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&excontinue=2&gsrsearch=';
    var cb = '&callback=JSON_CALLBACK';
    $http.jsonp(api + $('#sample1').val() + cb)
      .success(function(response) {
        $scope.query = false;
        angular.forEach(response.query.pages, function(value, key) {
          $scope.results.push({
            title: value.title,
            body: value.extract,
            page: value.pageid,
            image: value.thumbnail === undefined ? 'data:image/png;base64,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' : value.thumbnail.source
          });
        });
      });
      
  };
  $scope.random = function() {
    $scope.query = true;
    $scope.randomPage = $sce.trustAsResourceUrl("https://en.wikipedia.org/wiki/Special:Random");
  };
}]);

app.directive('card', function(){
  return {
    restrict: 'E',
    templateUrl: 'card.html'
  }
})
