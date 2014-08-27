'use strict';

/**
 * @ngdoc directive
 * @name influxVizPageBuilderApp.directive:dashSave
 * @description
 * # dashSave
 */
angular.module('influxVizPageBuilderApp')
	.directive('dashSave', function () {
		return {
			restrict: "C",
			scope: {},

			link: function link(scope, element, attrs) {
				element.bind('click', function(){
					scope.$emit('saveDashEvent');
				});

			}
		}

	});
