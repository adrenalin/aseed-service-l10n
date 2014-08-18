define [], () ->
  directive = (l10n) ->
    prev = ''
    
    v = angular.version.major + angular.version.minor / 1000
    
    # If version is at least 1.3, bind locale only once to save cycles
    if v >= 1.003
      directiveTemplate = '{{::locale}}'
    else
      directiveTemplate = '{{locale}}'
    
    dir =
      template: directiveTemplate
      restrict: 'EA'
      scope:
        var: '='
        asDate: '@'
      
      link: ($scope, el, attrs) ->
        # Place the operations in a method, since sometimes the watcher cycle and directive
        # aren't synchronized. This requires a custom watch event for this scope.
        doMagick = (str) ->
          console.log 'str', str
          
          if typeof $scope.asDate isnt 'undefined'
            console.log 'formatDate', str, $scope.asDate
            translated = l10n.formatDate str, $scope.asDate
          else if typeof l10n is 'undefined' or typeof l10n is 'null'
            translated = str
          else
            translated = l10n.get(str)
          
          # Change other parameters than text when there is no input
          switch el[0].tagName.toLowerCase()
            when 'input'
              el[0].value = translated
            when 'img'
              el[0].alt = translated
              el[0].title = translated
            else
              $scope.locale = translated
        
        if $scope.var
          str = $scope.var
        else
          str = doMagick(attrs.l10n)
        
        $scope.$watch 'var', (value) ->
          return if typeof value is 'undefined'
          doMagick value
