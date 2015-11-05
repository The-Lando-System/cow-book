myApp.factory('CowFactory', function($http) {
	return {
        get : function() { 
            return $http.get('/cows/');
        },
        create : function(newCow) { 
            return $http.post('/cows/', newCow);
        },
        delete : function(id) {
            return $http.delete('/cows/' + id);
        },
        edit : function(editedCow) {
            return $http.put('/cows/' + editedCow._id, editedCow);
        }
    }
});