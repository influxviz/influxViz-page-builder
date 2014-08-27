'use strict';

/**
 * @ngdoc function
 * @name influxVizPageBuilderApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the influxVizPageBuilderApp
 */
angular.module('influxVizPageBuilderApp')
  .controller('DashboardCtrl', ['$scope', 'DashboardService', function ($scope, DashboardService) {
  	
  	$scope.$on('loadDashEvent', function(evt, data){
  		DashboardService.loadExternalDashboardXML(data);
  	});

  	$scope.$on('saveDashEvent', function(){
  		DashboardService.saveCurrentDashObject();
  	});

  	
  	//DOM manipulations to be removed and placed somewhere else.
  	var checkSize = function() {
  		if($(window).width() >= 768)
		{
			$("#wrapper").addClass("toggled");
		}
		else
		{
			$("#wrapper").removeClass("toggled");
		}
  	};

  	checkSize();
  	$(window).resize(function(){
  		checkSize();
  	});

  	$scope.toggleSidebar = function(){
  		$('#wrapper').toggleClass("toggled");
  	};
    
  }]);