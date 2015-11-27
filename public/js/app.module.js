var myApp = angular.module('myApp', [
	'ngCookies',
	'angular-jwt',
	'ngRoute',
	'ui.router',
	"ngSanitize",
	"ngCsv"
])

.config(['$urlRouterProvider','$stateProvider', function($urlRouterProvider,$stateProvider) {
	$urlRouterProvider
	.otherwise('/login');

	$stateProvider
	.state('home', {
		url: '/home',
		templateUrl: '/home',
		controller: 'homeController'
	})
	.state('login', {
		url: '/login',
		templateUrl: '/login',
		controller: 'loginController'
	});

}]);