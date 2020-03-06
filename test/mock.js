/**
 * Module for commonly useful mock data or stub methods.
 */
"use strict"

const Game = {
    cpu: {
        bucket: 100,
        getUsed: () => 20,
        limit: 20,
        tickLimit: 20
    },
    creeps: {},
    rooms: {},
    spawns: {},
    time: 12345
};

const Memory = {
    creeps: {}
};

const getFakeRoom = (roomName, mergeObject) => {
    const roomStub = {
        name: roomName
    };

    return Object.assign(roomStub, mergeObject);
};

module.exports = {
    Game,
    Memory,
    getFakeRoom
};