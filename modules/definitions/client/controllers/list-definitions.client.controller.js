(function () {
  'use strict';

  angular
    .module('definitions')
    .controller('DefinitionsListController', DefinitionsListController);

  DefinitionsListController.$inject = ['DefinitionsService'];

  function DefinitionsListController(DefinitionsService) {
    var vm = this;

    vm.definitions = DefinitionsService.query();
  }
})();
