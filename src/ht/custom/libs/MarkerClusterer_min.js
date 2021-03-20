var BMapLib = window.BMapLib = BMapLib || {}; (function () { var d, c = d = c || { version: "1.3.8" }; (function () { c.guid = "$BAIDU$"; window[c.guid] = window[c.guid] || {}; c.dom = c.dom || {}; c.dom.g = function (f) { if ("string" == typeof f || f instanceof String) { return document.getElementById(f) } else { if (f && f.nodeName && (f.nodeType == 1 || f.nodeType == 9)) { return f } } return null }; c.g = c.G = c.dom.g; c.dom.getDocument = function (f) { f = c.dom.g(f); return f.nodeType == 9 ? f : f.ownerDocument || f.document }; c.lang = c.lang || {}; c.lang.isString = function (f) { return "[object String]" == Object.prototype.toString.call(f) }; c.isString = c.lang.isString; c.dom._g = function (f) { if (c.lang.isString(f)) { return document.getElementById(f) } return f }; c._g = c.dom._g; c.browser = c.browser || {}; if (/msie (\d+\.\d)/i.test(navigator.userAgent)) { c.browser.ie = c.ie = document.documentMode || +RegExp["\x241"] } c.dom.getComputedStyle = function (g, f) { g = c.dom._g(g); var i = c.dom.getDocument(g), h; if (i.defaultView && i.defaultView.getComputedStyle) { h = i.defaultView.getComputedStyle(g, null); if (h) { return h[f] || h.getPropertyValue(f) } } return "" }; c.dom._styleFixer = c.dom._styleFixer || {}; c.dom._styleFilter = c.dom._styleFilter || []; c.dom._styleFilter.filter = function (g, k, l) { for (var f = 0, j = c.dom._styleFilter, h; h = j[f]; f++) { if (h = h[l]) { k = h(g, k) } } return k }; c.string = c.string || {}; c.string.toCamelCase = function (f) { if (f.indexOf("-") < 0 && f.indexOf("_") < 0) { return f } return f.replace(/[-_][^-_]/g, function (g) { return g.charAt(1).toUpperCase() }) }; c.dom.getStyle = function (h, g) { var j = c.dom; h = j.g(h); g = c.string.toCamelCase(g); var i = h.style[g] || (h.currentStyle ? h.currentStyle[g] : "") || j.getComputedStyle(h, g); if (!i) { var f = j._styleFixer[g]; if (f) { i = f.get ? f.get(h) : c.dom.getStyle(h, f) } } if (f = j._styleFilter) { i = f.filter(g, i, "get") } return i }; c.getStyle = c.dom.getStyle; if (/opera\/(\d+\.\d)/i.test(navigator.userAgent)) { c.browser.opera = +RegExp["\x241"] } c.browser.isWebkit = /webkit/i.test(navigator.userAgent); c.browser.isGecko = /gecko/i.test(navigator.userAgent) && !/like gecko/i.test(navigator.userAgent); c.browser.isStrict = document.compatMode == "CSS1Compat"; c.dom.getPosition = function (f) { f = c.dom.g(f); var o = c.dom.getDocument(f), i = c.browser, l = c.dom.getStyle, h = i.isGecko > 0 && o.getBoxObjectFor && l(f, "position") == "absolute" && (f.style.top === "" || f.style.left === ""), m = { left: 0, top: 0 }, k = (i.ie && !i.isStrict) ? o.body : o.documentElement, p, g; if (f == k) { return m } if (f.getBoundingClientRect) { g = f.getBoundingClientRect(); m.left = Math.floor(g.left) + Math.max(o.documentElement.scrollLeft, o.body.scrollLeft); m.top = Math.floor(g.top) + Math.max(o.documentElement.scrollTop, o.body.scrollTop); m.left -= o.documentElement.clientLeft; m.top -= o.documentElement.clientTop; var n = o.body, q = parseInt(l(n, "borderLeftWidth")), j = parseInt(l(n, "borderTopWidth")); if (i.ie && !i.isStrict) { m.left -= isNaN(q) ? 2 : q; m.top -= isNaN(j) ? 2 : j } } else { p = f; do { m.left += p.offsetLeft; m.top += p.offsetTop; if (i.isWebkit > 0 && l(p, "position") == "fixed") { m.left += o.body.scrollLeft; m.top += o.body.scrollTop; break } p = p.offsetParent } while (p && p != f); if (i.opera > 0 || (i.isWebkit > 0 && l(f, "position") == "absolute")) { m.top -= o.body.offsetTop } p = f.offsetParent; while (p && p != o.body) { m.left -= p.scrollLeft; if (!i.opera || p.tagName != "TR") { m.top -= p.scrollTop } p = p.offsetParent } } return m }; c.event = c.event || {}; c.event._listeners = c.event._listeners || []; c.event.on = function (g, j, l) { j = j.replace(/^on/i, ""); g = c.dom._g(g); var k = function (n) { l.call(g, n) }, f = c.event._listeners, i = c.event._eventFilter, m, h = j; j = j.toLowerCase(); if (i && i[j]) { m = i[j](g, j, k); h = m.type; k = m.listener } if (g.addEventListener) { g.addEventListener(h, k, false) } else { if (g.attachEvent) { g.attachEvent("on" + h, k) } } f[f.length] = [g, j, l, k, h]; return g }; c.on = c.event.on; (function () { var f = window[c.guid]; c.lang.guid = function () { return "TANGRAM__" + (f._counter++).toString(36) }; f._counter = f._counter || 1 })(); window[c.guid]._instances = window[c.guid]._instances || {}; c.lang.isFunction = function (f) { return "[object Function]" == Object.prototype.toString.call(f) }; c.lang.Class = function (f) { this.guid = f || c.lang.guid(); window[c.guid]._instances[this.guid] = this }; window[c.guid]._instances = window[c.guid]._instances || {}; c.lang.Class.prototype.dispose = function () { delete window[c.guid]._instances[this.guid]; for (var f in this) { if (!c.lang.isFunction(this[f])) { delete this[f] } } this.disposed = true }; c.lang.Class.prototype.toString = function () { return "[object " + (this._className || "Object") + "]" }; c.lang.Event = function (f, g) { this.type = f; this.returnValue = true; this.target = g || null; this.currentTarget = null }; c.lang.Class.prototype.addEventListener = function (i, h, g) { if (!c.lang.isFunction(h)) { return } !this.__listeners && (this.__listeners = {}); var f = this.__listeners, j; if (typeof g == "string" && g) { if (/[^\w\-]/.test(g)) { throw ("nonstandard key:" + g) } else { h.hashCode = g; j = g } } i.indexOf("on") != 0 && (i = "on" + i); typeof f[i] != "object" && (f[i] = {}); j = j || c.lang.guid(); h.hashCode = j; f[i][j] = h }; c.lang.Class.prototype.removeEventListener = function (i, h) { if (typeof h != "undefined") { if ((c.lang.isFunction(h) && !(h = h.hashCode)) || (!c.lang.isString(h))) { return } } !this.__listeners && (this.__listeners = {}); i.indexOf("on") != 0 && (i = "on" + i); var g = this.__listeners; if (!g[i]) { return } if (typeof h != "undefined") { g[i][h] && delete g[i][h] } else { for (var f in g[i]) { delete g[i][f] } } }; c.lang.Class.prototype.dispatchEvent = function (j, f) { if (c.lang.isString(j)) { j = new c.lang.Event(j) } !this.__listeners && (this.__listeners = {}); f = f || {}; for (var h in f) { j[h] = f[h] } var h, g = this.__listeners, k = j.type; j.target = j.target || this; j.currentTarget = this; k.indexOf("on") != 0 && (k = "on" + k); c.lang.isFunction(this[k]) && this[k].apply(this, arguments); if (typeof g[k] == "object") { for (h in g[k]) { g[k][h].apply(this, arguments) } } return j.returnValue }; c.lang.inherits = function (l, j, i) { var h, k, f = l.prototype, g = new Function(); g.prototype = j.prototype; k = l.prototype = new g(); for (h in f) { k[h] = f[h] } l.prototype.constructor = l; l.superClass = j.prototype; if ("string" == typeof i) { k._className = i } }; c.inherits = c.lang.inherits })(); var b = "http://api.map.baidu.com/library/TextIconOverlay/1.2/src/images/m"; var a = "png"; var e = BMapLib.TextIconOverlay = function (f, h, g) { this._position = f; this._text = h; this._options = g || {}; this._styles = this._options.styles || []; (!this._styles.length) && this._setupDefaultStyles() }; d.lang.inherits(e, BMap.Overlay, "TextIconOverlay"); e.prototype._setupDefaultStyles = function () { var h = [53, 56, 66, 78, 90]; for (var g = 0, f; f = h[g]; g++) { this._styles.push({ url: b + g + "." + a, size: new BMap.Size(f, f) }) } }; e.prototype.initialize = function (f) { this._map = f; this._domElement = document.createElement("div"); this._updateCss(); this._updateText(); this._updatePosition(); this._bind(); this._map.getPanes().markerMouseTarget.appendChild(this._domElement); return this._domElement }; e.prototype.draw = function () { this._map && this._updatePosition() }; e.prototype.getText = function () { return this._text }; e.prototype.setText = function (f) { if (f && (!this._text || (this._text.toString() != f.toString()))) { this._text = f; this._updateText(); this._updateCss(); this._updatePosition() } }; e.prototype.getPosition = function () { return this._position }; e.prototype.setPosition = function (f) { if (f && (!this._position || !this._position.equals(f))) { this._position = f; this._updatePosition() } }; e.prototype.getStyleByText = function (i, h) { var g = parseInt(i); var f = parseInt(g / 10); f = Math.max(0, f); f = Math.min(f, h.length - 1); return h[f] }; e.prototype._updateCss = function () { var f = this.getStyleByText(this._text, this._styles); this._domElement.style.cssText = this._buildCssText(f) }; e.prototype._updateText = function () { if (this._domElement) { this._domElement.innerHTML = this._text } }; e.prototype._updatePosition = function () { if (this._domElement && this._position) { var f = this._domElement.style; var g = this._map.pointToOverlayPixel(this._position); g.x -= Math.ceil(parseInt(f.width) / 2); g.y -= Math.ceil(parseInt(f.height) / 2); f.left = g.x + "px"; f.top = g.y + "px" } }; e.prototype._buildCssText = function (g) { var h = g.url; var n = g.size; var k = g.anchor; var j = g.offset; var l = g.textColor || "black"; var f = g.textSize || 10; var m = []; if (d.browser.ie < 7) { m.push('filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="' + h + '");') } else { m.push("background-image:url(" + h + ");"); var i = "0 0"; (j instanceof BMap.Size) && (i = j.width + "px " + j.height + "px"); m.push("background-position:" + i + ";") } if (n instanceof BMap.Size) { if (k instanceof BMap.Size) { if (k.height > 0 && k.height < n.height) { m.push("height:" + (n.height - k.height) + "px; padding-top:" + k.height + "px;") } if (k.width > 0 && k.width < n.width) { m.push("width:" + (n.width - k.width) + "px; padding-left:" + k.width + "px;") } } else { m.push("height:" + n.height + "px; line-height:" + n.height + "px;"); m.push("width:" + n.width + "px; text-align:center;") } } m.push("cursor:pointer; color:" + l + "; position:absolute; font-size:" + f + "px; font-family:Arial,sans-serif; font-weight:bold"); return m.join("") }; e.prototype._bind = function () { if (!this._domElement) { return } var g = this; var i = this._map; var f = d.lang.Event; function h(m, l) { var k = m.srcElement || m.target; var j = m.clientX || m.pageX; var o = m.clientY || m.pageY; if (m && l && j && o && k) { var n = d.dom.getPosition(i.getContainer()); l.pixel = new BMap.Pixel(j - n.left, o - n.top); l.point = i.pixelToPoint(l.pixel) } return l } d.event.on(this._domElement, "mouseover", function (j) { g.dispatchEvent(h(j, new f("onmouseover"))) }); d.event.on(this._domElement, "mouseout", function (j) { g.dispatchEvent(h(j, new f("onmouseout"))) }); d.event.on(this._domElement, "click", function (j) { g.dispatchEvent(h(j, new f("onclick"))) }); d.event.on(this._domElement, "touchend", function (j) { g.dispatchEvent(h(j, new f("onclick"))) }) } })();


"use strict"; var BMapLib = window.BMapLib = BMapLib || {}; !function () { function t(t) { var e = this; this._markerClusterer = t, this._map = t.getMap(), this._minClusterSize = t.getMinClusterSize(), this._isAverageCenter = t.isAverageCenter(), this._center = null, this._markers = [], this._gridBounds = null, this._isReal = !1, this._clusterMarker = new BMapLib.TextIconOverlay(this._center, this._markers.length, { styles: this._markerClusterer.getStyles() }), this._clusterMarker.addEventListener("click", function (t) { var r = e.getBounds(); e._map.setViewport(r) }) } var e = function (t, e, s) { e = r(e); var i = t.pointToPixel(e.getNorthEast()), a = t.pointToPixel(e.getSouthWest()); i.x += s, i.y -= s, a.x -= s, a.y += s; var n = t.pixelToPoint(i), o = t.pixelToPoint(a); return new BMap.Bounds(o, n) }, r = function (t) { var e = s(t.getNorthEast().lng, -180, 180), r = s(t.getSouthWest().lng, -180, 180), i = s(t.getNorthEast().lat, -74, 74), a = s(t.getSouthWest().lat, -74, 74); return new BMap.Bounds(new BMap.Point(r, a), new BMap.Point(e, i)) }, s = function (t, e, r) { return e && (t = Math.max(t, e)), r && (t = Math.min(t, r)), t }, i = function (t) { return "[object Array]" === Object.prototype.toString.call(t) }, a = function (t, e) { var r = -1; if (i(e)) if (e.indexOf) r = e.indexOf(t); else for (var s, a = 0; s = e[a]; a++)if (s === t) { r = a; break } return r }, n = BMapLib.MarkerClusterer = function (t, e) { if (t) { this._map = t, this._markers = [], this._clusters = []; var r = e || {}; this._gridSize = r.gridSize || 60, this._maxZoom = r.maxZoom || 18, this._minClusterSize = r.minClusterSize || 2, this._isAverageCenter = !1, void 0 != r.isAverageCenter && (this._isAverageCenter = r.isAverageCenter), this._styles = r.styles || []; var s = this; this._map.addEventListener("zoomend", function () { s._redraw() }), this._map.addEventListener("moveend", function () { s._redraw() }); var a = r.markers; i(a) && a.length && this.addMarkers(a) } }; n.prototype.addMarkers = function (t) { for (var e = 0, r = t.length; e < r; e++)this._pushMarkerTo(t[e]); this._createClusters() }, n.prototype._pushMarkerTo = function (t) { -1 === a(t, this._markers) && (t.isInCluster = !1, this._markers.push(t)) }, n.prototype.addMarker = function (t) { this._pushMarkerTo(t), this._createClusters() }, n.prototype._createClusters = function () { for (var t, r = this._map.getBounds(), s = e(this._map, r, this._gridSize), i = 0; t = this._markers[i]; i++)!t.isInCluster && s.containsPoint(t.getPosition()) && this._addToClosestCluster(t) }, n.prototype._addToClosestCluster = function (e) { for (var r, s = 4e6, i = null, a = (e.getPosition(), 0); r = this._clusters[a]; a++) { var n = r.getCenter(); if (n) { var o = this._map.getDistance(n, e.getPosition()); o < s && (s = o, i = r) } } if (i && i.isMarkerInClusterBounds(e)) i.addMarker(e); else { var r = new t(this); r.addMarker(e), this._clusters.push(r) } }, n.prototype._clearLastClusters = function () { for (var t, e = 0; t = this._clusters[e]; e++)t.remove(); this._clusters = [], this._removeMarkersFromCluster() }, n.prototype._removeMarkersFromCluster = function () { for (var t, e = 0; t = this._markers[e]; e++)t.isInCluster = !1 }, n.prototype._removeMarkersFromMap = function () { for (var t, e = 0; t = this._markers[e]; e++) { t.isInCluster = !1; var r = t.getLabel(); this._map.removeOverlay(t), t.setLabel(r) } }, n.prototype._removeMarker = function (t) { var e = a(t, this._markers); if (-1 === e) return !1; var r = t.getLabel(); return this._map.removeOverlay(t), t.setLabel(r), this._markers.splice(e, 1), !0 }, n.prototype.removeMarker = function (t) { var e = this._removeMarker(t); return e && (this._clearLastClusters(), this._createClusters()), e }, n.prototype.removeMarkers = function (t) { for (var e = !1, r = 0; r < t.length; r++) { var s = this._removeMarker(t[r]); e = e || s } return e && (this._clearLastClusters(), this._createClusters()), e }, n.prototype.clearMarkers = function () { this._clearLastClusters(), this._removeMarkersFromMap(), this._markers = [] }, n.prototype._redraw = function () { this._clearLastClusters(), this._createClusters() }, n.prototype.getGridSize = function () { return this._gridSize }, n.prototype.setGridSize = function (t) { this._gridSize = t, this._redraw() }, n.prototype.getMaxZoom = function () { return this._maxZoom }, n.prototype.setMaxZoom = function (t) { this._maxZoom = t, this._redraw() }, n.prototype.getStyles = function () { return this._styles }, n.prototype.setStyles = function (t) { this._styles = t, this._redraw() }, n.prototype.getMinClusterSize = function () { return this._minClusterSize }, n.prototype.setMinClusterSize = function (t) { this._minClusterSize = t, this._redraw() }, n.prototype.isAverageCenter = function () { return this._isAverageCenter }, n.prototype.getMap = function () { return this._map }, n.prototype.getMarkers = function () { return this._markers }, n.prototype.getClustersCount = function () { for (var t, e = 0, r = 0; t = this._clusters[r]; r++)t.isReal() && e++; return e }, t.prototype.addMarker = function (t) { if (this.isMarkerInCluster(t)) return !1; if (this._center) { if (this._isAverageCenter) { var e = this._markers.length + 1, r = (this._center.lat * (e - 1) + t.getPosition().lat) / e, s = (this._center.lng * (e - 1) + t.getPosition().lng) / e; this._center = new BMap.Point(s, r), this.updateGridBounds() } } else this._center = t.getPosition(), this.updateGridBounds(); t.isInCluster = !0, this._markers.push(t); var i = this._markers.length; if (i < this._minClusterSize) return this._map.addOverlay(t), !0; if (i === this._minClusterSize) for (var a = 0; a < i; a++) { var n = this._markers[a].getLabel(); this._markers[a].getMap() && this._map.removeOverlay(this._markers[a]), this._markers[a].setLabel(n) } return this._map.addOverlay(this._clusterMarker), this._isReal = !0, this.updateClusterMarker(), !0 }, t.prototype.isMarkerInCluster = function (t) { if (this._markers.indexOf) return -1 != this._markers.indexOf(t); for (var e, r = 0; e = this._markers[r]; r++)if (e === t) return !0; return !1 }, t.prototype.isMarkerInClusterBounds = function (t) { return this._gridBounds.containsPoint(t.getPosition()) }, t.prototype.isReal = function (t) { return this._isReal }, t.prototype.updateGridBounds = function () { var t = new BMap.Bounds(this._center, this._center); this._gridBounds = e(this._map, t, this._markerClusterer.getGridSize()) }, t.prototype.updateClusterMarker = function () { if (this._map.getZoom() > this._markerClusterer.getMaxZoom()) { this._clusterMarker && this._map.removeOverlay(this._clusterMarker); for (var t, e = 0; t = this._markers[e]; e++)this._map.addOverlay(t) } else { if (this._markers.length < this._minClusterSize) return void this._clusterMarker.hide(); this._clusterMarker.setPosition(this._center), this._clusterMarker.setText(this._markers.length) } }, t.prototype.remove = function () { for (var t = 0; this._markers[t]; t++) { var e = this._markers[t].getLabel(); this._markers[t].getMap() && this._map.removeOverlay(this._markers[t]), this._markers[t].setLabel(e) } this._map.removeOverlay(this._clusterMarker), this._markers.length = 0, delete this._markers }, t.prototype.getBounds = function () { for (var t, e = new BMap.Bounds(this._center, this._center), r = 0; t = this._markers[r]; r++)e.extend(t.getPosition()); return e }, t.prototype.getCenter = function () { return this._center } }();