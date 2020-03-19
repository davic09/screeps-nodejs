const builder = {

  /** @param {Creep} creep **/
  run: function(creep) {
    const buildsites = creep.room.find(FIND_CONSTRUCTION_SITES);
    const energy = creep.store[RESOURCE_ENERGY] 
    const droppedenergy = creep.room.find(FIND_DROPPED_RESOURCES);
    const ruins = creep.room.find(FIND_RUINS, {
      filter: storage => 
      (storage.store[RESOURCE_ENERGY] > 0)
    }); 
    const targets = creep.room
    .find(FIND_STRUCTURES, {
      filter: structure =>
        ((structure.structureType == STRUCTURE_CONTAINER || 
          structure.structureType == STRUCTURE_STORAGE ) &&
          structure.store[RESOURCE_ENERGY] > 0)
    })
    const repairtargets = creep.room.find(FIND_STRUCTURES, {
      filter: object => object.hits < 100
  });
    repairtargets.sort((a,b) => a.hits - b.hits);
    if (energy > 0 && buildsites) {
      if (creep.build(buildsites[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(buildsites[0], { visualizePathStyle: { stroke: "#ffffff" } });
       }
    }
    if(energy > 0 && repairtargets.length > 0 && (!buildsites || buildsites[0] === undefined)) {
      if(creep.repair(repairtargets[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(repairtargets[0]);
      }
  }
    if (energy == 0 && targets && (ruins[0] === undefined || !ruins)) {
      if (creep.withdraw((targets[0]), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffaa00" } });
        }
    }
    if (energy == 0 && (ruins && ruins[0] !== undefined) && targets) {
      if (creep.withdraw(ruins[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(ruins[0], { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    }
    else  {
      if (creep.withdraw((droppedenergy[0]), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(droppedenergy[0], {visualizePathStyle: { stroke: "ffaa00"} });
      }
    }
  }
};
module.exports = builder;
