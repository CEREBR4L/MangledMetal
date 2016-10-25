angular.module('app').controller('homeController', function homeController($scope, getQuotes) {

	getQuotes.getData().then(function(resp){
		$scope.quotes = resp.data;
	});

});

