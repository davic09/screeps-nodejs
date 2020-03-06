const roleHarvester = require('role.harvester');
const spawner = require('spawner');
const creepcleaner = require('creepcleaner');

const loop = () => {
    console.log(`Current game tick is ${Game.time}`);
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
      spawner.run();
};

module.exports = {
    loop
};
