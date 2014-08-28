'use strict';

/**
 * @ngdoc directive
 * @name influxVizPageBuilderApp.directive:dashLoad
 * @description
 * # dashLoad
 */
angular.module('influxVizPageBuilderApp')
	.directive('dashLoad', function(){
		return {
			restrict: "C",
			scope: true,

			link: function link(scope, element, attrs) {
				element.bind('submit', function(){
					var fileInput = this.querySelector('#file-input');
					var file = fileInput.files[0];
					if(!(file instanceof Blob || file instanceof File))
					{
						$("#load-xml").modal('hide');
						return;
					}

					if(!(window.File && window.FileReader && window.FileList && window.Blob))
					{
						alert("Your browser does not support reading local files.");
						return;
					}

					var reader = new FileReader();
					reader.readAsText(file);
					reader.onload = function() {
						scope.$emit('loadDashEvent', reader.result);
					};
					$("#load-xml").modal('hide');
				});
			}
		};

	});
