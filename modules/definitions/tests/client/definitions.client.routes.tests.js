(function () {
  'use strict';

  describe('Definitions Route Tests', function () {
    // Initialize global variables
    var $scope,
      DefinitionsService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _DefinitionsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      DefinitionsService = _DefinitionsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('definitions');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/definitions');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          DefinitionsController,
          mockDefinition;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('definitions.view');
          $templateCache.put('modules/definitions/client/views/view-definition.client.view.html', '');

          // create mock Definition
          mockDefinition = new DefinitionsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Definition Name'
          });

          //Initialize Controller
          DefinitionsController = $controller('DefinitionsController as vm', {
            $scope: $scope,
            definitionResolve: mockDefinition
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:definitionId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.definitionResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            definitionId: 1
          })).toEqual('/definitions/1');
        }));

        it('should attach an Definition to the controller scope', function () {
          expect($scope.vm.definition._id).toBe(mockDefinition._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/definitions/client/views/view-definition.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          DefinitionsController,
          mockDefinition;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('definitions.create');
          $templateCache.put('modules/definitions/client/views/form-definition.client.view.html', '');

          // create mock Definition
          mockDefinition = new DefinitionsService();

          //Initialize Controller
          DefinitionsController = $controller('DefinitionsController as vm', {
            $scope: $scope,
            definitionResolve: mockDefinition
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.definitionResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/definitions/create');
        }));

        it('should attach an Definition to the controller scope', function () {
          expect($scope.vm.definition._id).toBe(mockDefinition._id);
          expect($scope.vm.definition._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/definitions/client/views/form-definition.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          DefinitionsController,
          mockDefinition;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('definitions.edit');
          $templateCache.put('modules/definitions/client/views/form-definition.client.view.html', '');

          // create mock Definition
          mockDefinition = new DefinitionsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Definition Name'
          });

          //Initialize Controller
          DefinitionsController = $controller('DefinitionsController as vm', {
            $scope: $scope,
            definitionResolve: mockDefinition
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:definitionId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.definitionResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            definitionId: 1
          })).toEqual('/definitions/1/edit');
        }));

        it('should attach an Definition to the controller scope', function () {
          expect($scope.vm.definition._id).toBe(mockDefinition._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/definitions/client/views/form-definition.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
