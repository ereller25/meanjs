//Definitions service used to communicate Definitions REST endpoints
(function () {
  'use strict';

  angular
    .module('definitions')
    .factory('DefinitionsService', DefinitionsService);

  DefinitionsService.$inject = ['$resource'];

  function DefinitionsService($resource) {
    return $resource('api/definitions/:definitionId', {
      definitionId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
