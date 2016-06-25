import Router from '../src/router'

(function () {

    var router = new Router();

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
