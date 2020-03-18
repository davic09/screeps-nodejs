const fueler = {
  /** @param {Creep} creep **/
  run: function(creep) {
    const target = creep.room.find(FIND_DROPPED_RESOURCES);
    const energy = creep.store[RESOURCE_ENERGY]
    if (energy == 0) {
      if (target) {
      //figure out how to account for minerals etc.//
        if (creep.pickup(target[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target[0], { visualizePathStyle: { stroke: "#ffaa00" } });
        }
      }  
        const ruin = creep.room.find(FIND_RUINS, {
        filter: storage => 
        (storage.store[RESOURCE_ENERGY] > 0)
      });
      if (!target && (ruin && ruin[0] !== undefined)) {
        if (creep.withdraw(ruin[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(ruin[0], { visualizePathStyle: { stroke: "#ffaa00" } });
        }
      }
    }  
      else {
      const deposits = creep.room
        .find(FIND_STRUCTURES, {
          filter: structure =>
            ((structure.structureType == STRUCTURE_EXTENSION ||
              structure.structureType == STRUCTURE_TOWER || 
              structure.structureType == STRUCTURE_CONTAINER || 
              structure.structureType == STRUCTURE_STORAGE || 
              structure.structureType == STRUCTURE_SPAWN) &&
              structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0)
        })
        .sort((s1, s2) => {
          if (s1.structureType === STRUCTURE_TOWER || 
            (s1.structureType === STRUCTURE_EXTENSION && s2.structureType === STRUCTURE_CONTAINER) ||
            (s1.structureType === STRUCTURE_EXTENSION && s2.structureType === STRUCTURE_STORAGE) ||
            (s1.structureType === STRUCTURE_EXTENSION && s2.structureType === STRUCTURE_SPAWN) ||
            (s1.structureType === STRUCTURE_CONTAINER && s2.structureType === STRUCTURE_STORAGE) ||
            (s1.structureType === STRUCTURE_CONTAINER && s2.structureType === STRUCTURE_SPAWN) ||
            (s1.structureType === STRUCTURE_STORAGE && s2.structureType === STRUCTURE_SPAWN) || 
            (s2.structureType === STRUCTURE_SPAWN)) {
            return -1; // s1 should be further up the list than s2
          }
          return 1; // s2 should be further up the list than s1
        });
      if (deposits.length > 0) {
        console.log(deposits[0])
        if (creep.transfer(deposits[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(deposits[0], { visualizePathStyle: { stroke: "#ffffff" } });
        }
      }
      else {
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
          creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: "#ffffff" } });
        }
      }
    }
  }
};

module.exports = fueler;
