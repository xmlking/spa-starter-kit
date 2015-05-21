function crudButton($state, $location, defaultCrudResource, FlashService) {
  return {
    restrict: 'EA',
    replace: true,
    scope: {
      crudButton: '@',
      item: '=',
      isDisabled: '=',
      afterAction: '&'
    },
    link: function ($scope) {
      var resourceName = defaultCrudResource.getResourceName();

      var createFn = function () {
        if($state.current.name.endsWith('.show')
          || $state.current.name.endsWith('.edit')
          || $state.current.name.endsWith('.create')) {
          $state.go("^.create");
        } else {
          $state.go(".create");
        }
        if ($scope.afterAction) {
          $scope.afterAction();
        }
      };

      var editFn = function () {
        $state.go("^.edit", {id: $scope.item.id});
        if ($scope.afterAction) {
          $scope.afterAction();
        }
      };

      var saveFn = function () {
        console.log('$scope.item save', $scope.item);
        $scope.item.save()
          .then((response) => {
            if ($scope.afterAction) {
              $scope.afterAction();
            }
            var message =  `${resourceName} was successfully saved`;
            FlashService.success(message, {routeChange: true});
            $state.go("^.show", {id: response.id}, { reload: true });
          })
          .catch((data) => {
            var messages = [];
            angular.forEach(data.data.errors, function (error) {
              messages.push(error.message);
            });

            FlashService.error(messages);
          })
      };

      var deleteFn = function () {
        $scope.item.remove()
          .then(() => {
            if ($scope.afterAction) {
              $scope.afterAction();
            }
            var message =  `${resourceName}  was successfully deleted`;
            FlashService.success(message, {routeChange: true});
            $state.go("^", {}, { reload: true });
          })
          .catch(() => {
            var message = `Couldn't delete ${resourceName}` ;
            FlashService.error(message);
          })

      };

      $scope.onClick = function () {
        switch ($scope.crudButton) {
          case "create" :
            createFn();
            break;
          case "edit" :
            editFn();
            break;
          case "delete" :
            deleteFn();
            break;
          case "save" :
            saveFn();
            break;
        }
      }
    },
    templateUrl: function (element, attrs) {
      switch (attrs.crudButton) {
        case "create":
          return "grails/templates/directives/buttons/create-button.html";
        case "edit":
          return "grails/templates/directives/buttons/edit-button.html";
        case "delete":
          return "grails/templates/directives/buttons/delete-button.html";
        case "save":
          return "grails/templates/directives/buttons/save-button.html";
      }

    }
  }
}

angular.module('grails.directives.buttons', ['grails.services'])
  .directive('crudButton', crudButton);
