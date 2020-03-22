const tower = {

    //TOWER CODE
    run: function() {
        const tower = Game.getObjectById('5e73e69dc68b4a2673c88d58');
        if (tower) {
            const closestDamagedWall = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => s.hits < 4000
                && (s.structureType==STRUCTURE_WALL || s.structureType==STRUCTURE_RAMPART)
            });
            const closestDamagedEnergyStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => (structure.hits < structure.hitsMax && (structure.structureType == STRUCTURE_CONTAINER || 
                structure.structureType == STRUCTURE_STORAGE))
            });
            const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (closestHostile && closestHostile.owner !== 'cliffdevs') {
                tower.attack(closestHostile);
            }
            if (!closestHostile && closestDamagedEnergyStructure) {
                tower.repair(closestDamagedEnergyStructure);
            }
            else if (closestDamagedWall && tower.energy > 300 && !closestDamagedEnergyStructure) {
                tower.repair(closestDamagedWall);
            }
        }        
    }
};

module.exports = tower;