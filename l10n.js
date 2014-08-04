// Generated by CoffeeScript 1.7.1
(function() {
  define(['text!../locales.xml', 'jquery'], function(locales, $) {
    var L10n, l10n;
    L10n = (function() {
      function L10n() {}

      L10n.prototype.locales = {};

      L10n.prototype.fallback = 'en';

      L10n.prototype.addLocale = function(str, lang, value) {
        var l;
        if (typeof this.locales === 'undefined') {
          l = L10n.prototype.locales;
        } else {
          l = this.locales;
        }
        if (typeof l[str] === 'undefined') {
          l[str] = {};
        }
        return l[str][lang] = value;
      };

      L10n.prototype.addLocales = function(locales) {
        var l;
        if (typeof this.locales === 'undefined') {
          l = L10n.prototype.locales;
        } else {
          l = this.locales;
        }
        return l = $.extend({}, l, locales);
      };

      L10n.prototype.get = function(str, lang) {
        var fallback, l;
        if (typeof this.locales === 'undefined') {
          l = L10n.prototype.locales;
        } else {
          l = this.locales;
        }
        if (typeof this.fallback === 'undefined') {
          fallback = L10n.prototype.fallback;
        } else {
          fallback = this.fallback;
        }
        if (!str) {
          return '';
        }
        if (typeof lang === 'undefined' && typeof self.lang === 'string') {
          lang = self.lang;
        }
        if (!lang) {
          lang = 'fi';
        }
        lang = lang.toString().toLowerCase();
        if (typeof l[str] === 'undefined' || typeof l[str][lang] === 'undefined' || !l[str][lang]) {
          if (typeof l[str] !== 'undefined' && typeof l[str][fallback] !== 'undefined') {
            return l[str][fallback];
          }
          return str;
        }
        return l[str][lang];
      };

      L10n.prototype.addLocalesJSON = function(json) {
        return this.addLocales(json);
      };

      L10n.prototype.addLocalesXML = function(locales) {
        var alias, aliases, children, data, error, i, id, k, key, l10nXML, lang, namespace, _i, _j, _ref, _ref1, _results;
        l10nXML = $($.parseXML(locales));
        data = l10nXML.find('locale');
        aliases = {};
        namespace = l10nXML.find('locales').attr('namespace');
        if (typeof namespace === 'undefined') {
          namespace = '';
        } else {
          namespace = namespace.toString().replace(/\.?$/, '.');
          console.log('append namespace', namespace);
        }
        for (i = _i = 0, _ref = data.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          id = namespace + data.eq(i).attr('id');
          children = data.eq(i).find('> *');
          if (alias = data.eq(i).attr('alias')) {
            aliases[id] = alias;
            continue;
          }
          this.locales[id] = {};
          for (k = _j = 0, _ref1 = children.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; k = 0 <= _ref1 ? ++_j : --_j) {
            lang = children.eq(k).get(0).tagName.toLowerCase();
            try {
              this.addLocale(id, lang, children.eq(k).html());
            } catch (_error) {
              error = _error;
              this.addLocale(id, lang, children.eq(k).text());
            }
          }
        }
        _results = [];
        for (alias in aliases) {
          key = aliases[alias];
          if (typeof this.locales[key] !== 'undefined') {
            _results.push(this.locales[alias] = this.locales[key]);
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };

      return L10n;

    })();
    l10n = new L10n;
    l10n.addLocalesXML(locales);
    return l10n;
  });

}).call(this);

//# sourceMappingURL=l10n.map
