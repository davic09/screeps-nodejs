"use strict";

const miner = require("./roles/miner");
const builder = require("./roles/builder");
const upgrader = require("./roles/upgrader");
const fueler = require("./roles/fueler");
const spawner = require("./spawn/spawner");
const creepcleaner = require("./creepcleaner")

module.exports.loop = function () {
  console.log(`Current game tick is ${Game.time}`);
  for (var name in Game.creeps) {
    const creep = Game.creeps[name];
    if (creep.memory.role == "miner") {
      miner.run(creep);
    }
    if (creep.memory.role == "upgrader") {
      upgrader.run(creep);
    }
    if (creep.memory.role == "builder") {
      builder.run(creep);
    }
    if (creep.memory.role == "fueler") {
      fueler.run(creep);
    }
  }
  spawner.run();
  creepcleaner.run();
};