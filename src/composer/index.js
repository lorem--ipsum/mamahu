"use strict";

let mod = angular.module('composer', ['utils']);

require('./rich-editor')(mod);
require('./email-input')(mod);

mod.directive('composer', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      content: '='
    },
    link: function(scope, element, attributes) {
      scope.knownAddresses = [
        {label: 'Andy', value: 'andy@protonmail.com'},
        {label: 'Jason', value: '<jason@protonmail.com>'},
        {label: 'Richard', value: 'Richard <richard@protonmail.com>'}
      ];
    },

    template: `
      <div class="composer">
        <div class="handle-bar"></div>
        <email-input entered-emails="emails" known-addresses="knownAddresses"></email-input>
        <rich-editor content="content"></rich-editor>
        <div class="button-bar right">
          <button class="send">Send</button>
        </div>
      </div>
    `
  }
});


