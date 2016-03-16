"use strict";

let uuid = require('uuid');

module.exports = (mod) => {
  mod.directive('richEditor', function($timeout) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        content: '='
      },
      link: function(scope, element, attributes) {
        let editor;

        scope.myID = uuid();

        scope.$evalAsync(() => {
          tinymce.init({
            selector: `#${scope.myID}`,
            setup : function(ed) {
              ed.on('change', function(e){
                scope.content = tinymce.activeEditor.getContent();
                scope.$apply();
              });
              ed.on('keyup', function(){
                scope.content = tinymce.activeEditor.getContent();
                scope.$apply();
              });
            }
          })
            .then((editors) => editors[0].setContent(scope.content || ''));
        });

        scope.$watch('content', (content) => {
          if (!editor) {
            return;
          }

          editor.setContent(content);
        });
      },

      template: `<textarea id="{{myID}}"></textarea>`
    }
  });

};
