const attacker = {

    /** @param {Creep} creep **/
    run: function(creep) {
    const enemytargets = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS); 
    const enemyspawn = creep.pos.findClosestByRange(FIND_HOSTILE_SPAWNS);
    const structures = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
    const towers = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
        filter: { structureType: STRUCTURE_TOWER }
    });  
    const extensions = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
        filter: { structureType: STRUCTURE_EXTENSION }
    });
    const storage = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
        filter: { structureType: STRUCTURE_STORAGE }
    });    
	    if(!enemyspawn && !enemytargets && !extensions && !storage && !towers ) {
            creep.moveTo(Game.flags['Flag1']);
            creep.say('CONVOY');
	    }
	    else if(enemyspawn) {
            if(creep.attack(enemyspawn) == ERR_NOT_IN_RANGE) {
            creep.moveTo(enemyspawn);
            }
        }
        else if (!enemyspawn && towers)
            if (creep.attack(towers) == ERR_NOT_IN_RANGE) {
                creep.moveTo(towers);
            }
        else if(!enemyspawn  && enemytargets) {
            if(creep.attack(enemytargets) == ERR_NOT_IN_RANGE) {
            creep.moveTo(enemytargets);
            }
        }    
        else if(!enemyspawn && extensions) {
            if (creep.attack(extensions) == ERR_NOT_IN_RANGE) {
                creep.moveTo(extensions);
            }
        }
        else {
            if(creep.attack(structures) == ERR_NOT_IN_RANGE) {
            creep.moveTo(structures);
            }
        }

	}
};

module.exports = attacker;