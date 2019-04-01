!function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = t || self).Konva = e()
 }(this, function() {
    "use strict";
    /*
   * Konva JavaScript Framework v3.2.3
   * http://konvajs.org/
   * Licensed under the MIT
   * Date: Thu Mar 21 2019
   *
   * Original work Copyright (C) 2011 - 2013 by Eric Rowell (KineticJS)
   * Modified work Copyright (C) 2014 - present by Anton Lavrenov (Konva)
   *
   * @license
   */
    var e = Math.PI / 180;
    var t, i = function(t) {
        var e = t.toLowerCase()
          , i = /(chrome)[ /]([\w.]+)/.exec(e) || /(webkit)[ /]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ /]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || []
          , n = !!t.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)
          , r = !!t.match(/IEMobile/i);
        return {
            browser: i[1] || "",
            version: i[2] || "0",
            isIE: function(t) {
                var e = t.indexOf("msie ");
                if (0 < e)
                    return parseInt(t.substring(e + 5, t.indexOf(".", e)), 10);
                if (0 < t.indexOf("trident/")) {
                    var i = t.indexOf("rv:");
                    return parseInt(t.substring(i + 3, t.indexOf(".", i)), 10)
                }
                var n = t.indexOf("edge/");
                return 0 < n && parseInt(t.substring(n + 5, t.indexOf(".", n)), 10)
            }(e),
            mobile: n,
            ieMobile: r
        }
    }, n = "undefined" != typeof global ? global : "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope ? self : {}, L = {
        version: (t || (t = {})).version = "3.2.3",
        isBrowser: "undefined" != typeof window && ("[object Window]" === {}.toString.call(window) || "[object global]" === {}.toString.call(window)),
        isUnminified: /comment/.test(function() {}
        .toString()),
        dblClickWindow: 400,
        getAngle: function(t) {
            return L.angleDeg ? t * e : t
        },
        enableTrace: !1,
        listenClickTap: !1,
        inDblClickWindow: !1,
        pixelRatio: void 0,
        dragDistance: 3,
        angleDeg: !0,
        showWarnings: !0,
        dragButtons: [0, 1],
        isDragging: function() {
            return L.DD.isDragging
        },
        isDragReady: function() {
            return !!L.DD.node
        },
        UA: i(n.navigator && n.navigator.userAgent || ""),
        document: n.document,
        _injectGlobal: function(t) {
            n.Konva = t
        },
        _parseUA: i
    }, h = {}, r = function(t) {
        h[t.prototype.getClassName()] = t,
        L[t.prototype.getClassName()] = t
    }, a = function() {
        function r() {}
        return r.toCollection = function(t) {
            var e, i = new r, n = t.length;
            for (e = 0; e < n; e++)
                i.push(t[e]);
            return i
        }
        ,
        r._mapMethod = function(n) {
            r.prototype[n] = function() {
                var t, e = this.length, i = [].slice.call(arguments);
                for (t = 0; t < e; t++)
                    this[t][n].apply(this[t], i);
                return this
            }
        }
        ,
        r.mapMethods = function(t) {
            var e = t.prototype;
            for (var i in e)
                r._mapMethod(i)
        }
        ,
        r
    }();
    a.prototype = [],
    a.prototype.each = function(t) {
        for (var e = 0; e < this.length; e++)
            t(this[e], e)
    }
    ,
    a.prototype.toArray = function() {
        var t, e = [], i = this.length;
        for (t = 0; t < i; t++)
            e.push(this[t]);
        return e
    }
    ;
    var c = function() {
        function t(t) {
            void 0 === t && (t = [1, 0, 0, 1, 0, 0]),
            this.m = t && t.slice() || [1, 0, 0, 1, 0, 0]
        }
        return t.prototype.copy = function() {
            return new t(this.m)
        }
        ,
        t.prototype.point = function(t) {
            var e = this.m;
            return {
                x: e[0] * t.x + e[2] * t.y + e[4],
                y: e[1] * t.x + e[3] * t.y + e[5]
            }
        }
        ,
        t.prototype.translate = function(t, e) {
            return this.m[4] += this.m[0] * t + this.m[2] * e,
            this.m[5] += this.m[1] * t + this.m[3] * e,
            this
        }
        ,
        t.prototype.scale = function(t, e) {
            return this.m[0] *= t,
            this.m[1] *= t,
            this.m[2] *= e,
            this.m[3] *= e,
            this
        }
        ,
        t.prototype.rotate = function(t) {
            var e = Math.cos(t)
              , i = Math.sin(t)
              , n = this.m[0] * e + this.m[2] * i
              , r = this.m[1] * e + this.m[3] * i
              , a = this.m[0] * -i + this.m[2] * e
              , o = this.m[1] * -i + this.m[3] * e;
            return this.m[0] = n,
            this.m[1] = r,
            this.m[2] = a,
            this.m[3] = o,
            this
        }
        ,
        t.prototype.getTranslation = function() {
            return {
                x: this.m[4],
                y: this.m[5]
            }
        }
        ,
        t.prototype.skew = function(t, e) {
            var i = this.m[0] + this.m[2] * e
              , n = this.m[1] + this.m[3] * e
              , r = this.m[2] + this.m[0] * t
              , a = this.m[3] + this.m[1] * t;
            return this.m[0] = i,
            this.m[1] = n,
            this.m[2] = r,
            this.m[3] = a,
            this
        }
        ,
        t.prototype.multiply = function(t) {
            var e = this.m[0] * t.m[0] + this.m[2] * t.m[1]
              , i = this.m[1] * t.m[0] + this.m[3] * t.m[1]
              , n = this.m[0] * t.m[2] + this.m[2] * t.m[3]
              , r = this.m[1] * t.m[2] + this.m[3] * t.m[3]
              , a = this.m[0] * t.m[4] + this.m[2] * t.m[5] + this.m[4]
              , o = this.m[1] * t.m[4] + this.m[3] * t.m[5] + this.m[5];
            return this.m[0] = e,
            this.m[1] = i,
            this.m[2] = n,
            this.m[3] = r,
            this.m[4] = a,
            this.m[5] = o,
            this
        }
        ,
        t.prototype.invert = function() {
            var t = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2])
              , e = this.m[3] * t
              , i = -this.m[1] * t
              , n = -this.m[2] * t
              , r = this.m[0] * t
              , a = t * (this.m[2] * this.m[5] - this.m[3] * this.m[4])
              , o = t * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);
            return this.m[0] = e,
            this.m[1] = i,
            this.m[2] = n,
            this.m[3] = r,
            this.m[4] = a,
            this.m[5] = o,
            this
        }
        ,
        t.prototype.getMatrix = function() {
            return this.m
        }
        ,
        t.prototype.setAbsolutePosition = function(t, e) {
            var i = this.m[0]
              , n = this.m[1]
              , r = this.m[2]
              , a = this.m[3]
              , o = this.m[4]
              , s = (i * (e - this.m[5]) - n * (t - o)) / (i * a - n * r)
              , h = (t - o - r * s) / i;
            return this.translate(h, s)
        }
        ,
        t
    }()
      , o = Math.PI / 180
      , s = 180 / Math.PI
      , l = "Konva error: "
      , d = {
        aliceblue: [240, 248, 255],
        antiquewhite: [250, 235, 215],
        aqua: [0, 255, 255],
        aquamarine: [127, 255, 212],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        bisque: [255, 228, 196],
        black: [0, 0, 0],
        blanchedalmond: [255, 235, 205],
        blue: [0, 0, 255],
        blueviolet: [138, 43, 226],
        brown: [165, 42, 42],
        burlywood: [222, 184, 135],
        cadetblue: [95, 158, 160],
        chartreuse: [127, 255, 0],
        chocolate: [210, 105, 30],
        coral: [255, 127, 80],
        cornflowerblue: [100, 149, 237],
        cornsilk: [255, 248, 220],
        crimson: [220, 20, 60],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgoldenrod: [184, 132, 11],
        darkgray: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkgrey: [169, 169, 169],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkseagreen: [143, 188, 143],
        darkslateblue: [72, 61, 139],
        darkslategray: [47, 79, 79],
        darkslategrey: [47, 79, 79],
        darkturquoise: [0, 206, 209],
        darkviolet: [148, 0, 211],
        deeppink: [255, 20, 147],
        deepskyblue: [0, 191, 255],
        dimgray: [105, 105, 105],
        dimgrey: [105, 105, 105],
        dodgerblue: [30, 144, 255],
        firebrick: [178, 34, 34],
        floralwhite: [255, 255, 240],
        forestgreen: [34, 139, 34],
        fuchsia: [255, 0, 255],
        gainsboro: [220, 220, 220],
        ghostwhite: [248, 248, 255],
        gold: [255, 215, 0],
        goldenrod: [218, 165, 32],
        gray: [128, 128, 128],
        green: [0, 128, 0],
        greenyellow: [173, 255, 47],
        grey: [128, 128, 128],
        honeydew: [240, 255, 240],
        hotpink: [255, 105, 180],
        indianred: [205, 92, 92],
        indigo: [75, 0, 130],
        ivory: [255, 255, 240],
        khaki: [240, 230, 140],
        lavender: [230, 230, 250],
        lavenderblush: [255, 240, 245],
        lawngreen: [124, 252, 0],
        lemonchiffon: [255, 250, 205],
        lightblue: [173, 216, 230],
        lightcoral: [240, 128, 128],
        lightcyan: [224, 255, 255],
        lightgoldenrodyellow: [250, 250, 210],
        lightgray: [211, 211, 211],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightsalmon: [255, 160, 122],
        lightseagreen: [32, 178, 170],
        lightskyblue: [135, 206, 250],
        lightslategray: [119, 136, 153],
        lightslategrey: [119, 136, 153],
        lightsteelblue: [176, 196, 222],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        limegreen: [50, 205, 50],
        linen: [250, 240, 230],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        mediumaquamarine: [102, 205, 170],
        mediumblue: [0, 0, 205],
        mediumorchid: [186, 85, 211],
        mediumpurple: [147, 112, 219],
        mediumseagreen: [60, 179, 113],
        mediumslateblue: [123, 104, 238],
        mediumspringgreen: [0, 250, 154],
        mediumturquoise: [72, 209, 204],
        mediumvioletred: [199, 21, 133],
        midnightblue: [25, 25, 112],
        mintcream: [245, 255, 250],
        mistyrose: [255, 228, 225],
        moccasin: [255, 228, 181],
        navajowhite: [255, 222, 173],
        navy: [0, 0, 128],
        oldlace: [253, 245, 230],
        olive: [128, 128, 0],
        olivedrab: [107, 142, 35],
        orange: [255, 165, 0],
        orangered: [255, 69, 0],
        orchid: [218, 112, 214],
        palegoldenrod: [238, 232, 170],
        palegreen: [152, 251, 152],
        paleturquoise: [175, 238, 238],
        palevioletred: [219, 112, 147],
        papayawhip: [255, 239, 213],
        peachpuff: [255, 218, 185],
        peru: [205, 133, 63],
        pink: [255, 192, 203],
        plum: [221, 160, 203],
        powderblue: [176, 224, 230],
        purple: [128, 0, 128],
        rebeccapurple: [102, 51, 153],
        red: [255, 0, 0],
        rosybrown: [188, 143, 143],
        royalblue: [65, 105, 225],
        saddlebrown: [139, 69, 19],
        salmon: [250, 128, 114],
        sandybrown: [244, 164, 96],
        seagreen: [46, 139, 87],
        seashell: [255, 245, 238],
        sienna: [160, 82, 45],
        silver: [192, 192, 192],
        skyblue: [135, 206, 235],
        slateblue: [106, 90, 205],
        slategray: [119, 128, 144],
        slategrey: [119, 128, 144],
        snow: [255, 255, 250],
        springgreen: [0, 255, 127],
        steelblue: [70, 130, 180],
        tan: [210, 180, 140],
        teal: [0, 128, 128],
        thistle: [216, 191, 216],
        transparent: [255, 255, 255, 0],
        tomato: [255, 99, 71],
        turquoise: [64, 224, 208],
        violet: [238, 130, 238],
        wheat: [245, 222, 179],
        white: [255, 255, 255],
        whitesmoke: [245, 245, 245],
        yellow: [255, 255, 0],
        yellowgreen: [154, 205, 5]
    }
      , p = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/
      , u = []
      , O = {
        _isElement: function(t) {
            return !(!t || 1 != t.nodeType)
        },
        _isFunction: function(t) {
            return !!(t && t.constructor && t.call && t.apply)
        },
        _isPlainObject: function(t) {
            return !!t && t.constructor === Object
        },
        _isArray: function(t) {
            return "[object Array]" === Object.prototype.toString.call(t)
        },
        _isNumber: function(t) {
            return "[object Number]" === Object.prototype.toString.call(t) && !isNaN(t) && isFinite(t)
        },
        _isString: function(t) {
            return "[object String]" === Object.prototype.toString.call(t)
        },
        _isBoolean: function(t) {
            return "[object Boolean]" === Object.prototype.toString.call(t)
        },
        isObject: function(t) {
            return t instanceof Object
        },
        isValidSelector: function(t) {
            if ("string" != typeof t)
                return !1;
            var e = t[0];
            return "#" === e || "." === e || e === e.toUpperCase()
        },
        _sign: function(t) {
            return 0 === t ? 0 : 0 < t ? 1 : -1
        },
        requestAnimFrame: function(t) {
            u.push(t),
            1 === u.length && requestAnimationFrame(function() {
                var t = u;
                u = [],
                t.forEach(function(t) {
                    t()
                })
            })
        },
        createCanvasElement: function() {
            var t = L.isBrowser ? document.createElement("canvas") : new (L._nodeCanvas());
            try {
                t.style = t.style || {}
            } catch (t) {}
            return t
        },
        createImageElement: function() {
            return document.createElement("img")
        },
        _isInDocument: function(t) {
            for (; t = t.parentNode; )
                if (t == document)
                    return !0;
            return !1
        },
        _simplifyArray: function(t) {
            var e, i, n = [], r = t.length, a = O;
            for (e = 0; e < r; e++)
                i = t[e],
                a._isNumber(i) ? i = Math.round(1e3 * i) / 1e3 : a._isString(i) || (i = i.toString()),
                n.push(i);
            return n
        },
        _urlToImage: function(t, e) {
            var i = new n.Image;
            i.onload = function() {
                e(i)
            }
            ,
            i.src = t
        },
        _rgbToHex: function(t, e, i) {
            return ((1 << 24) + (t << 16) + (e << 8) + i).toString(16).slice(1)
        },
        _hexToRgb: function(t) {
            t = t.replace("#", "");
            var e = parseInt(t, 16);
            return {
                r: e >> 16 & 255,
                g: e >> 8 & 255,
                b: 255 & e
            }
        },
        getRandomColor: function() {
            for (var t = (16777215 * Math.random() << 0).toString(16); t.length < 6; )
                t = "0" + t;
            return "#" + t
        },
        get: function(t, e) {
            return void 0 === t ? e : t
        },
        getRGB: function(t) {
            var e;
            return t in d ? {
                r: (e = d[t])[0],
                g: e[1],
                b: e[2]
            } : "#" === t[0] ? this._hexToRgb(t.substring(1)) : "rgb(" === t.substr(0, 4) ? (e = p.exec(t.replace(/ /g, "")),
            {
                r: parseInt(e[1], 10),
                g: parseInt(e[2], 10),
                b: parseInt(e[3], 10)
            }) : {
                r: 0,
                g: 0,
                b: 0
            }
        },
        colorToRGBA: function(t) {
            return t = t || "black",
            O._namedColorToRBA(t) || O._hex3ColorToRGBA(t) || O._hex6ColorToRGBA(t) || O._rgbColorToRGBA(t) || O._rgbaColorToRGBA(t)
        },
        _namedColorToRBA: function(t) {
            var e = d[t.toLowerCase()];
            return e ? {
                r: e[0],
                g: e[1],
                b: e[2],
                a: 1
            } : null
        },
        _rgbColorToRGBA: function(t) {
            if (0 === t.indexOf("rgb(")) {
                var e = (t = t.match(/rgb\(([^)]+)\)/)[1]).split(/ *, */).map(Number);
                return {
                    r: e[0],
                    g: e[1],
                    b: e[2],
                    a: 1
                }
            }
        },
        _rgbaColorToRGBA: function(t) {
            if (0 === t.indexOf("rgba(")) {
                var e = (t = t.match(/rgba\(([^)]+)\)/)[1]).split(/ *, */).map(Number);
                return {
                    r: e[0],
                    g: e[1],
                    b: e[2],
                    a: e[3]
                }
            }
        },
        _hex6ColorToRGBA: function(t) {
            if ("#" === t[0] && 7 === t.length)
                return {
                    r: parseInt(t.slice(1, 3), 16),
                    g: parseInt(t.slice(3, 5), 16),
                    b: parseInt(t.slice(5, 7), 16),
                    a: 1
                }
        },
        _hex3ColorToRGBA: function(t) {
            if ("#" === t[0] && 4 === t.length)
                return {
                    r: parseInt(t[1] + t[1], 16),
                    g: parseInt(t[2] + t[2], 16),
                    b: parseInt(t[3] + t[3], 16),
                    a: 1
                }
        },
        haveIntersection: function(t, e) {
            return !(e.x > t.x + t.width || e.x + e.width < t.x || e.y > t.y + t.height || e.y + e.height < t.y)
        },
        cloneObject: function(t) {
            var e = {};
            for (var i in t)
                this._isPlainObject(t[i]) ? e[i] = this.cloneObject(t[i]) : this._isArray(t[i]) ? e[i] = this.cloneArray(t[i]) : e[i] = t[i];
            return e
        },
        cloneArray: function(t) {
            return t.slice(0)
        },
        _degToRad: function(t) {
            return t * o
        },
        _radToDeg: function(t) {
            return t * s
        },
        _capitalize: function(t) {
            return t.charAt(0).toUpperCase() + t.slice(1)
        },
        throw: function(t) {
            throw new Error(l + t)
        },
        error: function(t) {
            console.error(l + t)
        },
        warn: function(t) {
            L.showWarnings && console.warn("Konva warning: " + t)
        },
        extend: function(t, e) {
            function i() {
                this.constructor = t
            }
            i.prototype = e.prototype;
            var n = t.prototype;
            for (var r in t.prototype = new i,
            n)
                n.hasOwnProperty(r) && (t.prototype[r] = n[r]);
            t.__super__ = e.prototype,
            t.super = e
        },
        _getControlPoints: function(t, e, i, n, r, a, o) {
            var s = Math.sqrt(Math.pow(i - t, 2) + Math.pow(n - e, 2))
              , h = Math.sqrt(Math.pow(r - i, 2) + Math.pow(a - n, 2))
              , l = o * s / (s + h)
              , c = o * h / (s + h);
            return [i - l * (r - t), n - l * (a - e), i + c * (r - t), n + c * (a - e)]
        },
        _expandPoints: function(t, e) {
            var i, n, r = t.length, a = [];
            for (i = 2; i < r - 2; i += 2)
                n = O._getControlPoints(t[i - 2], t[i - 1], t[i], t[i + 1], t[i + 2], t[i + 3], e),
                a.push(n[0]),
                a.push(n[1]),
                a.push(t[i]),
                a.push(t[i + 1]),
                a.push(n[2]),
                a.push(n[3]);
            return a
        },
        each: function(t, e) {
            for (var i in t)
                e(i, t[i])
        },
        _inRange: function(t, e, i) {
            return e <= t && t < i
        },
        _getProjectionToSegment: function(t, e, i, n, r, a) {
            var o, s, h, l = (t - i) * (t - i) + (e - n) * (e - n);
            if (0 == l)
                o = t,
                s = e,
                h = (r - i) * (r - i) + (a - n) * (a - n);
            else {
                var c = ((r - t) * (i - t) + (a - e) * (n - e)) / l;
                h = c < 0 ? ((o = t) - r) * (t - r) + ((s = e) - a) * (e - a) : 1 < c ? ((o = i) - r) * (i - r) + ((s = n) - a) * (n - a) : ((o = t + c * (i - t)) - r) * (o - r) + ((s = e + c * (n - e)) - a) * (s - a)
            }
            return [o, s, h]
        },
        _getProjectionToLine: function(s, h, l) {
            var c = O.cloneObject(s)
              , d = Number.MAX_VALUE;
            return h.forEach(function(t, e) {
                if (l || e !== h.length - 1) {
                    var i = h[(e + 1) % h.length]
                      , n = O._getProjectionToSegment(t.x, t.y, i.x, i.y, s.x, s.y)
                      , r = n[0]
                      , a = n[1]
                      , o = n[2];
                    o < d && (c.x = r,
                    c.y = a,
                    d = o)
                }
            }),
            c
        },
        _prepareArrayForTween: function(t, e, i) {
            var n, r = [], a = [];
            if (t.length > e.length) {
                var o = e;
                e = t,
                t = o
            }
            for (n = 0; n < t.length; n += 2)
                r.push({
                    x: t[n],
                    y: t[n + 1]
                });
            for (n = 0; n < e.length; n += 2)
                a.push({
                    x: e[n],
                    y: e[n + 1]
                });
            var s = [];
            return a.forEach(function(t) {
                var e = O._getProjectionToLine(t, r, i);
                s.push(e.x),
                s.push(e.y)
            }),
            s
        },
        _prepareToStringify: function(t) {
            var e;
            for (var i in t.visitedByCircularReferenceRemoval = !0,
            t)
                if (t.hasOwnProperty(i) && t[i] && "object" == typeof t[i])
                    if (e = Object.getOwnPropertyDescriptor(t, i),
                    t[i].visitedByCircularReferenceRemoval || O._isElement(t[i])) {
                        if (!e.configurable)
                            return null;
                        delete t[i]
                    } else if (null === O._prepareToStringify(t[i])) {
                        if (!e.configurable)
                            return null;
                        delete t[i]
                    }
            return delete t.visitedByCircularReferenceRemoval,
            t
        },
        _assign: function(t, e) {
            for (var i in e)
                t[i] = e[i];
            return t
        }
    };
    function f(t) {
        return O._isString(t) ? '"' + t + '"' : "[object Number]" === Object.prototype.toString.call(t) ? t : O._isBoolean(t) ? t : Object.prototype.toString.call(t)
    }
    function g(t) {
        return 255 < t ? 255 : t < 0 ? 0 : Math.round(t)
    }
    function v() {
        if (L.isUnminified)
            return function(t, e) {
                return O._isNumber(t) || O.warn(f(t) + ' is a not valid value for "' + e + '" attribute. The value should be a number.'),
                t
            }
    }
    function y() {
        if (L.isUnminified)
            return function(t, e) {
                return O._isNumber(t) || "auto" === t || O.warn(f(t) + ' is a not valid value for "' + e + '" attribute. The value should be a number or "auto".'),
                t
            }
    }
    function m() {
        if (L.isUnminified)
            return function(t, e) {
                return O._isString(t) || O.warn(f(t) + ' is a not valid value for "' + e + '" attribute. The value should be a string.'),
                t
            }
    }
    function _() {
        if (L.isUnminified)
            return function(t, e) {
                return !0 === t || !1 === t || O.warn(f(t) + ' is a not valid value for "' + e + '" attribute. The value should be a boolean.'),
                t
            }
    }
    var S = "get"
      , b = "set"
      , x = {
        addGetterSetter: function(t, e, i, n, r) {
            this.addGetter(t, e, i),
            this.addSetter(t, e, n, r),
            this.addOverloadedGetterSetter(t, e)
        },
        addGetter: function(t, e, i) {
            var n = S + O._capitalize(e);
            t.prototype[n] = t.prototype[n] || function() {
                var t = this.attrs[e];
                return void 0 === t ? i : t
            }
        },
        addSetter: function(t, e, i, n) {
            var r = b + O._capitalize(e);
            t.prototype[r] || x.overWriteSetter(t, e, i, n)
        },
        overWriteSetter: function(t, e, i, n) {
            var r = b + O._capitalize(e);
            t.prototype[r] = function(t) {
                return i && null != t && (t = i.call(this, t, e)),
                this._setAttr(e, t),
                n && n.call(this),
                this
            }
        },
        addComponentsGetterSetter: function(t, n, e, r, a) {
            var i, o, s = e.length, h = O._capitalize, l = S + h(n), c = b + h(n);
            t.prototype[l] = function() {
                var t = {};
                for (i = 0; i < s; i++)
                    t[o = e[i]] = this.getAttr(n + h(o));
                return t
            }
            ;
            var d = function(i) {
                if (L.isUnminified)
                    return function(t, e) {
                        return O.isObject(t) || O.warn(f(t) + ' is a not valid value for "' + e + '" attribute. The value should be an object with properties ' + i),
                        t
                    }
            }(e);
            t.prototype[c] = function(t) {
                var e, i = this.attrs[n];
                for (e in r && (t = r.call(this, t)),
                d && d.call(this, t, n),
                t)
                    t.hasOwnProperty(e) && this._setAttr(n + h(e), t[e]);
                return this._fireChangeEvent(n, i, t),
                a && a.call(this),
                this
            }
            ,
            this.addOverloadedGetterSetter(t, n)
        },
        addOverloadedGetterSetter: function(t, e) {
            var i = O._capitalize(e)
              , n = b + i
              , r = S + i;
            t.prototype[e] = function() {
                return arguments.length ? (this[n](arguments[0]),
                this) : this[r]()
            }
        },
        addDeprecatedGetterSetter: function(t, e, i, n) {
            O.error("Adding deprecated " + e);
            var r = S + O._capitalize(e)
              , a = e + " property is deprecated and will be removed soon. Look at Konva change log for more information.";
            t.prototype[r] = function() {
                O.error(a);
                var t = this.attrs[e];
                return void 0 === t ? i : t
            }
            ,
            this.addSetter(t, e, n, function() {
                O.error(a)
            }),
            this.addOverloadedGetterSetter(t, e)
        },
        backCompat: function(o, t) {
            O.each(t, function(t, e) {
                var i = o.prototype[e]
                  , n = S + O._capitalize(t)
                  , r = b + O._capitalize(t);
                function a() {
                    i.apply(this, arguments),
                    O.error('"' + t + '" method is deprecated and will be removed soon. Use ""' + e + '" instead.')
                }
                o.prototype[t] = a,
                o.prototype[n] = a,
                o.prototype[r] = a
            })
        },
        afterSetFilter: function() {
            this._filterUpToDate = !1
        }
    }
      , w = function(t, e) {
        return (w = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(t, e) {
            t.__proto__ = e
        }
        || function(t, e) {
            for (var i in e)
                e.hasOwnProperty(i) && (t[i] = e[i])
        }
        )(t, e)
    };
    function C(t, e) {
        function i() {
            this.constructor = t
        }
        w(t, e),
        t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype,
        new i)
    }
    var k = ["arc", "arcTo", "beginPath", "bezierCurveTo", "clearRect", "clip", "closePath", "createLinearGradient", "createPattern", "createRadialGradient", "drawImage", "fill", "fillText", "getImageData", "createImageData", "lineTo", "moveTo", "putImageData", "quadraticCurveTo", "rect", "restore", "rotate", "save", "scale", "setLineDash", "setTransform", "stroke", "strokeText", "transform", "translate"]
      , P = function() {
        function t(t) {
            this.canvas = t,
            this._context = t._canvas.getContext("2d"),
            L.enableTrace && (this.traceArr = [],
            this._enableTrace())
        }
        return t.prototype.fillShape = function(t) {
            t.getFillEnabled() && this._fill(t)
        }
        ,
        t.prototype._fill = function(t) {}
        ,
        t.prototype.strokeShape = function(t) {
            t.getStrokeEnabled() && this._stroke(t)
        }
        ,
        t.prototype._stroke = function(t) {}
        ,
        t.prototype.fillStrokeShape = function(t) {
            t.getFillEnabled() && this._fill(t),
            t.getStrokeEnabled() && this._stroke(t)
        }
        ,
        t.prototype.getTrace = function(t) {
            var e, i, n, r, a = this.traceArr, o = a.length, s = "";
            for (e = 0; e < o; e++)
                (n = (i = a[e]).method) ? (r = i.args,
                s += n,
                t ? s += "()" : O._isArray(r[0]) ? s += "([" + r.join(",") + "])" : s += "(" + r.join(",") + ")") : (s += i.property,
                t || (s += "=" + i.val)),
                s += ";";
            return s
        }
        ,
        t.prototype.clearTrace = function() {
            this.traceArr = []
        }
        ,
        t.prototype._trace = function(t) {
            var e = this.traceArr;
            e.push(t),
            100 <= e.length && e.shift()
        }
        ,
        t.prototype.reset = function() {
            var t = this.getCanvas().getPixelRatio();
            this.setTransform(1 * t, 0, 0, 1 * t, 0, 0)
        }
        ,
        t.prototype.getCanvas = function() {
            return this.canvas
        }
        ,
        t.prototype.clear = function(t) {
            var e = this.getCanvas();
            t ? this.clearRect(t.x || 0, t.y || 0, t.width || 0, t.height || 0) : this.clearRect(0, 0, e.getWidth() / e.pixelRatio, e.getHeight() / e.pixelRatio)
        }
        ,
        t.prototype._applyLineCap = function(t) {
            var e = t.getLineCap();
            e && this.setAttr("lineCap", e)
        }
        ,
        t.prototype._applyOpacity = function(t) {
            var e = t.getAbsoluteOpacity();
            1 !== e && this.setAttr("globalAlpha", e)
        }
        ,
        t.prototype._applyLineJoin = function(t) {
            var e = t.getLineJoin();
            e && this.setAttr("lineJoin", e)
        }
        ,
        t.prototype.setAttr = function(t, e) {
            this._context[t] = e
        }
        ,
        t.prototype.arc = function(t, e, i, n, r, a) {
            this._context.arc(t, e, i, n, r, a)
        }
        ,
        t.prototype.arcTo = function(t, e, i, n, r, a) {
            this._context.arc(t, e, i, n, r, a)
        }
        ,
        t.prototype.beginPath = function() {
            this._context.beginPath()
        }
        ,
        t.prototype.bezierCurveTo = function(t, e, i, n, r, a) {
            this._context.bezierCurveTo(t, e, i, n, r, a)
        }
        ,
        t.prototype.clearRect = function(t, e, i, n) {
            this._context.clearRect(t, e, i, n)
        }
        ,
        t.prototype.clip = function() {
            this._context.clip()
        }
        ,
        t.prototype.closePath = function() {
            this._context.closePath()
        }
        ,
        t.prototype.createImageData = function(t, e) {
            var i = arguments;
            return 2 === i.length ? this._context.createImageData(t, e) : 1 === i.length ? this._context.createImageData(t) : void 0
        }
        ,
        t.prototype.createLinearGradient = function(t, e, i, n) {
            return this._context.createLinearGradient(t, e, i, n)
        }
        ,
        t.prototype.createPattern = function(t, e) {
            return this._context.createPattern(t, e)
        }
        ,
        t.prototype.createRadialGradient = function(t, e, i, n, r, a) {
            return this._context.createRadialGradient(t, e, i, n, r, a)
        }
        ,
        t.prototype.drawImage = function(t, e, i, n, r, a, o, s, h) {
            var l = arguments
              , c = this._context;
            3 === l.length ? c.drawImage(t, e, i) : 5 === l.length ? c.drawImage(t, e, i, n, r) : 9 === l.length && c.drawImage(t, e, i, n, r, a, o, s, h)
        }
        ,
        t.prototype.isPointInPath = function(t, e) {
            return this._context.isPointInPath(t, e)
        }
        ,
        t.prototype.fill = function() {
            this._context.fill()
        }
        ,
        t.prototype.fillRect = function(t, e, i, n) {
            this._context.fillRect(t, e, i, n)
        }
        ,
        t.prototype.strokeRect = function(t, e, i, n) {
            this._context.strokeRect(t, e, i, n)
        }
        ,
        t.prototype.fillText = function(t, e, i) {
            this._context.fillText(t, e, i)
        }
        ,
        t.prototype.measureText = function(t) {
            return this._context.measureText(t)
        }
        ,
        t.prototype.getImageData = function(t, e, i, n) {
            return this._context.getImageData(t, e, i, n)
        }
        ,
        t.prototype.lineTo = function(t, e) {
            this._context.lineTo(t, e)
        }
        ,
        t.prototype.moveTo = function(t, e) {
            this._context.moveTo(t, e)
        }
        ,
        t.prototype.rect = function(t, e, i, n) {
            this._context.rect(t, e, i, n)
        }
        ,
        t.prototype.putImageData = function(t, e, i) {
            this._context.putImageData(t, e, i)
        }
        ,
        t.prototype.quadraticCurveTo = function(t, e, i, n) {
            this._context.quadraticCurveTo(t, e, i, n)
        }
        ,
        t.prototype.restore = function() {
            this._context.restore()
        }
        ,
        t.prototype.rotate = function(t) {
            this._context.rotate(t)
        }
        ,
        t.prototype.save = function() {
            this._context.save()
        }
        ,
        t.prototype.scale = function(t, e) {
            this._context.scale(t, e)
        }
        ,
        t.prototype.setLineDash = function(t) {
            this._context.setLineDash ? this._context.setLineDash(t) : "mozDash"in this._context ? this._context.mozDash = t : "webkitLineDash"in this._context && (this._context.webkitLineDash = t)
        }
        ,
        t.prototype.getLineDash = function() {
            return this._context.getLineDash()
        }
        ,
        t.prototype.setTransform = function(t, e, i, n, r, a) {
            this._context.setTransform(t, e, i, n, r, a)
        }
        ,
        t.prototype.stroke = function() {
            this._context.stroke()
        }
        ,
        t.prototype.strokeText = function(t, e, i, n) {
            this._context.strokeText(t, e, i, n)
        }
        ,
        t.prototype.transform = function(t, e, i, n, r, a) {
            this._context.transform(t, e, i, n, r, a)
        }
        ,
        t.prototype.translate = function(t, e) {
            this._context.translate(t, e)
        }
        ,
        t.prototype._enableTrace = function() {
            var t, n, r = this, e = k.length, a = O._simplifyArray, i = this.setAttr, o = function(t) {
                var e, i = r[t];
                r[t] = function() {
                    return n = a(Array.prototype.slice.call(arguments, 0)),
                    e = i.apply(r, arguments),
                    r._trace({
                        method: t,
                        args: n
                    }),
                    e
                }
            };
            for (t = 0; t < e; t++)
                o(k[t]);
            r.setAttr = function() {
                i.apply(r, arguments);
                var t = arguments[0]
                  , e = arguments[1];
                "shadowOffsetX" !== t && "shadowOffsetY" !== t && "shadowBlur" !== t || (e /= this.canvas.getPixelRatio()),
                r._trace({
                    property: t,
                    val: e
                })
            }
        }
        ,
        t.prototype._applyGlobalCompositeOperation = function(t) {
            var e = t.getGlobalCompositeOperation();
            "source-over" !== e && this.setAttr("globalCompositeOperation", e)
        }
        ,
        t
    }();
    ["fillStyle", "strokeStyle", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "lineCap", "lineDashOffset", "lineJoin", "lineWidth", "miterLimit", "font", "textAlign", "textBaseline", "globalAlpha", "globalCompositeOperation"].forEach(function(e) {
        Object.defineProperty(P.prototype, e, {
            get: function() {
                return this._context[e]
            },
            set: function(t) {
                this._context[e] = t
            }
        })
    });
    var T, M = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }
        return C(e, t),
        e.prototype._fillColor = function(t) {
            var e = t.fill();
            this.setAttr("fillStyle", e),
            t._fillFunc(this)
        }
        ,
        e.prototype._fillPattern = function(t) {
            var e = t.getFillPatternX()
              , i = t.getFillPatternY()
              , n = t.getFillPatternScaleX()
              , r = t.getFillPatternScaleY()
              , a = L.getAngle(t.getFillPatternRotation())
              , o = t.getFillPatternOffsetX()
              , s = t.getFillPatternOffsetY();
            (e || i) && this.translate(e || 0, i || 0),
            a && this.rotate(a),
            (n || r) && this.scale(n, r),
            (o || s) && this.translate(-1 * o, -1 * s),
            this.setAttr("fillStyle", t._getFillPattern()),
            t._fillFunc(this)
        }
        ,
        e.prototype._fillLinearGradient = function(t) {
            var e = t._getLinearGradient();
            e && (this.setAttr("fillStyle", e),
            t._fillFunc(this))
        }
        ,
        e.prototype._fillRadialGradient = function(t) {
            var e = t._getRadialGradient();
            e && (this.setAttr("fillStyle", e),
            t._fillFunc(this))
        }
        ,
        e.prototype._fill = function(t) {
            var e = t.fill()
              , i = t.getFillPriority();
            if (e && "color" === i)
                this._fillColor(t);
            else {
                var n = t.getFillPatternImage();
                if (n && "pattern" === i)
                    this._fillPattern(t);
                else {
                    var r = t.getFillLinearGradientColorStops();
                    if (r && "linear-gradient" === i)
                        this._fillLinearGradient(t);
                    else {
                        var a = t.getFillRadialGradientColorStops();
                        a && "radial-gradient" === i ? this._fillRadialGradient(t) : e ? this._fillColor(t) : n ? this._fillPattern(t) : r ? this._fillLinearGradient(t) : a && this._fillRadialGradient(t)
                    }
                }
            }
        }
        ,
        e.prototype._strokeLinearGradient = function(t) {
            var e = t.getStrokeLinearGradientStartPoint()
              , i = t.getStrokeLinearGradientEndPoint()
              , n = t.getStrokeLinearGradientColorStops()
              , r = this.createLinearGradient(e.x, e.y, i.x, i.y);
            if (n) {
                for (var a = 0; a < n.length; a += 2)
                    r.addColorStop(n[a], n[a + 1]);
                this.setAttr("strokeStyle", r)
            }
        }
        ,
        e.prototype._stroke = function(t) {
            var e = t.dash()
              , i = t.getStrokeScaleEnabled();
            if (t.hasStroke()) {
                if (!i) {
                    this.save();
                    var n = this.getCanvas().getPixelRatio();
                    this.setTransform(n, 0, 0, n, 0, 0)
                }
                this._applyLineCap(t),
                e && t.dashEnabled() && (this.setLineDash(e),
                this.setAttr("lineDashOffset", t.dashOffset())),
                this.setAttr("lineWidth", t.strokeWidth()),
                t.getShadowForStrokeEnabled() || this.setAttr("shadowColor", "rgba(0,0,0,0)"),
                t.getStrokeLinearGradientColorStops() ? this._strokeLinearGradient(t) : this.setAttr("strokeStyle", t.stroke()),
                t._strokeFunc(this),
                i || this.restore()
            }
        }
        ,
        e.prototype._applyShadow = function(t) {
            var e = O
              , i = e.get(t.getShadowRGBA(), "black")
              , n = e.get(t.getShadowBlur(), 5)
              , r = e.get(t.getShadowOffset(), {
                x: 0,
                y: 0
            })
              , a = t.getAbsoluteScale()
              , o = this.canvas.getPixelRatio()
              , s = a.x * o
              , h = a.y * o;
            this.setAttr("shadowColor", i),
            this.setAttr("shadowBlur", n * Math.min(Math.abs(s), Math.abs(h))),
            this.setAttr("shadowOffsetX", r.x * s),
            this.setAttr("shadowOffsetY", r.y * h)
        }
        ,
        e
    }(P), A = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }
        return C(e, t),
        e.prototype._fill = function(t) {
            this.save(),
            this.setAttr("fillStyle", t.colorKey),
            t._fillFuncHit(this),
            this.restore()
        }
        ,
        e.prototype._stroke = function(t) {
            if (t.hasStroke() && t.hitStrokeWidth()) {
                var e = t.getStrokeScaleEnabled();
                if (!e) {
                    this.save();
                    var i = this.getCanvas().getPixelRatio();
                    this.setTransform(i, 0, 0, i, 0, 0)
                }
                this._applyLineCap(t);
                var n = t.hitStrokeWidth()
                  , r = "auto" === n ? t.strokeWidth() : n;
                this.setAttr("lineWidth", r),
                this.setAttr("strokeStyle", t.colorKey),
                t._strokeFuncHit(this),
                e || this.restore()
            }
        }
        ,
        e
    }(P);
    var G = function() {
        function t(t) {
            this.pixelRatio = 1,
            this.width = 0,
            this.height = 0,
            this.isCache = !1;
            var e = (t || {}).pixelRatio || L.pixelRatio || function() {
                if (T)
                    return T;
                var t = O.createCanvasElement().getContext("2d");
                return T = (n.window.devicePixelRatio || 1) / (t.webkitBackingStorePixelRatio || t.mozBackingStorePixelRatio || t.msBackingStorePixelRatio || t.oBackingStorePixelRatio || t.backingStorePixelRatio || 1)
            }();
            this.pixelRatio = e,
            this._canvas = O.createCanvasElement(),
            this._canvas.style.padding = "0",
            this._canvas.style.margin = "0",
            this._canvas.style.border = "0",
            this._canvas.style.background = "transparent",
            this._canvas.style.position = "absolute",
            this._canvas.style.top = "0",
            this._canvas.style.left = "0"
        }
        return t.prototype.getContext = function() {
            return this.context
        }
        ,
        t.prototype.getPixelRatio = function() {
            return this.pixelRatio
        }
        ,
        t.prototype.setPixelRatio = function(t) {
            var e = this.pixelRatio;
            this.pixelRatio = t,
            this.setSize(this.getWidth() / e, this.getHeight() / e)
        }
        ,
        t.prototype.setWidth = function(t) {
            this.width = this._canvas.width = t * this.pixelRatio,
            this._canvas.style.width = t + "px";
            var e = this.pixelRatio;
            this.getContext()._context.scale(e, e)
        }
        ,
        t.prototype.setHeight = function(t) {
            this.height = this._canvas.height = t * this.pixelRatio,
            this._canvas.style.height = t + "px";
            var e = this.pixelRatio;
            this.getContext()._context.scale(e, e)
        }
        ,
        t.prototype.getWidth = function() {
            return this.width
        }
        ,
        t.prototype.getHeight = function() {
            return this.height
        }
        ,
        t.prototype.setSize = function(t, e) {
            this.setWidth(t),
            this.setHeight(e)
        }
        ,
        t.prototype.toDataURL = function(t, e) {
            try {
                return this._canvas.toDataURL(t, e)
            } catch (t) {
                try {
                    return this._canvas.toDataURL()
                } catch (t) {
                    return O.error("Unable to get data URL. " + t.message),
                    ""
                }
            }
        }
        ,
        t
    }();
    x.addGetterSetter(G, "pixelRatio", void 0, v());
    var R = function(i) {
        function t(t) {
            void 0 === t && (t = {
                width: 0,
                height: 0
            });
            var e = i.call(this, t) || this;
            return e.context = new M(e),
            e.setSize(t.width, t.height),
            e
        }
        return C(t, i),
        t
    }(G)
      , D = function(i) {
        function t(t) {
            void 0 === t && (t = {
                width: 0,
                height: 0
            });
            var e = i.call(this, t) || this;
            return e.hitCanvas = !0,
            e.context = new A(e),
            e.setSize(t.width, t.height),
            e
        }
        return C(t, i),
        t
    }(G)
      , I = n.performance && n.performance.now ? function() {
        return n.performance.now()
    }
    : function() {
        return (new Date).getTime()
    }
      , F = function() {
        function n(t, e) {
            this.id = n.animIdCounter++,
            this.frame = {
                time: 0,
                timeDiff: 0,
                lastTime: I(),
                frameRate: 0
            },
            this.func = t,
            this.setLayers(e)
        }
        return n.prototype.setLayers = function(t) {
            var e = [];
            return e = t ? 0 < t.length ? t : [t] : [],
            this.layers = e,
            this
        }
        ,
        n.prototype.getLayers = function() {
            return this.layers
        }
        ,
        n.prototype.addLayer = function(t) {
            var e, i = this.layers, n = i.length;
            for (e = 0; e < n; e++)
                if (i[e]._id === t._id)
                    return !1;
            return this.layers.push(t),
            !0
        }
        ,
        n.prototype.isRunning = function() {
            var t, e = n.animations, i = e.length;
            for (t = 0; t < i; t++)
                if (e[t].id === this.id)
                    return !0;
            return !1
        }
        ,
        n.prototype.start = function() {
            return this.stop(),
            this.frame.timeDiff = 0,
            this.frame.lastTime = I(),
            n._addAnimation(this),
            this
        }
        ,
        n.prototype.stop = function() {
            return n._removeAnimation(this),
            this
        }
        ,
        n.prototype._updateFrameObject = function(t) {
            this.frame.timeDiff = t - this.frame.lastTime,
            this.frame.lastTime = t,
            this.frame.time += this.frame.timeDiff,
            this.frame.frameRate = 1e3 / this.frame.timeDiff
        }
        ,
        n._addAnimation = function(t) {
            this.animations.push(t),
            this._handleAnimation()
        }
        ,
        n._removeAnimation = function(t) {
            var e, i = t.id, n = this.animations, r = n.length;
            for (e = 0; e < r; e++)
                if (n[e].id === i) {
                    this.animations.splice(e, 1);
                    break
                }
        }
        ,
        n._runFrames = function() {
            var t, e, i, n, r, a, o, s, h = {}, l = this.animations;
            for (n = 0; n < l.length; n++)
                if (e = (t = l[n]).layers,
                i = t.func,
                t._updateFrameObject(I()),
                a = e.length,
                !i || !1 !== i.call(t, t.frame))
                    for (r = 0; r < a; r++)
                        void 0 !== (o = e[r])._id && (h[o._id] = o);
            for (s in h)
                h.hasOwnProperty(s) && h[s].draw()
        }
        ,
        n._animationLoop = function() {
            var t = n;
            t.animations.length ? (t._runFrames(),
            requestAnimationFrame(t._animationLoop)) : t.animRunning = !1
        }
        ,
        n._handleAnimation = function() {
            this.animRunning || (this.animRunning = !0,
            requestAnimationFrame(this._animationLoop))
        }
        ,
        n.animations = [],
        n.animIdCounter = 0,
        n.animRunning = !1,
        n
    }()
      , E = {
        startPointerPos: {
            x: 0,
            y: 0
        },
        anim: new F(function() {
            var t = this.dirty;
            return this.dirty = !1,
            t
        }
        ),
        isDragging: !1,
        justDragged: !1,
        offset: {
            x: 0,
            y: 0
        },
        node: null,
        _drag: function(t) {
            var e = E.node;
            if (e) {
                if (!E.isDragging) {
                    var i = e.getStage().getPointerPosition();
                    i || (e.getStage().setPointersPositions(t),
                    i = e.getStage().getPointerPosition());
                    var n = e.dragDistance();
                    if (Math.max(Math.abs(i.x - E.startPointerPos.x), Math.abs(i.y - E.startPointerPos.y)) < n)
                        return
                }
                if (e.getStage().setPointersPositions(t),
                !E.isDragging && (E.isDragging = !0,
                e.fire("dragstart", {
                    type: "dragstart",
                    target: e,
                    evt: t
                }, !0),
                !e.isDragging()))
                    return;
                e._setDragPosition(t),
                e.fire("dragmove", {
                    type: "dragmove",
                    target: e,
                    evt: t
                }, !0)
            }
        },
        _endDragBefore: function(t) {
            var e = E.node;
            if (e) {
                E.anim.stop(),
                E.isDragging && (E.isDragging = !1,
                E.justDragged = !0,
                L.listenClickTap = !1,
                t && (t.dragEndNode = e)),
                E.node = null;
                var i = e.getLayer() || e instanceof L.Stage && e;
                i && i.draw()
            }
        },
        _endDragAfter: function(t) {
            var e = (t = t || {}).dragEndNode;
            t && e && e.fire("dragend", {
                type: "dragend",
                target: e,
                evt: t
            }, !0)
        }
    };
    L.isBrowser && (window.addEventListener("mouseup", E._endDragBefore, !0),
    window.addEventListener("touchend", E._endDragBefore, !0),
    window.addEventListener("mousemove", E._drag),
    window.addEventListener("touchmove", E._drag),
    window.addEventListener("mouseup", E._endDragAfter, !1),
    window.addEventListener("touchend", E._endDragAfter, !1));
    var z = {}
      , B = {}
      , W = function(t, e) {
        t && z[t] === e && delete z[t]
    }
      , N = function(t, e) {
        if (t) {
            var i = B[t];
            if (i) {
                for (var n = 0; n < i.length; n++) {
                    i[n]._id === e && i.splice(n, 1)
                }
                0 === i.length && delete B[t]
            }
        }
    }
      , H = "absoluteOpacity"
      , Y = "absoluteTransform"
      , X = "absoluteScale"
      , j = "canvas"
      , U = "listening"
      , q = "mouseenter"
      , V = "mouseleave"
      , K = "transform"
      , Q = "visible"
      , J = ["id"]
      , Z = ["xChange.konva", "yChange.konva", "scaleXChange.konva", "scaleYChange.konva", "skewXChange.konva", "skewYChange.konva", "rotationChange.konva", "offsetXChange.konva", "offsetYChange.konva", "transformsEnabledChange.konva"].join(" ")
      , $ = ["scaleXChange.konva", "scaleYChange.konva"].join(" ")
      , tt = new a
      , et = 1
      , it = function() {
        function s(t) {
            this._id = et++,
            this.eventListeners = {},
            this.attrs = {},
            this.index = 0,
            this.parent = null,
            this._cache = new Map,
            this._lastPos = null,
            this._filterUpToDate = !1,
            this._isUnderCache = !1,
            this.children = tt,
            this.setAttrs(t),
            this.on(Z, function() {
                this._clearCache(K),
                this._clearSelfAndDescendantCache(Y)
            }),
            this.on($, function() {
                this._clearSelfAndDescendantCache(X)
            }),
            this.on("visibleChange.konva", function() {
                this._clearSelfAndDescendantCache(Q)
            }),
            this.on("listeningChange.konva", function() {
                this._clearSelfAndDescendantCache(U)
            }),
            this.on("opacityChange.konva", function() {
                this._clearSelfAndDescendantCache(H)
            })
        }
        return s.prototype.hasChildren = function() {
            return !1
        }
        ,
        s.prototype.getChildren = function() {
            return tt
        }
        ,
        s.prototype._clearCache = function(t) {
            t ? this._cache.delete(t) : this._cache.clear()
        }
        ,
        s.prototype._getCache = function(t, e) {
            var i = this._cache.get(t);
            return void 0 === i && (i = e.call(this),
            this._cache.set(t, i)),
            i
        }
        ,
        s.prototype._getCanvasCache = function() {
            return this._cache.get(j)
        }
        ,
        s.prototype._clearSelfAndDescendantCache = function(e) {
            this._clearCache(e),
            this._getCanvasCache() || this.children && this.children.each(function(t) {
                t._clearSelfAndDescendantCache(e)
            })
        }
        ,
        s.prototype.clearCache = function() {
            return this._cache.delete(j),
            this._clearSelfAndDescendantCache(),
            this
        }
        ,
        s.prototype.cache = function(t) {
            var e = t || {}
              , i = {};
            void 0 !== e.x && void 0 !== e.y && void 0 !== e.width && void 0 !== e.height || (i = this.getClientRect({
                skipTransform: !0,
                relativeTo: this.getParent()
            }));
            var n = e.width || i.width
              , r = e.height || i.height
              , a = e.pixelRatio
              , o = void 0 === e.x ? i.x : e.x
              , s = void 0 === e.y ? i.y : e.y
              , h = e.offset || 0
              , l = e.drawBorder || !1;
            if (n && r) {
                o -= h,
                s -= h;
                var c = new R({
                    pixelRatio: a,
                    width: n += 2 * h,
                    height: r += 2 * h
                })
                  , d = new R({
                    pixelRatio: a,
                    width: n,
                    height: r
                })
                  , p = new D({
                    pixelRatio: 1,
                    width: n,
                    height: r
                })
                  , u = c.getContext()
                  , f = p.getContext();
                return p.isCache = !0,
                this._cache.delete("canvas"),
                this._filterUpToDate = !1,
                u.save(),
                f.save(),
                u.translate(-o, -s),
                f.translate(-o, -s),
                this._isUnderCache = !0,
                this._clearSelfAndDescendantCache(H),
                this._clearSelfAndDescendantCache(X),
                this.drawScene(c, this, !0),
                this.drawHit(p, this, !0),
                this._isUnderCache = !1,
                u.restore(),
                f.restore(),
                l && (u.save(),
                u.beginPath(),
                u.rect(0, 0, n, r),
                u.closePath(),
                u.setAttr("strokeStyle", "red"),
                u.setAttr("lineWidth", 5),
                u.stroke(),
                u.restore()),
                this._cache.set(j, {
                    scene: c,
                    filter: d,
                    hit: p,
                    x: o,
                    y: s
                }),
                this
            }
            O.error("Can not cache the node. Width or height of the node equals 0. Caching is skipped.")
        }
        ,
        s.prototype.getClientRect = function(t) {
            throw new Error('abstract "getClientRect" method call')
        }
        ,
        s.prototype._transformedRect = function(t, e) {
            var i, n, r, a, o = [{
                x: t.x,
                y: t.y
            }, {
                x: t.x + t.width,
                y: t.y
            }, {
                x: t.x + t.width,
                y: t.y + t.height
            }, {
                x: t.x,
                y: t.y + t.height
            }], s = this.getAbsoluteTransform(e);
            return o.forEach(function(t) {
                var e = s.point(t);
                void 0 === i && (i = r = e.x,
                n = a = e.y),
                i = Math.min(i, e.x),
                n = Math.min(n, e.y),
                r = Math.max(r, e.x),
                a = Math.max(a, e.y)
            }),
            {
                x: i,
                y: n,
                width: r - i,
                height: a - n
            }
        }
        ,
        s.prototype._drawCachedSceneCanvas = function(t) {
            t.save(),
            t._applyOpacity(this),
            t._applyGlobalCompositeOperation(this);
            var e = this._getCanvasCache();
            t.translate(e.x, e.y);
            var i = this._getCachedSceneCanvas()
              , n = i.pixelRatio;
            t.drawImage(i._canvas, 0, 0, i.width / n, i.height / n),
            t.restore()
        }
        ,
        s.prototype._drawCachedHitCanvas = function(t) {
            var e = this._getCanvasCache()
              , i = e.hit;
            t.save(),
            t._applyGlobalCompositeOperation(this),
            t.translate(e.x, e.y),
            t.drawImage(i._canvas, 0, 0),
            t.restore()
        }
        ,
        s.prototype._getCachedSceneCanvas = function() {
            var t, e, i, n, r = this.filters(), a = this._getCanvasCache(), o = a.scene, s = a.filter, h = s.getContext();
            if (r) {
                if (!this._filterUpToDate) {
                    var l = o.pixelRatio;
                    try {
                        for (t = r.length,
                        h.clear(),
                        h.drawImage(o._canvas, 0, 0, o.getWidth() / l, o.getHeight() / l),
                        e = h.getImageData(0, 0, s.getWidth(), s.getHeight()),
                        i = 0; i < t; i++)
                            "function" == typeof (n = r[i]) ? (n.call(this, e),
                            h.putImageData(e, 0, 0)) : O.error("Filter should be type of function, but got " + typeof n + " insted. Please check correct filters")
                    } catch (t) {
                        O.error("Unable to apply filter. " + t.message)
                    }
                    this._filterUpToDate = !0
                }
                return s
            }
            return o
        }
        ,
        s.prototype.on = function(t, e) {
            if (3 === arguments.length)
                return this._delegate.apply(this, arguments);
            var i, n, r, a, o = t.split(" "), s = o.length;
            for (i = 0; i < s; i++)
                r = (n = o[i].split("."))[0],
                a = n[1] || "",
                this.eventListeners[r] || (this.eventListeners[r] = []),
                this.eventListeners[r].push({
                    name: a,
                    handler: e
                });
            return this
        }
        ,
        s.prototype.off = function(t, e) {
            var i, n, r, a, o, s = (t || "").split(" "), h = s.length;
            if (!t)
                for (n in this.eventListeners)
                    this._off(n);
            for (i = 0; i < h; i++)
                if (a = (r = s[i].split("."))[0],
                o = r[1],
                a)
                    this.eventListeners[a] && this._off(a, o, e);
                else
                    for (n in this.eventListeners)
                        this._off(n, o, e);
            return this
        }
        ,
        s.prototype.dispatchEvent = function(t) {
            var e = {
                target: this,
                type: t.type,
                evt: t
            };
            return this.fire(t.type, e),
            this
        }
        ,
        s.prototype.addEventListener = function(t, e) {
            return this.on(t, function(t) {
                e.call(this, t.evt)
            }),
            this
        }
        ,
        s.prototype.removeEventListener = function(t) {
            return this.off(t),
            this
        }
        ,
        s.prototype._delegate = function(t, n, r) {
            var a = this;
            this.on(t, function(t) {
                for (var e = t.target.findAncestors(n, !0, a), i = 0; i < e.length; i++)
                    (t = O.cloneObject(t)).currentTarget = e[i],
                    r.call(e[i], t)
            })
        }
        ,
        s.prototype.remove = function() {
            return E.node && E.node === this && this.stopDrag(),
            this._remove(),
            this
        }
        ,
        s.prototype._remove = function() {
            this._clearSelfAndDescendantCache("stage"),
            this._clearSelfAndDescendantCache(Y),
            this._clearSelfAndDescendantCache(Q),
            this._clearSelfAndDescendantCache(U),
            this._clearSelfAndDescendantCache(H);
            var t = this.getParent();
            t && t.children && (t.children.splice(this.index, 1),
            t._setChildrenIndices(),
            this.parent = null)
        }
        ,
        s.prototype.destroy = function() {
            W(this.id(), this);
            for (var t = (this.name() || "").split(/\s/g), e = 0; e < t.length; e++) {
                var i = t[e];
                N(i, this._id)
            }
            return this.remove(),
            this
        }
        ,
        s.prototype.getAttr = function(t) {
            var e = "get" + O._capitalize(t);
            return O._isFunction(this[e]) ? this[e]() : this.attrs[t]
        }
        ,
        s.prototype.getAncestors = function() {
            for (var t = this.getParent(), e = new a; t; )
                e.push(t),
                t = t.getParent();
            return e
        }
        ,
        s.prototype.getAttrs = function() {
            return this.attrs || {}
        }
        ,
        s.prototype.setAttrs = function(t) {
            var e, i;
            if (!t)
                return this;
            for (e in t)
                "children" !== e && (i = "set" + O._capitalize(e),
                O._isFunction(this[i]) ? this[i](t[e]) : this._setAttr(e, t[e]));
            return this
        }
        ,
        s.prototype.isListening = function() {
            return this._getCache(U, this._isListening)
        }
        ,
        s.prototype._isListening = function() {
            var t = this.listening()
              , e = this.getParent();
            return "inherit" === t ? !e || e.isListening() : t
        }
        ,
        s.prototype.isVisible = function() {
            return this._getCache(Q, this._isVisible)
        }
        ,
        s.prototype._isVisible = function(t) {
            var e = this.visible()
              , i = this.getParent();
            return "inherit" === e ? !i || i === t || i._isVisible(t) : e
        }
        ,
        s.prototype.shouldDrawHit = function() {
            var t = this.getLayer();
            return !t && this.isListening() && this.isVisible() || t && t.hitGraphEnabled() && this.isListening() && this.isVisible()
        }
        ,
        s.prototype.show = function() {
            return this.visible(!0),
            this
        }
        ,
        s.prototype.hide = function() {
            return this.visible(!1),
            this
        }
        ,
        s.prototype.getZIndex = function() {
            return this.index || 0
        }
        ,
        s.prototype.getAbsoluteZIndex = function() {
            var i, n, r, a, o = this.getDepth(), s = this, h = 0;
            return "Stage" !== s.nodeType && function t(e) {
                for (i = [],
                n = e.length,
                r = 0; r < n; r++)
                    a = e[r],
                    h++,
                    "Shape" !== a.nodeType && (i = i.concat(a.getChildren().toArray())),
                    a._id === s._id && (r = n);
                0 < i.length && i[0].getDepth() <= o && t(i)
            }(s.getStage().getChildren()),
            h
        }
        ,
        s.prototype.getDepth = function() {
            for (var t = 0, e = this.parent; e; )
                t++,
                e = e.parent;
            return t
        }
        ,
        s.prototype.setPosition = function(t) {
            return this.x(t.x),
            this.y(t.y),
            this
        }
        ,
        s.prototype.getPosition = function() {
            return {
                x: this.x(),
                y: this.y()
            }
        }
        ,
        s.prototype.getAbsolutePosition = function(t) {
            var e = this.getAbsoluteTransform(t).getMatrix()
              , i = new c
              , n = this.offset();
            return i.m = e.slice(),
            i.translate(n.x, n.y),
            i.getTranslation()
        }
        ,
        s.prototype.setAbsolutePosition = function(t) {
            var e, i = this._clearTransform();
            return this.attrs.x = i.x,
            this.attrs.y = i.y,
            delete i.x,
            delete i.y,
            (e = this.getAbsoluteTransform()).invert(),
            e.translate(t.x, t.y),
            t = {
                x: this.attrs.x + e.getTranslation().x,
                y: this.attrs.y + e.getTranslation().y
            },
            this.setPosition({
                x: t.x,
                y: t.y
            }),
            this._setTransform(i),
            this
        }
        ,
        s.prototype._setTransform = function(t) {
            var e;
            for (e in t)
                this.attrs[e] = t[e];
            this._clearCache(K),
            this._clearSelfAndDescendantCache(Y)
        }
        ,
        s.prototype._clearTransform = function() {
            var t = {
                x: this.x(),
                y: this.y(),
                rotation: this.rotation(),
                scaleX: this.scaleX(),
                scaleY: this.scaleY(),
                offsetX: this.offsetX(),
                offsetY: this.offsetY(),
                skewX: this.skewX(),
                skewY: this.skewY()
            };
            return this.attrs.x = 0,
            this.attrs.y = 0,
            this.attrs.rotation = 0,
            this.attrs.scaleX = 1,
            this.attrs.scaleY = 1,
            this.attrs.offsetX = 0,
            this.attrs.offsetY = 0,
            this.attrs.skewX = 0,
            this.attrs.skewY = 0,
            this._clearCache(K),
            this._clearSelfAndDescendantCache(Y),
            t
        }
        ,
        s.prototype.move = function(t) {
            var e = t.x
              , i = t.y
              , n = this.x()
              , r = this.y();
            return void 0 !== e && (n += e),
            void 0 !== i && (r += i),
            this.setPosition({
                x: n,
                y: r
            }),
            this
        }
        ,
        s.prototype._eachAncestorReverse = function(t, e) {
            var i, n, r = [], a = this.getParent();
            if (e && e._id === this._id)
                t(this);
            else {
                for (r.unshift(this); a && (!e || a._id !== e._id); )
                    r.unshift(a),
                    a = a.parent;
                for (i = r.length,
                n = 0; n < i; n++)
                    t(r[n])
            }
        }
        ,
        s.prototype.rotate = function(t) {
            return this.rotation(this.rotation() + t),
            this
        }
        ,
        s.prototype.moveToTop = function() {
            if (!this.parent)
                return O.warn("Node has no parent. moveToTop function is ignored."),
                !1;
            var t = this.index;
            return this.parent.children.splice(t, 1),
            this.parent.children.push(this),
            this.parent._setChildrenIndices(),
            !0
        }
        ,
        s.prototype.moveUp = function() {
            if (!this.parent)
                return O.warn("Node has no parent. moveUp function is ignored."),
                !1;
            var t = this.index;
            return t < this.parent.getChildren().length - 1 && (this.parent.children.splice(t, 1),
            this.parent.children.splice(t + 1, 0, this),
            this.parent._setChildrenIndices(),
            !0)
        }
        ,
        s.prototype.moveDown = function() {
            if (!this.parent)
                return O.warn("Node has no parent. moveDown function is ignored."),
                !1;
            var t = this.index;
            return 0 < t && (this.parent.children.splice(t, 1),
            this.parent.children.splice(t - 1, 0, this),
            this.parent._setChildrenIndices(),
            !0)
        }
        ,
        s.prototype.moveToBottom = function() {
            if (!this.parent)
                return O.warn("Node has no parent. moveToBottom function is ignored."),
                !1;
            var t = this.index;
            return 0 < t && (this.parent.children.splice(t, 1),
            this.parent.children.unshift(this),
            this.parent._setChildrenIndices(),
            !0)
        }
        ,
        s.prototype.setZIndex = function(t) {
            if (!this.parent)
                return O.warn("Node has no parent. zIndex parameter is ignored."),
                !1;
            (t < 0 || t >= this.parent.children.length) && O.warn("Unexpected value " + t + " for zIndex property. zIndex is just index of a node in children of its parent. Expected value is from 0 to " + (this.parent.children.length - 1) + ".");
            var e = this.index;
            return this.parent.children.splice(e, 1),
            this.parent.children.splice(t, 0, this),
            this.parent._setChildrenIndices(),
            this
        }
        ,
        s.prototype.getAbsoluteOpacity = function() {
            return this._getCache(H, this._getAbsoluteOpacity)
        }
        ,
        s.prototype._getAbsoluteOpacity = function() {
            var t = this.opacity()
              , e = this.getParent();
            return e && !e._isUnderCache && (t *= this.getParent().getAbsoluteOpacity()),
            t
        }
        ,
        s.prototype.moveTo = function(t) {
            return this.getParent() !== t && (this._remove(),
            t.add(this)),
            this
        }
        ,
        s.prototype.toObject = function() {
            var t, e, i, n = {}, r = this.getAttrs();
            for (t in n.attrs = {},
            r)
                e = r[t],
                O.isObject(e) && !O._isPlainObject(e) && !O._isArray(e) || (i = "function" == typeof this[t] && this[t],
                delete r[t],
                (i ? i.call(this) : null) !== (r[t] = e) && (n.attrs[t] = e));
            return n.className = this.getClassName(),
            O._prepareToStringify(n)
        }
        ,
        s.prototype.toJSON = function() {
            return JSON.stringify(this.toObject())
        }
        ,
        s.prototype.getParent = function() {
            return this.parent
        }
        ,
        s.prototype.findAncestors = function(t, e, i) {
            var n = [];
            e && this._isMatch(t) && n.push(this);
            for (var r = this.parent; r; ) {
                if (r === i)
                    return n;
                r._isMatch(t) && n.push(r),
                r = r.parent
            }
            return n
        }
        ,
        s.prototype.isAncestorOf = function(t) {
            return !1
        }
        ,
        s.prototype.findAncestor = function(t, e, i) {
            return this.findAncestors(t, e, i)[0]
        }
        ,
        s.prototype._isMatch = function(t) {
            if (!t)
                return !1;
            if ("function" == typeof t)
                return t(this);
            var e, i, n = t.replace(/ /g, "").split(","), r = n.length;
            for (e = 0; e < r; e++)
                if (i = n[e],
                O.isValidSelector(i) || (O.warn('Selector "' + i + '" is invalid. Allowed selectors examples are "#foo", ".bar" or "Group".'),
                O.warn('If you have a custom shape with such className, please change it to start with upper letter like "Triangle".'),
                O.warn("Konva is awesome, right?")),
                "#" === i.charAt(0)) {
                    if (this.id() === i.slice(1))
                        return !0
                } else if ("." === i.charAt(0)) {
                    if (this.hasName(i.slice(1)))
                        return !0
                } else if (this.className === t || this.nodeType === t)
                    return !0;
            return !1
        }
        ,
        s.prototype.getLayer = function() {
            var t = this.getParent();
            return t ? t.getLayer() : null
        }
        ,
        s.prototype.getStage = function() {
            return this._getCache("stage", this._getStage)
        }
        ,
        s.prototype._getStage = function() {
            var t = this.getParent();
            return t ? t.getStage() : void 0
        }
        ,
        s.prototype.fire = function(t, e, i) {
            return (e = e || {}).target = e.target || this,
            i ? this._fireAndBubble(t, e) : this._fire(t, e),
            this
        }
        ,
        s.prototype.getAbsoluteTransform = function(t) {
            return t ? this._getAbsoluteTransform(t) : this._getCache(Y, this._getAbsoluteTransform)
        }
        ,
        s.prototype._getAbsoluteTransform = function(t) {
            var i = new c;
            return this._eachAncestorReverse(function(t) {
                var e = t.getTransformsEnabled();
                "all" === e ? i.multiply(t.getTransform()) : "position" === e && i.translate(t.getX() - t.getOffsetX(), t.getY() - t.getOffsetY())
            }, t),
            i
        }
        ,
        s.prototype.getAbsoluteScale = function(t) {
            return t ? this._getAbsoluteScale(t) : this._getCache(X, this._getAbsoluteScale)
        }
        ,
        s.prototype._getAbsoluteScale = function(t) {
            for (var e = this; e; )
                e._isUnderCache && (t = e),
                e = e.getParent();
            var i = 1
              , n = 1;
            return this._eachAncestorReverse(function(t) {
                i *= t.scaleX(),
                n *= t.scaleY()
            }, t),
            {
                x: i,
                y: n
            }
        }
        ,
        s.prototype.getTransform = function() {
            return this._getCache(K, this._getTransform)
        }
        ,
        s.prototype._getTransform = function() {
            var t = new c
              , e = this.x()
              , i = this.y()
              , n = L.getAngle(this.rotation())
              , r = this.scaleX()
              , a = this.scaleY()
              , o = this.skewX()
              , s = this.skewY()
              , h = this.offsetX()
              , l = this.offsetY();
            return 0 === e && 0 === i || t.translate(e, i),
            0 !== n && t.rotate(n),
            0 === o && 0 === s || t.skew(o, s),
            1 === r && 1 === a || t.scale(r, a),
            0 === h && 0 === l || t.translate(-1 * h, -1 * l),
            t
        }
        ,
        s.prototype.clone = function(t) {
            var e, i, n, r, a, o = O.cloneObject(this.attrs);
            for (var s in J) {
                delete o[J[s]]
            }
            for (e in t)
                o[e] = t[e];
            var h = new this.constructor(o);
            for (e in this.eventListeners)
                for (n = (i = this.eventListeners[e]).length,
                r = 0; r < n; r++)
                    (a = i[r]).name.indexOf("konva") < 0 && (h.eventListeners[e] || (h.eventListeners[e] = []),
                    h.eventListeners[e].push(a));
            return h
        }
        ,
        s.prototype._toKonvaCanvas = function(t) {
            t = t || {};
            var e = this.getClientRect()
              , i = this.getStage()
              , n = void 0 !== t.x ? t.x : e.x
              , r = void 0 !== t.y ? t.y : e.y
              , a = t.pixelRatio || 1
              , o = new R({
                width: t.width || e.width || (i ? i.getWidth() : 0),
                height: t.height || e.height || (i ? i.getHeight() : 0),
                pixelRatio: a
            })
              , s = o.getContext();
            return s.save(),
            (n || r) && s.translate(-1 * n, -1 * r),
            this.drawScene(o),
            s.restore(),
            o
        }
        ,
        s.prototype.toCanvas = function(t) {
            return this._toKonvaCanvas(t)._canvas
        }
        ,
        s.prototype.toDataURL = function(t) {
            var e = (t = t || {}).mimeType || null
              , i = t.quality || null
              , n = this._toKonvaCanvas(t).toDataURL(e, i);
            return t.callback && t.callback(n),
            n
        }
        ,
        s.prototype.toImage = function(t) {
            if (!t || !t.callback)
                throw "callback required for toImage method config argument";
            var e = t.callback;
            delete t.callback,
            O._urlToImage(this.toDataURL(t), function(t) {
                e(t)
            })
        }
        ,
        s.prototype.setSize = function(t) {
            return this.width(t.width),
            this.height(t.height),
            this
        }
        ,
        s.prototype.getSize = function() {
            return {
                width: this.width(),
                height: this.height()
            }
        }
        ,
        s.prototype.getClassName = function() {
            return this.className || this.nodeType
        }
        ,
        s.prototype.getType = function() {
            return this.nodeType
        }
        ,
        s.prototype.getDragDistance = function() {
            return void 0 !== this.attrs.dragDistance ? this.attrs.dragDistance : this.parent ? this.parent.getDragDistance() : L.dragDistance
        }
        ,
        s.prototype._off = function(t, e, i) {
            var n, r, a, o = this.eventListeners[t];
            for (n = 0; n < o.length; n++)
                if (r = o[n].name,
                a = o[n].handler,
                !("konva" === r && "konva" !== e || e && r !== e || i && i !== a)) {
                    if (o.splice(n, 1),
                    0 === o.length) {
                        delete this.eventListeners[t];
                        break
                    }
                    n--
                }
        }
        ,
        s.prototype._fireChangeEvent = function(t, e, i) {
            this._fire(t + "Change", {
                oldVal: e,
                newVal: i
            })
        }
        ,
        s.prototype.setId = function(t) {
            var e, i, n = this.id();
            return W(n, this),
            e = this,
            (i = t) && (z[i] = e),
            this._setAttr("id", t),
            this
        }
        ,
        s.prototype.setName = function(t) {
            var e, i, n, r, a = (this.name() || "").split(/\s/g), o = (t || "").split(/\s/g);
            for (i = 0; i < a.length; i++)
                e = a[i],
                -1 === o.indexOf(e) && e && N(e, this._id);
            for (i = 0; i < o.length; i++)
                e = o[i],
                -1 === a.indexOf(e) && e && (n = this,
                (r = e) && (B[r] || (B[r] = []),
                B[r].push(n)));
            return this._setAttr("name", t),
            this
        }
        ,
        s.prototype.addName = function(t) {
            if (!this.hasName(t)) {
                var e = this.name()
                  , i = e ? e + " " + t : t;
                this.setName(i)
            }
            return this
        }
        ,
        s.prototype.hasName = function(t) {
            if (!t)
                return !1;
            var e = this.name();
            return !!e && -1 !== (e || "").split(/\s/g).indexOf(t)
        }
        ,
        s.prototype.removeName = function(t) {
            var e = (this.name() || "").split(/\s/g)
              , i = e.indexOf(t);
            return -1 !== i && (e.splice(i, 1),
            this.setName(e.join(" "))),
            this
        }
        ,
        s.prototype.setAttr = function(t, e) {
            var i = this["set" + O._capitalize(t)];
            return O._isFunction(i) ? i.call(this, e) : this._setAttr(t, e),
            this
        }
        ,
        s.prototype._setAttr = function(t, e) {
            var i = this.attrs[t];
            (i !== e || O.isObject(e)) && (null == e ? delete this.attrs[t] : this.attrs[t] = e,
            this._fireChangeEvent(t, i, e))
        }
        ,
        s.prototype._setComponentAttr = function(t, e, i) {
            var n;
            void 0 !== i && ((n = this.attrs[t]) || (this.attrs[t] = this.getAttr(t)),
            this.attrs[t][e] = i,
            this._fireChangeEvent(t, n, i))
        }
        ,
        s.prototype._fireAndBubble = function(t, e, i) {
            if (e && "Shape" === this.nodeType && (e.target = this),
            !((t === q || t === V) && i && (this._id === i._id || this.isAncestorOf && this.isAncestorOf(i)))) {
                this._fire(t, e);
                var n = (t === q || t === V) && i && i.isAncestorOf && i.isAncestorOf(this) && !i.isAncestorOf(this.parent);
                (e && !e.cancelBubble || !e) && this.parent && this.parent.isListening() && !n && (i && i.parent ? this._fireAndBubble.call(this.parent, t, e, i.parent) : this._fireAndBubble.call(this.parent, t, e))
            }
        }
        ,
        s.prototype._fire = function(t, e) {
            var i, n = this.eventListeners[t];
            if (n)
                for ((e = e || {}).currentTarget = this,
                e.type = t,
                i = 0; i < n.length; i++)
                    n[i].handler.call(this, e)
        }
        ,
        s.prototype.draw = function() {
            return this.drawScene(),
            this.drawHit(),
            this
        }
        ,
        s.prototype.startDrag = function() {
            var t = this.getStage()
              , e = this.getLayer()
              , i = t.getPointerPosition()
              , n = this.getAbsolutePosition();
            i && (E.node && E.node.stopDrag(),
            E.node = this,
            E.startPointerPos = i,
            E.offset.x = i.x - n.x,
            E.offset.y = i.y - n.y,
            E.anim.setLayers(e || this.getLayers()),
            E.anim.start(),
            this._setDragPosition())
        }
        ,
        s.prototype._setDragPosition = function(t) {
            var e = this.getStage().getPointerPosition()
              , i = this.dragBoundFunc();
            if (e) {
                var n = {
                    x: e.x - E.offset.x,
                    y: e.y - E.offset.y
                };
                void 0 !== i && (n = i.call(this, n, t)),
                this.setAbsolutePosition(n),
                this._lastPos && this._lastPos.x === n.x && this._lastPos.y === n.y || (E.anim.dirty = !0),
                this._lastPos = n
            }
        }
        ,
        s.prototype.stopDrag = function() {
            var t = {};
            E._endDragBefore(t),
            E._endDragAfter(t)
        }
        ,
        s.prototype.setDraggable = function(t) {
            this._setAttr("draggable", t),
            this._dragChange()
        }
        ,
        s.prototype.isDragging = function() {
            return !(!E.node || E.node !== this || !E.isDragging)
        }
        ,
        s.prototype._listenDrag = function() {
            this._dragCleanup(),
            this.on("mousedown.konva touchstart.konva", function(t) {
                (!(void 0 !== t.evt.button) || 0 <= L.dragButtons.indexOf(t.evt.button)) && (E.node || this.startDrag())
            })
        }
        ,
        s.prototype._dragChange = function() {
            if (this.attrs.draggable)
                this._listenDrag();
            else {
                this._dragCleanup();
                var t = this.getStage()
                  , e = E;
                t && e.node && e.node._id === this._id && e.node.stopDrag()
            }
        }
        ,
        s.prototype._dragCleanup = function() {
            this.off("mousedown.konva"),
            this.off("touchstart.konva")
        }
        ,
        s.create = function(t, e) {
            return O._isString(t) && (t = JSON.parse(t)),
            this._createNode(t, e)
        }
        ,
        s._createNode = function(t, e) {
            var i, n, r, a = s.prototype.getClassName.call(t), o = t.children;
            if (e && (t.attrs.container = e),
            h[a] || (O.warn('Can not find a node with class name "' + a + '". Fallback to "Shape".'),
            a = "Shape"),
            i = new h[a](t.attrs),
            o)
                for (n = o.length,
                r = 0; r < n; r++)
                    i.add(s._createNode(o[r]));
            return i
        }
        ,
        s
    }();
    it.prototype.nodeType = "Node",
    it.prototype._attrsAffectingSize = [],
    x.addGetterSetter(it, "zIndex"),
    x.addGetterSetter(it, "absolutePosition"),
    x.addGetterSetter(it, "position"),
    x.addGetterSetter(it, "x", 0, v()),
    x.addGetterSetter(it, "y", 0, v()),
    x.addGetterSetter(it, "globalCompositeOperation", "source-over", m()),
    x.addGetterSetter(it, "opacity", 1, v()),
    x.addGetterSetter(it, "name", "", m()),
    x.addGetterSetter(it, "id", "", m()),
    x.addGetterSetter(it, "rotation", 0, v()),
    x.addComponentsGetterSetter(it, "scale", ["x", "y"]),
    x.addGetterSetter(it, "scaleX", 1, v()),
    x.addGetterSetter(it, "scaleY", 1, v()),
    x.addComponentsGetterSetter(it, "skew", ["x", "y"]),
    x.addGetterSetter(it, "skewX", 0, v()),
    x.addGetterSetter(it, "skewY", 0, v()),
    x.addComponentsGetterSetter(it, "offset", ["x", "y"]),
    x.addGetterSetter(it, "offsetX", 0, v()),
    x.addGetterSetter(it, "offsetY", 0, v()),
    x.addGetterSetter(it, "dragDistance", null, v()),
    x.addGetterSetter(it, "width", 0, v()),
    x.addGetterSetter(it, "height", 0, v()),
    x.addGetterSetter(it, "listening", "inherit", function(t) {
        return !0 === t || !1 === t || "inherit" === t || O.warn(t + ' is a not valid value for "listening" attribute. The value may be true, false or "inherit".'),
        t
    }),
    x.addGetterSetter(it, "preventDefault", !0, _()),
    x.addGetterSetter(it, "filters", null, function(t) {
        return this._filterUpToDate = !1,
        t
    }),
    x.addGetterSetter(it, "visible", "inherit", function(t) {
        return !0 === t || !1 === t || "inherit" === t || O.warn(t + ' is a not valid value for "visible" attribute. The value may be true, false or "inherit".'),
        t
    }),
    x.addGetterSetter(it, "transformsEnabled", "all", m()),
    x.addGetterSetter(it, "size"),
    x.addGetterSetter(it, "dragBoundFunc"),
    x.addGetterSetter(it, "draggable", !1, _()),
    x.backCompat(it, {
        rotateDeg: "rotate",
        setRotationDeg: "setRotation",
        getRotationDeg: "getRotation"
    }),
    a.mapMethods(it);
    var nt = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.children = new a,
            t
        }
        return C(t, e),
        t.prototype.getChildren = function(e) {
            if (!e)
                return this.children;
            var i = new a;
            return this.children.each(function(t) {
                e(t) && i.push(t)
            }),
            i
        }
        ,
        t.prototype.hasChildren = function() {
            return 0 < this.getChildren().length
        }
        ,
        t.prototype.removeChildren = function() {
            for (var t, e = 0; e < this.children.length; e++)
                (t = this.children[e]).parent = null,
                t.index = 0,
                t.remove();
            return this.children = new a,
            this
        }
        ,
        t.prototype.destroyChildren = function() {
            for (var t, e = 0; e < this.children.length; e++)
                (t = this.children[e]).parent = null,
                t.index = 0,
                t.destroy();
            return this.children = new a,
            this
        }
        ,
        t.prototype.add = function(t) {
            if (1 < arguments.length) {
                for (var e = 0; e < arguments.length; e++)
                    this.add(arguments[e]);
                return this
            }
            if (t.getParent())
                return t.moveTo(this),
                this;
            var i = this.children;
            return this._validateAdd(t),
            t.index = i.length,
            t.parent = this,
            i.push(t),
            this._fire("add", {
                child: t
            }),
            t.isDragging() && E.anim.setLayers(t.getLayer()),
            this
        }
        ,
        t.prototype.destroy = function() {
            return this.hasChildren() && this.destroyChildren(),
            e.prototype.destroy.call(this),
            this
        }
        ,
        t.prototype.find = function(t) {
            return this._generalFind(t, !1)
        }
        ,
        t.prototype.get = function(t) {
            return O.warn("collection.find() method is deprecated. Please use collection.find() instead."),
            this.find(t)
        }
        ,
        t.prototype.findOne = function(t) {
            var e = this._generalFind(t, !0);
            return 0 < e.length ? e[0] : void 0
        }
        ,
        t.prototype._generalFind = function(i, n) {
            var r = [];
            return this._descendants(function(t) {
                var e = t._isMatch(i);
                return e && r.push(t),
                !(!e || !n)
            }),
            a.toCollection(r)
        }
        ,
        t.prototype._descendants = function(t) {
            for (var e = 0; e < this.children.length; e++) {
                var i = this.children[e];
                if (t(i))
                    return !0;
                if (i.hasChildren() && i._descendants(t))
                    return !0
            }
            return !1
        }
        ,
        t.prototype.toObject = function() {
            var t = it.prototype.toObject.call(this);
            t.children = [];
            for (var e = this.getChildren(), i = e.length, n = 0; n < i; n++) {
                var r = e[n];
                t.children.push(r.toObject())
            }
            return t
        }
        ,
        t.prototype._getDescendants = function(t) {
            for (var e = [], i = t.length, n = 0; n < i; n++) {
                var r = t[n];
                this.isAncestorOf(r) && e.push(r)
            }
            return e
        }
        ,
        t.prototype.isAncestorOf = function(t) {
            for (var e = t.getParent(); e; ) {
                if (e._id === this._id)
                    return !0;
                e = e.getParent()
            }
            return !1
        }
        ,
        t.prototype.clone = function(t) {
            var e = it.prototype.clone.call(this, t);
            return this.getChildren().each(function(t) {
                e.add(t.clone())
            }),
            e
        }
        ,
        t.prototype.getAllIntersections = function(e) {
            var i = [];
            return this.find("Shape").each(function(t) {
                t.isVisible() && t.intersects(e) && i.push(t)
            }),
            i
        }
        ,
        t.prototype._setChildrenIndices = function() {
            this.children.each(function(t, e) {
                t.index = e
            })
        }
        ,
        t.prototype.drawScene = function(t, e, i) {
            var n = this.getLayer()
              , r = t || n && n.getCanvas()
              , a = r && r.getContext()
              , o = this._getCanvasCache()
              , s = o && o.scene;
            return (this.isVisible() || i) && (!i && s ? (a.save(),
            n._applyTransform(this, a, e),
            this._drawCachedSceneCanvas(a),
            a.restore()) : this._drawChildren(r, "drawScene", e, !1, i, i)),
            this
        }
        ,
        t.prototype.drawHit = function(t, e, i) {
            var n = this.getLayer()
              , r = t || n && n.hitCanvas
              , a = r && r.getContext()
              , o = this._getCanvasCache()
              , s = o && o.hit;
            return (this.shouldDrawHit(r) || i) && (!i && s ? (a.save(),
            n._applyTransform(this, a, e),
            this._drawCachedHitCanvas(a),
            a.restore()) : this._drawChildren(r, "drawHit", e, !1, i, i)),
            this
        }
        ,
        t.prototype._drawChildren = function(e, i, n, r, a, t) {
            var o, s, h = this.getLayer(), l = e && e.getContext(), c = this.clipWidth(), d = this.clipHeight(), p = this.clipFunc(), u = c && d || p;
            if (u && h) {
                l.save();
                var f = this.getAbsoluteTransform(n)
                  , g = f.getMatrix();
                l.transform(g[0], g[1], g[2], g[3], g[4], g[5]),
                l.beginPath(),
                p ? p.call(this, l, this) : (o = this.clipX(),
                s = this.clipY(),
                l.rect(o, s, c, d)),
                l.clip(),
                g = f.copy().invert().getMatrix(),
                l.transform(g[0], g[1], g[2], g[3], g[4], g[5])
            }
            var v = "source-over" !== this.globalCompositeOperation() && !t;
            v && h && (l.save(),
            l._applyGlobalCompositeOperation(this)),
            this.children.each(function(t) {
                t[i](e, n, r, a)
            }),
            v && h && l.restore(),
            u && h && l.restore()
        }
        ,
        t.prototype.shouldDrawHit = function(t) {
            var e = this.getLayer()
              , i = E.isDragging && -1 !== E.anim.getLayers().indexOf(e);
            return t && t.isCache || e && e.hitGraphEnabled() && this.isVisible() && !i
        }
        ,
        t.prototype.getClientRect = function(i) {
            var n, r, a, o, t = (i = i || {}).skipTransform, e = i.relativeTo, s = {
                x: 1 / 0,
                y: 1 / 0,
                width: 0,
                height: 0
            }, h = this;
            this.children.each(function(t) {
                if (t.getVisible()) {
                    var e = t.getClientRect({
                        relativeTo: h,
                        skipShadow: i.skipShadow,
                        skipStroke: i.skipStroke
                    });
                    0 === e.width && 0 === e.height || (o = void 0 === n ? (n = e.x,
                    r = e.y,
                    a = e.x + e.width,
                    e.y + e.height) : (n = Math.min(n, e.x),
                    r = Math.min(r, e.y),
                    a = Math.max(a, e.x + e.width),
                    Math.max(o, e.y + e.height)))
                }
            });
            for (var l = this.find("Shape"), c = !1, d = 0; d < l.length; d++) {
                if (l[d]._isVisible(this)) {
                    c = !0;
                    break
                }
            }
            return s = c ? {
                x: n,
                y: r,
                width: a - n,
                height: o - r
            } : {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            },
            t ? s : this._transformedRect(s, e)
        }
        ,
        t
    }(it);
    x.addComponentsGetterSetter(nt, "clip", ["x", "y", "width", "height"]),
    x.addGetterSetter(nt, "clipX", void 0, v()),
    x.addGetterSetter(nt, "clipY", void 0, v()),
    x.addGetterSetter(nt, "clipWidth", void 0, v()),
    x.addGetterSetter(nt, "clipHeight", void 0, v()),
    x.addGetterSetter(nt, "clipFunc"),
    a.mapMethods(nt);
    var rt = "mouseout"
      , at = "mouseleave"
      , ot = "mouseover"
      , st = "mousemove"
      , ht = "mousedown"
      , lt = "mouseup"
      , ct = "contextmenu"
      , dt = "dblclick"
      , pt = "touchstart"
      , ut = "touchend"
      , ft = "touchmove"
      , gt = "wheel"
      , vt = "_"
      , yt = [ht, st, lt, rt, pt, ft, ut, ot, gt, ct]
      , mt = yt.length;
    function _t(e, i) {
        e.content.addEventListener(i, function(t) {
            e[vt + i](t)
        }, !1)
    }
    var St = [];
    function bt(t) {
        return void 0 === t && (t = {}),
        (t.clipFunc || t.clipWidth || t.clipHeight) && O.warn("Stage does not support clipping. Please use clip for Layers or Groups."),
        t
    }
    var xt = function(n) {
        function t(t) {
            var e = n.call(this, bt(t)) || this;
            return e._buildDOM(),
            e._bindContentEvents(),
            St.push(e),
            e.on("widthChange.konva heightChange.konva", e._resizeDOM),
            e.on("visibleChange.konva", e._checkVisibility),
            e.on("clipWidthChange.konva clipHeightChange.konva clipFuncChange.konva", function() {
                bt(e.attrs)
            }),
            e._checkVisibility(),
            e
        }
        return C(t, n),
        t.prototype._validateAdd = function(t) {
            var e = "Layer" === t.getType()
              , i = "FastLayer" === t.getType();
            e || i || O.throw("You may only add layers to the stage.")
        }
        ,
        t.prototype._checkVisibility = function() {
            var t = this.visible() ? "" : "none";
            this.content.style.display = t
        }
        ,
        t.prototype.setContainer = function(t) {
            if ("string" == typeof t) {
                if ("." === t.charAt(0)) {
                    var e = t.slice(1);
                    t = document.getElementsByClassName(e)[0]
                } else {
                    var i;
                    i = "#" !== t.charAt(0) ? t : t.slice(1),
                    t = document.getElementById(i)
                }
                if (!t)
                    throw "Can not find container in document with id " + i
            }
            return this._setAttr("container", t),
            this.content && (this.content.parentElement.removeChild(this.content),
            t.appendChild(this.content)),
            this
        }
        ,
        t.prototype.shouldDrawHit = function() {
            return !0
        }
        ,
        t.prototype.clear = function() {
            var t, e = this.children, i = e.length;
            for (t = 0; t < i; t++)
                e[t].clear();
            return this
        }
        ,
        t.prototype.clone = function(t) {
            return t || (t = {}),
            t.container = document.createElement("div"),
            nt.prototype.clone.call(this, t)
        }
        ,
        t.prototype.destroy = function() {
            n.prototype.destroy.call(this);
            var t = this.content;
            t && O._isInDocument(t) && this.container().removeChild(t);
            var e = St.indexOf(this);
            return -1 < e && St.splice(e, 1),
            this
        }
        ,
        t.prototype.getPointerPosition = function() {
            return this.pointerPos || O.warn("Pointer position is missing and not registered by the stage. Looks like it is outside of the stage container. You can set it manually from event: stage.setPointersPositions(event);"),
            this.pointerPos
        }
        ,
        t.prototype.getStage = function() {
            return this
        }
        ,
        t.prototype.getContent = function() {
            return this.content
        }
        ,
        t.prototype._toKonvaCanvas = function(i) {
            var n = (i = i || {}).x || 0
              , r = i.y || 0
              , t = new R({
                width: i.width || this.width(),
                height: i.height || this.height(),
                pixelRatio: i.pixelRatio || 1
            })
              , a = t.getContext()._context
              , e = this.children;
            return (n || r) && a.translate(-1 * n, -1 * r),
            e.each(function(t) {
                if (t.isVisible()) {
                    var e = t._toKonvaCanvas(i);
                    a.drawImage(e._canvas, n, r, e.getWidth() / e.getPixelRatio(), e.getHeight() / e.getPixelRatio())
                }
            }),
            t
        }
        ,
        t.prototype.getIntersection = function(t, e) {
            var i, n, r = this.children;
            for (i = r.length - 1; 0 <= i; i--)
                if (n = r[i].getIntersection(t, e))
                    return n;
            return null
        }
        ,
        t.prototype._resizeDOM = function() {
            if (this.content) {
                var t, e, i = this.width(), n = this.height(), r = this.getChildren(), a = r.length;
                for (this.content.style.width = i + "px",
                this.content.style.height = n + "px",
                this.bufferCanvas.setSize(i, n),
                this.bufferHitCanvas.setSize(i, n),
                t = 0; t < a; t++)
                    (e = r[t]).setSize({
                        width: i,
                        height: n
                    }),
                    e.draw()
            }
        }
        ,
        t.prototype.add = function(t) {
            if (1 < arguments.length) {
                for (var e = 0; e < arguments.length; e++)
                    this.add(arguments[e]);
                return this
            }
            n.prototype.add.call(this, t);
            var i = this.children.length;
            return 5 < i && O.warn("The stage has " + i + " layers. Recommended maximin number of layers is 3-5. Adding more layers into the stage may drop the performance. Rethink your tree structure, you can use Konva.Group."),
            t._setCanvasSize(this.width(), this.height()),
            t.draw(),
            L.isBrowser && this.content.appendChild(t.canvas._canvas),
            this
        }
        ,
        t.prototype.getParent = function() {
            return null
        }
        ,
        t.prototype.getLayer = function() {
            return null
        }
        ,
        t.prototype.getLayers = function() {
            return this.getChildren()
        }
        ,
        t.prototype._bindContentEvents = function() {
            if (L.isBrowser)
                for (var t = 0; t < mt; t++)
                    _t(this, yt[t])
        }
        ,
        t.prototype._mouseover = function(t) {
            this.setPointersPositions(t),
            this._fire("contentMouseover", {
                evt: t
            }),
            this._fire(ot, {
                evt: t,
                target: this,
                currentTarget: this
            })
        }
        ,
        t.prototype._mouseout = function(t) {
            this.setPointersPositions(t);
            var e = this.targetShape;
            e && !E.isDragging && (e._fireAndBubble(rt, {
                evt: t
            }),
            e._fireAndBubble(at, {
                evt: t
            }),
            this.targetShape = null),
            this.pointerPos = void 0,
            this._fire("contentMouseout", {
                evt: t
            })
        }
        ,
        t.prototype._mousemove = function(t) {
            if (L.UA.ieMobile)
                return this._touchmove(t);
            var e;
            if (this.setPointersPositions(t),
            !E.isDragging) {
                if ((e = this.getIntersection(this.getPointerPosition())) && e.isListening()) {
                    var i = !this.targetShape || this.targetShape !== e;
                    !E.isDragging && i ? (this.targetShape && (this.targetShape._fireAndBubble(rt, {
                        evt: t
                    }, e),
                    this.targetShape._fireAndBubble(at, {
                        evt: t
                    }, e)),
                    e._fireAndBubble(ot, {
                        evt: t
                    }, this.targetShape),
                    e._fireAndBubble("mouseenter", {
                        evt: t
                    }, this.targetShape),
                    this.targetShape = e) : e._fireAndBubble(st, {
                        evt: t
                    })
                } else
                    this.targetShape && !E.isDragging && (this.targetShape._fireAndBubble(rt, {
                        evt: t
                    }),
                    this.targetShape._fireAndBubble(at, {
                        evt: t
                    }),
                    this._fire(ot, {
                        evt: t,
                        target: this,
                        currentTarget: this
                    }),
                    this.targetShape = null),
                    this._fire(st, {
                        evt: t,
                        target: this,
                        currentTarget: this
                    });
                this._fire("contentMousemove", {
                    evt: t
                })
            }
            t.cancelable && t.preventDefault()
        }
        ,
        t.prototype._mousedown = function(t) {
            if (L.UA.ieMobile)
                return this._touchstart(t);
            this.setPointersPositions(t);
            var e = this.getIntersection(this.getPointerPosition());
            L.listenClickTap = !0,
            e && e.isListening() ? (this.clickStartShape = e)._fireAndBubble(ht, {
                evt: t
            }) : this._fire(ht, {
                evt: t,
                target: this,
                currentTarget: this
            }),
            this._fire("contentMousedown", {
                evt: t
            })
        }
        ,
        t.prototype._mouseup = function(t) {
            if (L.UA.ieMobile)
                return this._touchend(t);
            this.setPointersPositions(t);
            var e = this.getIntersection(this.getPointerPosition())
              , i = this.clickStartShape
              , n = this.clickEndShape
              , r = !1;
            L.inDblClickWindow ? (r = !0,
            clearTimeout(this.dblTimeout)) : E.justDragged ? E && (E.justDragged = !1) : (L.inDblClickWindow = !0,
            clearTimeout(this.dblTimeout)),
            this.dblTimeout = setTimeout(function() {
                L.inDblClickWindow = !1
            }, L.dblClickWindow),
            e && e.isListening() ? ((this.clickEndShape = e)._fireAndBubble(lt, {
                evt: t
            }),
            L.listenClickTap && i && i._id === e._id && (e._fireAndBubble("click", {
                evt: t
            }),
            r && n && n._id === e._id && e._fireAndBubble(dt, {
                evt: t
            }))) : (this._fire(lt, {
                evt: t,
                target: this,
                currentTarget: this
            }),
            L.listenClickTap && this._fire("click", {
                evt: t,
                target: this,
                currentTarget: this
            }),
            r && this._fire(dt, {
                evt: t,
                target: this,
                currentTarget: this
            })),
            this._fire("contentMouseup", {
                evt: t
            }),
            L.listenClickTap && (this._fire("contentClick", {
                evt: t
            }),
            r && this._fire("contentDblclick", {
                evt: t
            })),
            L.listenClickTap = !1,
            t.cancelable && t.preventDefault()
        }
        ,
        t.prototype._contextmenu = function(t) {
            this.setPointersPositions(t);
            var e = this.getIntersection(this.getPointerPosition());
            e && e.isListening() ? e._fireAndBubble(ct, {
                evt: t
            }) : this._fire(ct, {
                evt: t,
                target: this,
                currentTarget: this
            }),
            this._fire("contentContextmenu", {
                evt: t
            })
        }
        ,
        t.prototype._touchstart = function(t) {
            this.setPointersPositions(t);
            var e = this.getIntersection(this.getPointerPosition());
            L.listenClickTap = !0,
            e && e.isListening() ? ((this.tapStartShape = e)._fireAndBubble(pt, {
                evt: t
            }),
            e.isListening() && e.preventDefault() && t.cancelable && t.preventDefault()) : this._fire(pt, {
                evt: t,
                target: this,
                currentTarget: this
            }),
            this._fire("contentTouchstart", {
                evt: t
            })
        }
        ,
        t.prototype._touchend = function(t) {
            this.setPointersPositions(t);
            var e = this.getIntersection(this.getPointerPosition())
              , i = !1;
            L.inDblClickWindow ? i = !0 : L.inDblClickWindow = !0,
            clearTimeout(this.dblTimeout),
            this.dblTimeout = setTimeout(function() {
                L.inDblClickWindow = !1
            }, L.dblClickWindow),
            e && e.isListening() ? (e._fireAndBubble(ut, {
                evt: t
            }),
            L.listenClickTap && this.tapStartShape && e._id === this.tapStartShape._id && (e._fireAndBubble("tap", {
                evt: t
            }),
            i && e._fireAndBubble("dbltap", {
                evt: t
            })),
            e.isListening() && e.preventDefault() && t.cancelable && t.preventDefault()) : (this._fire(ut, {
                evt: t,
                target: this,
                currentTarget: this
            }),
            L.listenClickTap && this._fire("tap", {
                evt: t,
                target: this,
                currentTarget: this
            }),
            i && this._fire("dbltap", {
                evt: t,
                target: this,
                currentTarget: this
            })),
            this._fire("contentTouchend", {
                evt: t
            }),
            L.listenClickTap && (this._fire("contentTap", {
                evt: t
            }),
            i && this._fire("contentDbltap", {
                evt: t
            })),
            L.listenClickTap = !1
        }
        ,
        t.prototype._touchmove = function(t) {
            var e;
            this.setPointersPositions(t),
            E.isDragging || ((e = this.getIntersection(this.getPointerPosition())) && e.isListening() ? (e._fireAndBubble(ft, {
                evt: t
            }),
            e.isListening() && e.preventDefault() && t.cancelable && t.preventDefault()) : this._fire(ft, {
                evt: t,
                target: this,
                currentTarget: this
            }),
            this._fire("contentTouchmove", {
                evt: t
            })),
            E.isDragging && E.node.preventDefault() && t.cancelable && t.preventDefault()
        }
        ,
        t.prototype._wheel = function(t) {
            this.setPointersPositions(t);
            var e = this.getIntersection(this.getPointerPosition());
            e && e.isListening() ? e._fireAndBubble(gt, {
                evt: t
            }) : this._fire(gt, {
                evt: t,
                target: this,
                currentTarget: this
            }),
            this._fire("contentWheel", {
                evt: t
            })
        }
        ,
        t.prototype.setPointersPositions = function(t) {
            var e = this._getContentPosition()
              , i = null
              , n = null;
            if (void 0 !== (t = t || window.event).touches) {
                if (0 < t.touches.length) {
                    var r = t.touches[0];
                    i = r.clientX - e.left,
                    n = r.clientY - e.top
                }
            } else
                i = t.clientX - e.left,
                n = t.clientY - e.top;
            null !== i && null !== n && (this.pointerPos = {
                x: i,
                y: n
            })
        }
        ,
        t.prototype._setPointerPosition = function(t) {
            O.warn('Method _setPointerPosition is deprecated. Use "stage.setPointersPositions(event)" instead.'),
            this.setPointersPositions(t)
        }
        ,
        t.prototype._getContentPosition = function() {
            var t = this.content.getBoundingClientRect ? this.content.getBoundingClientRect() : {
                top: 0,
                left: 0
            };
            return {
                top: t.top,
                left: t.left
            }
        }
        ,
        t.prototype._buildDOM = function() {
            if (this.bufferCanvas = new R,
            this.bufferHitCanvas = new D({
                pixelRatio: 1
            }),
            L.isBrowser) {
                var t = this.container();
                if (!t)
                    throw "Stage has no container. A container is required.";
                t.innerHTML = "",
                this.content = document.createElement("div"),
                this.content.style.position = "relative",
                this.content.style.userSelect = "none",
                this.content.className = "konvajs-content",
                this.content.setAttribute("role", "presentation"),
                t.appendChild(this.content),
                this._resizeDOM()
            }
        }
        ,
        t.prototype.cache = function() {
            return O.warn("Cache function is not allowed for stage. You may use cache only for layers, groups and shapes."),
            this
        }
        ,
        t.prototype.clearCache = function() {
            return this
        }
        ,
        t.prototype.batchDraw = function() {
            return this.children.each(function(t) {
                t.batchDraw()
            }),
            this
        }
        ,
        t
    }(nt);
    xt.prototype.nodeType = "Stage",
    r(xt),
    x.addGetterSetter(xt, "container");
    var wt = function(i) {
        function t(t) {
            var e = i.call(this, t) || this;
            return e.canvas = new R,
            e._waitingForDraw = !1,
            e.on("visibleChange", e._checkVisibility),
            e._checkVisibility(),
            e
        }
        return C(t, i),
        t.prototype.createPNGStream = function() {
            return this.canvas._canvas.createPNGStream()
        }
        ,
        t.prototype.getCanvas = function() {
            return this.canvas
        }
        ,
        t.prototype.getHitCanvas = function() {
            return this.hitCanvas
        }
        ,
        t.prototype.getContext = function() {
            return this.getCanvas().getContext()
        }
        ,
        t.prototype.clear = function(t) {
            return this.getContext().clear(t),
            this
        }
        ,
        t.prototype.setZIndex = function(t) {
            i.prototype.setZIndex.call(this, t);
            var e = this.getStage();
            return e && (e.content.removeChild(this.getCanvas()._canvas),
            t < e.getChildren().length - 1 ? e.content.insertBefore(this.getCanvas()._canvas, e.getChildren()[t + 1].getCanvas()._canvas) : e.content.appendChild(this.getCanvas()._canvas)),
            this
        }
        ,
        t.prototype.moveToTop = function() {
            it.prototype.moveToTop.call(this);
            var t = this.getStage();
            return t && (t.content.removeChild(this.getCanvas()._canvas),
            t.content.appendChild(this.getCanvas()._canvas)),
            !0
        }
        ,
        t.prototype.moveUp = function() {
            if (!it.prototype.moveUp.call(this))
                return !1;
            var t = this.getStage();
            return !!t && (t.content.removeChild(this.getCanvas()._canvas),
            this.index < t.getChildren().length - 1 ? t.content.insertBefore(this.getCanvas()._canvas, t.getChildren()[this.index + 1].getCanvas()._canvas) : t.content.appendChild(this.getCanvas()._canvas),
            !0)
        }
        ,
        t.prototype.moveDown = function() {
            if (it.prototype.moveDown.call(this)) {
                var t = this.getStage();
                if (t) {
                    var e = t.getChildren();
                    t.content.removeChild(this.getCanvas()._canvas),
                    t.content.insertBefore(this.getCanvas()._canvas, e[this.index + 1].getCanvas()._canvas)
                }
                return !0
            }
            return !1
        }
        ,
        t.prototype.moveToBottom = function() {
            if (it.prototype.moveToBottom.call(this)) {
                var t = this.getStage();
                if (t) {
                    var e = t.getChildren();
                    t.content.removeChild(this.getCanvas()._canvas),
                    t.content.insertBefore(this.getCanvas()._canvas, e[1].getCanvas()._canvas)
                }
                return !0
            }
            return !1
        }
        ,
        t.prototype.getLayer = function() {
            return this
        }
        ,
        t.prototype.remove = function() {
            var t = this.getCanvas()._canvas;
            return it.prototype.remove.call(this),
            t && t.parentNode && O._isInDocument(t) && t.parentNode.removeChild(t),
            this
        }
        ,
        t.prototype.getStage = function() {
            return this.parent
        }
        ,
        t.prototype.setSize = function(t) {
            var e = t.width
              , i = t.height;
            return this.canvas.setSize(e, i),
            this
        }
        ,
        t.prototype._toKonvaCanvas = function(t) {
            return (t = t || {}).width = t.width || this.getWidth(),
            t.height = t.height || this.getHeight(),
            t.x = void 0 !== t.x ? t.x : this.x(),
            t.y = void 0 !== t.y ? t.y : this.y(),
            it.prototype._toKonvaCanvas.call(this, t)
        }
        ,
        t.prototype._checkVisibility = function() {
            var t = this.visible();
            this.canvas._canvas.style.display = t ? "block" : "none"
        }
        ,
        t.prototype.getWidth = function() {
            if (this.parent)
                return this.parent.width()
        }
        ,
        t.prototype.setWidth = function() {
            O.warn('Can not change width of layer. Use "stage.width(value)" function instead.')
        }
        ,
        t.prototype.getHeight = function() {
            if (this.parent)
                return this.parent.height()
        }
        ,
        t.prototype.setHeight = function() {
            O.warn('Can not change height of layer. Use "stage.height(value)" function instead.')
        }
        ,
        t.prototype.getIntersection = function(t, e) {
            return null
        }
        ,
        t.prototype.batchDraw = function() {
            var t = this;
            return this._waitingForDraw || (this._waitingForDraw = !0,
            O.requestAnimFrame(function() {
                t.draw(),
                t._waitingForDraw = !1
            })),
            this
        }
        ,
        t.prototype._applyTransform = function(t, e, i) {
            var n = t.getAbsoluteTransform(i).getMatrix();
            e.transform(n[0], n[1], n[2], n[3], n[4], n[5])
        }
        ,
        t
    }(nt);
    wt.prototype.nodeType = "BaseLayer",
    x.addGetterSetter(wt, "clearBeforeDraw", !0),
    a.mapMethods(wt);
    var Ct, kt = "hasShadow", Pt = "shadowRGBA", Tt = "patternImage", Mt = "linearGradient", At = "radialGradient";
    function Gt() {
        return Ct || (Ct = O.createCanvasElement().getContext("2d"))
    }
    var Rt = {};
    function Lt() {
        this._clearCache(kt)
    }
    function Ot() {
        this._clearCache(Pt)
    }
    function Dt() {
        this._clearCache(Tt)
    }
    function It() {
        this._clearCache(Mt)
    }
    function Ft() {
        this._clearCache(At)
    }
    var Et = function(n) {
        function t(t) {
            for (var e, i = n.call(this, t) || this; !(e = O.getRandomColor()) || e in Rt; )
                ;
            return i.colorKey = e,
            (Rt[e] = i).on("shadowColorChange.konva shadowBlurChange.konva shadowOffsetChange.konva shadowOpacityChange.konva shadowEnabledChange.konva", Lt),
            i.on("shadowColorChange.konva shadowOpacityChange.konva shadowEnabledChange.konva", Ot),
            i.on("fillPriorityChange.konva fillPatternImageChange.konva fillPatternRepeatChange.konva", Dt),
            i.on("fillPriorityChange.konva fillLinearGradientColorStopsChange.konva fillLinearGradientStartPointXChange.konva fillLinearGradientStartPointYChange.konva fillLinearGradientEndPointXChange.konva fillLinearGradientEndPointYChange.konva", It),
            i.on("fillPriorityChange.konva fillRadialGradientColorStopsChange.konva fillRadialGradientStartPointXChange.konva fillRadialGradientStartPointYChange.konva fillRadialGradientEndPointXChange.konva fillRadialGradientEndPointYChange.konva fillRadialGradientStartRadiusChange.konva fillRadialGradientEndRadiusChange.konva", Ft),
            i
        }
        return C(t, n),
        t.prototype.getContext = function() {
            return this.getLayer().getContext()
        }
        ,
        t.prototype.getCanvas = function() {
            return this.getLayer().getCanvas()
        }
        ,
        t.prototype.getSceneFunc = function() {
            return this.attrs.sceneFunc || this._sceneFunc
        }
        ,
        t.prototype.getHitFunc = function() {
            return this.attrs.hitFunc || this._hitFunc
        }
        ,
        t.prototype.hasShadow = function() {
            return this._getCache(kt, this._hasShadow)
        }
        ,
        t.prototype._hasShadow = function() {
            return this.shadowEnabled() && 0 !== this.shadowOpacity() && !!(this.shadowColor() || this.shadowBlur() || this.shadowOffsetX() || this.shadowOffsetY())
        }
        ,
        t.prototype._getFillPattern = function() {
            return this._getCache(Tt, this.__getFillPattern)
        }
        ,
        t.prototype.__getFillPattern = function() {
            if (this.fillPatternImage())
                return Gt().createPattern(this.fillPatternImage(), this.fillPatternRepeat() || "repeat")
        }
        ,
        t.prototype._getLinearGradient = function() {
            return this._getCache(Mt, this.__getLinearGradient)
        }
        ,
        t.prototype.__getLinearGradient = function() {
            var t = this.fillLinearGradientColorStops();
            if (t) {
                for (var e = Gt(), i = this.fillLinearGradientStartPoint(), n = this.fillLinearGradientEndPoint(), r = e.createLinearGradient(i.x, i.y, n.x, n.y), a = 0; a < t.length; a += 2)
                    r.addColorStop(t[a], t[a + 1]);
                return r
            }
        }
        ,
        t.prototype._getRadialGradient = function() {
            return this._getCache(At, this.__getRadialGradient)
        }
        ,
        t.prototype.__getRadialGradient = function() {
            var t = this.fillRadialGradientColorStops();
            if (t) {
                for (var e = Gt(), i = this.fillRadialGradientStartPoint(), n = this.fillRadialGradientEndPoint(), r = e.createRadialGradient(i.x, i.y, this.fillRadialGradientStartRadius(), n.x, n.y, this.fillRadialGradientEndRadius()), a = 0; a < t.length; a += 2)
                    r.addColorStop(t[a], t[a + 1]);
                return r
            }
        }
        ,
        t.prototype.getShadowRGBA = function() {
            return this._getCache(Pt, this._getShadowRGBA)
        }
        ,
        t.prototype._getShadowRGBA = function() {
            if (this.hasShadow()) {
                var t = O.colorToRGBA(this.shadowColor());
                return "rgba(" + t.r + "," + t.g + "," + t.b + "," + t.a * (this.shadowOpacity() || 1) + ")"
            }
        }
        ,
        t.prototype.hasFill = function() {
            return !!(this.fill() || this.fillPatternImage() || this.fillLinearGradientColorStops() || this.fillRadialGradientColorStops())
        }
        ,
        t.prototype.hasStroke = function() {
            return this.strokeEnabled() && this.strokeWidth() && !(!this.stroke() && !this.strokeLinearGradientColorStops())
        }
        ,
        t.prototype.intersects = function(t) {
            var e = this.getStage().bufferHitCanvas;
            return e.getContext().clear(),
            this.drawHit(e),
            0 < e.context.getImageData(Math.round(t.x), Math.round(t.y), 1, 1).data[3]
        }
        ,
        t.prototype.destroy = function() {
            return it.prototype.destroy.call(this),
            delete Rt[this.colorKey],
            delete this.colorKey,
            this
        }
        ,
        t.prototype._useBufferCanvas = function(t) {
            return (!t || this.hasShadow()) && this.perfectDrawEnabled() && 1 !== this.getAbsoluteOpacity() && this.hasFill() && this.hasStroke() && this.getStage()
        }
        ,
        t.prototype.setStrokeHitEnabled = function(t) {
            t ? this.hitStrokeWidth("auto") : this.hitStrokeWidth(0)
        }
        ,
        t.prototype.getStrokeHitEnabled = function() {
            return 0 !== this.hitStrokeWidth()
        }
        ,
        t.prototype.getSelfRect = function() {
            var t = this.size();
            return {
                x: this._centroid ? Math.round(-t.width / 2) : 0,
                y: this._centroid ? Math.round(-t.height / 2) : 0,
                width: t.width,
                height: t.height
            }
        }
        ,
        t.prototype.getClientRect = function(t) {
            var e = (t = t || {}).skipTransform
              , i = t.relativeTo
              , n = this.getSelfRect()
              , r = !t.skipStroke && this.hasStroke() && this.strokeWidth() || 0
              , a = n.width + r
              , o = n.height + r
              , s = !t.skipShadow && this.hasShadow()
              , h = s ? this.shadowOffsetX() : 0
              , l = s ? this.shadowOffsetY() : 0
              , c = a + Math.abs(h)
              , d = o + Math.abs(l)
              , p = s && this.shadowBlur() || 0
              , u = c + 2 * p
              , f = d + 2 * p
              , g = 0;
            Math.round(r / 2) !== r / 2 && (g = 1);
            var v = {
                width: u + g,
                height: f + g,
                x: -Math.round(r / 2 + p) + Math.min(h, 0) + n.x,
                y: -Math.round(r / 2 + p) + Math.min(l, 0) + n.y
            };
            return e ? v : this._transformedRect(v, i)
        }
        ,
        t.prototype.drawScene = function(t, e, i, n) {
            var r, a, o = this.getLayer(), s = t || o.getCanvas(), h = s.getContext(), l = this._getCanvasCache(), c = this.sceneFunc(), d = this.hasShadow(), p = this.hasStroke();
            if (!this.isVisible() && !i)
                return this;
            if (l)
                return h.save(),
                o._applyTransform(this, h, e),
                this._drawCachedSceneCanvas(h),
                h.restore(),
                this;
            if (!c)
                return this;
            if (h.save(),
            this._useBufferCanvas(i) && !n) {
                if ((a = (r = this.getStage().bufferCanvas).getContext()).clear(),
                a.save(),
                a._applyLineJoin(this),
                !i)
                    if (o)
                        o._applyTransform(this, a, e);
                    else {
                        var u = this.getAbsoluteTransform(e).getMatrix();
                        h.transform(u[0], u[1], u[2], u[3], u[4], u[5])
                    }
                c.call(this, a, this),
                a.restore();
                var f = r.pixelRatio;
                d && !s.hitCanvas ? (h.save(),
                h._applyShadow(this),
                h._applyOpacity(this),
                h._applyGlobalCompositeOperation(this),
                h.drawImage(r._canvas, 0, 0, r.width / f, r.height / f),
                h.restore()) : (h._applyOpacity(this),
                h._applyGlobalCompositeOperation(this),
                h.drawImage(r._canvas, 0, 0, r.width / f, r.height / f))
            } else {
                if (h._applyLineJoin(this),
                !i)
                    if (o)
                        o._applyTransform(this, h, e);
                    else {
                        var g = this.getAbsoluteTransform(e).getMatrix();
                        h.transform(g[0], g[1], g[2], g[3], g[4], g[5])
                    }
                d && p && !s.hitCanvas ? (h.save(),
                i || (h._applyOpacity(this),
                h._applyGlobalCompositeOperation(this)),
                h._applyShadow(this),
                c.call(this, h, this),
                h.restore(),
                this.hasFill() && this.shadowForStrokeEnabled() && c.call(this, h, this)) : d && !s.hitCanvas ? (h.save(),
                i || (h._applyOpacity(this),
                h._applyGlobalCompositeOperation(this)),
                h._applyShadow(this),
                c.call(this, h, this),
                h.restore()) : (i || (h._applyOpacity(this),
                h._applyGlobalCompositeOperation(this)),
                c.call(this, h, this))
            }
            return h.restore(),
            this
        }
        ,
        t.prototype.drawHit = function(t, e, i) {
            var n = this.getLayer()
              , r = t || n.hitCanvas
              , a = r && r.getContext()
              , o = this.hitFunc() || this.sceneFunc()
              , s = this._getCanvasCache()
              , h = s && s.hit;
            if (this.colorKey || O.warn("Looks like your canvas has a destroyed shape in it. Do not reuse shape after you destroyed it. See the shape in logs above. If you want to reuse shape you should call remove() instead of destroy()"),
            !this.shouldDrawHit() && !i)
                return this;
            if (h)
                return a.save(),
                n._applyTransform(this, a, e),
                this._drawCachedHitCanvas(a),
                a.restore(),
                this;
            if (!o)
                return this;
            if (a.save(),
            a._applyLineJoin(this),
            !i)
                if (n)
                    n._applyTransform(this, a, e);
                else {
                    var l = this.getAbsoluteTransform(e).getMatrix();
                    a.transform(l[0], l[1], l[2], l[3], l[4], l[5])
                }
            return o.call(this, a, this),
            a.restore(),
            this
        }
        ,
        t.prototype.drawHitFromCache = function(t) {
            var e, i, n, r, a, o, s = t || 0, h = this._getCanvasCache(), l = this._getCachedSceneCanvas(), c = h.hit, d = c.getContext(), p = c.getWidth(), u = c.getHeight();
            d.clear(),
            d.drawImage(l._canvas, 0, 0, p, u);
            try {
                for (n = (i = (e = d.getImageData(0, 0, p, u)).data).length,
                r = O._hexToRgb(this.colorKey),
                a = 0; a < n; a += 4)
                    o = i[a + 3],
                    i[a + 3] = s < o ? (i[a] = r.r,
                    i[a + 1] = r.g,
                    i[a + 2] = r.b,
                    255) : 0;
                d.putImageData(e, 0, 0)
            } catch (t) {
                O.error("Unable to draw hit graph from cached scene canvas. " + t.message)
            }
            return this
        }
        ,
        t
    }(it);
    Et.prototype._fillFunc = function(t) {
        t.fill()
    }
    ,
    Et.prototype._strokeFunc = function(t) {
        t.stroke()
    }
    ,
    Et.prototype._fillFuncHit = function(t) {
        t.fill()
    }
    ,
    Et.prototype._strokeFuncHit = function(t) {
        t.stroke()
    }
    ,
    Et.prototype._centroid = !1,
    Et.prototype.nodeType = "Shape",
    r(Et),
    x.addGetterSetter(Et, "stroke", void 0, m()),
    x.addGetterSetter(Et, "strokeWidth", 2, v()),
    x.addGetterSetter(Et, "hitStrokeWidth", "auto", y()),
    x.addGetterSetter(Et, "strokeHitEnabled", !0, _()),
    x.addGetterSetter(Et, "perfectDrawEnabled", !0, _()),
    x.addGetterSetter(Et, "shadowForStrokeEnabled", !0, _()),
    x.addGetterSetter(Et, "lineJoin"),
    x.addGetterSetter(Et, "lineCap"),
    x.addGetterSetter(Et, "sceneFunc"),
    x.addGetterSetter(Et, "hitFunc"),
    x.addGetterSetter(Et, "dash"),
    x.addGetterSetter(Et, "dashOffset", 0, v()),
    x.addGetterSetter(Et, "shadowColor", void 0, m()),
    x.addGetterSetter(Et, "shadowBlur", 0, v()),
    x.addGetterSetter(Et, "shadowOpacity", 1, v()),
    x.addComponentsGetterSetter(Et, "shadowOffset", ["x", "y"]),
    x.addGetterSetter(Et, "shadowOffsetX", 0, v()),
    x.addGetterSetter(Et, "shadowOffsetY", 0, v()),
    x.addGetterSetter(Et, "fillPatternImage"),
    x.addGetterSetter(Et, "fill", void 0, m()),
    x.addGetterSetter(Et, "fillPatternX", 0, v()),
    x.addGetterSetter(Et, "fillPatternY", 0, v()),
    x.addGetterSetter(Et, "fillLinearGradientColorStops"),
    x.addGetterSetter(Et, "strokeLinearGradientColorStops"),
    x.addGetterSetter(Et, "fillRadialGradientStartRadius", 0),
    x.addGetterSetter(Et, "fillRadialGradientEndRadius", 0),
    x.addGetterSetter(Et, "fillRadialGradientColorStops"),
    x.addGetterSetter(Et, "fillPatternRepeat", "repeat"),
    x.addGetterSetter(Et, "fillEnabled", !0),
    x.addGetterSetter(Et, "strokeEnabled", !0),
    x.addGetterSetter(Et, "shadowEnabled", !0),
    x.addGetterSetter(Et, "dashEnabled", !0),
    x.addGetterSetter(Et, "strokeScaleEnabled", !0),
    x.addGetterSetter(Et, "fillPriority", "color"),
    x.addComponentsGetterSetter(Et, "fillPatternOffset", ["x", "y"]),
    x.addGetterSetter(Et, "fillPatternOffsetX", 0, v()),
    x.addGetterSetter(Et, "fillPatternOffsetY", 0, v()),
    x.addComponentsGetterSetter(Et, "fillPatternScale", ["x", "y"]),
    x.addGetterSetter(Et, "fillPatternScaleX", 1, v()),
    x.addGetterSetter(Et, "fillPatternScaleY", 1, v()),
    x.addComponentsGetterSetter(Et, "fillLinearGradientStartPoint", ["x", "y"]),
    x.addComponentsGetterSetter(Et, "strokeLinearGradientStartPoint", ["x", "y"]),
    x.addGetterSetter(Et, "fillLinearGradientStartPointX", 0),
    x.addGetterSetter(Et, "strokeLinearGradientStartPointX", 0),
    x.addGetterSetter(Et, "fillLinearGradientStartPointY", 0),
    x.addGetterSetter(Et, "strokeLinearGradientStartPointY", 0),
    x.addComponentsGetterSetter(Et, "fillLinearGradientEndPoint", ["x", "y"]),
    x.addComponentsGetterSetter(Et, "strokeLinearGradientEndPoint", ["x", "y"]),
    x.addGetterSetter(Et, "fillLinearGradientEndPointX", 0),
    x.addGetterSetter(Et, "strokeLinearGradientEndPointX", 0),
    x.addGetterSetter(Et, "fillLinearGradientEndPointY", 0),
    x.addGetterSetter(Et, "strokeLinearGradientEndPointY", 0),
    x.addComponentsGetterSetter(Et, "fillRadialGradientStartPoint", ["x", "y"]),
    x.addGetterSetter(Et, "fillRadialGradientStartPointX", 0),
    x.addGetterSetter(Et, "fillRadialGradientStartPointY", 0),
    x.addComponentsGetterSetter(Et, "fillRadialGradientEndPoint", ["x", "y"]),
    x.addGetterSetter(Et, "fillRadialGradientEndPointX", 0),
    x.addGetterSetter(Et, "fillRadialGradientEndPointY", 0),
    x.addGetterSetter(Et, "fillPatternRotation", 0),
    x.backCompat(Et, {
        dashArray: "dash",
        getDashArray: "getDash",
        setDashArray: "getDash",
        drawFunc: "sceneFunc",
        getDrawFunc: "getSceneFunc",
        setDrawFunc: "setSceneFunc",
        drawHitFunc: "hitFunc",
        getDrawHitFunc: "getHitFunc",
        setDrawHitFunc: "setHitFunc"
    }),
    a.mapMethods(Et);
    var zt = [{
        x: 0,
        y: 0
    }, {
        x: -1,
        y: -1
    }, {
        x: 1,
        y: -1
    }, {
        x: 1,
        y: 1
    }, {
        x: -1,
        y: 1
    }]
      , Bt = zt.length
      , Wt = function(n) {
        function t() {
            var t = null !== n && n.apply(this, arguments) || this;
            return t.hitCanvas = new D({
                pixelRatio: 1
            }),
            t
        }
        return C(t, n),
        t.prototype._setCanvasSize = function(t, e) {
            this.canvas.setSize(t, e),
            this.hitCanvas.setSize(t, e)
        }
        ,
        t.prototype._validateAdd = function(t) {
            var e = t.getType();
            "Group" !== e && "Shape" !== e && O.throw("You may only add groups and shapes to a layer.")
        }
        ,
        t.prototype.getIntersection = function(t, e) {
            var i, n, r, a;
            if (!this.hitGraphEnabled() || !this.isVisible())
                return null;
            for (var o = 1, s = !1; ; ) {
                for (n = 0; n < Bt; n++) {
                    if (r = zt[n],
                    (a = (i = this._getIntersection({
                        x: t.x + r.x * o,
                        y: t.y + r.y * o
                    })).shape) && e)
                        return a.findAncestor(e, !0);
                    if (a)
                        return a;
                    if (s = !!i.antialiased,
                    !i.antialiased)
                        break
                }
                if (!s)
                    return null;
                o += 1
            }
        }
        ,
        t.prototype._getIntersection = function(t) {
            var e, i, n = this.hitCanvas.pixelRatio, r = this.hitCanvas.context.getImageData(Math.round(t.x * n), Math.round(t.y * n), 1, 1).data, a = r[3];
            return 255 === a ? (e = O._rgbToHex(r[0], r[1], r[2]),
            (i = Rt["#" + e]) ? {
                shape: i
            } : {
                antialiased: !0
            }) : 0 < a ? {
                antialiased: !0
            } : {}
        }
        ,
        t.prototype.drawScene = function(t, e) {
            var i = this.getLayer()
              , n = t || i && i.getCanvas();
            return this._fire("beforeDraw", {
                node: this
            }),
            this.clearBeforeDraw() && n.getContext().clear(),
            nt.prototype.drawScene.call(this, n, e),
            this._fire("draw", {
                node: this
            }),
            this
        }
        ,
        t.prototype.drawHit = function(t, e) {
            var i = this.getLayer()
              , n = t || i && i.hitCanvas;
            return i && i.clearBeforeDraw() && i.getHitCanvas().getContext().clear(),
            nt.prototype.drawHit.call(this, n, e),
            this
        }
        ,
        t.prototype.clear = function(t) {
            return wt.prototype.clear.call(this, t),
            this.getHitCanvas().getContext().clear(t),
            this
        }
        ,
        t.prototype.enableHitGraph = function() {
            return this.hitGraphEnabled(!0),
            this
        }
        ,
        t.prototype.disableHitGraph = function() {
            return this.hitGraphEnabled(!1),
            this
        }
        ,
        t.prototype.toggleHitCanvas = function() {
            if (this.parent) {
                var t = this.parent;
                !!this.hitCanvas._canvas.parentNode ? t.content.removeChild(this.hitCanvas._canvas) : t.content.appendChild(this.hitCanvas._canvas)
            }
        }
        ,
        t.prototype.setSize = function(t) {
            var e = t.width
              , i = t.height;
            return n.prototype.setSize.call(this, {
                width: e,
                height: i
            }),
            this.hitCanvas.setSize(e, i),
            this
        }
        ,
        t
    }(wt);
    Wt.prototype.nodeType = "Layer",
    r(Wt),
    x.addGetterSetter(Wt, "hitGraphEnabled", !0, _()),
    a.mapMethods(Wt);
    var Nt = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }
        return C(e, t),
        e.prototype._validateAdd = function(t) {
            "Shape" !== t.getType() && O.throw("You may only add shapes to a fast layer.")
        }
        ,
        e.prototype._setCanvasSize = function(t, e) {
            this.canvas.setSize(t, e)
        }
        ,
        e.prototype.hitGraphEnabled = function() {
            return !1
        }
        ,
        e.prototype.drawScene = function(t) {
            var e = this.getLayer()
              , i = t || e && e.getCanvas();
            return this.clearBeforeDraw() && i.getContext().clear(),
            nt.prototype.drawScene.call(this, i),
            this
        }
        ,
        e.prototype.draw = function() {
            return this.drawScene(),
            this
        }
        ,
        e
    }(wt);
    Nt.prototype.nodeType = "FastLayer",
    r(Nt),
    a.mapMethods(Nt);
    var Ht = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }
        return C(e, t),
        e.prototype._validateAdd = function(t) {
            var e = t.getType();
            "Group" !== e && "Shape" !== e && O.throw("You may only add groups and shapes to groups.")
        }
        ,
        e
    }(nt);
    Ht.prototype.nodeType = "Group",
    r(Ht),
    a.mapMethods(Ht);
    var Yt = {
        node: 1,
        duration: 1,
        easing: 1,
        onFinish: 1,
        yoyo: 1
    }
      , Xt = 0
      , jt = ["fill", "stroke", "shadowColor"]
      , Ut = function() {
        function t(t, e, i, n, r, a, o) {
            this.prop = t,
            this.propFunc = e,
            this.begin = n,
            this._pos = n,
            this.duration = a,
            this._change = 0,
            this.prevPos = 0,
            this.yoyo = o,
            this._time = 0,
            this._position = 0,
            this._startTime = 0,
            this._finish = 0,
            this.func = i,
            this._change = r - this.begin,
            this.pause()
        }
        return t.prototype.fire = function(t) {
            var e = this[t];
            e && e()
        }
        ,
        t.prototype.setTime = function(t) {
            t > this.duration ? this.yoyo ? (this._time = this.duration,
            this.reverse()) : this.finish() : t < 0 ? this.yoyo ? (this._time = 0,
            this.play()) : this.reset() : (this._time = t,
            this.update())
        }
        ,
        t.prototype.getTime = function() {
            return this._time
        }
        ,
        t.prototype.setPosition = function(t) {
            this.prevPos = this._pos,
            this.propFunc(t),
            this._pos = t
        }
        ,
        t.prototype.getPosition = function(t) {
            return void 0 === t && (t = this._time),
            this.func(t, this.begin, this._change, this.duration)
        }
        ,
        t.prototype.play = function() {
            this.state = 2,
            this._startTime = this.getTimer() - this._time,
            this.onEnterFrame(),
            this.fire("onPlay")
        }
        ,
        t.prototype.reverse = function() {
            this.state = 3,
            this._time = this.duration - this._time,
            this._startTime = this.getTimer() - this._time,
            this.onEnterFrame(),
            this.fire("onReverse")
        }
        ,
        t.prototype.seek = function(t) {
            this.pause(),
            this._time = t,
            this.update(),
            this.fire("onSeek")
        }
        ,
        t.prototype.reset = function() {
            this.pause(),
            this._time = 0,
            this.update(),
            this.fire("onReset")
        }
        ,
        t.prototype.finish = function() {
            this.pause(),
            this._time = this.duration,
            this.update(),
            this.fire("onFinish")
        }
        ,
        t.prototype.update = function() {
            this.setPosition(this.getPosition(this._time))
        }
        ,
        t.prototype.onEnterFrame = function() {
            var t = this.getTimer() - this._startTime;
            2 === this.state ? this.setTime(t) : 3 === this.state && this.setTime(this.duration - t)
        }
        ,
        t.prototype.pause = function() {
            this.state = 1,
            this.fire("onPause")
        }
        ,
        t.prototype.getTimer = function() {
            return (new Date).getTime()
        }
        ,
        t
    }()
      , qt = function() {
        function u(t) {
            var e, i, n = this, r = t.node, a = r._id, o = t.easing || Vt.Linear, s = !!t.yoyo;
            e = void 0 === t.duration ? .3 : 0 === t.duration ? .001 : t.duration,
            this.node = r,
            this._id = Xt++;
            var h = r.getLayer() || (r instanceof L.Stage ? r.getLayers() : null);
            for (i in h || O.error("Tween constructor have `node` that is not in a layer. Please add node into layer first."),
            this.anim = new F(function() {
                n.tween.onEnterFrame()
            }
            ,h),
            this.tween = new Ut(i,function(t) {
                n._tweenFunc(t)
            }
            ,o,0,1,1e3 * e,s),
            this._addListeners(),
            u.attrs[a] || (u.attrs[a] = {}),
            u.attrs[a][this._id] || (u.attrs[a][this._id] = {}),
            u.tweens[a] || (u.tweens[a] = {}),
            t)
                void 0 === Yt[i] && this._addAttr(i, t[i]);
            this.reset(),
            this.onFinish = t.onFinish,
            this.onReset = t.onReset
        }
        return u.prototype._addAttr = function(t, e) {
            var i, n, r, a, o, s, h, l, c = this.node, d = c._id;
            if ((r = u.tweens[d][t]) && delete u.attrs[d][r][t],
            i = c.getAttr(t),
            O._isArray(e))
                if (n = [],
                o = Math.max(e.length, i.length),
                "points" === t && e.length !== i.length && (e.length > i.length ? (h = i,
                i = O._prepareArrayForTween(i, e, c.closed())) : (s = e,
                e = O._prepareArrayForTween(e, i, c.closed()))),
                0 === t.indexOf("fill"))
                    for (a = 0; a < o; a++)
                        if (a % 2 == 0)
                            n.push(e[a] - i[a]);
                        else {
                            var p = O.colorToRGBA(i[a]);
                            l = O.colorToRGBA(e[a]),
                            i[a] = p,
                            n.push({
                                r: l.r - p.r,
                                g: l.g - p.g,
                                b: l.b - p.b,
                                a: l.a - p.a
                            })
                        }
                else
                    for (a = 0; a < o; a++)
                        n.push(e[a] - i[a]);
            else
                n = -1 !== jt.indexOf(t) ? (i = O.colorToRGBA(i),
                {
                    r: (l = O.colorToRGBA(e)).r - i.r,
                    g: l.g - i.g,
                    b: l.b - i.b,
                    a: l.a - i.a
                }) : e - i;
            u.attrs[d][this._id][t] = {
                start: i,
                diff: n,
                end: e,
                trueEnd: s,
                trueStart: h
            },
            u.tweens[d][t] = this._id
        }
        ,
        u.prototype._tweenFunc = function(t) {
            var e, i, n, r, a, o, s, h, l = this.node, c = u.attrs[l._id][this._id];
            for (e in c) {
                if (n = (i = c[e]).start,
                r = i.diff,
                h = i.end,
                O._isArray(n))
                    if (a = [],
                    s = Math.max(n.length, h.length),
                    0 === e.indexOf("fill"))
                        for (o = 0; o < s; o++)
                            o % 2 == 0 ? a.push((n[o] || 0) + r[o] * t) : a.push("rgba(" + Math.round(n[o].r + r[o].r * t) + "," + Math.round(n[o].g + r[o].g * t) + "," + Math.round(n[o].b + r[o].b * t) + "," + (n[o].a + r[o].a * t) + ")");
                    else
                        for (o = 0; o < s; o++)
                            a.push((n[o] || 0) + r[o] * t);
                else
                    a = -1 !== jt.indexOf(e) ? "rgba(" + Math.round(n.r + r.r * t) + "," + Math.round(n.g + r.g * t) + "," + Math.round(n.b + r.b * t) + "," + (n.a + r.a * t) + ")" : n + r * t;
                l.setAttr(e, a)
            }
        }
        ,
        u.prototype._addListeners = function() {
            var i = this;
            this.tween.onPlay = function() {
                i.anim.start()
            }
            ,
            this.tween.onReverse = function() {
                i.anim.start()
            }
            ,
            this.tween.onPause = function() {
                i.anim.stop()
            }
            ,
            this.tween.onFinish = function() {
                var t = i.node
                  , e = u.attrs[t._id][i._id];
                e.points && e.points.trueEnd && t.setAttr("points", e.points.trueEnd),
                i.onFinish && i.onFinish.call(i)
            }
            ,
            this.tween.onReset = function() {
                var t = i.node
                  , e = u.attrs[t._id][i._id];
                e.points && e.points.trueStart && t.points(e.points.trueStart),
                i.onReset && i.onReset()
            }
        }
        ,
        u.prototype.play = function() {
            return this.tween.play(),
            this
        }
        ,
        u.prototype.reverse = function() {
            return this.tween.reverse(),
            this
        }
        ,
        u.prototype.reset = function() {
            return this.tween.reset(),
            this
        }
        ,
        u.prototype.seek = function(t) {
            return this.tween.seek(1e3 * t),
            this
        }
        ,
        u.prototype.pause = function() {
            return this.tween.pause(),
            this
        }
        ,
        u.prototype.finish = function() {
            return this.tween.finish(),
            this
        }
        ,
        u.prototype.destroy = function() {
            var t, e = this.node._id, i = this._id, n = u.tweens[e];
            for (t in this.pause(),
            n)
                delete u.tweens[e][t];
            delete u.attrs[e][i]
        }
        ,
        u.attrs = {},
        u.tweens = {},
        u
    }();
    it.prototype.to = function(t) {
        var e = t.onFinish;
        t.node = this,
        t.onFinish = function() {
            this.destroy(),
            e && e()
        }
        ,
        new qt(t).play()
    }
    ;
    var Vt = {
        BackEaseIn: function(t, e, i, n) {
            return i * (t /= n) * t * (2.70158 * t - 1.70158) + e
        },
        BackEaseOut: function(t, e, i, n) {
            return i * ((t = t / n - 1) * t * (2.70158 * t + 1.70158) + 1) + e
        },
        BackEaseInOut: function(t, e, i, n) {
            var r = 1.70158;
            return (t /= n / 2) < 1 ? i / 2 * (t * t * ((1 + (r *= 1.525)) * t - r)) + e : i / 2 * ((t -= 2) * t * ((1 + (r *= 1.525)) * t + r) + 2) + e
        },
        ElasticEaseIn: function(t, e, i, n, r, a) {
            var o = 0;
            return 0 === t ? e : 1 == (t /= n) ? e + i : (a || (a = .3 * n),
            o = !r || r < Math.abs(i) ? (r = i,
            a / 4) : a / (2 * Math.PI) * Math.asin(i / r),
            -r * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * n - o) * (2 * Math.PI) / a) + e)
        },
        ElasticEaseOut: function(t, e, i, n, r, a) {
            var o = 0;
            return 0 === t ? e : 1 == (t /= n) ? e + i : (a || (a = .3 * n),
            o = !r || r < Math.abs(i) ? (r = i,
            a / 4) : a / (2 * Math.PI) * Math.asin(i / r),
            r * Math.pow(2, -10 * t) * Math.sin((t * n - o) * (2 * Math.PI) / a) + i + e)
        },
        ElasticEaseInOut: function(t, e, i, n, r, a) {
            var o = 0;
            return 0 === t ? e : 2 == (t /= n / 2) ? e + i : (a || (a = n * (.3 * 1.5)),
            o = !r || r < Math.abs(i) ? (r = i,
            a / 4) : a / (2 * Math.PI) * Math.asin(i / r),
            t < 1 ? r * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * n - o) * (2 * Math.PI) / a) * -.5 + e : r * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * n - o) * (2 * Math.PI) / a) * .5 + i + e)
        },
        BounceEaseOut: function(t, e, i, n) {
            return (t /= n) < 1 / 2.75 ? i * (7.5625 * t * t) + e : t < 2 / 2.75 ? i * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + e : t < 2.5 / 2.75 ? i * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + e : i * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + e
        },
        BounceEaseIn: function(t, e, i, n) {
            return i - Vt.BounceEaseOut(n - t, 0, i, n) + e
        },
        BounceEaseInOut: function(t, e, i, n) {
            return t < n / 2 ? .5 * Vt.BounceEaseIn(2 * t, 0, i, n) + e : .5 * Vt.BounceEaseOut(2 * t - n, 0, i, n) + .5 * i + e
        },
        EaseIn: function(t, e, i, n) {
            return i * (t /= n) * t + e
        },
        EaseOut: function(t, e, i, n) {
            return -i * (t /= n) * (t - 2) + e
        },
        EaseInOut: function(t, e, i, n) {
            return (t /= n / 2) < 1 ? i / 2 * t * t + e : -i / 2 * (--t * (t - 2) - 1) + e
        },
        StrongEaseIn: function(t, e, i, n) {
            return i * (t /= n) * t * t * t * t + e
        },
        StrongEaseOut: function(t, e, i, n) {
            return i * ((t = t / n - 1) * t * t * t * t + 1) + e
        },
        StrongEaseInOut: function(t, e, i, n) {
            return (t /= n / 2) < 1 ? i / 2 * t * t * t * t * t + e : i / 2 * ((t -= 2) * t * t * t * t + 2) + e
        },
        Linear: function(t, e, i, n) {
            return i * t / n + e
        }
    }
      , Kt = O._assign(L, {
        Collection: a,
        Util: O,
        Node: it,
        ids: z,
        names: B,
        Container: nt,
        Stage: xt,
        stages: St,
        Layer: Wt,
        FastLayer: Nt,
        Group: Ht,
        DD: E,
        Shape: Et,
        shapes: Rt,
        Animation: F,
        Tween: qt,
        Easings: Vt,
        Context: P,
        Canvas: G
    })
      , Qt = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }
        return C(e, t),
        e.prototype._sceneFunc = function(t) {
            var e = L.getAngle(this.angle())
              , i = this.clockwise();
            t.beginPath(),
            t.arc(0, 0, this.outerRadius(), 0, e, i),
            t.arc(0, 0, this.innerRadius(), e, 0, !i),
            t.closePath(),
            t.fillStrokeShape(this)
        }
        ,
        e.prototype.getWidth = function() {
            return 2 * this.outerRadius()
        }
        ,
        e.prototype.getHeight = function() {
            return 2 * this.outerRadius()
        }
        ,
        e.prototype.setWidth = function(t) {
            this.outerRadius(t / 2)
        }
        ,
        e.prototype.setHeight = function(t) {
            this.outerRadius(t / 2)
        }
        ,
        e
    }(Et);
    Qt.prototype._centroid = !0,
    Qt.prototype.className = "Arc",
    Qt.prototype._attrsAffectingSize = ["innerRadius", "outerRadius"],
    r(Qt),
    x.addGetterSetter(Qt, "innerRadius", 0, v()),
    x.addGetterSetter(Qt, "outerRadius", 0, v()),
    x.addGetterSetter(Qt, "angle", 0, v()),
    x.addGetterSetter(Qt, "clockwise", !1, _()),
    a.mapMethods(Qt);
    var Jt = function(i) {
        function t(t) {
            var e = i.call(this, t) || this;
            return e.on("pointsChange.konva tensionChange.konva closedChange.konva bezierChange.konva", function() {
                this._clearCache("tensionPoints")
            }),
            e
        }
        return C(t, i),
        t.prototype._sceneFunc = function(t) {
            var e, i, n, r = this.points(), a = r.length, o = this.tension(), s = this.closed(), h = this.bezier();
            if (a) {
                if (t.beginPath(),
                t.moveTo(r[0], r[1]),
                0 !== o && 4 < a) {
                    for (i = (e = this.getTensionPoints()).length,
                    n = s ? 0 : 4,
                    s || t.quadraticCurveTo(e[0], e[1], e[2], e[3]); n < i - 2; )
                        t.bezierCurveTo(e[n++], e[n++], e[n++], e[n++], e[n++], e[n++]);
                    s || t.quadraticCurveTo(e[i - 2], e[i - 1], r[a - 2], r[a - 1])
                } else if (h)
                    for (n = 2; n < a; )
                        t.bezierCurveTo(r[n++], r[n++], r[n++], r[n++], r[n++], r[n++]);
                else
                    for (n = 2; n < a; n += 2)
                        t.lineTo(r[n], r[n + 1]);
                s ? (t.closePath(),
                t.fillStrokeShape(this)) : t.strokeShape(this)
            }
        }
        ,
        t.prototype.getTensionPoints = function() {
            return this._getCache("tensionPoints", this._getTensionPoints)
        }
        ,
        t.prototype._getTensionPoints = function() {
            return this.closed() ? this._getTensionPointsClosed() : O._expandPoints(this.points(), this.tension())
        }
        ,
        t.prototype._getTensionPointsClosed = function() {
            var t = this.points()
              , e = t.length
              , i = this.tension()
              , n = O._getControlPoints(t[e - 2], t[e - 1], t[0], t[1], t[2], t[3], i)
              , r = O._getControlPoints(t[e - 4], t[e - 3], t[e - 2], t[e - 1], t[0], t[1], i)
              , a = O._expandPoints(t, i);
            return [n[2], n[3]].concat(a).concat([r[0], r[1], t[e - 2], t[e - 1], r[2], r[3], n[0], n[1], t[0], t[1]])
        }
        ,
        t.prototype.getWidth = function() {
            return this.getSelfRect().width
        }
        ,
        t.prototype.getHeight = function() {
            return this.getSelfRect().height
        }
        ,
        t.prototype.getSelfRect = function() {
            for (var t, e, i, n = (t = 0 !== this.tension() ? this._getTensionPoints() : this.points())[0], r = t[0], a = t[1], o = t[1], s = 0; s < t.length / 2; s++)
                e = t[2 * s],
                i = t[2 * s + 1],
                n = Math.min(n, e),
                r = Math.max(r, e),
                a = Math.min(a, i),
                o = Math.max(o, i);
            return {
                x: Math.round(n),
                y: Math.round(a),
                width: Math.round(r - n),
                height: Math.round(o - a)
            }
        }
        ,
        t
    }(Et);
    Jt.prototype.className = "Line",
    Jt.prototype._attrsAffectingSize = ["points", "bezier", "tension"],
    r(Jt),
    x.addGetterSetter(Jt, "closed", !1),
    x.addGetterSetter(Jt, "bezier", !1),
    x.addGetterSetter(Jt, "tension", 0, v()),
    x.addGetterSetter(Jt, "points", [], function() {
        if (L.isUnminified)
            return function(t, e) {
                return O._isArray(t) ? t.forEach(function(t) {
                    O._isNumber(t) || O.warn('"' + e + '" attribute has non numeric element ' + t + ". Make sure that all elements are numbers.")
                }) : O.warn(f(t) + ' is a not valid value for "' + e + '" attribute. The value should be a array of numbers.'),
                t
            }
    }()),
    a.mapMethods(Jt);
    var Zt = function(p) {
        function t() {
            return null !== p && p.apply(this, arguments) || this
        }
        return C(t, p),
        t.prototype._sceneFunc = function(t) {
            p.prototype._sceneFunc.call(this, t);
            var e = 2 * Math.PI
              , i = this.points()
              , n = i
              , r = 0 !== this.tension() && 4 < i.length;
            r && (n = this.getTensionPoints());
            var a, o, s = i.length;
            o = r ? (a = i[s - 2] - n[s - 2],
            i[s - 1] - n[s - 1]) : (a = i[s - 2] - i[s - 4],
            i[s - 1] - i[s - 3]);
            var h = (Math.atan2(o, a) + e) % e
              , l = this.pointerLength()
              , c = this.pointerWidth();
            t.save(),
            t.beginPath(),
            t.translate(i[s - 2], i[s - 1]),
            t.rotate(h),
            t.moveTo(0, 0),
            t.lineTo(-l, c / 2),
            t.lineTo(-l, -c / 2),
            t.closePath(),
            t.restore(),
            this.pointerAtBeginning() && (t.save(),
            t.translate(i[0], i[1]),
            o = r ? (a = n[0] - i[0],
            n[1] - i[1]) : (a = i[2] - i[0],
            i[3] - i[1]),
            t.rotate((Math.atan2(-o, -a) + e) % e),
            t.moveTo(0, 0),
            t.lineTo(-l, c / 2),
            t.lineTo(-l, -c / 2),
            t.closePath(),
            t.restore());
            var d = this.dashEnabled();
            d && (this.attrs.dashEnabled = !1,
            t.setLineDash([])),
            t.fillStrokeShape(this),
            d && (this.attrs.dashEnabled = !0)
        }
        ,
        t
    }(Jt);
    Zt.prototype.className = "Arrow",
    r(Zt),
    x.addGetterSetter(Zt, "pointerLength", 10, v()),
    x.addGetterSetter(Zt, "pointerWidth", 10, v()),
    x.addGetterSetter(Zt, "pointerAtBeginning", !1),
    a.mapMethods(Zt);
    var $t = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }
        return C(e, t),
        e.prototype._sceneFunc = function(t) {
            t.beginPath(),
            t.arc(0, 0, this.radius(), 0, 2 * Math.PI, !1),
            t.closePath(),
            t.fillStrokeShape(this)
        }
        ,
        e.prototype.getWidth = function() {
            return 2 * this.radius()
        }
        ,
        e.prototype.getHeight = function() {
            return 2 * this.radius()
        }
        ,
        e.prototype.setWidth = function(t) {
            this.radius() !== t / 2 && this.radius(t / 2)
        }
        ,
        e.prototype.setHeight = function(t) {
            this.radius() !== t / 2 && this.radius(t / 2)
        }
        ,
        e
    }(Et);
    $t.prototype._centroid = !0,
    $t.prototype.className = "Circle",
    $t.prototype._attrsAffectingSize = ["radius"],
    r($t),
    x.addGetterSetter($t, "radius", 0, v()),
    a.mapMethods($t);
    var te = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }
        return C(e, t),
        e.prototype._sceneFunc = function(t) {
            var e = this.radiusX()
              , i = this.radiusY();
            t.beginPath(),
            t.save(),
            e !== i && t.scale(1, i / e),
            t.arc(0, 0, e, 0, 2 * Math.PI, !1),
            t.restore(),
            t.closePath(),
            t.fillStrokeShape(this)
        }
        ,
        e.prototype.getWidth = function() {
            return 2 * this.radiusX()
        }
        ,
        e.prototype.getHeight = function() {
            return 2 * this.radiusY()
        }
        ,
        e.prototype.setWidth = function(t) {
            this.radiusX(t / 2)
        }
        ,
        e.prototype.setHeight = function(t) {
            this.radiusY(t / 2)
        }
        ,
        e
    }(Et);
    te.prototype.className = "Ellipse",
    te.prototype._centroid = !0,
    te.prototype._attrsAffectingSize = ["radiusX", "radiusY"],
    r(te),
    x.addComponentsGetterSetter(te, "radius", ["x", "y"]),
    x.addGetterSetter(te, "radiusX", 0, v()),
    x.addGetterSetter(te, "radiusY", 0, v()),
    a.mapMethods(te);
    var ee = function(t) {
        function n() {
            return null !== t && t.apply(this, arguments) || this
        }
        return C(n, t),
        n.prototype._useBufferCanvas = function() {
            return (this.hasShadow() || 1 !== this.getAbsoluteOpacity()) && this.hasStroke() && this.getStage()
        }
        ,
        n.prototype._sceneFunc = function(t) {
            var e, i, n, r = this.width(), a = this.height(), o = this.image();
            o && (e = this.cropWidth(),
            i = this.cropHeight(),
            n = e && i ? [o, this.cropX(), this.cropY(), e, i, 0, 0, r, a] : [o, 0, 0, r, a]),
            (this.hasFill() || this.hasStroke()) && (t.beginPath(),
            t.rect(0, 0, r, a),
            t.closePath(),
            t.fillStrokeShape(this)),
            o && t.drawImage.apply(t, n)
        }
        ,
        n.prototype._hitFunc = function(t) {
            var e = this.width()
              , i = this.height();
            t.beginPath(),
            t.rect(0, 0, e, i),
            t.closePath(),
            t.fillStrokeShape(this)
        }
        ,
        n.prototype.getWidth = function() {
            var t = this.image();
            return this.attrs.width || (t ? t.width : 0)
        }
        ,
        n.prototype.getHeight = function() {
            var t = this.image();
            return this.attrs.height || (t ? t.height : 0)
        }
        ,
        n.fromURL = function(t, e) {
            var i = O.createImageElement();
            i.onload = function() {
                var t = new n({
                    image: i
                });
                e(t)
            }
            ,
            i.crossOrigin = "Anonymous",
            i.src = t
        }
        ,
        n
    }(Et);
    ee.prototype.className = "Image",
    r(ee),
    x.addGetterSetter(ee, "image"),
    x.addComponentsGetterSetter(ee, "crop", ["x", "y", "width", "height"]),
    x.addGetterSetter(ee, "cropX", 0, v()),
    x.addGetterSetter(ee, "cropY", 0, v()),
    x.addGetterSetter(ee, "cropWidth", 0, v()),
    x.addGetterSetter(ee, "cropHeight", 0, v()),
    a.mapMethods(ee);
    var ie = ["fontFamily", "fontSize", "fontStyle", "padding", "lineHeight", "text", "width"]
      , ne = "right"
      , re = "down"
      , ae = "left"
      , oe = ie.length
      , se = function(i) {
        function t(t) {
            var e = i.call(this, t) || this;
            return e.on("add.konva", function(t) {
                this._addListeners(t.child),
                this._sync()
            }),
            e
        }
        return C(t, i),
        t.prototype.getText = function() {
            return this.find("Text")[0]
        }
        ,
        t.prototype.getTag = function() {
            return this.find("Tag")[0]
        }
        ,
        t.prototype._addListeners = function(t) {
            var e, i = this, n = function() {
                i._sync()
            };
            for (e = 0; e < oe; e++)
                t.on(ie[e] + "Change.konva", n)
        }
        ,
        t.prototype.getWidth = function() {
            return this.getText().width()
        }
        ,
        t.prototype.getHeight = function() {
            return this.getText().height()
        }
        ,
        t.prototype._sync = function() {
            var t, e, i, n, r, a, o, s = this.getText(), h = this.getTag();
            if (s && h) {
                switch (t = s.width(),
                e = s.height(),
                i = h.pointerDirection(),
                n = h.pointerWidth(),
                o = h.pointerHeight(),
                a = r = 0,
                i) {
                case "up":
                    r = t / 2,
                    a = -1 * o;
                    break;
                case ne:
                    r = t + n,
                    a = e / 2;
                    break;
                case re:
                    r = t / 2,
                    a = e + o;
                    break;
                case ae:
                    r = -1 * n,
                    a = e / 2
                }
                h.setAttrs({
                    x: -1 * r,
                    y: -1 * a,
                    width: t,
                    height: e
                }),
                s.setAttrs({
                    x: -1 * r,
                    y: -1 * a
                })
            }
        }
        ,
        t
    }(Ht);
    se.prototype.className = "Label",
    r(se),
    a.mapMethods(se);
    var he = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }
        return C(e, t),
        e.prototype._sceneFunc = function(t) {
            var e = this.width()
              , i = this.height()
              , n = this.pointerDirection()
              , r = this.pointerWidth()
              , a = this.pointerHeight()
              , o = Math.min(this.cornerRadius(), e / 2, i / 2);
            t.beginPath(),
            o ? t.moveTo(o, 0) : t.moveTo(0, 0),
            "up" === n && (t.lineTo((e - r) / 2, 0),
            t.lineTo(e / 2, -1 * a),
            t.lineTo((e + r) / 2, 0)),
            o ? (t.lineTo(e - o, 0),
            t.arc(e - o, o, o, 3 * Math.PI / 2, 0, !1)) : t.lineTo(e, 0),
            n === ne && (t.lineTo(e, (i - a) / 2),
            t.lineTo(e + r, i / 2),
            t.lineTo(e, (i + a) / 2)),
            o ? (t.lineTo(e, i - o),
            t.arc(e - o, i - o, o, 0, Math.PI / 2, !1)) : t.lineTo(e, i),
            n === re && (t.lineTo((e + r) / 2, i),
            t.lineTo(e / 2, i + a),
            t.lineTo((e - r) / 2, i)),
            o ? (t.lineTo(o, i),
            t.arc(o, i - o, o, Math.PI / 2, Math.PI, !1)) : t.lineTo(0, i),
            n === ae && (t.lineTo(0, (i + a) / 2),
            t.lineTo(-1 * r, i / 2),
            t.lineTo(0, (i - a) / 2)),
            o && (t.lineTo(0, o),
            t.arc(o, o, o, Math.PI, 3 * Math.PI / 2, !1)),
            t.closePath(),
            t.fillStrokeShape(this)
        }
        ,
        e.prototype.getSelfRect = function() {
            var t = 0
              , e = 0
              , i = this.pointerWidth()
              , n = this.pointerHeight()
              , r = this.pointerDirection()
              , a = this.width()
              , o = this.height();
            return "up" === r ? (e -= n,
            o += n) : r === re ? o += n : r === ae ? (t -= 1.5 * i,
            a += i) : r === ne && (a += 1.5 * i),
            {
                x: t,
                y: e,
                width: a,
                height: o
            }
        }
        ,
        e
    }(Et);
    he.prototype.className = "Tag",
    r(he),
    x.addGetterSetter(he, "pointerDirection", "none"),
    x.addGetterSetter(he, "pointerWidth", 0, v()),
    x.addGetterSetter(he, "pointerHeight", 0, v()),
    x.addGetterSetter(he, "cornerRadius", 0, v()),
    a.mapMethods(he);
    var le = function(n) {
        function u(t) {
            var e = n.call(this, t) || this;
            e.dataArray = [],
            e.pathLength = 0,
            e.dataArray = u.parsePathData(e.data());
            for (var i = e.pathLength = 0; i < e.dataArray.length; ++i)
                e.pathLength += e.dataArray[i].pathLength;
            return e.on("dataChange.konva", function() {
                this.dataArray = u.parsePathData(this.getData());
                for (var t = this.pathLength = 0; t < this.dataArray.length; ++t)
                    this.pathLength += this.dataArray[t].pathLength
            }),
            e
        }
        return C(u, n),
        u.prototype._sceneFunc = function(t) {
            var e = this.dataArray;
            t.beginPath();
            for (var i = 0; i < e.length; i++) {
                var n = e[i].command
                  , r = e[i].points;
                switch (n) {
                case "L":
                    t.lineTo(r[0], r[1]);
                    break;
                case "M":
                    t.moveTo(r[0], r[1]);
                    break;
                case "C":
                    t.bezierCurveTo(r[0], r[1], r[2], r[3], r[4], r[5]);
                    break;
                case "Q":
                    t.quadraticCurveTo(r[0], r[1], r[2], r[3]);
                    break;
                case "A":
                    var a = r[0]
                      , o = r[1]
                      , s = r[2]
                      , h = r[3]
                      , l = r[4]
                      , c = r[5]
                      , d = r[6]
                      , p = r[7]
                      , u = h < s ? s : h
                      , f = h < s ? 1 : s / h
                      , g = h < s ? h / s : 1;
                    t.translate(a, o),
                    t.rotate(d),
                    t.scale(f, g),
                    t.arc(0, 0, u, l, l + c, 1 - p),
                    t.scale(1 / f, 1 / g),
                    t.rotate(-d),
                    t.translate(-a, -o);
                    break;
                case "z":
                    t.closePath()
                }
            }
            t.fillStrokeShape(this)
        }
        ,
        u.prototype.getSelfRect = function() {
            var e = [];
            this.dataArray.forEach(function(t) {
                e = e.concat(t.points)
            });
            for (var t, i, n = e[0], r = e[0], a = e[1], o = e[1], s = 0; s < e.length / 2; s++)
                t = e[2 * s],
                i = e[2 * s + 1],
                isNaN(t) || (n = Math.min(n, t),
                r = Math.max(r, t)),
                isNaN(i) || (a = Math.min(a, i),
                o = Math.max(o, i));
            return {
                x: Math.round(n),
                y: Math.round(a),
                width: Math.round(r - n),
                height: Math.round(o - a)
            }
        }
        ,
        u.prototype.getLength = function() {
            return this.pathLength
        }
        ,
        u.prototype.getPointAtLength = function(t) {
            var e, i = 0, n = this.dataArray.length;
            if (!n)
                return null;
            for (; i < n && t > this.dataArray[i].pathLength; )
                t -= this.dataArray[i].pathLength,
                ++i;
            if (i === n)
                return {
                    x: (e = this.dataArray[i - 1].points.slice(-2))[0],
                    y: e[1]
                };
            if (t < .01)
                return {
                    x: (e = this.dataArray[i].points.slice(0, 2))[0],
                    y: e[1]
                };
            var r = this.dataArray[i]
              , a = r.points;
            switch (r.command) {
            case "L":
                return u.getPointOnLine(t, r.start.x, r.start.y, a[0], a[1]);
            case "C":
                return u.getPointOnCubicBezier(t / r.pathLength, r.start.x, r.start.y, a[0], a[1], a[2], a[3], a[4], a[5]);
            case "Q":
                return u.getPointOnQuadraticBezier(t / r.pathLength, r.start.x, r.start.y, a[0], a[1], a[2], a[3]);
            case "A":
                var o = a[0]
                  , s = a[1]
                  , h = a[2]
                  , l = a[3]
                  , c = a[4]
                  , d = a[5]
                  , p = a[6];
                return c += d * t / r.pathLength,
                u.getPointOnEllipticalArc(o, s, h, l, c, p)
            }
            return null
        }
        ,
        u.getLineLength = function(t, e, i, n) {
            return Math.sqrt((i - t) * (i - t) + (n - e) * (n - e))
        }
        ,
        u.getPointOnLine = function(t, e, i, n, r, a, o) {
            void 0 === a && (a = e),
            void 0 === o && (o = i);
            var s = (r - i) / (n - e + 1e-8)
              , h = Math.sqrt(t * t / (1 + s * s));
            n < e && (h *= -1);
            var l, c = s * h;
            if (n === e)
                l = {
                    x: a,
                    y: o + c
                };
            else if ((o - i) / (a - e + 1e-8) === s)
                l = {
                    x: a + h,
                    y: o + c
                };
            else {
                var d, p, u = this.getLineLength(e, i, n, r);
                if (u < 1e-8)
                    return;
                var f = (a - e) * (n - e) + (o - i) * (r - i);
                d = e + (f /= u * u) * (n - e),
                p = i + f * (r - i);
                var g = this.getLineLength(a, o, d, p)
                  , v = Math.sqrt(t * t - g * g);
                h = Math.sqrt(v * v / (1 + s * s)),
                n < e && (h *= -1),
                l = {
                    x: d + h,
                    y: p + (c = s * h)
                }
            }
            return l
        }
        ,
        u.getPointOnCubicBezier = function(t, e, i, n, r, a, o, s, h) {
            function l(t) {
                return t * t * t
            }
            function c(t) {
                return 3 * t * t * (1 - t)
            }
            function d(t) {
                return 3 * t * (1 - t) * (1 - t)
            }
            function p(t) {
                return (1 - t) * (1 - t) * (1 - t)
            }
            return {
                x: s * l(t) + a * c(t) + n * d(t) + e * p(t),
                y: h * l(t) + o * c(t) + r * d(t) + i * p(t)
            }
        }
        ,
        u.getPointOnQuadraticBezier = function(t, e, i, n, r, a, o) {
            function s(t) {
                return t * t
            }
            function h(t) {
                return 2 * t * (1 - t)
            }
            function l(t) {
                return (1 - t) * (1 - t)
            }
            return {
                x: a * s(t) + n * h(t) + e * l(t),
                y: o * s(t) + r * h(t) + i * l(t)
            }
        }
        ,
        u.getPointOnEllipticalArc = function(t, e, i, n, r, a) {
            var o = Math.cos(a)
              , s = Math.sin(a)
              , h = i * Math.cos(r)
              , l = n * Math.sin(r);
            return {
                x: t + (h * o - l * s),
                y: e + (h * s + l * o)
            }
        }
        ,
        u.parsePathData = function(t) {
            if (!t)
                return [];
            var e = t
              , i = ["m", "M", "l", "L", "v", "V", "h", "H", "z", "Z", "c", "C", "q", "Q", "t", "T", "s", "S", "a", "A"];
            e = e.replace(new RegExp(" ","g"), ",");
            for (var n = 0; n < i.length; n++)
                e = e.replace(new RegExp(i[n],"g"), "|" + i[n]);
            var r, a = e.split("|"), o = [], s = [], h = 0, l = 0, c = /([-+]?((\d+\.\d+)|((\d+)|(\.\d+)))(?:e[-+]?\d+)?)/gi;
            for (n = 1; n < a.length; n++) {
                var d = a[n]
                  , p = d.charAt(0);
                for (d = d.slice(1),
                s.length = 0; r = c.exec(d); )
                    s.push(r[0]);
                for (var u = [], f = 0, g = s.length; f < g; f++) {
                    var v = parseFloat(s[f]);
                    isNaN(v) ? u.push(0) : u.push(v)
                }
                for (; 0 < u.length && !isNaN(u[0]); ) {
                    var y, m, _, S, b, x, w, C, k, P, T = null, M = [], A = h, G = l;
                    switch (p) {
                    case "l":
                        h += u.shift(),
                        l += u.shift(),
                        T = "L",
                        M.push(h, l);
                        break;
                    case "L":
                        h = u.shift(),
                        l = u.shift(),
                        M.push(h, l);
                        break;
                    case "m":
                        var R = u.shift()
                          , L = u.shift();
                        if (h += R,
                        l += L,
                        T = "M",
                        2 < o.length && "z" === o[o.length - 1].command)
                            for (var O = o.length - 2; 0 <= O; O--)
                                if ("M" === o[O].command) {
                                    h = o[O].points[0] + R,
                                    l = o[O].points[1] + L;
                                    break
                                }
                        M.push(h, l),
                        p = "l";
                        break;
                    case "M":
                        h = u.shift(),
                        l = u.shift(),
                        T = "M",
                        M.push(h, l),
                        p = "L";
                        break;
                    case "h":
                        h += u.shift(),
                        T = "L",
                        M.push(h, l);
                        break;
                    case "H":
                        h = u.shift(),
                        T = "L",
                        M.push(h, l);
                        break;
                    case "v":
                        l += u.shift(),
                        T = "L",
                        M.push(h, l);
                        break;
                    case "V":
                        l = u.shift(),
                        T = "L",
                        M.push(h, l);
                        break;
                    case "C":
                        M.push(u.shift(), u.shift(), u.shift(), u.shift()),
                        h = u.shift(),
                        l = u.shift(),
                        M.push(h, l);
                        break;
                    case "c":
                        M.push(h + u.shift(), l + u.shift(), h + u.shift(), l + u.shift()),
                        h += u.shift(),
                        l += u.shift(),
                        T = "C",
                        M.push(h, l);
                        break;
                    case "S":
                        m = h,
                        _ = l,
                        "C" === (y = o[o.length - 1]).command && (m = h + (h - y.points[2]),
                        _ = l + (l - y.points[3])),
                        M.push(m, _, u.shift(), u.shift()),
                        h = u.shift(),
                        l = u.shift(),
                        T = "C",
                        M.push(h, l);
                        break;
                    case "s":
                        m = h,
                        _ = l,
                        "C" === (y = o[o.length - 1]).command && (m = h + (h - y.points[2]),
                        _ = l + (l - y.points[3])),
                        M.push(m, _, h + u.shift(), l + u.shift()),
                        h += u.shift(),
                        l += u.shift(),
                        T = "C",
                        M.push(h, l);
                        break;
                    case "Q":
                        M.push(u.shift(), u.shift()),
                        h = u.shift(),
                        l = u.shift(),
                        M.push(h, l);
                        break;
                    case "q":
                        M.push(h + u.shift(), l + u.shift()),
                        h += u.shift(),
                        l += u.shift(),
                        T = "Q",
                        M.push(h, l);
                        break;
                    case "T":
                        m = h,
                        _ = l,
                        "Q" === (y = o[o.length - 1]).command && (m = h + (h - y.points[0]),
                        _ = l + (l - y.points[1])),
                        h = u.shift(),
                        l = u.shift(),
                        T = "Q",
                        M.push(m, _, h, l);
                        break;
                    case "t":
                        m = h,
                        _ = l,
                        "Q" === (y = o[o.length - 1]).command && (m = h + (h - y.points[0]),
                        _ = l + (l - y.points[1])),
                        h += u.shift(),
                        l += u.shift(),
                        T = "Q",
                        M.push(m, _, h, l);
                        break;
                    case "A":
                        S = u.shift(),
                        b = u.shift(),
                        x = u.shift(),
                        w = u.shift(),
                        C = u.shift(),
                        k = h,
                        P = l,
                        h = u.shift(),
                        l = u.shift(),
                        T = "A",
                        M = this.convertEndpointToCenterParameterization(k, P, h, l, w, C, S, b, x);
                        break;
                    case "a":
                        S = u.shift(),
                        b = u.shift(),
                        x = u.shift(),
                        w = u.shift(),
                        C = u.shift(),
                        k = h,
                        P = l,
                        h += u.shift(),
                        l += u.shift(),
                        T = "A",
                        M = this.convertEndpointToCenterParameterization(k, P, h, l, w, C, S, b, x)
                    }
                    o.push({
                        command: T || p,
                        points: M,
                        start: {
                            x: A,
                            y: G
                        },
                        pathLength: this.calcLength(A, G, T || p, M)
                    })
                }
                "z" !== p && "Z" !== p || o.push({
                    command: "z",
                    points: [],
                    start: void 0,
                    pathLength: 0
                })
            }
            return o
        }
        ,
        u.calcLength = function(t, e, i, n) {
            var r, a, o, s, h = u;
            switch (i) {
            case "L":
                return h.getLineLength(t, e, n[0], n[1]);
            case "C":
                for (r = 0,
                a = h.getPointOnCubicBezier(0, t, e, n[0], n[1], n[2], n[3], n[4], n[5]),
                s = .01; s <= 1; s += .01)
                    o = h.getPointOnCubicBezier(s, t, e, n[0], n[1], n[2], n[3], n[4], n[5]),
                    r += h.getLineLength(a.x, a.y, o.x, o.y),
                    a = o;
                return r;
            case "Q":
                for (r = 0,
                a = h.getPointOnQuadraticBezier(0, t, e, n[0], n[1], n[2], n[3]),
                s = .01; s <= 1; s += .01)
                    o = h.getPointOnQuadraticBezier(s, t, e, n[0], n[1], n[2], n[3]),
                    r += h.getLineLength(a.x, a.y, o.x, o.y),
                    a = o;
                return r;
            case "A":
                r = 0;
                var l = n[4]
                  , c = n[5]
                  , d = n[4] + c
                  , p = Math.PI / 180;
                if (Math.abs(l - d) < p && (p = Math.abs(l - d)),
                a = h.getPointOnEllipticalArc(n[0], n[1], n[2], n[3], l, 0),
                c < 0)
                    for (s = l - p; d < s; s -= p)
                        o = h.getPointOnEllipticalArc(n[0], n[1], n[2], n[3], s, 0),
                        r += h.getLineLength(a.x, a.y, o.x, o.y),
                        a = o;
                else
                    for (s = l + p; s < d; s += p)
                        o = h.getPointOnEllipticalArc(n[0], n[1], n[2], n[3], s, 0),
                        r += h.getLineLength(a.x, a.y, o.x, o.y),
                        a = o;
                return o = h.getPointOnEllipticalArc(n[0], n[1], n[2], n[3], d, 0),
                r += h.getLineLength(a.x, a.y, o.x, o.y)
            }
            return 0
        }
        ,
        u.convertEndpointToCenterParameterization = function(t, e, i, n, r, a, o, s, h) {
            var l = h * (Math.PI / 180)
              , c = Math.cos(l) * (t - i) / 2 + Math.sin(l) * (e - n) / 2
              , d = -1 * Math.sin(l) * (t - i) / 2 + Math.cos(l) * (e - n) / 2
              , p = c * c / (o * o) + d * d / (s * s);
            1 < p && (o *= Math.sqrt(p),
            s *= Math.sqrt(p));
            var u = Math.sqrt((o * o * (s * s) - o * o * (d * d) - s * s * (c * c)) / (o * o * (d * d) + s * s * (c * c)));
            r === a && (u *= -1),
            isNaN(u) && (u = 0);
            var f = u * o * d / s
              , g = u * -s * c / o
              , v = (t + i) / 2 + Math.cos(l) * f - Math.sin(l) * g
              , y = (e + n) / 2 + Math.sin(l) * f + Math.cos(l) * g
              , m = function(t) {
                return Math.sqrt(t[0] * t[0] + t[1] * t[1])
            }
              , _ = function(t, e) {
                return (t[0] * e[0] + t[1] * e[1]) / (m(t) * m(e))
            }
              , S = function(t, e) {
                return (t[0] * e[1] < t[1] * e[0] ? -1 : 1) * Math.acos(_(t, e))
            }
              , b = S([1, 0], [(c - f) / o, (d - g) / s])
              , x = [(c - f) / o, (d - g) / s]
              , w = [(-1 * c - f) / o, (-1 * d - g) / s]
              , C = S(x, w);
            return _(x, w) <= -1 && (C = Math.PI),
            1 <= _(x, w) && (C = 0),
            0 === a && 0 < C && (C -= 2 * Math.PI),
            1 === a && C < 0 && (C += 2 * Math.PI),
            [v, y, o, s, b, C, l, a]
        }
        ,
        u
    }(Et);
    le.prototype.className = "Path",
    le.prototype._attrsAffectingSize = ["data"],
    r(le),
    x.addGetterSetter(le, "data"),
    a.mapMethods(le);
    var ce = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }
        return C(e, t),
        e.prototype._sceneFunc = function(t) {
            var e = this.cornerRadius()
              , i = this.width()
              , n = this.height();
            t.beginPath(),
            e ? (e = Math.min(e, i / 2, n / 2),
            t.moveTo(e, 0),
            t.lineTo(i - e, 0),
            t.arc(i - e, e, e, 3 * Math.PI / 2, 0, !1),
            t.lineTo(i, n - e),
            t.arc(i - e, n - e, e, 0, Math.PI / 2, !1),
            t.lineTo(e, n),
            t.arc(e, n - e, e, Math.PI / 2, Math.PI, !1),
            t.lineTo(0, e),
            t.arc(e, e, e, Math.PI, 3 * Math.PI / 2, !1)) : t.rect(0, 0, i, n),
            t.closePath(),
            t.fillStrokeShape(this)
        }
        ,
        e
    }(Et);
    ce.prototype.className = "Rect",
    r(ce),
    x.addGetterSetter(ce, "cornerRadius", 0, v()),
    a.mapMethods(ce);
    var de = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }
        return C(e, t),
        e.prototype._sceneFunc = function(t) {
            var e, i, n, r = this.sides(), a = this.radius();
            for (t.beginPath(),
            t.moveTo(0, 0 - a),
            e = 1; e < r; e++)
                i = a * Math.sin(2 * e * Math.PI / r),
                n = -1 * a * Math.cos(2 * e * Math.PI / r),
                t.lineTo(i, n);
            t.closePath(),
            t.fillStrokeShape(this)
        }
        ,
        e.prototype.getWidth = function() {
            return 2 * this.radius()
        }
        ,
        e.prototype.getHeight = function() {
            return 2 * this.radius()
        }
        ,
        e.prototype.setWidth = function(t) {
            this.radius(t / 2)
        }
        ,
        e.prototype.setHeight = function(t) {
            this.radius(t / 2)
        }
        ,
        e
    }(Et);
    de.prototype.className = "RegularPolygon",
    de.prototype._centroid = !0,
    de.prototype._attrsAffectingSize = ["radius"],
    r(de),
    x.addGetterSetter(de, "radius", 0, v()),
    x.addGetterSetter(de, "sides", 0, v()),
    a.mapMethods(de);
    var pe = 2 * Math.PI
      , ue = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }
        return C(e, t),
        e.prototype._sceneFunc = function(t) {
            t.beginPath(),
            t.arc(0, 0, this.innerRadius(), 0, pe, !1),
            t.moveTo(this.outerRadius(), 0),
            t.arc(0, 0, this.outerRadius(), pe, 0, !0),
            t.closePath(),
            t.fillStrokeShape(this)
        }
        ,
        e.prototype.getWidth = function() {
            return 2 * this.outerRadius()
        }
        ,
        e.prototype.getHeight = function() {
            return 2 * this.outerRadius()
        }
        ,
        e.prototype.setWidth = function(t) {
            this.outerRadius(t / 2)
        }
        ,
        e.prototype.setHeight = function(t) {
            this.outerRadius(t / 2)
        }
        ,
        e
    }(Et);
    ue.prototype.className = "Ring",
    ue.prototype._centroid = !0,
    ue.prototype._attrsAffectingSize = ["innerRadius", "outerRadius"],
    r(ue),
    x.addGetterSetter(ue, "innerRadius", 0, v()),
    x.addGetterSetter(ue, "outerRadius", 0, v()),
    a.mapMethods(ue);
    var fe = function(i) {
        function t(t) {
            var e = i.call(this, t) || this;
            return e._updated = !0,
            e.anim = new F(function() {
                var t = e._updated;
                return e._updated = !1,
                t
            }
            ),
            e.on("animationChange.konva", function() {
                this.frameIndex(0)
            }),
            e.on("frameIndexChange.konva", function() {
                this._updated = !0
            }),
            e.on("frameRateChange.konva", function() {
                this.anim.isRunning() && (clearInterval(this.interval),
                this._setInterval())
            }),
            e
        }
        return C(t, i),
        t.prototype._sceneFunc = function(t) {
            var e = this.animation()
              , i = this.frameIndex()
              , n = 4 * i
              , r = this.animations()[e]
              , a = this.frameOffsets()
              , o = r[n + 0]
              , s = r[n + 1]
              , h = r[n + 2]
              , l = r[n + 3]
              , c = this.image();
            if ((this.hasFill() || this.hasStroke()) && (t.beginPath(),
            t.rect(0, 0, h, l),
            t.closePath(),
            t.fillStrokeShape(this)),
            c)
                if (a) {
                    var d = a[e]
                      , p = 2 * i;
                    t.drawImage(c, o, s, h, l, d[p + 0], d[p + 1], h, l)
                } else
                    t.drawImage(c, o, s, h, l, 0, 0, h, l)
        }
        ,
        t.prototype._hitFunc = function(t) {
            var e = this.animation()
              , i = this.frameIndex()
              , n = 4 * i
              , r = this.animations()[e]
              , a = this.frameOffsets()
              , o = r[n + 2]
              , s = r[n + 3];
            if (t.beginPath(),
            a) {
                var h = a[e]
                  , l = 2 * i;
                t.rect(h[l + 0], h[l + 1], o, s)
            } else
                t.rect(0, 0, o, s);
            t.closePath(),
            t.fillShape(this)
        }
        ,
        t.prototype._useBufferCanvas = function() {
            return (this.hasShadow() || 1 !== this.getAbsoluteOpacity()) && this.hasStroke()
        }
        ,
        t.prototype._setInterval = function() {
            var t = this;
            this.interval = setInterval(function() {
                t._updateIndex()
            }, 1e3 / this.frameRate())
        }
        ,
        t.prototype.start = function() {
            if (!this.isRunning()) {
                var t = this.getLayer();
                this.anim.setLayers(t),
                this._setInterval(),
                this.anim.start()
            }
        }
        ,
        t.prototype.stop = function() {
            this.anim.stop(),
            clearInterval(this.interval)
        }
        ,
        t.prototype.isRunning = function() {
            return this.anim.isRunning()
        }
        ,
        t.prototype._updateIndex = function() {
            var t = this.frameIndex()
              , e = this.animation();
            t < this.animations()[e].length / 4 - 1 ? this.frameIndex(t + 1) : this.frameIndex(0)
        }
        ,
        t
    }(Et);
    fe.prototype.className = "Sprite",
    r(fe),
    x.addGetterSetter(fe, "animation"),
    x.addGetterSetter(fe, "animations"),
    x.addGetterSetter(fe, "frameOffsets"),
    x.addGetterSetter(fe, "image"),
    x.addGetterSetter(fe, "frameIndex", 0, v()),
    x.addGetterSetter(fe, "frameRate", 17, v()),
    x.backCompat(fe, {
        index: "frameIndex",
        getIndex: "getFrameIndex",
        setIndex: "setFrameIndex"
    }),
    a.mapMethods(fe);
    var ge = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }
        return C(e, t),
        e.prototype._sceneFunc = function(t) {
            var e = this.innerRadius()
              , i = this.outerRadius()
              , n = this.numPoints();
            t.beginPath(),
            t.moveTo(0, 0 - i);
            for (var r = 1; r < 2 * n; r++) {
                var a = r % 2 == 0 ? i : e
                  , o = a * Math.sin(r * Math.PI / n)
                  , s = -1 * a * Math.cos(r * Math.PI / n);
                t.lineTo(o, s)
            }
            t.closePath(),
            t.fillStrokeShape(this)
        }
        ,
        e.prototype.getWidth = function() {
            return 2 * this.outerRadius()
        }
        ,
        e.prototype.getHeight = function() {
            return 2 * this.outerRadius()
        }
        ,
        e.prototype.setWidth = function(t) {
            this.outerRadius(t / 2)
        }
        ,
        e.prototype.setHeight = function(t) {
            this.outerRadius(t / 2)
        }
        ,
        e
    }(Et);
    ge.prototype.className = "Star",
    ge.prototype._centroid = !0,
    ge.prototype._attrsAffectingSize = ["innerRadius", "outerRadius"],
    r(ge),
    x.addGetterSetter(ge, "numPoints", 5, v()),
    x.addGetterSetter(ge, "innerRadius", 0, v()),
    x.addGetterSetter(ge, "outerRadius", 0, v()),
    a.mapMethods(ge);
    var ve, ye = "auto", me = "justify", _e = ["fontFamily", "fontSize", "fontStyle", "fontVariant", "padding", "align", "verticalAlign", "lineHeight", "text", "width", "height", "wrap", "ellipsis", "letterSpacing"], Se = _e.length;
    function be() {
        return ve || (ve = O.createCanvasElement().getContext("2d"))
    }
    var xe = function(r) {
        function t(t) {
            var e, i = r.call(this, ((e = (e = t) || {}).fillLinearGradientColorStops || e.fillRadialGradientColorStops || e.fillPatternImage || (e.fill = e.fill || "black"),
            e)) || this;
            i._partialTextX = 0;
            for (var n = i._partialTextY = 0; n < Se; n++)
                i.on(_e[n] + "Change.konva", i._setTextData);
            return i._setTextData(),
            i
        }
        return C(t, r),
        t.prototype._sceneFunc = function(t) {
            var e, i = this.padding(), n = this.fontSize(), r = this.lineHeight() * n, a = this.textArr, o = a.length, s = this.verticalAlign(), h = 0, l = this.align(), c = this.getWidth(), d = this.letterSpacing(), p = this.fill(), u = this.textDecoration(), f = -1 !== u.indexOf("underline"), g = -1 !== u.indexOf("line-through"), v = 0, y = (v = r / 2,
            0), m = 0;
            for (t.setAttr("font", this._getContextFont()),
            t.setAttr("textBaseline", "middle"),
            t.setAttr("textAlign", "left"),
            "middle" === s ? h = (this.getHeight() - o * r - 2 * i) / 2 : "bottom" === s && (h = this.getHeight() - o * r - 2 * i),
            t.translate(i, h + i),
            e = 0; e < o; e++) {
                y = 0,
                m = 0;
                var _, S, b, x = a[e], w = x.text, C = x.width, k = e !== o - 1;
                if (t.save(),
                "right" === l ? y += c - C - 2 * i : "center" === l && (y += (c - C - 2 * i) / 2),
                f && (t.save(),
                t.beginPath(),
                t.moveTo(y, v + m + Math.round(n / 2)),
                S = 0 === (_ = w.split(" ").length - 1),
                b = l === me && k && !S ? c - 2 * i : C,
                t.lineTo(y + Math.round(b), v + m + Math.round(n / 2)),
                t.lineWidth = n / 15,
                t.strokeStyle = p,
                t.stroke(),
                t.restore()),
                g && (t.save(),
                t.beginPath(),
                t.moveTo(y, v + m),
                S = 0 === (_ = w.split(" ").length - 1),
                b = l === me && k && !S ? c - 2 * i : C,
                t.lineTo(y + Math.round(b), v + m),
                t.lineWidth = n / 15,
                t.strokeStyle = p,
                t.stroke(),
                t.restore()),
                0 !== d || l === me) {
                    _ = w.split(" ").length - 1;
                    for (var P = 0; P < w.length; P++) {
                        var T = w[P];
                        " " === T && e !== o - 1 && l === me && (y += Math.floor((c - 2 * i - C) / _)),
                        this._partialTextX = y,
                        this._partialTextY = v + m,
                        this._partialText = T,
                        t.fillStrokeShape(this),
                        y += Math.round(this.measureSize(T).width) + d
                    }
                } else
                    this._partialTextX = y,
                    this._partialTextY = v + m,
                    this._partialText = w,
                    t.fillStrokeShape(this);
                t.restore(),
                1 < o && (v += r)
            }
        }
        ,
        t.prototype._hitFunc = function(t) {
            var e = this.getWidth()
              , i = this.getHeight();
            t.beginPath(),
            t.rect(0, 0, e, i),
            t.closePath(),
            t.fillStrokeShape(this)
        }
        ,
        t.prototype.setText = function(t) {
            var e = O._isString(t) ? t : (t || "").toString();
            return this._setAttr("text", e),
            this
        }
        ,
        t.prototype.getWidth = function() {
            return this.attrs.width === ye || void 0 === this.attrs.width ? this.getTextWidth() + 2 * this.padding() : this.attrs.width
        }
        ,
        t.prototype.getHeight = function() {
            return this.attrs.height === ye || void 0 === this.attrs.height ? this.fontSize() * this.textArr.length * this.lineHeight() + 2 * this.padding() : this.attrs.height
        }
        ,
        t.prototype.getTextWidth = function() {
            return this.textWidth
        }
        ,
        t.prototype.getTextHeight = function() {
            return O.warn("text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height."),
            this.textHeight
        }
        ,
        t.prototype.measureSize = function(t) {
            var e, i = be(), n = this.fontSize();
            return i.save(),
            i.font = this._getContextFont(),
            e = i.measureText(t),
            i.restore(),
            {
                width: e.width,
                height: n
            }
        }
        ,
        t.prototype._getContextFont = function() {
            return L.UA.isIE ? this.fontStyle() + " " + this.fontSize() + "px " + this.fontFamily() : this.fontStyle() + " " + this.fontVariant() + " " + this.fontSize() + "px " + this.fontFamily()
        }
        ,
        t.prototype._addTextLine = function(t) {
            this.align() === me && (t = t.trim());
            var e = this._getTextWidth(t);
            return this.textArr.push({
                text: t,
                width: e
            })
        }
        ,
        t.prototype._getTextWidth = function(t) {
            var e = this.letterSpacing()
              , i = t.length;
            return be().measureText(t).width + (i ? e * (i - 1) : 0)
        }
        ,
        t.prototype._setTextData = function() {
            var t = this.text().split("\n")
              , e = +this.fontSize()
              , i = 0
              , n = this.lineHeight() * e
              , r = this.attrs.width
              , a = this.attrs.height
              , o = r !== ye && void 0 !== r
              , s = a !== ye && void 0 !== a
              , h = this.padding()
              , l = r - 2 * h
              , c = a - 2 * h
              , d = 0
              , p = this.wrap()
              , u = "none" !== p
              , f = "char" !== p && u
              , g = this.ellipsis() && !u;
            this.textArr = [],
            be().font = this._getContextFont();
            for (var v = g ? this._getTextWidth("â€¦") : 0, y = 0, m = t.length; y < m; ++y) {
                var _ = t[y]
                  , S = this._getTextWidth(_);
                if (o && l < S)
                    for (; 0 < _.length; ) {
                        for (var b = 0, x = _.length, w = "", C = 0; b < x; ) {
                            var k = b + x >>> 1
                              , P = _.slice(0, k + 1)
                              , T = this._getTextWidth(P) + v;
                            T <= l ? (b = k + 1,
                            w = P + (g ? "â€¦" : ""),
                            C = T) : x = k
                        }
                        if (!w)
                            break;
                        if (f) {
                            var M, A = _[w.length];
                            0 < (M = (" " === A || "-" === A) && C <= l ? w.length : Math.max(w.lastIndexOf(" "), w.lastIndexOf("-")) + 1) && (b = M,
                            w = w.slice(0, b),
                            C = this._getTextWidth(w))
                        }
                        if (w = w.trimRight(),
                        this._addTextLine(w),
                        i = Math.max(i, C),
                        d += n,
                        !u || s && c < d + n)
                            break;
                        if (0 < (_ = (_ = _.slice(b)).trimLeft()).length && (S = this._getTextWidth(_)) <= l) {
                            this._addTextLine(_),
                            d += n,
                            i = Math.max(i, S);
                            break
                        }
                    }
                else
                    this._addTextLine(_),
                    d += n,
                    i = Math.max(i, S);
                if (s && c < d + n)
                    break
            }
            this.textHeight = e,
            this.textWidth = i
        }
        ,
        t.prototype.getStrokeScaleEnabled = function() {
            return !0
        }
        ,
        t
    }(Et);
    xe.prototype._fillFunc = function(t) {
        t.fillText(this._partialText, this._partialTextX, this._partialTextY)
    }
    ,
    xe.prototype._strokeFunc = function(t) {
        t.strokeText(this._partialText, this._partialTextX, this._partialTextY)
    }
    ,
    xe.prototype.className = "Text",
    xe.prototype._attrsAffectingSize = ["text", "fontSize", "padding", "wrap", "lineHeight"],
    r(xe),
    x.overWriteSetter(xe, "width", y()),
    x.overWriteSetter(xe, "height", y()),
    x.addGetterSetter(xe, "fontFamily", "Arial"),
    x.addGetterSetter(xe, "fontSize", 12, v()),
    x.addGetterSetter(xe, "fontStyle", "normal"),
    x.addGetterSetter(xe, "fontVariant", "normal"),
    x.addGetterSetter(xe, "padding", 0, v()),
    x.addGetterSetter(xe, "align", "left"),
    x.addGetterSetter(xe, "verticalAlign", "top"),
    x.addGetterSetter(xe, "lineHeight", 1, v()),
    x.addGetterSetter(xe, "wrap", "word"),
    x.addGetterSetter(xe, "ellipsis", !1),
    x.addGetterSetter(xe, "letterSpacing", 0, v()),
    x.addGetterSetter(xe, "text", "", m()),
    x.addGetterSetter(xe, "textDecoration", ""),
    a.mapMethods(xe);
    function we(t) {
        t.fillText(this.partialText, 0, 0)
    }
    function Ce(t) {
        t.strokeText(this.partialText, 0, 0)
    }
    var ke = function(i) {
        function t(t) {
            var e = i.call(this, t) || this;
            return e.dummyCanvas = O.createCanvasElement(),
            e.dataArray = [],
            e.dataArray = le.parsePathData(e.attrs.data),
            e.on("dataChange.konva", function() {
                this.dataArray = le.parsePathData(this.attrs.data),
                this._setTextData()
            }),
            e.on("textChange.konva alignChange.konva letterSpacingChange.konva kerningFuncChange.konva", e._setTextData),
            t && t.getKerning && (O.warn('getKerning TextPath API is deprecated. Please use "kerningFunc" instead.'),
            e.kerningFunc(t.getKerning)),
            e._setTextData(),
            e
        }
        return C(t, i),
        t.prototype._sceneFunc = function(t) {
            t.setAttr("font", this._getContextFont()),
            t.setAttr("textBaseline", this.textBaseline()),
            t.setAttr("textAlign", "left"),
            t.save();
            var e = this.textDecoration()
              , i = this.fill()
              , n = this.fontSize()
              , r = this.glyphInfo;
            "underline" === e && t.beginPath();
            for (var a = 0; a < r.length; a++) {
                t.save();
                var o = r[a].p0;
                t.translate(o.x, o.y),
                t.rotate(r[a].rotation),
                this.partialText = r[a].text,
                t.fillStrokeShape(this),
                "underline" === e && (0 === a && t.moveTo(0, n / 2 + 1),
                t.lineTo(n, n / 2 + 1)),
                t.restore()
            }
            "underline" === e && (t.strokeStyle = i,
            t.lineWidth = n / 20,
            t.stroke()),
            t.restore()
        }
        ,
        t.prototype._hitFunc = function(t) {
            t.beginPath();
            var e = this.glyphInfo;
            if (1 <= e.length) {
                var i = e[0].p0;
                t.moveTo(i.x, i.y)
            }
            for (var n = 0; n < e.length; n++) {
                var r = e[n].p1;
                t.lineTo(r.x, r.y)
            }
            t.setAttr("lineWidth", this.fontSize()),
            t.setAttr("strokeStyle", this.colorKey),
            t.stroke()
        }
        ,
        t.prototype.getTextWidth = function() {
            return this.textWidth
        }
        ,
        t.prototype.getTextHeight = function() {
            return O.warn("text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height."),
            this.textHeight
        }
        ,
        t.prototype.setText = function(t) {
            return xe.prototype.setText.call(this, t)
        }
        ,
        t.prototype._getContextFont = function() {
            return xe.prototype._getContextFont.call(this)
        }
        ,
        t.prototype._getTextSize = function(t) {
            var e = this.dummyCanvas.getContext("2d");
            e.save(),
            e.font = this._getContextFont();
            var i = e.measureText(t);
            return e.restore(),
            {
                width: i.width,
                height: parseInt(this.attrs.fontSize, 10)
            }
        }
        ,
        t.prototype._setTextData = function() {
            var l = this
              , t = this._getTextSize(this.attrs.text)
              , c = this.letterSpacing()
              , d = this.align()
              , e = this.kerningFunc();
            this.textWidth = t.width,
            this.textHeight = t.height;
            var p = Math.max(this.textWidth + ((this.attrs.text || "").length - 1) * c, 0);
            this.glyphInfo = [];
            for (var u = 0, i = 0; i < l.dataArray.length; i++)
                0 < l.dataArray[i].pathLength && (u += l.dataArray[i].pathLength);
            var n = 0;
            "center" === d && (n = Math.max(0, u / 2 - p / 2)),
            "right" === d && (n = Math.max(0, u - p));
            for (var f, g, v, r = this.text().split(""), y = this.text().split(" ").length - 1, a = -1, m = 0, _ = function() {
                m = 0;
                for (var t = l.dataArray, e = a + 1; e < t.length; e++) {
                    if (0 < t[e].pathLength)
                        return t[a = e];
                    "M" === t[e].command && (f = {
                        x: t[e].points[0],
                        y: t[e].points[1]
                    })
                }
                return {}
            }, o = function(t) {
                var e = l._getTextSize(t).width + c;
                " " === t && "justify" === d && (e += (u - p) / y);
                var i = 0
                  , n = 0;
                for (g = void 0; .01 < Math.abs(e - i) / e && n < 25; ) {
                    n++;
                    for (var r = i; void 0 === v; )
                        (v = _()) && r + v.pathLength < e && (r += v.pathLength,
                        v = void 0);
                    if (v === {} || void 0 === f)
                        return;
                    var a = !1;
                    switch (v.command) {
                    case "L":
                        le.getLineLength(f.x, f.y, v.points[0], v.points[1]) > e ? g = le.getPointOnLine(e, f.x, f.y, v.points[0], v.points[1], f.x, f.y) : v = void 0;
                        break;
                    case "A":
                        var o = v.points[4]
                          , s = v.points[5]
                          , h = v.points[4] + s;
                        0 === m ? m = o + 1e-8 : i < e ? m += Math.PI / 180 * s / Math.abs(s) : m -= Math.PI / 360 * s / Math.abs(s),
                        (s < 0 && m < h || 0 <= s && h < m) && (m = h,
                        a = !0),
                        g = le.getPointOnEllipticalArc(v.points[0], v.points[1], v.points[2], v.points[3], m, v.points[6]);
                        break;
                    case "C":
                        0 === m ? m = e > v.pathLength ? 1e-8 : e / v.pathLength : i < e ? m += (e - i) / v.pathLength : m -= (i - e) / v.pathLength,
                        1 < m && (m = 1,
                        a = !0),
                        g = le.getPointOnCubicBezier(m, v.start.x, v.start.y, v.points[0], v.points[1], v.points[2], v.points[3], v.points[4], v.points[5]);
                        break;
                    case "Q":
                        0 === m ? m = e / v.pathLength : i < e ? m += (e - i) / v.pathLength : m -= (i - e) / v.pathLength,
                        1 < m && (m = 1,
                        a = !0),
                        g = le.getPointOnQuadraticBezier(m, v.start.x, v.start.y, v.points[0], v.points[1], v.points[2], v.points[3])
                    }
                    void 0 !== g && (i = le.getLineLength(f.x, f.y, g.x, g.y)),
                    a && (a = !1,
                    v = void 0)
                }
            }, s = l._getTextSize("C").width + c, h = 0; h < n / s && (o("C"),
            void 0 !== f && void 0 !== g); h++)
                f = g;
            for (var S = 0; S < r.length && (o(r[S]),
            void 0 !== f && void 0 !== g); S++) {
                var b = le.getLineLength(f.x, f.y, g.x, g.y)
                  , x = 0;
                if (e)
                    try {
                        x = e(r[S - 1], r[S]) * this.fontSize()
                    } catch (t) {
                        x = 0
                    }
                f.x += x,
                g.x += x,
                this.textWidth += x;
                var w = le.getPointOnLine(x + b / 2, f.x, f.y, g.x, g.y)
                  , C = Math.atan2(g.y - f.y, g.x - f.x);
                this.glyphInfo.push({
                    transposeX: w.x,
                    transposeY: w.y,
                    text: r[S],
                    rotation: C,
                    p0: f,
                    p1: g
                }),
                f = g
            }
        }
        ,
        t.prototype.getSelfRect = function() {
            var e = [];
            this.glyphInfo.forEach(function(t) {
                e.push(t.p0.x),
                e.push(t.p0.y),
                e.push(t.p1.x),
                e.push(t.p1.y)
            });
            for (var t, i, n = e[0], r = e[0], a = e[0], o = e[0], s = 0; s < e.length / 2; s++)
                t = e[2 * s],
                i = e[2 * s + 1],
                n = Math.min(n, t),
                r = Math.max(r, t),
                a = Math.min(a, i),
                o = Math.max(o, i);
            var h = this.fontSize();
            return {
                x: Math.round(n) - h / 2,
                y: Math.round(a) - h / 2,
                width: Math.round(r - n) + h,
                height: Math.round(o - a) + h
            }
        }
        ,
        t
    }(Et);
    ke.prototype._fillFunc = we,
    ke.prototype._strokeFunc = Ce,
    ke.prototype._fillFuncHit = we,
    ke.prototype._strokeFuncHit = Ce,
    ke.prototype.className = "TextPath",
    ke.prototype._attrsAffectingSize = ["text", "fontSize", "data"],
    r(ke),
    x.addGetterSetter(ke, "data"),
    x.addGetterSetter(ke, "fontFamily", "Arial"),
    x.addGetterSetter(ke, "fontSize", 12, v()),
    x.addGetterSetter(ke, "fontStyle", "normal"),
    x.addGetterSetter(ke, "align", "left"),
    x.addGetterSetter(ke, "letterSpacing", 0, v()),
    x.addGetterSetter(ke, "textBaseline", "middle"),
    x.addGetterSetter(ke, "fontVariant", "normal"),
    x.addGetterSetter(ke, "text", ""),
    x.addGetterSetter(ke, "textDecoration", null),
    x.addGetterSetter(ke, "kerningFunc", null),
    a.mapMethods(ke);
    var Pe = ["resizeEnabledChange", "rotateAnchorOffsetChange", "rotateEnabledChange", "enabledAnchorsChange", "anchorSizeChange", "borderEnabledChange", "borderStrokeChange", "borderStrokeWidthChange", "borderDashChange", "anchorStrokeChange", "anchorStrokeWidthChange", "anchorFillChange", "anchorCornerRadiusChange", "ignoreStrokeChange"].join(" ")
      , Te = "nodeRect"
      , Me = ["widthChange.tr", "heightChange.tr", "scaleXChange.tr", "scaleYChange.tr", "skewXChange.tr", "skewYChange.tr", "rotationChange.tr", "offsetXChange.tr", "offsetYChange.tr", "transformsEnabledChange.tr", "strokeWidthChange.tr"].join(" ")
      , Ae = {
        "top-left": -45,
        "top-center": 0,
        "top-right": 45,
        "middle-right": -90,
        "middle-left": 90,
        "bottom-left": -135,
        "bottom-center": 180,
        "bottom-right": 135
    };
    var Ge = ["top-left", "top-center", "top-right", "middle-right", "middle-left", "bottom-left", "bottom-center", "bottom-right"]
      , Re = function(i) {
        function t(t) {
            var e = i.call(this, t) || this;
            return e._transforming = !1,
            e._createElements(),
            e._handleMouseMove = e._handleMouseMove.bind(e),
            e._handleMouseUp = e._handleMouseUp.bind(e),
            e.update = e.update.bind(e),
            e.on(Pe, e.update),
            e.getNode() && e.update(),
            e
        }
        return C(t, i),
        t.prototype.attachTo = function(t) {
            return this.setNode(t),
            this
        }
        ,
        t.prototype.setNode = function(t) {
            var e = this;
            this._node && this.detach(),
            this._node = t,
            this._resetTransformCache();
            var i = t._attrsAffectingSize.map(function(t) {
                return t + "Change.tr"
            }).join(" ")
              , n = function() {
                e._resetTransformCache(),
                e._transforming || e.update()
            };
            return t.on(i, n),
            t.on(Me, n),
            t.on("xChange.tr yChange.tr", function() {
                return e._resetTransformCache()
            }),
            !!this.findOne(".top-left") && this.update(),
            this
        }
        ,
        t.prototype.getNode = function() {
            return this._node
        }
        ,
        t.prototype.detach = function() {
            this.getNode() && (this.getNode().off(".tr"),
            this._node = void 0),
            this._resetTransformCache()
        }
        ,
        t.prototype._resetTransformCache = function() {
            this._clearCache(Te),
            this._clearCache("transform"),
            this._clearSelfAndDescendantCache("absoluteTransform")
        }
        ,
        t.prototype._getNodeRect = function() {
            return this._getCache(Te, this.__getNodeRect)
        }
        ,
        t.prototype.__getNodeRect = function() {
            var t = this.getNode();
            if (!t)
                return {
                    x: -1e8,
                    y: -1e8,
                    width: 0,
                    height: 0,
                    rotation: 0
                };
            var e = t.getClientRect({
                skipTransform: !0,
                skipShadow: !0,
                skipStroke: this.ignoreStroke()
            })
              , i = L.getAngle(t.rotation())
              , n = e.x * t.scaleX() - t.offsetX() * t.scaleX()
              , r = e.y * t.scaleY() - t.offsetY() * t.scaleY();
            return {
                x: t.x() + n * Math.cos(i) + r * Math.sin(-i),
                y: t.y() + r * Math.cos(i) + n * Math.sin(i),
                width: e.width * t.scaleX(),
                height: e.height * t.scaleY(),
                rotation: t.rotation()
            }
        }
        ,
        t.prototype.getX = function() {
            return this._getNodeRect().x
        }
        ,
        t.prototype.getY = function() {
            return this._getNodeRect().y
        }
        ,
        t.prototype.getRotation = function() {
            return this._getNodeRect().rotation
        }
        ,
        t.prototype.getWidth = function() {
            return this._getNodeRect().width
        }
        ,
        t.prototype.getHeight = function() {
            return this._getNodeRect().height
        }
        ,
        t.prototype._createElements = function() {
            this._createBack(),
            Ge.forEach(function(t) {
                this._createAnchor(t)
            }
            .bind(this)),
            this._createAnchor("rotater")
        }
        ,
        t.prototype._createAnchor = function(a) {
            var o = new ce({
                stroke: "rgb(0, 161, 255)",
                fill: "white",
                strokeWidth: 1,
                name: a + " _anchor",
                dragDistance: 0,
                draggable: !0
            })
              , e = this;
            o.on("mousedown touchstart", function(t) {
                e._handleMouseDown(t)
            }),
            o.on("dragstart", function(t) {
                t.cancelBubble = !0
            }),
            o.on("dragmove", function(t) {
                t.cancelBubble = !0
            }),
            o.on("dragend", function(t) {
                t.cancelBubble = !0
            }),
            o.on("mouseenter", function() {
                var t = this.getParent()
                  , e = L.getAngle(t.rotation())
                  , i = t.getNode().getAbsoluteScale()
                  , n = i.y * i.x < 0
                  , r = function(t, e, i) {
                    if ("rotater" === t)
                        return "crosshair";
                    e += O._degToRad(Ae[t] || 0),
                    i && (e *= -1);
                    var n = (O._radToDeg(e) % 360 + 360) % 360;
                    return O._inRange(n, 337.5, 360) || O._inRange(n, 0, 22.5) ? "ns-resize" : O._inRange(n, 22.5, 67.5) ? "nesw-resize" : O._inRange(n, 67.5, 112.5) ? "ew-resize" : O._inRange(n, 112.5, 157.5) ? "nwse-resize" : O._inRange(n, 157.5, 202.5) ? "ns-resize" : O._inRange(n, 202.5, 247.5) ? "nesw-resize" : O._inRange(n, 247.5, 292.5) ? "ew-resize" : O._inRange(n, 292.5, 337.5) ? "nwse-resize" : (O.error("Transformer has unknown angle for cursor detection: " + n),
                    "pointer")
                }(a, e, n);
                o.getStage().content.style.cursor = r,
                t._cursorChange = !0
            }),
            o.on("mouseout", function() {
                o.getStage() && this.getParent() && (o.getStage().content.style.cursor = "",
                this.getParent()._cursorChange = !1)
            }),
            this.add(o)
        }
        ,
        t.prototype._createBack = function() {
            var t = new Et({
                name: "back",
                width: 0,
                height: 0,
                listening: !1,
                sceneFunc: function(t) {
                    var e = this.getParent()
                      , i = e.padding();
                    t.beginPath(),
                    t.rect(-i, -i, this.width() + 2 * i, this.height() + 2 * i),
                    t.moveTo(this.width() / 2, -i),
                    e.rotateEnabled() && t.lineTo(this.width() / 2, -e.rotateAnchorOffset() * O._sign(this.height())),
                    t.fillStrokeShape(this)
                }
            });
            this.add(t)
        }
        ,
        t.prototype._handleMouseDown = function(t) {
            this.movingResizer = t.target.name().split(" ")[0];
            var e = this._getNodeRect()
              , i = e.width
              , n = e.height
              , r = Math.sqrt(Math.pow(i, 2) + Math.pow(n, 2));
            this.sin = n / r,
            this.cos = i / r,
            window.addEventListener("mousemove", this._handleMouseMove),
            window.addEventListener("touchmove", this._handleMouseMove),
            window.addEventListener("mouseup", this._handleMouseUp, !0),
            window.addEventListener("touchend", this._handleMouseUp, !0),
            this._transforming = !0,
            this._fire("transformstart", {
                evt: t
            }),
            this.getNode()._fire("transformstart", {
                evt: t
            })
        }
        ,
        t.prototype._handleMouseMove = function(t) {
            var e, i, n, r = this.findOne("." + this.movingResizer), a = r.getStage().getContent().getBoundingClientRect(), o = a.left, s = a.top, h = {
                x: (void 0 !== t.clientX ? t.clientX : t.touches[0].clientX) - o,
                y: (void 0 !== t.clientX ? t.clientY : t.touches[0].clientY) - s
            };
            r.setAbsolutePosition(h);
            var l = this.keepRatio() || t.shiftKey;
            if ("top-left" === this.movingResizer)
                l && (e = (n = Math.sqrt(Math.pow(this.findOne(".bottom-right").x() - r.x(), 2) + Math.pow(this.findOne(".bottom-right").y() - r.y(), 2))) * this.cos,
                i = n * this.sin,
                this.findOne(".top-left").x(this.findOne(".bottom-right").x() - e),
                this.findOne(".top-left").y(this.findOne(".bottom-right").y() - i));
            else if ("top-center" === this.movingResizer)
                this.findOne(".top-left").y(r.y());
            else if ("top-right" === this.movingResizer) {
                l && (e = (n = Math.sqrt(Math.pow(this.findOne(".bottom-left").x() - r.x(), 2) + Math.pow(this.findOne(".bottom-left").y() - r.y(), 2))) * this.cos,
                i = n * this.sin,
                this.findOne(".top-right").x(e),
                this.findOne(".top-right").y(this.findOne(".bottom-left").y() - i));
                var c = r.position();
                this.findOne(".top-left").y(c.y),
                this.findOne(".bottom-right").x(c.x)
            } else if ("middle-left" === this.movingResizer)
                this.findOne(".top-left").x(r.x());
            else if ("middle-right" === this.movingResizer)
                this.findOne(".bottom-right").x(r.x());
            else if ("bottom-left" === this.movingResizer)
                l && (e = (n = Math.sqrt(Math.pow(this.findOne(".top-right").x() - r.x(), 2) + Math.pow(this.findOne(".top-right").y() - r.y(), 2))) * this.cos,
                i = n * this.sin,
                this.findOne(".bottom-left").x(this.findOne(".top-right").x() - e),
                this.findOne(".bottom-left").y(i)),
                c = r.position(),
                this.findOne(".top-left").x(c.x),
                this.findOne(".bottom-right").y(c.y);
            else if ("bottom-center" === this.movingResizer)
                this.findOne(".bottom-right").y(r.y());
            else if ("bottom-right" === this.movingResizer)
                l && (e = (n = Math.sqrt(Math.pow(this.findOne(".bottom-right").x(), 2) + Math.pow(this.findOne(".bottom-right").y(), 2))) * this.cos,
                i = n * this.sin,
                this.findOne(".bottom-right").x(e),
                this.findOne(".bottom-right").y(i));
            else if ("rotater" === this.movingResizer) {
                var d = this.padding()
                  , p = this._getNodeRect();
                e = r.x() - p.width / 2,
                i = -r.y() + p.height / 2;
                var u = Math.atan2(-i, e) + Math.PI / 2;
                p.height < 0 && (u -= Math.PI);
                for (var f = L.getAngle(this.rotation()), g = O._radToDeg(f) + O._radToDeg(u), v = L.getAngle(this.getNode().rotation()), y = O._degToRad(g), m = this.rotationSnaps(), _ = 0; _ < m.length; _++) {
                    var S = L.getAngle(m[_]);
                    Math.abs(S - O._degToRad(g)) % (2 * Math.PI) < .1 && (g = O._radToDeg(S),
                    y = O._degToRad(g))
                }
                var b = d
                  , x = d;
                this._fitNodeInto({
                    rotation: L.angleDeg ? g : O._degToRad(g),
                    x: p.x + (p.width / 2 + d) * (Math.cos(v) - Math.cos(y)) + (p.height / 2 + d) * (Math.sin(-v) - Math.sin(-y)) - (b * Math.cos(f) + x * Math.sin(-f)),
                    y: p.y + (p.height / 2 + d) * (Math.cos(v) - Math.cos(y)) + (p.width / 2 + d) * (Math.sin(v) - Math.sin(y)) - (x * Math.cos(f) + b * Math.sin(f)),
                    width: p.width + 2 * d,
                    height: p.height + 2 * d
                }, t)
            } else
                console.error(new Error("Wrong position argument of selection resizer: " + this.movingResizer));
            if ("rotater" !== this.movingResizer) {
                var w = this.findOne(".top-left").getAbsolutePosition(this.getParent());
                if (this.centeredScaling() || t.altKey) {
                    var C = this.findOne(".top-left")
                      , k = this.findOne(".bottom-right")
                      , P = C.x()
                      , T = C.y()
                      , M = this.getWidth() - k.x()
                      , A = this.getHeight() - k.y();
                    k.move({
                        x: -P,
                        y: -T
                    }),
                    C.move({
                        x: M,
                        y: A
                    }),
                    w = C.getAbsolutePosition(this.getParent())
                }
                e = w.x,
                i = w.y;
                var G = this.findOne(".bottom-right").x() - this.findOne(".top-left").x()
                  , R = this.findOne(".bottom-right").y() - this.findOne(".top-left").y();
                this._fitNodeInto({
                    x: e + this.offsetX(),
                    y: i + this.offsetY(),
                    width: G,
                    height: R
                }, t)
            }
        }
        ,
        t.prototype._handleMouseUp = function(t) {
            this._removeEvents(t)
        }
        ,
        t.prototype._removeEvents = function(t) {
            if (this._transforming) {
                this._transforming = !1,
                window.removeEventListener("mousemove", this._handleMouseMove),
                window.removeEventListener("touchmove", this._handleMouseMove),
                window.removeEventListener("mouseup", this._handleMouseUp, !0),
                window.removeEventListener("touchend", this._handleMouseUp, !0),
                this._fire("transformend", {
                    evt: t
                });
                var e = this.getNode();
                e && e.fire("transformend", {
                    evt: t
                })
            }
        }
        ,
        t.prototype._fitNodeInto = function(t, e) {
            var i = this.boundBoxFunc();
            if (i) {
                var n = this._getNodeRect();
                t = i.call(this, n, t)
            }
            var r = this.getNode();
            void 0 !== t.rotation && this.getNode().rotation(t.rotation);
            var a = r.getClientRect({
                skipTransform: !0,
                skipShadow: !0,
                skipStroke: this.ignoreStroke()
            })
              , o = this.padding()
              , s = (t.width - 2 * o) / a.width
              , h = (t.height - 2 * o) / a.height
              , l = L.getAngle(r.rotation())
              , c = a.x * s - o - r.offsetX() * s
              , d = a.y * h - o - r.offsetY() * h;
            this.getNode().setAttrs({
                scaleX: s,
                scaleY: h,
                x: t.x - (c * Math.cos(l) + d * Math.sin(-l)),
                y: t.y - (d * Math.cos(l) + c * Math.sin(l))
            }),
            this._fire("transform", {
                evt: e
            }),
            this.getNode()._fire("transform", {
                evt: e
            }),
            this.update(),
            this.getLayer().batchDraw()
        }
        ,
        t.prototype.forceUpdate = function() {
            this._resetTransformCache(),
            this.update()
        }
        ,
        t.prototype.update = function() {
            var e = this
              , t = this._getNodeRect()
              , i = this.getNode()
              , n = {
                x: 1,
                y: 1
            };
            i && i.getParent() && (n = i.getParent().getAbsoluteScale());
            var r = {
                x: 1 / n.x,
                y: 1 / n.y
            }
              , a = t.width
              , o = t.height
              , s = this.enabledAnchors()
              , h = this.resizeEnabled()
              , l = this.padding()
              , c = this.anchorSize();
            this.find("._anchor").each(function(t) {
                return t.setAttrs({
                    width: c,
                    height: c,
                    offsetX: c / 2,
                    offsetY: c / 2,
                    stroke: e.anchorStroke(),
                    strokeWidth: e.anchorStrokeWidth(),
                    fill: e.anchorFill(),
                    cornerRadius: e.anchorCornerRadius()
                })
            }),
            this.findOne(".top-left").setAttrs({
                x: -l,
                y: -l,
                scale: r,
                visible: h && 0 <= s.indexOf("top-left")
            }),
            this.findOne(".top-center").setAttrs({
                x: a / 2,
                y: -l,
                scale: r,
                visible: h && 0 <= s.indexOf("top-center")
            }),
            this.findOne(".top-right").setAttrs({
                x: a + l,
                y: -l,
                scale: r,
                visible: h && 0 <= s.indexOf("top-right")
            }),
            this.findOne(".middle-left").setAttrs({
                x: -l,
                y: o / 2,
                scale: r,
                visible: h && 0 <= s.indexOf("middle-left")
            }),
            this.findOne(".middle-right").setAttrs({
                x: a + l,
                y: o / 2,
                scale: r,
                visible: h && 0 <= s.indexOf("middle-right")
            }),
            this.findOne(".bottom-left").setAttrs({
                x: -l,
                y: o + l,
                scale: r,
                visible: h && 0 <= s.indexOf("bottom-left")
            }),
            this.findOne(".bottom-center").setAttrs({
                x: a / 2,
                y: o + l,
                scale: r,
                visible: h && 0 <= s.indexOf("bottom-center")
            }),
            this.findOne(".bottom-right").setAttrs({
                x: a + l,
                y: o + l,
                scale: r,
                visible: h && 0 <= s.indexOf("bottom-right")
            });
            var d = -this.rotateAnchorOffset() * Math.abs(r.y);
            this.findOne(".rotater").setAttrs({
                x: a / 2,
                y: d * O._sign(o),
                scale: r,
                visible: this.rotateEnabled()
            }),
            this.findOne(".back").setAttrs({
                width: a * n.x,
                height: o * n.y,
                scale: r,
                visible: this.borderEnabled(),
                stroke: this.borderStroke(),
                strokeWidth: this.borderStrokeWidth(),
                dash: this.borderDash()
            })
        }
        ,
        t.prototype.isTransforming = function() {
            return this._transforming
        }
        ,
        t.prototype.stopTransform = function() {
            if (this._transforming) {
                this._removeEvents();
                var t = this.findOne("." + this.movingResizer);
                t && t.stopDrag()
            }
        }
        ,
        t.prototype.destroy = function() {
            return this.getStage() && this._cursorChange && (this.getStage().content.style.cursor = ""),
            Ht.prototype.destroy.call(this),
            this.detach(),
            this._removeEvents(),
            this
        }
        ,
        t.prototype.toObject = function() {
            return it.prototype.toObject.call(this)
        }
        ,
        t
    }(Ht);
    Re.prototype.className = "Transformer",
    r(Re),
    x.addGetterSetter(Re, "enabledAnchors", Ge, function(t) {
        return t instanceof Array || O.warn("enabledAnchors value should be an array"),
        t instanceof Array && t.forEach(function(t) {
            -1 === Ge.indexOf(t) && O.warn("Unknown anchor name: " + t + ". Available names are: " + Ge.join(", "))
        }),
        t || []
    }),
    x.addGetterSetter(Re, "resizeEnabled", !0),
    x.addGetterSetter(Re, "anchorSize", 10, v()),
    x.addGetterSetter(Re, "rotateEnabled", !0),
    x.addGetterSetter(Re, "rotationSnaps", []),
    x.addGetterSetter(Re, "rotateAnchorOffset", 50, v()),
    x.addGetterSetter(Re, "borderEnabled", !0),
    x.addGetterSetter(Re, "anchorStroke", "rgb(0, 161, 255)"),
    x.addGetterSetter(Re, "anchorStrokeWidth", 1, v()),
    x.addGetterSetter(Re, "anchorFill", "white"),
    x.addGetterSetter(Re, "anchorCornerRadius", 0, v()),
    x.addGetterSetter(Re, "borderStroke", "rgb(0, 161, 255)"),
    x.addGetterSetter(Re, "borderStrokeWidth", 1, v()),
    x.addGetterSetter(Re, "borderDash"),
    x.addGetterSetter(Re, "keepRatio", !0),
    x.addGetterSetter(Re, "centeredScaling", !1),
    x.addGetterSetter(Re, "ignoreStroke", !1),
    x.addGetterSetter(Re, "padding", 0, v()),
    x.addGetterSetter(Re, "node"),
    x.addGetterSetter(Re, "boundBoxFunc"),
    x.backCompat(Re, {
        lineEnabled: "borderEnabled",
        rotateHandlerOffset: "rotateAnchorOffset",
        enabledHandlers: "enabledAnchors"
    }),
    a.mapMethods(Re);
    var Le = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }
        return C(e, t),
        e.prototype._sceneFunc = function(t) {
            t.beginPath(),
            t.arc(0, 0, this.radius(), 0, L.getAngle(this.angle()), this.clockwise()),
            t.lineTo(0, 0),
            t.closePath(),
            t.fillStrokeShape(this)
        }
        ,
        e.prototype.getWidth = function() {
            return 2 * this.radius()
        }
        ,
        e.prototype.getHeight = function() {
            return 2 * this.radius()
        }
        ,
        e.prototype.setWidth = function(t) {
            this.radius(t / 2)
        }
        ,
        e.prototype.setHeight = function(t) {
            this.radius(t / 2)
        }
        ,
        e
    }(Et);
    function Oe() {
        this.r = 0,
        this.g = 0,
        this.b = 0,
        this.a = 0,
        this.next = null
    }
    Le.prototype.className = "Wedge",
    Le.prototype._centroid = !0,
    Le.prototype._attrsAffectingSize = ["radius"],
    r(Le),
    x.addGetterSetter(Le, "radius", 0, v()),
    x.addGetterSetter(Le, "angle", 0, v()),
    x.addGetterSetter(Le, "clockwise", !1),
    x.backCompat(Le, {
        angleDeg: "angle",
        getAngleDeg: "getAngle",
        setAngleDeg: "setAngle"
    }),
    a.mapMethods(Le);
    var De = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259]
      , Ie = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];
    x.addGetterSetter(it, "blurRadius", 0, v(), x.afterSetFilter);
    x.addGetterSetter(it, "brightness", 0, v(), x.afterSetFilter);
    x.addGetterSetter(it, "contrast", 0, v(), x.afterSetFilter);
    function Fe(t, e, i, n, r) {
        var a = i - e
          , o = r - n;
        return 0 === a ? n + o / 2 : 0 === o ? n : o * ((t - e) / a) + n
    }
    x.addGetterSetter(it, "embossStrength", .5, v(), x.afterSetFilter),
    x.addGetterSetter(it, "embossWhiteLevel", .5, v(), x.afterSetFilter),
    x.addGetterSetter(it, "embossDirection", "top-left", null, x.afterSetFilter),
    x.addGetterSetter(it, "embossBlend", !1, null, x.afterSetFilter);
    x.addGetterSetter(it, "enhance", 0, v(), x.afterSetFilter);
    x.addGetterSetter(it, "hue", 0, v(), x.afterSetFilter),
    x.addGetterSetter(it, "saturation", 0, v(), x.afterSetFilter),
    x.addGetterSetter(it, "luminance", 0, v(), x.afterSetFilter);
    x.addGetterSetter(it, "hue", 0, v(), x.afterSetFilter),
    x.addGetterSetter(it, "saturation", 0, v(), x.afterSetFilter),
    x.addGetterSetter(it, "value", 0, v(), x.afterSetFilter);
    function Ee(t, e, i) {
        var n = 4 * (i * t.width + e)
          , r = [];
        return r.push(t.data[n++], t.data[n++], t.data[n++], t.data[n++]),
        r
    }
    function ze(t, e) {
        return Math.sqrt(Math.pow(t[0] - e[0], 2) + Math.pow(t[1] - e[1], 2) + Math.pow(t[2] - e[2], 2))
    }
    x.addGetterSetter(it, "kaleidoscopePower", 2, v(), x.afterSetFilter),
    x.addGetterSetter(it, "kaleidoscopeAngle", 0, v(), x.afterSetFilter);
    x.addGetterSetter(it, "threshold", 0, v(), x.afterSetFilter);
    x.addGetterSetter(it, "noise", .2, v(), x.afterSetFilter);
    x.addGetterSetter(it, "pixelSize", 8, v(), x.afterSetFilter);
    x.addGetterSetter(it, "levels", .5, v(), x.afterSetFilter);
    x.addGetterSetter(it, "red", 0, function(t) {
        return this._filterUpToDate = !1,
        255 < t ? 255 : t < 0 ? 0 : Math.round(t)
    }),
    x.addGetterSetter(it, "green", 0, function(t) {
        return this._filterUpToDate = !1,
        255 < t ? 255 : t < 0 ? 0 : Math.round(t)
    }),
    x.addGetterSetter(it, "blue", 0, g, x.afterSetFilter);
    x.addGetterSetter(it, "red", 0, function(t) {
        return this._filterUpToDate = !1,
        255 < t ? 255 : t < 0 ? 0 : Math.round(t)
    }),
    x.addGetterSetter(it, "green", 0, function(t) {
        return this._filterUpToDate = !1,
        255 < t ? 255 : t < 0 ? 0 : Math.round(t)
    }),
    x.addGetterSetter(it, "blue", 0, g, x.afterSetFilter),
    x.addGetterSetter(it, "alpha", 1, function(t) {
        return this._filterUpToDate = !1,
        1 < t ? 1 : t < 0 ? 0 : t
    });
    return x.addGetterSetter(it, "threshold", .5, v(), x.afterSetFilter),
    Kt.Util._assign(Kt, {
        Arc: Qt,
        Arrow: Zt,
        Circle: $t,
        Ellipse: te,
        Image: ee,
        Label: se,
        Tag: he,
        Line: Jt,
        Path: le,
        Rect: ce,
        RegularPolygon: de,
        Ring: ue,
        Sprite: fe,
        Star: ge,
        Text: xe,
        TextPath: ke,
        Transformer: Re,
        Wedge: Le,
        Filters: {
            Blur: function(t) {
                var e = Math.round(this.blurRadius());
                0 < e && function(t, e) {
                    var i, n, r, a, o, s, h, l, c, d, p, u, f, g, v, y, m, _, S, b, x, w, C, k, P = t.data, T = t.width, M = t.height, A = e + e + 1, G = T - 1, R = M - 1, L = e + 1, O = L * (L + 1) / 2, D = new Oe, I = null, F = D, E = null, z = null, B = De[e], W = Ie[e];
                    for (r = 1; r < A; r++)
                        F = F.next = new Oe,
                        r === L && (I = F);
                    for (F.next = D,
                    h = s = 0,
                    n = 0; n < M; n++) {
                        for (y = m = _ = S = l = c = d = p = 0,
                        u = L * (b = P[s]),
                        f = L * (x = P[s + 1]),
                        g = L * (w = P[s + 2]),
                        v = L * (C = P[s + 3]),
                        l += O * b,
                        c += O * x,
                        d += O * w,
                        p += O * C,
                        F = D,
                        r = 0; r < L; r++)
                            F.r = b,
                            F.g = x,
                            F.b = w,
                            F.a = C,
                            F = F.next;
                        for (r = 1; r < L; r++)
                            a = s + ((G < r ? G : r) << 2),
                            l += (F.r = b = P[a]) * (k = L - r),
                            c += (F.g = x = P[a + 1]) * k,
                            d += (F.b = w = P[a + 2]) * k,
                            p += (F.a = C = P[a + 3]) * k,
                            y += b,
                            m += x,
                            _ += w,
                            S += C,
                            F = F.next;
                        for (E = D,
                        z = I,
                        i = 0; i < T; i++)
                            P[s + 3] = C = p * B >> W,
                            0 !== C ? (C = 255 / C,
                            P[s] = (l * B >> W) * C,
                            P[s + 1] = (c * B >> W) * C,
                            P[s + 2] = (d * B >> W) * C) : P[s] = P[s + 1] = P[s + 2] = 0,
                            l -= u,
                            c -= f,
                            d -= g,
                            p -= v,
                            u -= E.r,
                            f -= E.g,
                            g -= E.b,
                            v -= E.a,
                            a = h + ((a = i + e + 1) < G ? a : G) << 2,
                            l += y += E.r = P[a],
                            c += m += E.g = P[a + 1],
                            d += _ += E.b = P[a + 2],
                            p += S += E.a = P[a + 3],
                            E = E.next,
                            u += b = z.r,
                            f += x = z.g,
                            g += w = z.b,
                            v += C = z.a,
                            y -= b,
                            m -= x,
                            _ -= w,
                            S -= C,
                            z = z.next,
                            s += 4;
                        h += T
                    }
                    for (i = 0; i < T; i++) {
                        for (m = _ = S = y = c = d = p = l = 0,
                        u = L * (b = P[s = i << 2]),
                        f = L * (x = P[s + 1]),
                        g = L * (w = P[s + 2]),
                        v = L * (C = P[s + 3]),
                        l += O * b,
                        c += O * x,
                        d += O * w,
                        p += O * C,
                        F = D,
                        r = 0; r < L; r++)
                            F.r = b,
                            F.g = x,
                            F.b = w,
                            F.a = C,
                            F = F.next;
                        for (o = T,
                        r = 1; r <= e; r++)
                            s = o + i << 2,
                            l += (F.r = b = P[s]) * (k = L - r),
                            c += (F.g = x = P[s + 1]) * k,
                            d += (F.b = w = P[s + 2]) * k,
                            p += (F.a = C = P[s + 3]) * k,
                            y += b,
                            m += x,
                            _ += w,
                            S += C,
                            F = F.next,
                            r < R && (o += T);
                        for (s = i,
                        E = D,
                        z = I,
                        n = 0; n < M; n++)
                            P[3 + (a = s << 2)] = C = p * B >> W,
                            0 < C ? (C = 255 / C,
                            P[a] = (l * B >> W) * C,
                            P[a + 1] = (c * B >> W) * C,
                            P[a + 2] = (d * B >> W) * C) : P[a] = P[a + 1] = P[a + 2] = 0,
                            l -= u,
                            c -= f,
                            d -= g,
                            p -= v,
                            u -= E.r,
                            f -= E.g,
                            g -= E.b,
                            v -= E.a,
                            a = i + ((a = n + L) < R ? a : R) * T << 2,
                            l += y += E.r = P[a],
                            c += m += E.g = P[a + 1],
                            d += _ += E.b = P[a + 2],
                            p += S += E.a = P[a + 3],
                            E = E.next,
                            u += b = z.r,
                            f += x = z.g,
                            g += w = z.b,
                            v += C = z.a,
                            y -= b,
                            m -= x,
                            _ -= w,
                            S -= C,
                            z = z.next,
                            s += T
                    }
                }(t, e)
            },
            Brighten: function(t) {
                var e, i = 255 * this.brightness(), n = t.data, r = n.length;
                for (e = 0; e < r; e += 4)
                    n[e] += i,
                    n[e + 1] += i,
                    n[e + 2] += i
            },
            Contrast: function(t) {
                var e, i = Math.pow((parseInt(this.contrast()) + 100) / 100, 2), n = t.data, r = n.length, a = 150, o = 150, s = 150;
                for (e = 0; e < r; e += 4)
                    a = n[e],
                    o = n[e + 1],
                    s = n[e + 2],
                    a /= 255,
                    a -= .5,
                    a *= i,
                    a += .5,
                    o /= 255,
                    o -= .5,
                    o *= i,
                    o += .5,
                    s /= 255,
                    s -= .5,
                    s *= i,
                    s += .5,
                    a = (a *= 255) < 0 ? 0 : 255 < a ? 255 : a,
                    o = (o *= 255) < 0 ? 0 : 255 < o ? 255 : o,
                    s = (s *= 255) < 0 ? 0 : 255 < s ? 255 : s,
                    n[e] = a,
                    n[e + 1] = o,
                    n[e + 2] = s
            },
            Emboss: function(t) {
                var e = 10 * this.embossStrength()
                  , i = 255 * this.embossWhiteLevel()
                  , n = this.embossDirection()
                  , r = this.embossBlend()
                  , a = 0
                  , o = 0
                  , s = t.data
                  , h = t.width
                  , l = t.height
                  , c = 4 * h
                  , d = l;
                switch (n) {
                case "top-left":
                    o = a = -1;
                    break;
                case "top":
                    a = -1,
                    o = 0;
                    break;
                case "top-right":
                    a = -1,
                    o = 1;
                    break;
                case "right":
                    a = 0,
                    o = 1;
                    break;
                case "bottom-right":
                    o = a = 1;
                    break;
                case "bottom":
                    a = 1,
                    o = 0;
                    break;
                case "bottom-left":
                    o = -(a = 1);
                    break;
                case "left":
                    a = 0,
                    o = -1;
                    break;
                default:
                    O.error("Unknown emboss direction: " + n)
                }
                do {
                    var p = (d - 1) * c
                      , u = a;
                    d + u < 1 && (u = 0),
                    l < d + u && (u = 0);
                    var f = (d - 1 + u) * h * 4
                      , g = h;
                    do {
                        var v = p + 4 * (g - 1)
                          , y = o;
                        g + y < 1 && (y = 0),
                        h < g + y && (y = 0);
                        var m = f + 4 * (g - 1 + y)
                          , _ = s[v] - s[m]
                          , S = s[v + 1] - s[m + 1]
                          , b = s[v + 2] - s[m + 2]
                          , x = _
                          , w = 0 < x ? x : -x;
                        if (w < (0 < S ? S : -S) && (x = S),
                        w < (0 < b ? b : -b) && (x = b),
                        x *= e,
                        r) {
                            var C = s[v] + x
                              , k = s[v + 1] + x
                              , P = s[v + 2] + x;
                            s[v] = 255 < C ? 255 : C < 0 ? 0 : C,
                            s[v + 1] = 255 < k ? 255 : k < 0 ? 0 : k,
                            s[v + 2] = 255 < P ? 255 : P < 0 ? 0 : P
                        } else {
                            var T = i - x;
                            T < 0 ? T = 0 : 255 < T && (T = 255),
                            s[v] = s[v + 1] = s[v + 2] = T
                        }
                    } while (--g)
                } while (--d)
            },
            Enhance: function(t) {
                var e, i, n, r, a = t.data, o = a.length, s = a[0], h = s, l = a[1], c = l, d = a[2], p = d, u = this.enhance();
                if (0 !== u) {
                    for (r = 0; r < o; r += 4)
                        (e = a[r + 0]) < s ? s = e : h < e && (h = e),
                        (i = a[r + 1]) < l ? l = i : c < i && (c = i),
                        (n = a[r + 2]) < d ? d = n : p < n && (p = n);
                    var f, g, v, y, m, _, S, b, x;
                    for (h === s && (h = 255,
                    s = 0),
                    c === l && (c = 255,
                    l = 0),
                    p === d && (p = 255,
                    d = 0),
                    x = 0 < u ? (g = h + u * (255 - h),
                    v = s - u * (s - 0),
                    m = c + u * (255 - c),
                    _ = l - u * (l - 0),
                    b = p + u * (255 - p),
                    d - u * (d - 0)) : (g = h + u * (h - (f = .5 * (h + s))),
                    v = s + u * (s - f),
                    m = c + u * (c - (y = .5 * (c + l))),
                    _ = l + u * (l - y),
                    b = p + u * (p - (S = .5 * (p + d))),
                    d + u * (d - S)),
                    r = 0; r < o; r += 4)
                        a[r + 0] = Fe(a[r + 0], s, h, v, g),
                        a[r + 1] = Fe(a[r + 1], l, c, _, m),
                        a[r + 2] = Fe(a[r + 2], d, p, x, b)
                }
            },
            Grayscale: function(t) {
                var e, i, n = t.data, r = n.length;
                for (e = 0; e < r; e += 4)
                    i = .34 * n[e] + .5 * n[e + 1] + .16 * n[e + 2],
                    n[e] = i,
                    n[e + 1] = i,
                    n[e + 2] = i
            },
            HSL: function(t) {
                var e, i, n, r, a, o = t.data, s = o.length, h = Math.pow(2, this.saturation()), l = Math.abs(this.hue() + 360) % 360, c = 127 * this.luminance(), d = 1 * h * Math.cos(l * Math.PI / 180), p = 1 * h * Math.sin(l * Math.PI / 180), u = .299 + .701 * d + .167 * p, f = .587 - .587 * d + .33 * p, g = .114 - .114 * d - .497 * p, v = .299 - .299 * d - .328 * p, y = .587 + .413 * d + .035 * p, m = .114 - .114 * d + .293 * p, _ = .299 - .3 * d + 1.25 * p, S = .587 - .586 * d - 1.05 * p, b = .114 + .886 * d - .2 * p;
                for (e = 0; e < s; e += 4)
                    i = o[e + 0],
                    n = o[e + 1],
                    r = o[e + 2],
                    a = o[e + 3],
                    o[e + 0] = u * i + f * n + g * r + c,
                    o[e + 1] = v * i + y * n + m * r + c,
                    o[e + 2] = _ * i + S * n + b * r + c,
                    o[e + 3] = a
            },
            HSV: function(t) {
                var e, i, n, r, a, o = t.data, s = o.length, h = Math.pow(2, this.value()), l = Math.pow(2, this.saturation()), c = Math.abs(this.hue() + 360) % 360, d = h * l * Math.cos(c * Math.PI / 180), p = h * l * Math.sin(c * Math.PI / 180), u = .299 * h + .701 * d + .167 * p, f = .587 * h - .587 * d + .33 * p, g = .114 * h - .114 * d - .497 * p, v = .299 * h - .299 * d - .328 * p, y = .587 * h + .413 * d + .035 * p, m = .114 * h - .114 * d + .293 * p, _ = .299 * h - .3 * d + 1.25 * p, S = .587 * h - .586 * d - 1.05 * p, b = .114 * h + .886 * d - .2 * p;
                for (e = 0; e < s; e += 4)
                    i = o[e + 0],
                    n = o[e + 1],
                    r = o[e + 2],
                    a = o[e + 3],
                    o[e + 0] = u * i + f * n + g * r,
                    o[e + 1] = v * i + y * n + m * r,
                    o[e + 2] = _ * i + S * n + b * r,
                    o[e + 3] = a
            },
            Invert: function(t) {
                var e, i = t.data, n = i.length;
                for (e = 0; e < n; e += 4)
                    i[e] = 255 - i[e],
                    i[e + 1] = 255 - i[e + 1],
                    i[e + 2] = 255 - i[e + 2]
            },
            Kaleidoscope: function(t) {
                var e, i, n, r, a, o, s, h, l, c = t.width, d = t.height, p = Math.round(this.kaleidoscopePower()), u = Math.round(this.kaleidoscopeAngle()), f = Math.floor(c * (u % 360) / 360);
                if (!(p < 1)) {
                    var g = O.createCanvasElement();
                    g.width = c,
                    g.height = d;
                    var v = g.getContext("2d").getImageData(0, 0, c, d);
                    !function(t, e, i) {
                        var n, r, a, o, s = t.data, h = e.data, l = t.width, c = t.height, d = i.polarCenterX || l / 2, p = i.polarCenterY || c / 2, u = 0, f = 0, g = 0, v = 0, y = Math.sqrt(d * d + p * p);
                        r = l - d,
                        a = c - p,
                        y = y < (o = Math.sqrt(r * r + a * a)) ? o : y;
                        var m, _, S, b, x = c, w = l, C = 360 / w * Math.PI / 180;
                        for (_ = 0; _ < w; _ += 1)
                            for (S = Math.sin(_ * C),
                            b = Math.cos(_ * C),
                            m = 0; m < x; m += 1)
                                r = Math.floor(d + y * m / x * b),
                                u = s[0 + (n = 4 * ((a = Math.floor(p + y * m / x * S)) * l + r))],
                                f = s[n + 1],
                                g = s[n + 2],
                                v = s[n + 3],
                                h[0 + (n = 4 * (_ + m * l))] = u,
                                h[n + 1] = f,
                                h[n + 2] = g,
                                h[n + 3] = v
                    }(t, v, {
                        polarCenterX: c / 2,
                        polarCenterY: d / 2
                    });
                    for (var y = c / Math.pow(2, p); y <= 8; )
                        y *= 2,
                        p -= 1;
                    var m = y = Math.ceil(y)
                      , _ = 0
                      , S = m
                      , b = 1;
                    for (c < f + y && (_ = m,
                    S = 0,
                    b = -1),
                    i = 0; i < d; i += 1)
                        for (e = _; e !== S; e += b)
                            h = 4 * (c * i + Math.round(e + f) % c),
                            r = v.data[h + 0],
                            a = v.data[h + 1],
                            o = v.data[h + 2],
                            s = v.data[h + 3],
                            l = 4 * (c * i + e),
                            v.data[l + 0] = r,
                            v.data[l + 1] = a,
                            v.data[l + 2] = o,
                            v.data[l + 3] = s;
                    for (i = 0; i < d; i += 1)
                        for (m = Math.floor(y),
                        n = 0; n < p; n += 1) {
                            for (e = 0; e < m + 1; e += 1)
                                h = 4 * (c * i + e),
                                r = v.data[h + 0],
                                a = v.data[h + 1],
                                o = v.data[h + 2],
                                s = v.data[h + 3],
                                l = 4 * (c * i + 2 * m - e - 1),
                                v.data[l + 0] = r,
                                v.data[l + 1] = a,
                                v.data[l + 2] = o,
                                v.data[l + 3] = s;
                            m *= 2
                        }
                    !function(t, e, i) {
                        var n, r, a, o, s, h, l = t.data, c = e.data, d = t.width, p = t.height, u = i.polarCenterX || d / 2, f = i.polarCenterY || p / 2, g = 0, v = 0, y = 0, m = 0, _ = Math.sqrt(u * u + f * f);
                        r = d - u,
                        a = p - f,
                        _ = _ < (h = Math.sqrt(r * r + a * a)) ? h : _;
                        var S, b, x, w = p, C = d, k = i.polarRotation || 0;
                        for (r = 0; r < d; r += 1)
                            for (a = 0; a < p; a += 1)
                                o = r - u,
                                s = a - f,
                                S = Math.sqrt(o * o + s * s) * w / _,
                                b = (b = (180 * Math.atan2(s, o) / Math.PI + 360 + k) % 360) * C / 360,
                                x = Math.floor(b),
                                g = l[0 + (n = 4 * (Math.floor(S) * d + x))],
                                v = l[n + 1],
                                y = l[n + 2],
                                m = l[n + 3],
                                c[0 + (n = 4 * (a * d + r))] = g,
                                c[n + 1] = v,
                                c[n + 2] = y,
                                c[n + 3] = m
                    }(v, t, {
                        polarRotation: 0
                    })
                }
            },
            Mask: function(t) {
                var e = function(t, e) {
                    var i = Ee(t, 0, 0)
                      , n = Ee(t, t.width - 1, 0)
                      , r = Ee(t, 0, t.height - 1)
                      , a = Ee(t, t.width - 1, t.height - 1)
                      , o = e || 10;
                    if (ze(i, n) < o && ze(n, a) < o && ze(a, r) < o && ze(r, i) < o) {
                        for (var s = function(t) {
                            for (var e = [0, 0, 0], i = 0; i < t.length; i++)
                                e[0] += t[i][0],
                                e[1] += t[i][1],
                                e[2] += t[i][2];
                            return e[0] /= t.length,
                            e[1] /= t.length,
                            e[2] /= t.length,
                            e
                        }([n, i, a, r]), h = [], l = 0; l < t.width * t.height; l++) {
                            var c = ze(s, [t.data[4 * l], t.data[4 * l + 1], t.data[4 * l + 2]]);
                            h[l] = c < o ? 0 : 255
                        }
                        return h
                    }
                }(t, this.threshold());
                return e && function(t, e) {
                    for (var i = 0; i < t.width * t.height; i++)
                        t.data[4 * i + 3] = e[i]
                }(t, e = function(t, e, i) {
                    for (var n = [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9], r = Math.round(Math.sqrt(n.length)), a = Math.floor(r / 2), o = [], s = 0; s < i; s++)
                        for (var h = 0; h < e; h++) {
                            for (var l = s * e + h, c = 0, d = 0; d < r; d++)
                                for (var p = 0; p < r; p++) {
                                    var u = s + d - a
                                      , f = h + p - a;
                                    if (0 <= u && u < i && 0 <= f && f < e) {
                                        var g = n[d * r + p];
                                        c += t[u * e + f] * g
                                    }
                                }
                            o[l] = c
                        }
                    return o
                }(e = function(t, e, i) {
                    for (var n = [1, 1, 1, 1, 1, 1, 1, 1, 1], r = Math.round(Math.sqrt(n.length)), a = Math.floor(r / 2), o = [], s = 0; s < i; s++)
                        for (var h = 0; h < e; h++) {
                            for (var l = s * e + h, c = 0, d = 0; d < r; d++)
                                for (var p = 0; p < r; p++) {
                                    var u = s + d - a
                                      , f = h + p - a;
                                    if (0 <= u && u < i && 0 <= f && f < e) {
                                        var g = n[d * r + p];
                                        c += t[u * e + f] * g
                                    }
                                }
                            o[l] = 1020 <= c ? 255 : 0
                        }
                    return o
                }(e = function(t, e, i) {
                    for (var n = [1, 1, 1, 1, 0, 1, 1, 1, 1], r = Math.round(Math.sqrt(n.length)), a = Math.floor(r / 2), o = [], s = 0; s < i; s++)
                        for (var h = 0; h < e; h++) {
                            for (var l = s * e + h, c = 0, d = 0; d < r; d++)
                                for (var p = 0; p < r; p++) {
                                    var u = s + d - a
                                      , f = h + p - a;
                                    if (0 <= u && u < i && 0 <= f && f < e) {
                                        var g = n[d * r + p];
                                        c += t[u * e + f] * g
                                    }
                                }
                            o[l] = 2040 === c ? 255 : 0
                        }
                    return o
                }(e, t.width, t.height), t.width, t.height), t.width, t.height)),
                t
            },
            Noise: function(t) {
                var e, i = 255 * this.noise(), n = t.data, r = n.length, a = i / 2;
                for (e = 0; e < r; e += 4)
                    n[e + 0] += a - 2 * a * Math.random(),
                    n[e + 1] += a - 2 * a * Math.random(),
                    n[e + 2] += a - 2 * a * Math.random()
            },
            Pixelate: function(t) {
                var e, i, n, r, a, o, s, h, l, c, d, p, u, f, g = Math.ceil(this.pixelSize()), v = t.width, y = t.height, m = Math.ceil(v / g), _ = Math.ceil(y / g);
                if (t = t.data,
                g <= 0)
                    O.error("pixelSize value can not be <= 0");
                else
                    for (p = 0; p < m; p += 1)
                        for (u = 0; u < _; u += 1) {
                            for (l = (h = p * g) + g,
                            d = (c = u * g) + g,
                            f = s = o = a = r = 0,
                            e = h; e < l; e += 1)
                                if (!(v <= e))
                                    for (i = c; i < d; i += 1)
                                        y <= i || (r += t[0 + (n = 4 * (v * i + e))],
                                        a += t[n + 1],
                                        o += t[n + 2],
                                        s += t[n + 3],
                                        f += 1);
                            for (r /= f,
                            a /= f,
                            o /= f,
                            s /= f,
                            e = h; e < l; e += 1)
                                if (!(v <= e))
                                    for (i = c; i < d; i += 1)
                                        y <= i || (t[0 + (n = 4 * (v * i + e))] = r,
                                        t[n + 1] = a,
                                        t[n + 2] = o,
                                        t[n + 3] = s)
                        }
            },
            Posterize: function(t) {
                var e, i = Math.round(254 * this.levels()) + 1, n = t.data, r = n.length, a = 255 / i;
                for (e = 0; e < r; e += 1)
                    n[e] = Math.floor(n[e] / a) * a
            },
            RGB: function(t) {
                var e, i, n = t.data, r = n.length, a = this.red(), o = this.green(), s = this.blue();
                for (e = 0; e < r; e += 4)
                    i = (.34 * n[e] + .5 * n[e + 1] + .16 * n[e + 2]) / 255,
                    n[e] = i * a,
                    n[e + 1] = i * o,
                    n[e + 2] = i * s,
                    n[e + 3] = n[e + 3]
            },
            RGBA: function(t) {
                var e, i, n = t.data, r = n.length, a = this.red(), o = this.green(), s = this.blue(), h = this.alpha();
                for (e = 0; e < r; e += 4)
                    i = 1 - h,
                    n[e] = a * h + n[e] * i,
                    n[e + 1] = o * h + n[e + 1] * i,
                    n[e + 2] = s * h + n[e + 2] * i
            },
            Sepia: function(t) {
                var e, i, n, r, a = t.data, o = a.length;
                for (e = 0; e < o; e += 4)
                    i = a[e + 0],
                    n = a[e + 1],
                    r = a[e + 2],
                    a[e + 0] = Math.min(255, .393 * i + .769 * n + .189 * r),
                    a[e + 1] = Math.min(255, .349 * i + .686 * n + .168 * r),
                    a[e + 2] = Math.min(255, .272 * i + .534 * n + .131 * r)
            },
            Solarize: function(t) {
                var e = t.data
                  , i = t.width
                  , n = 4 * i
                  , r = t.height;
                do {
                    var a = (r - 1) * n
                      , o = i;
                    do {
                        var s = a + 4 * (o - 1)
                          , h = e[s]
                          , l = e[s + 1]
                          , c = e[s + 2];
                        127 < h && (h = 255 - h),
                        127 < l && (l = 255 - l),
                        127 < c && (c = 255 - c),
                        e[s] = h,
                        e[s + 1] = l,
                        e[s + 2] = c
                    } while (--o)
                } while (--r)
            },
            Threshold: function(t) {
                var e, i = 255 * this.threshold(), n = t.data, r = n.length;
                for (e = 0; e < r; e += 1)
                    n[e] = n[e] < i ? 0 : 255
            }
        }
    })
 });
 