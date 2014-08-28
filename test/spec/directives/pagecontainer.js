'use strict';

describe('Directive: pageContainer', function () {

  // load the directive's module
  beforeEach(module('influxVizPageBuilderApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<page-container></page-container>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the pageContainer directive');
  }));
});
