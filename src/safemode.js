const safemode = {
    run: function () {
    const enemytargets = Game.spawns["Spawn1"].room.find(FIND_HOSTILE_CREEPS);
        if (enemytargets) {
            Game.spawns["Spawn1"].room.controller.activateSafeMode();
        }

    }
}
module.exports = safemode ;