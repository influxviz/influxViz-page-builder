'use strict';

/**
 * @ngdoc directive
 * @name influxVizPageBuilderApp.directive:pageContainer
 * @description
 * # pageContainer
 */
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