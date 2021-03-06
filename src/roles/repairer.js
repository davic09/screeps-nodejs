const repairer = {
    /** @param {Creep} creep **/
    run: function(creep) {
    const repairtargets = creep.room.find(FIND_STRUCTURES, {
            filter: object => (object.hits < 10000 && object.structureType !== STRUCTURE_CONTROLLER)
        });
    const energy = creep.store[RESOURCE_ENERGY]
    const droppedenergy = creep.room.find(FIND_DROPPED_RESOURCES);
          repairtargets.sort((a,b) => a.hits - b.hits);
        if (energy == 0) {
            if (creep.pickup(droppedenergy[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(droppedenergy[0], { visualizePathStyle: { stroke: "#ffaa00" } });
            }
        }
        if (energy > 0 ) {
            console.log(creep.name + "Repairing" + repairtargets[0])
            if (creep.repair(repairtargets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(repairtargets[0], {visualizePathStyle: { stroke: "ffaa00"}});
            }

        }
    }
  };
  module.exports = repairer;