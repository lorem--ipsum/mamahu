"use strict";

let angular = require('angular');

require('./utils');
require('./composer');

angular.module('app', ['composer'])

.controller('appController', function($scope) {
  $scope.content = "<h1>Hello</h1>";

  $scope.$watch('content', (content) => {
    // console.log(content);
  });
})

;
