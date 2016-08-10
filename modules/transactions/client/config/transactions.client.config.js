(function () {
  'use strict';

  angular
    .module('transactions')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Transactions',
      state: 'transactions',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'transactions', {
      title: 'List Transactions',
      state: 'transactions.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'transactions', {
      title: 'Create Transaction',
      state: 'transactions.create',
      roles: ['user']
    });
  }
})();
