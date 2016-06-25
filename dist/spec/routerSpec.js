"use strict";
/// <reference path="../typings/globals/jasmine/index.d.ts" />
var router_1 = require('../src/router');
describe("Router Clean", function () {
    var router;
    beforeEach(function () {
        router = new router_1.default();
    });
    it("additional starting slashes are removed", function () {
        expect(router.clean("//nobts")).toBe("/nobts");
    });
    it("slashes at the end are removed", function () {
        expect(router.clean("/nobts/")).toBe("/nobts");
    });
});
//# sourceMappingURL=routerSpec.js.map