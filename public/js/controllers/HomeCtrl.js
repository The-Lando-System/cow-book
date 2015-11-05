myApp.controller('homeController', function($scope,CowFactory) {
	var getCows = function(){
		CowFactory.get()
		.success(function(data){
			$scope.cows = data;
		})
		.error(function(data){
			console.log('Error: ' + data);
		});
	};
	angular.element(document).ready(function () {
		getCows();
	});
});