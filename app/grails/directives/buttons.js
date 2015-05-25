function crudButton($state, FlashService) {
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
        var resourceName = $scope.item.route.replace(/s$/g,"");

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
        var resourceName = $scope.item.route.replace(/s$/g,"");

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
          return "grails/templates/directives/buttons/create-button.tpl.html";
        case "edit":
          return "grails/templates/directives/buttons/edit-button.tpl.html";
        case "delete":
          return "grails/templates/directives/buttons/delete-button.tpl.html";
        case "save":
          return "grails/templates/directives/buttons/save-button.tpl.html";
      }

    }
  }
}

angular.module('grails.directives.buttons', ['grails.services'])
  .directive('crudButton', crudButton);

