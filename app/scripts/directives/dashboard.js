'use strict';

/**
 * @ngdoc directive
 * @name influxVizPageBuilderApp.directive:dashboard
 * @description
 * # dashboard
 */
angular.module('influxVizPageBuilderApp')
  .directive('dashboard', function (){
    return {
      restrict: 'C',
      scope: false,
      link: function link(scope, element, attrs) {
        scope.$on('renderDashEvent', function (evt, dashObj){
          element.find("#page-content-wrapper").empty();
          scope.$broadcast('renderPageEvent', dashObj.pages);
        });



        checkSize(); //checkSize() is defined below.
        angular.element(window).bind('resize', function(){
          checkSize();
        });

        scope.toggleSidebar = function() {
          angular.element('#wrapper').toggleClass("toggled");
        };
      }
    }
  });

//For retracting the sidebar when the window width is too small.
function checkSize() 
{
  if(angular.element(window).width() >= 768)
  {
    angular.element("#wrapper").addClass("toggled");
  }
  else
  {
    angular.element("#wrapper").removeClass("toggled");
  }
};
