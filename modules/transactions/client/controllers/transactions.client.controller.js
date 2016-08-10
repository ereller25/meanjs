(function () {
  'use strict';

  // Transactions controller
  angular
    .module('transactions')
    .controller('TransactionsController', TransactionsController);

  TransactionsController.$inject = ['$scope', '$state', 'Authentication', 'transactionResolve'];

  function TransactionsController ($scope, $state, Authentication, transaction) {
    var vm = this;

    vm.authentication = Authentication;
    vm.transaction = transaction;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Transaction
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.transaction.$remove($state.go('transactions.list'));
      }
    }

    // Save Transaction
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.transactionForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.transaction._id) {
        vm.transaction.$update(successCallback, errorCallback);
      } else {
        vm.transaction.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('transactions.view', {
          transactionId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
