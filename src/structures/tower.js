const tower = {

    //TOWER CODE
    run: function() {
        const tower = Game.getObjectById('5e73e69dc68b4a2673c88d58');
        if (tower) {
            const closestDamagedWall = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => s.hits < 10000 
                && (s.structureType==STRUCTURE_WALL || s.structureType==STRUCTURE_RAMPART)
            });
            const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => (structure.hits < structure.hitsMax && structure.hits < 10000 && structure.structureType!=STRUCTURE_WALL)
            });
            const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (closestHostile && !closestHostile === 'cliffdevs') {
                tower.attack(closestHostile);
            }
            if (closestDamagedWall && tower.energy > 300) {
                tower.repair(closestDamagedWall);
            }
            else if (closestDamagedStructure && tower.energy > 300) {
                tower.repair(closestDamagedStructure)
            }
        }        
    }
};

module.exports = tower;