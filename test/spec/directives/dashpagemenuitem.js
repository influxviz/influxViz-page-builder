'use strict';

describe('Directive: dashPageMenuItem', function () {

  // load the directive's module
  beforeEach(module('influxVizPageBuilderApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<dash-page-menu-item></dash-page-menu-item>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the dashPageMenuItem directive');
  }));
});
