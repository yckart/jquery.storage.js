/*!
 * jquery.storage.js 0.1 - https://github.com/yckart/jquery.storage.js
 * The client-side storage for every browser, on any device.
 *
 * Copyright (c) 2012 Yannick Albert (http://yckart.com)
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
 * 2013/02/10
 **/

;(function ($, window, document) {

    var ls = window.localStorage;

    $.support.localStorage = supported = typeof ls == 'undefined' || typeof window.JSON == 'undefined' ? false : true;

    /* Make the methods public */
    $.storage = function (key, value, options) {
        return $.storage.impl.init(key, value);
    };

    $.storage.setItem = function (key, value) {
        return $.storage.impl.setItem(key, value);
    };

    $.storage.getItem = function (key) {
        return $.storage.impl.getItem(key);
    };

    $.storage.getAll = function () {
        return $.storage.impl.getAll();
    };

    $.storage.deleteItem = function (key) {
        return $.storage.impl.deleteItem(key);
    };

    /* Object to hold all methods: public and private */
    $.storage.impl = {

        init: function (key, value) {
            return typeof value != 'undefined' ? this.setItem(key, value) : this.getItem(key);
        },

        setItem: function (key, value) {
            if (!$.support.localStorage) {
                var expires = new Date();
                    expires.setTime(expires.getTime() + 31536000000); // 1 year
                    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
                    return value;
            }
            var saver = JSON.stringify(value);
            ls.setItem(key, saver);
            return this.parseResult(saver);
        },

        getItem: function (key) {
            if (!$.support.localStorage) {
                try {
                    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
                    return this.parseResult(keyValue ? keyValue[2] : null);
                } catch (e) {
                    return null;
                }
            }
            return this.parseResult(ls.getItem(key));
        },
        deleteItem: function (key) {
            var returns = this.getItem(key);
            if (!$.support.localStorage) {
                try {
                    document.cookie = encodeURIComponent(key) + "=deleted; expires=" + new Date(0).toUTCString();
                    return true;
                } catch (e) {
                    return false;
                }
            }

            ls.removeItem(key);
            return returns ? true : false;
        },
        getAll: function () {
            var items = [];
            if (!$.support.localStorage) {
                try {
                    var pairs = document.cookie.split(";");
                    while (pairs.length--) {
                        var pair = pairs[pairs.length].split('=');
                        var key = pair[0];
                        var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
                        items.push({
                            key: key,
                            value: this.parseResult(keyValue ? keyValue[2] : null)
                        });
                    }
                } catch (e) {
                    return null;
                }
            } else {
                for (var i in ls) {
                    if (i.length) {
                        items.push({
                            key: i,
                            value: this.parseResult(ls.getItem(i))
                        });
                    }
                }
            }
            return items;
        },

        parseResult: function (res) {
            var ret;
            try {
                ret = JSON.parse(res);
                if (ret == 'true') {
                    ret = true;
                }
                if (ret == 'false') {
                    ret = false;
                }
                if (parseFloat(ret) == ret && typeof ret != "object") {
                    ret = parseFloat(ret);
                }
            } catch (e) {}
            return ret;
        }
    };

}(jQuery, window, document));