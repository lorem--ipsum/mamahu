module.exports = (mod) => {
  mod.directive('composer', function($timeout) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        content: '='
      },
      link: function(scope, element, attributes) {

      },

      template: "<div></div>"
    }
  });

};
