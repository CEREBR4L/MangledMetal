
var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {

	$routeProvider
		.when('/', {
			templateUrl: 'templates/home.html',
			controller: 'homeController',
			controllerAs: 'home'
		})
		.otherwise({
			redirectTo: '/'
		});
		
	$locationProvider.html5Mode(true);

});

