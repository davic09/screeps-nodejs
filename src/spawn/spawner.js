const spawner = {
  run: function() {
    const fuelers = _.filter(Game.creeps, creep => creep.memory.role == "fueler");
    console.log("fuelers: " + fuelers.length);
    const builders = _.filter(Game.creeps, creep => creep.memory.role == "builder");
    console.log("Builders: " + builders.length);
    const upgraders = _.filter(Game.creeps, creep => creep.memory.role == "upgrader");
    console.log("Upgraders: " + upgraders.length);
    const miners = _.filter(Game.creeps, creep => creep.memory.role == "miner");
    console.log("Upgraders: " + upgraders.length);
    const buildsites = Game.spawns["Spawn1"].room.find(FIND_CONSTRUCTION_SITES);
    const sources = Game.spawns["Spawn1"].room.find(FIND_SOURCES);
    const myRoomName = Game.spawns["Spawn1"].room.name;
    const getRoomMemory = myRoomName => {
      Memory.rooms = Memory.rooms || {};
      return (Memory.rooms[myRoomName] = Memory.rooms[myRoomName] || {});
    };
    const getRoomSources = myRoomName => {
      const roomMemory = getRoomMemory(myRoomName);
      return (roomMemory.sources = roomMemory.sources || Game.rooms[myRoomName].find(FIND_SOURCES).map(source => source.id));
    }
    if (fuelers.length < 2) {
      const newName = "fueler" + Game.time;
      console.log("Spawning new fueler: " + newName);
      Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: "fueler" } });
    }
    if (miners.length < sources.length) {
      const newName = "miner" + Game.time;
      const minerAssignedSources = miners.map(miner => miner.memory.sourceID);
      const unassignedSources = getRoomSources(myRoomName).filter(roomSource => !minerAssignedSources.includes(roomSource));
      if (unassignedSources.length > 0) {
          console.log("Spawning new miner: " + newName);
          Game.spawns["Spawn1"].spawnCreep([WORK, WORK, MOVE], newName, { memory: { role: "miner" , sourceID: unassignedSources[0] } });
      }
    }
    if (builders.length < 2 && buildsites) {
      const newName = "Builder" + Game.time;
      console.log("Spawning new builder: " + newName);
      Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, CARRY, MOVE], newName, { memory: { role: "builder" } });
    }
    if (upgraders.length < 2) {
      const newName = "Upgrader" + Game.time;
      console.log("Spawning new upgrader: " + newName);
      Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: "upgrader" } });
    }
    if (Game.spawns["Spawn1"].spawning) {
      const spawnCreep = Game.creeps[Game.spawns["Spawn1"].spawning.name];
      Game.spawns["Spawn1"].room.visual.text(
        "🛠️" + spawnCreep.memory.role,
        Game.spawns["Spawn1"].pos.x + 1,
        Game.spawns["Spawn1"].pos.y,
        { align: "left", opacity: 0.8 }
      );
    }
  }
};
module.exports = spawner;