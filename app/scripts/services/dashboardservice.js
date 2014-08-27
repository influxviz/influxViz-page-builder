'use strict';

/**
 * @ngdoc service
 * @name influxVizPageBuilderApp.Dashboard
 * @description
 * # Dashboard
 * Service in the influxVizPageBuilderApp.
 */
angular.module('influxVizPageBuilderApp')
	.service('DashboardService', ['DashXMLUtils', function Dashboard(DashXMLUtils) {
	// AngularJS will instantiate a singleton by calling "new" on this function
	this.dashObject = {};
	
	this.loadExternalDashboardXML = function loadxml(XML) {
		this.dashObject = DashXMLUtils.loadDashXML(XML);

		//Remove this once gui works.
		console.log(this.dashObject);
	};

	this.saveCurrentDashObject = function savexml() {
		try
		{
			DashXMLUtils.saveDashXML(this.dashObject);			
		}
		catch(error)
		{
			alert(error.message);
		}
	};
  }]);