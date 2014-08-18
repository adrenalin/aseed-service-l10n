define ['jquery'], ($) ->
  class L10n
    locales: {}
    fallback: 'en'
    
    # Lazy approach now: use a predefined set
    formatDate: (date, format) ->
      if typeof date is 'String' then date = new Date(date)
      
      switch format
        when 'H:i'
          hour = date.getHours().toString()
          if hour.length < 2 then hour = "0#{hour}"
          
          min = date.getMinutes().toString()
          if min.length < 2 then min = "0#{min}"
          return "#{hour}:#{min}"
        when 'd.m.'
          return "#{date.getDate()}.#{date.getMonth()}."
        when 'd.m.Y'
          return "#{date.getDate()}.#{date.getMonth()}.#{date.getFullYear()}"
        when 'Y-m-d'
          month = date.getMonth().toString()
          if month.length < 2 then month = "0#{month}"
          
          day = date.getDate().toString()
          if day.length < 2 then day = "0#{day}"
          
          return "#{date.getFullYear()}-#{month}-#{day}"
          
        when 'Y-m-dTH:i', 'ISO', 'iso'
          return @formatDate(date, 'Y-m-d') + 'T' + @formatDate(date, 'H:i')
        
        else
          return "#{date.getDate()}.#{date.getMonth()}.#{date.getFullYear()}"
    
    addLocale: (str, lang, value) ->
      if typeof @locales is 'undefined'
        l = L10n.prototype.locales
      else
        l = @locales
      
      if typeof l[str] is 'undefined'
        l[str] = {}
      
      l[str][lang] = value
    
    addLocales: (locales) ->
      if typeof @locales is 'undefined'
        l = L10n.prototype.locales
      else
        l = @locales
      
      l = $.extend({}, l, locales)
    
    get: (str, lang) ->
      if typeof @locales is 'undefined'
        l = L10n.prototype.locales
      else
        l = @locales
      
      if typeof @fallback is 'undefined'
        fallback = L10n.prototype.fallback
      else
        fallback = @fallback
      
      if !str
        return ''
      
      if typeof lang is 'undefined' and typeof self.lang is 'string'
        lang = self.lang
      
      if !lang
        lang = 'fi'
      
      lang = lang.toString().toLowerCase()
      
      if typeof l[str] is 'undefined' or typeof l[str][lang] is 'undefined' or !l[str][lang]
        if typeof l[str] isnt 'undefined' and typeof l[str][fallback] isnt 'undefined'
          return l[str][fallback]
        return str
      
      return l[str][lang]
    
    addLocalesJSON: (json) ->
      @addLocales(json)
    
    addLocalesXML: (locales) ->
      l10nXML = $($.parseXML(locales))
      data = l10nXML.find('locale')
      aliases = {}
      
      namespace = l10nXML.find('locales').attr('namespace')
      
      if typeof namespace is 'undefined'
        namespace = ''
      else
        namespace = namespace.toString().replace(/\.?$/, '.')
        console.log 'append namespace', namespace
      
      for i in [0...data.length]
        id = namespace + data.eq(i).attr('id')
        children = data.eq(i).find('> *')
        
        if alias = data.eq(i).attr('alias')
          aliases[id] = alias
          continue
        
        @locales[id] = {}
        
        for k in [0...children.length]
          lang = children.eq(k).get(0).tagName.toLowerCase()
          try
            @addLocale(id, lang, children.eq(k).html())
          catch error
            @addLocale(id, lang, children.eq(k).text())
      
      for alias, key of aliases
        if typeof @locales[key] isnt 'undefined'
          @locales[alias] = @locales[key]
