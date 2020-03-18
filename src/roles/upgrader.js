const upgrader = {
    run: function(creep) {
      const energy = creep.store[RESOURCE_ENERGY] 
      if (energy > 0) {
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
          creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: "#ffffff" } });
        }
      } else {
        const ruin = creep.room.find(FIND_RUINS, {
          filter: storage => 
          (storage.store[RESOURCE_ENERGY] > 0)
        });
        if (creep.store.getFreeCapacity () > 0 && (ruin && ruin[0] !== undefined)) {
          if (creep.withdraw(ruin[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(ruin[0], { visualizePathStyle: { stroke: "#ffaa00" } });
          }
        }
        else {
        const deposits = creep.room
          .find(FIND_STRUCTURES, {
            filter: structure =>
              ((structure.structureType == STRUCTURE_CONTAINER ||
                structure.structureType == STRUCTURE_STORAGE) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0) 
          });
        deposits.sort();
        if (creep.withdraw((deposits[0]), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(deposits[0], { visualizePathStyle: { stroke: "#ffaa00" } });
          }
        }
      }
    }
  };
  
  module.exports = upgrader;