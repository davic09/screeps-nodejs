import chai from "chai";
const expect = chai.expect;
const should = chai.should();
import { MemoryCleaner } from "../../../src/utils/MemoryCleaner";
import { Game, getFakeCreep, Memory } from "../mock";

describe("MemoryCleaner", () => {
    let memoryCleaner;

    beforeEach(() => {
        global.Game = _.clone(Game);
        global.Memory = _.clone(Memory);

        memoryCleaner = new MemoryCleaner();
    });

    it("should remove creeps from memory when they are no longer alive in the game", () => {
        const creep1 = getFakeCreep();
        const creep2 = getFakeCreep();

        global.Game.creeps = {
            creep2
        };

        global.Memory.creeps = {
            creep1,
            creep2
        };

        memoryCleaner.purge();

        expect(global.Memory.creeps).to.not.haveOwnProperty("creep1");
        expect(global.Memory.creeps.creep2).to.not.be.undefined;
    });
});