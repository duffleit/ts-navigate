(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var router_1 = require('../src/router');
(function () {
    var router = new router_1.default();
    router
        .add(/about/, function () {
        console.log('about');
    })
        .add(/products\/(.*)\/edit\/(.*)/, function () {
        console.log('products', arguments);
    })
        .add(/test/, function () {
        console.log('default');
    })
        .check().listen();
    router.navigate("about");
})();

},{"../src/router":2}],2:[function(require,module,exports){
"use strict";
var Router = (function () {
    function Router() {
        this.root = '/';
        this.routes = [];
    }
    Router.prototype.clean = function (url) {
        if (url instanceof RegExp)
            return url;
        return url.toString().replace(/\/+$/, '').replace(/^\/+/, '/');
    };
    Router.prototype.getFragment = function () {
        var fragment = this.clean(decodeURI(location.pathname + location.search));
        fragment = fragment.replace(/\?(.*)$/, '');
        fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment;
        return this.clean(fragment);
    };
    Router.prototype.add = function (route, handler) {
        this.routes.push({ re: route, handler: handler });
        return this;
    };
    Router.prototype.check = function (fragment) {
        if (fragment == null)
            fragment = this.getFragment();
        for (var i = 0; i < this.routes.length; i++) {
            var match = fragment.match(this.routes[i].re);
            if (match) {
                match.shift();
                this.routes[i].handler.apply({}, match);
                return this;
            }
        }
        return this;
    };
    Router.prototype.listen = function () {
        var self = this;
        var current = self.getFragment();
        var fn = function () {
            if (current !== self.getFragment()) {
                current = self.getFragment();
                self.check(current);
            }
        };
        clearInterval(this.interval);
        this.interval = setInterval(fn, 50);
        return this;
    };
    Router.prototype.navigate = function (path) {
        path = path != null ? path : '';
        history.pushState(null, null, this.root + this.clean(path));
        return this;
    };
    return Router;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Router;

},{}]},{},[1]);
