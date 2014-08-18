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
        if $scope.var
          str = $scope.var
        else
          str = attrs.l10n
        
        if typeof $scope.asDate isnt 'undefined'
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
