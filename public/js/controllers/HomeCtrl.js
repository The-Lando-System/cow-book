myApp.controller('homeController', function($scope,CowFactory) {
    
    $scope.cowArray = [{NAME: "MILKY", AGE: 22}, {NAME: "JGC", AGE: 70}];

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