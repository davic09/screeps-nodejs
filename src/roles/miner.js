const miner = {
  /** @param {Creep} creep **/
  run: function(creep) {
    const mysource = Game.getObjectById(creep.memory.sourceID);
    if (creep.harvest(mysource) == ERR_NOT_IN_RANGE) {
      creep.moveTo(mysource, { visualizePathStyle: { stroke: "#ffaa00" } });
    }
  }
};
module.exports = miner;
