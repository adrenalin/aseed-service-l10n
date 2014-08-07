# Usage

Add service. Possible to load already here the locales.

    define ['angular', 'lib/aseed-service-l10n/l10n-service', 'text!../locales/core.xml'], (angular, L10n, l10n_core) ->
      'use strict'
      module = angular.module('template.services', [])
      module.value('version', '0.1')
      
      module.factory 'l10n', ->
        l10n = new L10n()
        l10n.addLocalesXML(l10n_core)
        return l10n
      
      return module

Add directive.

    define ['angular', 'services', 'directives/selector', 'directives/search', 'lib/aseed-l10n/l10n-directive'], (angular, services, selector, search, l10n) ->
      'use strict'
    
      module = angular.module 'template.directives', ['template.services']
      module.directive 'l10n', l10n
      
      return module

Use directive.

    <h1 l10n="l10n.string"></h1>
    <input type="submit" l10n="form.save" />
