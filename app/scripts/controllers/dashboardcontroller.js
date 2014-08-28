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
  	$scope.title = "InfluxViz Dashboard Builder";
    
  	$scope.$on('loadDashEvent', function(evt, data){
  		DashboardService.loadExternalDashboardXML(data);
      console.log(DashboardService.dashObject);
      if(DashboardService.dashObject instanceof DashObject)
      {
        $scope.title = DashboardService.dashObject.title;
        $scope.$apply();
        $scope.$broadcast('renderDashEvent', DashboardService.dashObject);
      }
  	});

  	$scope.$on('saveDashEvent', function(){
  		DashboardService.saveCurrentDashObject();
  	});

  	
    
  }]);