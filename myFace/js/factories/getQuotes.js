angular.module('app').factory('getQuotes', function ($http) {

	return {

		getData: function() {
			
			return $http.get('/api/tooLong').success(function(data){

				return data;

			});

		}

	};

});

