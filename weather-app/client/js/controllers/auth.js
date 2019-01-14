// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-getting-started-intermediate
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app')
  .controller('AuthLoginController', ['$scope', 'AuthService', '$state',
    function ($scope, AuthService, $state) {
      $scope.showErrorMessage = false;

      $scope.login = function () {
      $scope.showErrorMessage = false;

        AuthService.login($scope.user.email, $scope.user.password)
          .then(function () {

            // return to saved returnTo state before redirection to login
            if ($scope.returnTo && $scope.returnTo.state) {
              $state.go(
                $scope.returnTo.state.name,
                $scope.returnTo.params
              );
              // maintain the inherited rootscope variable returnTo
              // but make the returnTo state of it null,
              // so it can be used again after a new login.
              $scope.returnTo.state = null;
              $scope.returnTo.params = null;
              return;
            }
            // or go to the default state after login
            $state.go('weather');
          }).catch(function(error) {
            $scope.showErrorMessage = true;
          });
      };
    }])
  .controller('AuthLogoutController', ['$scope', 'AuthService', '$state',
    function ($scope, AuthService, $state) {
      AuthService.logout()
        .then(function () {
          $state.go('login');
        });
    }])
  .controller('SignUpController', ['$scope', 'AuthService', '$state',
    function ($scope, AuthService, $state) {
      $scope.showEmailAlreadyExists = false;
      $scope.showErrorMessage = false;

      $scope.register = function () {
        AuthService.register($scope.user)
          .then(function () {
            $state.transitionTo('sign-up-success');
          })
          .catch(function(response) {
            var errorMessage = response.data.error.message;
            if (errorMessage.includes('Email already exists')) {
              $scope.showEmailAlreadyExists = true;
            } else {
              $scope.showErrorMessage = true;
            }
          });
      };
    }]);
