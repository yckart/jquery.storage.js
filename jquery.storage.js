/*!
 * jquery.storage.js 0.1 - https://github.com/yckart/jquery.storage.js
 * The client-side storage for every browser, on any device.
 *
 * Copyright (c) 2012 Yannick Albert (http://yckart.com)
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
 * 2013/02/10
 **/
;(function($, window) {
    "use strict";

    var support = [];

    $.map(['localStorage', 'sessionStorage'], function( type ) {
        try {
            support[type] = type in window && window[type] !== null;
        } catch (e) {
            support[type] = false;
        }

        $[type] = function(key, value) {
            this.settings = $.extend({}, $[type].defaults, key);

            this.getItem = function( key ) {
                return JSON.parse(support[type] ? window[type].getItem(key) : $.cookie(this.settings.cookiePrefix + key));
            };

            this.setItem = function( key, value ) {
                value = JSON.stringify(value);
                return support[type] ? window[type].setItem(key, value) : $.cookie(this.settings.cookiePrefix + key, value, this.settings.cookieOptions);
            };

            this.removeItem = function( key ) {
                return support[type] ? window[type].removeItem(key) : $.cookie(this.settings.cookiePrefix + key, null, $.extend(this.settings.cookieOptions, {
                    expires: -1
                }));
            };

            this.clear = function() {
                if(support[type]) {
                    return window[type].clear();
                } else {
                    var reg = new RegExp('^' + this.settings.cookiePrefix, ''),
                        options = $.extend(this.settings.cookieOptions, {
                            expires: -1
                        });

                    if(document.cookie && document.cookie !== ''){
                        $.map(document.cookie.split(';'), function( cookie ){
                            if(reg.test(cookie = $.trim(cookie))) {
                                 $.cookie( cookie.substr(0,cookie.indexOf('=')), null, options);
                            }
                        });
                    }
                }
            };
            if (typeof key !== "undefined") {
                if (typeof value !== "undefined") {
                    if (value === null) {
                        return this.removeItem(key);
                    } else {
                        return this.setItem(key, value);
                    }
                } else {
                    return this.getItem(key);
                }
            }
            return this;
        };

        $[type].defaults = {
            cookiePrefix : 'html5fallback:' + type + ':',
            cookieOptions : {
                path : '/',
                domain : document.domain,
                expires : ('localStorage' === type) ? { expires: 365 } : undefined
            }
        };
    });
})(jQuery, window);
