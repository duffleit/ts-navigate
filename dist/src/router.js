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
//# sourceMappingURL=router.js.map