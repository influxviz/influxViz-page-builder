'use strict';

describe('Service: DashXMLUtils', function () {

  // load the service's module
  beforeEach(module('influxVizPageBuilderApp'));

  // instantiate service
  var DashXMLUtils;
  beforeEach(inject(function (_DashXMLUtils_) {
    DashXMLUtils = _DashXMLUtils_;
  }));

  it('should do something', function () {
    expect(!!DashXMLUtils).toBe(true);
  });

});
