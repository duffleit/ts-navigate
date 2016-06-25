export default class Router {

    private root:string = '/';
    private routes:any = [];
    private interval:any;

    private clean(url:string | RegExp):any {
        if (url instanceof RegExp) return url;
        return url.toString().replace(/\/+$/, '').replace(/^\/+/, '/');
    }

    private getFragment():string {
        var fragment = this.clean(decodeURI(location.pathname + location.search));
        fragment = fragment.replace(/\?(.*)$/, '');
        fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment;
        return this.clean(fragment);
    }

    public add(route:RegExp, handler:any):Router {
        this.routes.push({re: route, handler: handler});
        return this;
    }

    public check(fragment?:string):Router {
        if (fragment == null) fragment = this.getFragment();
        for (var i = 0; i < this.routes.length; i++) {
            var match = fragment.match(this.routes[i].re);
            if (match) {
                match.shift();
                this.routes[i].handler.apply({}, match);
                return this;
            }
        }
        return this;
    }

    public listen():Router {
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
    }

    public navigate(path?:string):Router {
        path = path != null ? path : '';
        history.pushState(null, null, this.root + this.clean(path));
        return this;
    }
}