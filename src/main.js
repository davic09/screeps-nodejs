"use strict";

const miner = require("./roles/miner");
const repairer = require("./roles/repairer");
const builder = require("./roles/builder");
const upgrader = require("./roles/upgrader");
const fueler = require("./roles/fueler");
const attacker = require("./roles/attacker");
const spawner = require("./spawn/spawner");
const creepcleaner = require("./creepcleaner")
const safemode = require("./safemode");
const tower = require("./structures/tower");

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
    if (creep.memory.role == "attacker") {
      attacker.run(creep);
    }
    if (creep.memory.role == "repairer") {
      repairer.run(creep);
    }
  }
  spawner.run();
  creepcleaner.run();
  safemode.run();
  tower.run();
};