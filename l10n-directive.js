// Generated by CoffeeScript 1.7.1
(function() {
  define([], function() {
    var directive;
    return directive = function(l10n) {
      var dir, directiveTemplate, prev, v;
      prev = '';
      v = angular.version.major + angular.version.minor / 1000;
      if (v >= 1.003) {
        directiveTemplate = '{{::locale}}';
      } else {
        directiveTemplate = '{{locale}}';
      }
      return dir = {
        template: directiveTemplate,
        restrict: 'EA',
        scope: {
          "var": '=',
          asDate: '@'
        },
        link: function($scope, el, attrs) {
          var doMagick, str;
          doMagick = function(str) {
            var translated;
            if (typeof $scope.asDate !== 'undefined') {
              translated = l10n.formatDate(str, $scope.asDate);
            } else if (typeof l10n === 'undefined' || typeof l10n === 'null') {
              translated = str;
            } else {
              translated = l10n.get(str);
            }
            switch (el[0].tagName.toLowerCase()) {
              case 'input':
                return el[0].value = translated;
              case 'img':
                el[0].alt = translated;
                return el[0].title = translated;
              default:
                return $scope.locale = translated;
            }
          };
          if ($scope["var"]) {
            str = $scope["var"];
          } else {
            str = doMagick(attrs.l10n);
          }
          return $scope.$watch('var', function(value) {
            if (typeof value === 'undefined') {
              return;
            }
            return doMagick(value);
          });
        }
      };
    };
  });

}).call(this);

//# sourceMappingURL=l10n-directive.map
