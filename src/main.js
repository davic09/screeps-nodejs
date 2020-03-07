/**
 * Main module for providing a loop entrypoint for the Screeps engine.
 */
// "use strict";

// const Brain = require("./Brain");
// const MemoryCleaner = require("./utils/MemoryCleaner");

// const memoryCleaner = new MemoryCleaner();
// let brain = new Brain(memoryCleaner);

// /**
//  * This is the logic loop function.
//  */
// const loop = () => {
//   console.log(`Current game tick is ${Game.time}`);
//   brain.loop();
// };

// /**
//  * Constructor function for the main module.
//  * @param {Brain} brainInput the brain module for executing loop logic.
//  */
// const build = brainInput => {
//   brain = brainInput;
//   return { loop };
// };

// module.exports = {
//   loop,
//   build
// };

const roleHarvester = require('./role.harvester');
const roleBuilder = require('./role.builder');
const roleUpgrader = require('./role.upgrader');
const spawner = require('./spawner');
const creepcleaner = require('./creepcleaner');

const loop = () => {
  console.log(`Current game tick is ${Game.time}`);
  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    if (creep.memory.role == 'harvester') {
      roleHarvester.run(creep);
    }
    if (creep.memory.role == 'upgrader') {
      roleUpgrader.run(creep);
    }
    if (creep.memory.role == 'builder') {
      roleBuilder.run(creep);
    }
  }
  spawner.run();
};

module.exports = {
  loop
};
