//- app/provider/routes.js
export default function routes($urlRouterProvider, $stateProvider) {

  return $stateProvider
    .state('iproviders', {
      url: '/iproviders',
      controller: 'ProviderListController as ctrl',
      templateUrl: 'iprovider/views/providers.html',
      resolve: {
        providerList: function($stateParams, IProviderService) {
          return IProviderService.list($stateParams);
        },
        providerTypes: function(TypeService) {
          return TypeService.getProviderTypes();
        },
        genderTypes: function(TypeService) {
          return TypeService.getGenderTypes();
        }
      }
    })
    .state('iproviders.create', {
      url: '/create',
      controller: 'ProviderCreateEditController as ctrl',
      templateUrl: 'iprovider/views/providers.create-edit.html',
      resolve: {
        provider: function(IProviderService) {
          return IProviderService.create();
        }
      }
    })
    .state('iproviders.edit', {
      url: '/edit/:id',
      controller: 'ProviderCreateEditController as ctrl',
      templateUrl: 'iprovider/views/providers.create-edit.html',
      resolve: {
        provider: function($stateParams, IProviderService) {
          return IProviderService.get($stateParams.id);
        }
      }
    })
    .state('iproviders.show', {
      url: '/show/:id',
      controller: 'ProviderShowController as ctrl',
      templateUrl: 'iprovider/views/providers.show.html',
      resolve: {
        provider: function($stateParams, IProviderService) {
          return IProviderService.get($stateParams.id);
        }
      }
    });
}
