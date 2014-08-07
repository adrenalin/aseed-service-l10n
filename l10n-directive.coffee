define [], () ->
  directive = (l10n) ->
    prev = ''
    
    dir =
      template: '{{locale}}'
      restrict: 'EA'
      scope:
        var: '='
      
      link: ($scope, el, attrs) ->
        
        if $scope.var
          str = $scope.var
        else
          str = attrs.l10n
        
        if typeof l10n is 'undefined' or typeof l10n is 'null'
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
