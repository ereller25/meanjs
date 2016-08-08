(function () {
  'use strict';

  angular
    .module('definitions')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('definitions', {
        abstract: true,
        url: '/definitions',
        template: '<ui-view/>'
      })
      .state('definitions.list', {
        url: '',
        templateUrl: 'modules/definitions/client/views/list-definitions.client.view.html',
        controller: 'DefinitionsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Definitions List'
        }
      })
      .state('definitions.create', {
        url: '/create',
        templateUrl: 'modules/definitions/client/views/form-definition.client.view.html',
        controller: 'DefinitionsController',
        controllerAs: 'vm',
        resolve: {
          definitionResolve: newDefinition
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Definitions Create'
        }
      })
      .state('definitions.edit', {
        url: '/:definitionId/edit',
        templateUrl: 'modules/definitions/client/views/form-definition.client.view.html',
        controller: 'DefinitionsController',
        controllerAs: 'vm',
        resolve: {
          definitionResolve: getDefinition
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Definition {{ definitionResolve.name }}'
        }
      })
      .state('definitions.view', {
        url: '/:definitionId',
        templateUrl: 'modules/definitions/client/views/view-definition.client.view.html',
        controller: 'DefinitionsController',
        controllerAs: 'vm',
        resolve: {
          definitionResolve: getDefinition
        },
        data:{
          pageTitle: 'Definition {{ articleResolve.name }}'
        }
      });
  }

  getDefinition.$inject = ['$stateParams', 'DefinitionsService'];

  function getDefinition($stateParams, DefinitionsService) {
    return DefinitionsService.get({
      definitionId: $stateParams.definitionId
    }).$promise;
  }

  newDefinition.$inject = ['DefinitionsService'];

  function newDefinition(DefinitionsService) {
    return new DefinitionsService();
  }
})();
