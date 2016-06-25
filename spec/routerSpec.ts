/// <reference path="../typings/globals/jasmine/index.d.ts" />
import Router from '../src/router';

describe("Router Clean", function () {
    var router;

    beforeEach(function () {
        router = new Router();
    });

    it("additional starting slashes are removed", function () {
        expect(router.clean("//nobts")).toBe("/nobts");
    });

    it("slashes at the end are removed", function () {
        expect(router.clean("/nobts/")).toBe("/nobts");
    });
});