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
//# sourceMappingURL=smokeTest.js.map