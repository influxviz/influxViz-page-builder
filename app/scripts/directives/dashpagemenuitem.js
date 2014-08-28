'use strict';

/**
 * @ngdoc directive
 * @name influxVizPageBuilderApp.directive:dashPageMenuItem
 * @description
 * # dashPageMenuItem
 */
angular.module('influxVizPageBuilderApp')
  .directive('dashPageMenuItem', function(){
    return {
      restrict: 'C',
      scope: true,
      link: function link(scope, element, attrs){
        element.bind('click', function(){
          scope.$emit('swapPagesEvent', scope.page);
        });
      }

    };
  });
