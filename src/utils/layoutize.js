"use strict"

module.exports = (mod) => {
  mod.directive('layoutize', ($parse) => {
    return {
      restrict: 'A',
      link: (scope, element, attrs) => {
        let options = {
          tileWidth: 600
        };

        let getDimensions = () => {
          let rect = element[0].getBoundingClientRect();
          return {height: rect.height, width: rect.width}
        };

        scope.width = getDimensions().width;

        scope.$watch(getDimensions, (rect) => {
          scope.width = rect.width;
        }, true);

        let update = () => {
          let items = $parse(attrs.layoutize)(scope);

          if (!items || items.length === 0) {
            return;
          }

          let n = items.length;
          let width = scope.width;
          let tileWidth = options.tileWidth;
          if (n * tileWidth <= width) {
            items.forEach((item, i) => {
              item.style = {};
              item.style.right = (n - i - 1) * tileWidth + 'px';
              item.style.width = tileWidth + 'px';
            });
          } else {
            items.forEach((item, i) => {
              item.style = {};
              item.style.right = ((width - tileWidth)/n)*i + 'px';
              item.style.width = tileWidth + 'px';
            });
          }
        };

        scope.$watch('width', () => {
          update();
        });

        scope.$watchCollection(attrs.layoutize, () => {
          update();
        });
      }
    }
  });
};
