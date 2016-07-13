import angular from 'angular'
angular.module('sissy', [])
.controller('burnController', function($http){
	// this.burns = ["soup", "coffee"];
	$http.get('/burns').then((res) => {
		this.burns = res.data;
	})
})