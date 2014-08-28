'use strict';

describe('Directive: dashSidebar', function () {

  // load the directive's module
  beforeEach(module('influxVizPageBuilderApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<dash-sidebar></dash-sidebar>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the dashSidebar directive');
  }));
});
