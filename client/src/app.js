import angular from 'angular'
import 'angular-ui-router'
angular.module('sissy', ["ui.router"])

.config(($stateProvider, $urlRouterProvider) => {
	$urlRouterProvider.otherwise('/burns')

	$stateProvider
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
})
