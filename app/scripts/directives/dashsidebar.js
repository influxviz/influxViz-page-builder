'use strict';

/**
 * @ngdoc directive
 * @name influxVizPageBuilderApp.directive:dashSidebar
 * @description
 * # dashSidebar
 */
angular.module('influxVizPageBuilderApp')
  .directive('dashSidebar', function () {
    return {
      restrict: 'C',
      scope: true,
      link: function link(scope, element, attrs){
        scope.pages = [];
        scope.$on('renderPageEvent', function(evt, pages){
          scope.pages = [];
          
          for(var i = 0; i < pages.length; i++)
          {
            scope.pages.push(pages[i]);
          }

          scope.$apply();
        });

        scope.$on('swapPagesEvent', function(evt, page){
          for(var i = 0; i < scope.pages.length; i++)
          {
            scope.pages[i].element.removeClass("active");
          }

          page.element.addClass("active");
        });


      }
    };
  });