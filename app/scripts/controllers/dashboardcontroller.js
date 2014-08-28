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



angular.module('influxVizPageBuilderApp')
  .directive('pageContainer', function () {
    return {
      restrict: 'C',
      scope: true,
      link: function link(scope, element, attrs){
        scope.$on('renderPageEvent', function(evt, pages){
          for(var i = 0; i < pages.length; i++)
          {
            var page = pages[i];
            var pageElem = angular.element('<div id="' + page.id + '" class="dash-page"></div>');
            
            var rows = page.rows;
            for(var j = 0; j < rows.length; j++)
            {
              var row = rows[j];
              var rowElem = angular.element('<div class="row"></div>');

              var widgets = row.widgets;
              for(var k = 0; k < widgets.length; k++)
              {
                var widget = widgets[k];
                var widgetElem = angular.element('<div class="dash-widget ' + 
                                                  row.columnType + 
                                                  "-" + 
                                                  widget.cellWidth + 
                                                  '" id="' + widget.id + '">' + 
                                                  widget.html +
                                                  '</div>');
                rowElem.append(widgetElem);
                widget.jsFunction(widgetElem[0]);
              }
              page.element = pageElem;
              pageElem.append(rowElem);
            }
            element.append(pageElem);
          }

          pages[0].element.addClass("active");
        });
      }
    };
  });

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