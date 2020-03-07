const { expect } = require("chai");
const { getFakeRoom } = require("../mock");

describe("room", () => {
  let room;

  beforeEach(() => {
    room = getFakeRoom("E01S01");
  });

  it("should have an execute method", () => {
    expect(room.execute).to.be.a("function");
  });
});
