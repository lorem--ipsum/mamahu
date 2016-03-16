"use strict";

let angular = require('angular');

require('./utils');
require('./composer');

angular.module('app', ['composer'])

.controller('appController', function($scope) {
  $scope.emails = [];

  $scope.newEmail = () => {
    $scope.emails.push({});
  };
})

;
