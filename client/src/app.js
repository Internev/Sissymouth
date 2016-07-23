import angular from 'angular'
import 'angular-ui-router'
angular.module('sissy', ["ui.router"])

.config(($stateProvider, $urlRouterProvider) => {
	$urlRouterProvider.otherwise('/burns')

	$stateProvider
	//Pulls data from server app.js /burns endpoint. 
	.state('burns', {
		url: '/burns',
		templateUrl: 'burns/burns-nav.html',
		resolve: {
			burnsService: function($http){
				return $http.get('/burns');
			}
		},
		controller: function(burnsService){
			this.burns = burnsService.data;
			console.log("Data in Angular: ", this.burns);
		},
		controllerAs: 'burnCtrl',
	})
	.state('burns.details', {
		url: '/:burnId',
		templateUrl: 'burns/burns-details.html',
		resolve: {
			detailsService: function($http, $stateParams){
				return $http.get('/burns/' + $stateParams.burnId);
			}
		},
		controller: function(detailsService){
			this.burnDetails = detailsService.data;
		},
		controllerAs: 'detailCtrl',
	})
	.state('burns.new', {
		url: '/add/new',
		templateUrl: 'burns/new-burn.html',
		controller: function($state, $http){
			this.saveBurn = function(burn){
				$http({method: 'POST', url: '/burns/add/new', data: {burn}})
				.then(function(){
					$state.go('burns');
				});
				//console.log('burn: ', burn);
			};
		},
		controllerAs: 'newBurnCtrl'
	})
})
