"use strict"

module.exports = (mod) => {
  let keys = [
    {name: "Backspace", code: 8},
    {name: "Escape", code: 27},
    {name: "Enter", code: 13},
    {name: "Up", code: 38},
    {name: "Down", code: 40},
    {name: "Comma", code: 188},
    {name: "Alt", code: 18}
  ];

  let codeByKeys = {};
  keys.forEach(({name, code}) => codeByKeys[name.toUpperCase()] = code);

  mod.factory('keysWatcher', function($document) {
    let _callbacks = {any: []};

    keys.forEach(({name, code}) => _callbacks[code] = []);

    document.addEventListener('keydown', (event) => {
      _callbacks.any.forEach((callback) => callback(event));

      if (_callbacks[event.keyCode]) {
        _callbacks[event.keyCode].forEach((callback) => callback(event));
      }
    });

    return {
      keys: codeByKeys,
      remember: (key, callback) => {
        if (!_callbacks[key]) {
          throw new Error('Unknown key : ', key);
        }

        return key + '_' + (_callbacks[key].push(callback) - 1)
      },

      forget: (id) => {
        [key, index] = id.split('_');
        _callbacks[key].splice(index, 1);
      }
    }
  });

  keys.forEach((key) => {
    let directiveName = `on${key.name}`;

    mod.directive(directiveName, ($parse, keysWatcher) => {
      return {
        compile: ($element, attributes) => {
          return (scope) => {
            let fn = $parse(attributes[directiveName]);
            keysWatcher.remember(key.code, (event) => {
              scope.$apply( () => fn(scope, {$event: event}));
            });
          }
        }
      }
    })
  });
}
;
