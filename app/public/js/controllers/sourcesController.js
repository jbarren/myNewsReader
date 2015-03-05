app.controller('sourcesController', function ($scope, rssService) {
    //$scope.feeds = [{feedName: 'meneame', articles: []}];
    $scope.feeds = [];
    $scope.feedNameList = ['meneame'];
    $scope.loadArticles = function(){
        $scope.feedNameList.forEach(function(feedName, index, array){
            $scope.feeds = [];
            var feedObj = {feedName: feedName};
            rssService.getArticles(feedName, function(articles){
                feedObj.articles = articles;
            });
            $scope.feeds.push(feedObj);
        });
    }
});