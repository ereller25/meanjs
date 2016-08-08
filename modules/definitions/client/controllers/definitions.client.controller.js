(function () {
  'use strict';

  // Definitions controller
  angular
    .module('definitions')
    .controller('DefinitionsController', DefinitionsController);

  DefinitionsController.$inject = ['$scope', '$state', 'Authentication', 'definitionResolve'];

  function DefinitionsController ($scope, $state, Authentication, definition) {
    var vm = this;

    vm.authentication = Authentication;
    vm.definition = definition;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Definition
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.definition.$remove($state.go('definitions.list'));
      }
    }

    // Save Definition
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.definitionForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.definition._id) {
        vm.definition.$update(successCallback, errorCallback);
      } else {
        vm.definition.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('definitions.view', {
          definitionId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
