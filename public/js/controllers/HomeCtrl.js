myApp.controller('homeController', function($scope,CowFactory) {
    
    $scope.cowArray = [{NAME: "MILKY", AGE: 22}, {NAME: "JGC", AGE: 70}];
    $scope.fieldArray = [{fieldName:"Tag Number", dataType:"number"},
    					{fieldName:"Birth Day", dataType:"date"},
    					{fieldName:"Shot Type 1", dataType:"date"},
    					{fieldName:"Shot Type 2", dataType:"date"},
    					{fieldName:"Shot Type 3", dataType:"date"},
    					{fieldName:"Shot Type 4", dataType:"date"},
    					{fieldName:"weight", dataType:"number"},
    					{fieldName:"mother", dataType:"text"}
    					];


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