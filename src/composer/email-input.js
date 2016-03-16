"use strict";

module.exports = (mod) => {
  mod.directive('address', () => {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        value: '='
      },
      link: (scope, element, attributes) => {
        scope.editing = false;

        scope.onEnter = () => {
          scope.value.value = scope.currentValue;
          scope.editing = false;
        };

        scope.onEscape = () => {
          scope.editing = false;
          scope.currentValue = scope.value.value;
        };

        scope.onClick = () => {
          scope.editing = true;
        };

        scope.$watch('value.value', (value) => {
          scope.currentValue = value;
        });
      },

      template: `
        <div class="address" on-enter="onEnter()" on-escape="onEscape()" ng-click="onClick()">
          <span ng-show="!editing" class="label">{{value.label}} {{value.value}}</span>
          <input ng-show="editing" type="text" ng-model="currentValue">
        </div>
      `
    }
  });

  mod.directive('emailInput', ($timeout) => {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        knownAddresses: '=',
        enteredEmails: '='
      },
      link: (scope, element, attributes) => {
        scope.enteredEmails = [];

        let isValid = (address) => {
          // This should be a regular expression
          return !!address;
        }

        scope.addEmail = () => {
          if (!scope.currentEmail) {
            return;
          }

          if (scope.hoveredSuggestionIndex > -1) {
            scope.enteredEmails.push(scope.suggestions[scope.hoveredSuggestionIndex]);
          } else if (isValid(scope.currentEmail)) {
            // In case it's been added because of a trailing comma
            // we remove it
            let value = scope.currentEmail.replace(/,$/, '')
            scope.enteredEmails.push({value});
          }

          $timeout(() => {
            scope.suggestions = [];
            scope.currentEmail = ""
            scope.hoveredSuggestionIndex = -1;
          });
        };

        scope.$watch('currentEmail', (currentEmail) => {
          scope.hoveredSuggestionIndex = -1;

          if (!currentEmail) {
            scope.suggestions = [];
            return;
          }
          scope.suggestions = scope.knownAddresses.filter(({label, value}) => {
            return name.search(currentEmail) > -1 || value.search(currentEmail) > -1;
          });
        });

        scope.decreaseHoveredIndex = () => {
          let i = scope.hoveredSuggestionIndex;
          i--;

          scope.hoveredSuggestionIndex = i >= 0 ? i : scope.suggestions.length - 1;
        };

        scope.increaseHoveredIndex = () => {
          let i = scope.hoveredSuggestionIndex;
          i++;

          scope.hoveredSuggestionIndex = i < scope.suggestions.length ? i : 0;
        };

        scope.hideSuggestions = () => {
          scope.hoveredSuggestionIndex = -1;
          scope.suggestions = [];
        }
      },

      template: `
      <div class="email-input">
        <address value="email" ng-repeat="email in enteredEmails track by $index"></address>
        <input
          type="text"
          ng-model="currentEmail"
          on-enter="addEmail()"
          on-comma="addEmail()"
          on-up="decreaseHoveredIndex()"
          on-down="increaseHoveredIndex()"
          on-escape="hideSuggestions()"
        >
        <div class="suggestions" ng-show="suggestions.length">
          <div
            class="suggestion"
            ng-class="{hovered: hoveredSuggestionIndex === $index}"
            ng-repeat="s in suggestions"
            ng-click="addEmail()"
            ng-mouseover="$parent.hoveredSuggestionIndex = $index"
            ng-mouseout="$parent.hoveredSuggestionIndex = $index"
          ><span class="label">{{s.label}}</span><span class="value">{{s.value}}</span></div>
        </div>
      <div>
      `
    }
  });

};
