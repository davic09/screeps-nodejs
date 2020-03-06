const expect = require("chai").expect;
const getreqd = require("../../tools/getreqd");

describe("getreqd", () => {
    describe("should fix require statements from relative to screeps flat type", () => {

        it("should not append anything to root directory files: src/main.js, require('./main') == './main'", () => {
            const result = getreqd.convertRequirePathToScreepsPath('../../src/main', 'src');
            expect(result).to.be.equal.to('./main');
        });

        it("should resolve correctly for files in a nested directory: src/folder1/myfile, require('./myfile') == './folder1_myfile'", () => {
            const result = getreqd.convertRequirePathToScreepsPath('../../src/utils/MemoryCleaner', 'src');
            expect(result).to.be.equal.to('./utils_MemoryCleaner');
        });

        it("should not resolve non-relative paths: require('lodash') == lodash", () => {
            const result = getreqd.convertRequirePathToScreepsPath("lodash", "src");
            expect(result).to.be.equal.to("lodash");
        });

        it("should break if the file cannot be found", () => {
            const method = () => getreqd.convertRequirePathToScreepsPath('./my/fake/file');
            expect(method).to.throw(Error);
        })
    });
})