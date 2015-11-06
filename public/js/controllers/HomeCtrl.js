myApp.controller('homeController', function($scope,CowFactory) {

	// Holds all the values from the form
	$scope.newCowInfo ={};

	// Create CSV file Name with Date
	var d = new Date();
	$scope.exportFileName = "My_Herd_" + d.getMonth() + "_" + d.getDay() + "_" + d.getFullYear() + ".csv";

	// Format of the fields in the DB should be as follows
	// fieldName = The field name create by user
	// dataType = date, number, txt, email, ..ect
		// This is the "type" value set in the <input> tag
	$scope.fieldArray = [];

	// {fieldName:"Tag Number", dataType:"number"},
	// 					{fieldName:"Birth Day", dataType:"date"},
	// 					{fieldName:"Shot Type 1", dataType:"date"},
	// 					{fieldName:"Shot Type 2", dataType:"date"},
	// 					{fieldName:"Shot Type 3", dataType:"date"},
	// 					{fieldName:"Shot Type 4", dataType:"date"},
	// 					{fieldName:"weight", dataType:"number"},
	// 					{fieldName:"mother", dataType:"text"}

	// Retreives the cows from the DB
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


	// Submit a new cow.
	$scope.submit = function(){
		console.log($scope.newCowInfo);
		// create cow Object
		// send to DB and save
	};








	//
	$scope.newFields = false;
	$scope.makeNewField = function(value){

		value ?  $scope.newFields=true :  $scope.newFields=false;

	};

	function createFields (newField){
		
		this.fieldName = newField.fieldName;
		this.dataType  = newField.dataType;
	};
	$scope.submitFields = function(newField){

		obj= new createFields(newField);
		$scope.fieldArray.push(obj);
		console.log(obj);

	};

	$scope.data = {
    repeatSelect: null,
    availableOptions: [
      {name: 'Text'},
      {name: 'Date'},
      {name: 'Number'}
    ],
   };



});