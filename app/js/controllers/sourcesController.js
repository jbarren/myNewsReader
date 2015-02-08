var module = angular.module('myNewsReader', []);
module.controller('sourcesController', function($scope) {
	$scope.sources = [{
		"name": "meneame.net",
		"url": "https://www.meneame.net/rss"
	}, {
		"name": "reddit.com",
		"url": "http://www.reddit.com/.rss"
	}];
});