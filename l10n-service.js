// Generated by CoffeeScript 1.8.0
(function() {
  define(['jquery'], function($) {
    var L10n;
    return L10n = (function() {
      function L10n() {}

      L10n.prototype.locales = {};

      L10n.prototype.fallback = 'en';

      L10n.prototype.lang = 'en';

      L10n.prototype.formatDate = function(date, format) {
        var day, hour, min, month;
        if (typeof date === 'undefined' || date === '' || date === null) {
          return '';
        }
        if (!(date instanceof Date)) {
          date = new Date(date);
        }
        switch (format) {
          case 'H:i':
            hour = date.getHours().toString();
            if (hour.length < 2) {
              hour = "0" + hour;
            }
            min = date.getMinutes().toString();
            if (min.length < 2) {
              min = "0" + min;
            }
            return "" + hour + ":" + min;
          case 'd.m.':
            return "" + (date.getDate()) + "." + (date.getMonth()) + ".";
          case 'd.m.Y':
            return "" + (date.getDate()) + "." + (date.getMonth()) + "." + (date.getFullYear());
          case 'Y-m-d':
            month = date.getMonth().toString();
            if (month.length < 2) {
              month = "0" + month;
            }
            day = date.getDate().toString();
            if (day.length < 2) {
              day = "0" + day;
            }
            return "" + (date.getFullYear()) + "-" + month + "-" + day;
          case 'Y-m-dTH:i':
          case 'ISO':
          case 'iso':
            return this.formatDate(date, 'Y-m-d') + 'T' + this.formatDate(date, 'H:i');
          default:
            return "" + (date.getDate()) + "." + (date.getMonth()) + "." + (date.getFullYear());
        }
      };

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

      L10n.prototype.setLang = function(lang) {
        L10n.prototype.lang = lang;
        return this.lang = lang;
      };

      L10n.prototype.get = function(str, lang) {
        var fallback, l;
        if (lang == null) {
          lang = null;
        }
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
          if (typeof this.lang === 'undefined') {
            lang = L10n.prototype.lang;
          } else {
            lang = this.lang;
          }
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
  });

}).call(this);

//# sourceMappingURL=l10n-service.js.map
