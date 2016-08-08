(function () {
  'use strict';

  angular
    .module('definitions')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Definitions',
      state: 'definitions',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'definitions', {
      title: 'List Definitions',
      state: 'definitions.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'definitions', {
      title: 'Create Definition',
      state: 'definitions.create',
      roles: ['user']
    });
  }
})();
