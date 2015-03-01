app.service('rssService', function($http){
    this.host = 'http://localhost:3000';
    this.getArticles = function(feedName, callback){
        $http.get(this.host + '/feed/' + feedName)
            .success(function(response) {
                callback(response);
            });
    }
})