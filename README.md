# jQuery.storage.js

## Useage

## Options
| option | description | default |
|:--|:--|:--|
| `cookiePrefix` |  Defines a prefix to prepend to your cookie-fallback | `'fallback:' + method + ':'` |
| `path` |  The cookie path to use. | `'/'` |
| `domain` | The cookie domain to use. | `document.domain` |
| `expires` | The time when your cookie has to expire. | `('localStorage' === method) ? { expires: 365 } : undefined` |

You've two ways to override the default options:

### 1st

    $.localStorage.options = {
        cookiePrefix : 'fallback:' + method + ':',
        cookieOptions : {
            path : '/',
            domain : document.domain,
            expires : ('localStorage' === method) ? { expires: 365 } : undefined
        }
    };

### 2nd

    var ls = $.localStorage({
        cookiePrefix : 'fallback:' + method + ':',
        cookieOptions : {
            path : '/',
            domain : document.domain,
            expires : ('localStorage' === method) ? { expires: 365 } : undefined
        }
    });

## Public Methods
There're some public methods which you can use instead of the default syntax.
If you prefer this style I recommend that you use the [2nd way](https://github.com/yckart/jquery.storage.js/edit/master/README.md#2nd) of setting the plugin-defaults.
And by the way the following methods can (of course) also used with `$.sessionStorage()`:



### `setItem()`
To set a storage-item you can attach `setItem` to your `storage`-instance:

    ls.setItem('foo', 'bar');



### `getItem()`
gets an earlier *setted*, it is just as easy as [`setItem`](https://github.com/yckart/jquery.storage.js/edit/master/README.md#setitem).
Attach `getItem` to your instance and pass the key/s (as a `string`) to it:

    ls.getItem('foo'); // 'bar'

If you need to get more than one `value` pass your `keys` as an `array` to `getItem`:

    ls.getItem(['key1', 'key2']); // ['value1', 'value2']



### `removeItem()`
removes an earlier defined item:

    ls.removeItem('foo') // null



### `clear()`
Sometimes you need to remove **all** key-value pairs, dont worry this is just as easy as anything else:

    ls.clear();



## Extras
[Storage]('') gives you two new `jQuery.support`-properties:

* `$.support.localStorage` | Tests for `localStorage`-support
* `$.support.sessionStorage` | Tests for `sessionStorage`-support

## Download
 Get the [raw](https://raw.github.com/yckart/jquery.fixer.js/master/jquery.storage.js) script, download the complete [package](https://github.com/yckart/jquery.storage.js/zipball/master) or fork it on [GitHub](https://github.com/yckart/jquery.storage.js/).

## Support

 [@yckart](http://twitter.com/yckart) #jquery #storage
 [http://yckart.com](http://yckart.com/)


###License
Copyright (c) 2013 Yannick Albert ([http://yckart.com/](http://yckart.com/))

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
