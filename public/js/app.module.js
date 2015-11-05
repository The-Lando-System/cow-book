var myApp = angular.module('myApp', [
	'ngCookies',
	'angular-jwt',
	'ngRoute',
	'ui.router'
])

.config(['$urlRouterProvider','$stateProvider', function($urlRouterProvider,$stateProvider) {
	$urlRouterProvider
	.otherwise('/home');

	$stateProvider
	.state('home', {
		url: '/home',
		templateUrl: '/home',
		controller: 'homeController'
	});

}]);