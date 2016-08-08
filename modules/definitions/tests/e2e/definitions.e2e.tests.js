'use strict';

describe('Definitions E2E Tests:', function () {
  describe('Test Definitions page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/definitions');
      expect(element.all(by.repeater('definition in definitions')).count()).toEqual(0);
    });
  });
});
