export default class Router {
    private root;
    private routes;
    private interval;
    private clean(url);
    private getFragment();
    add(route: RegExp, handler: any): Router;
    check(fragment?: string): Router;
    listen(): Router;
    navigate(path?: string): Router;
}
