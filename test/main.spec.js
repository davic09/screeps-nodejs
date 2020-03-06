const expect = require("chai").expect;
const main = require("../src/main");

describe("main", () => {
    it("should export a loop function", () => {
        expect(main.loop).to.be.a("function");
    });
});