const expect = require("chai").expect;
const getreqd = require("../../tools/getreqd");

describe("getreqd", () => {
  describe("should fix require statements from relative to screeps flat type", () => {
    it("should not append anything to root directory files", () => {
      const sourceFile = process.cwd() + "/src/utils/MemoryCleaner.js";
      const requirePath = "../main";
      const baseDir = "src";
      const result = getreqd.convertRequirePathToScreepsPath(sourceFile, requirePath, baseDir);
      expect(result).to.be.equal("main");
    });

    it("should resolve correctly for files in a nested directory", () => {
      const sourceFile = process.cwd() + "/src/utils/MemoryCleaner.js";
      const requirePath = "../prototype/room";
      const baseDir = "src";
      const result = getreqd.convertRequirePathToScreepsPath(sourceFile, requirePath, baseDir);
      expect(result).to.be.equal("prototype_room");
    });

    it("should not resolve non-relative paths: require('lodash') == lodash", () => {
      const sourceFile = process.cwd() + "/src/utils/MemoryCleaner.js";
      const requirePath = "lodash";
      const baseDir = "src";
      const result = getreqd.convertRequirePathToScreepsPath(sourceFile, requirePath, baseDir);
      expect(result).to.be.equal("lodash");
    });
  });
});
