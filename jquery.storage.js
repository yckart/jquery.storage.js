/*!
 * jquery.storage.js 0.0.3 - https://github.com/yckart/jquery.storage.js
 * The client-side storage for every browser, on any device.
 *
 * Copyright (c) 2012 Yannick Albert (http://yckart.com)
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
 * 2013/02/10
 **/
;(function($, window, document) {
    'use strict';

    $.map(['localStorage', 'sessionStorage'], function( method ) {
        var defaults = {
            cookiePrefix : 'fallback:' + method + ':',
            cookieOptions : {
                path : '/',
                domain : document.domain,
                expires : ('localStorage' === method) ? { expires: 365 } : undefined
            }
        };

        var storageSupport = function(method) {
            try {
                if (method in window && window[method] !== null) {
                    window[method].setItem("jqueryStorageWriteSupport", "1");
                    window[method].removeItem("jqueryStorageWriteSupport");
                    return true;
                }
            }
            catch(e) { }

            return false;
        };

        $.support[method] = storageSupport(method);

        $[method] = function(key, value) {
            var options = $.extend({}, defaults, $[method].options);

            this.getItem = function( key ) {
                var returns = function (key) {
                    var val = $.support[method] ? window[method].getItem(key) : $.cookie(options.cookiePrefix + key);
                    return val && ($.support[method] ? JSON.parse(val) : val);
                };
                if(typeof key === 'string') return returns(key);

                var arr = [],
                    i = key.length;
                while(i--) arr[i] = returns(key[i]);
                return arr;
            };

            this.setItem = function( key, value ) {
                value = JSON.stringify(value);
                return $.support[method] ? window[method].setItem(key, value) : $.cookie(options.cookiePrefix + key, value, options.cookieOptions);
            };

            this.removeItem = function( key ) {
                return $.support[method] ? window[method].removeItem(key) : $.cookie(options.cookiePrefix + key, null, $.extend(options.cookieOptions, {
                    expires: -1
                }));
            };

            this.clear = function() {
                if($.support[method]) {
                    return window[method].clear();
                } else {
                    var reg = new RegExp('^' + options.cookiePrefix, ''),
                        opts = $.extend(options.cookieOptions, {
                            expires: -1
                        });

                    if(document.cookie && document.cookie !== ''){
                        $.map(document.cookie.split(';'), function( cookie ){
                            if(reg.test(cookie = $.trim(cookie))) {
                                 $.cookie( cookie.substr(0,cookie.indexOf('=')), null, opts);
                            }
                        });
                    }
                }
            };

            if (typeof key !== "undefined") {
                return typeof value !== "undefined" ? ( value === null ? this.removeItem(key) : this.setItem(key, value) ) : this.getItem(key);
            }

            return this;
        };

        $[method].options = defaults;
    });
}(jQuery, window, document));
