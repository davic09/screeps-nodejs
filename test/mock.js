/**
 * Module for commonly useful mock data or stub methods.
 */
"use strict";

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

const getFakeCreep = () => {
  return new Creep();
}

const getFakeRoom = (roomName, mergeObject) => {
  const room = new Room();
  room.name = roomName;

  return Object.assign(room, mergeObject);
};

module.exports = {
  Game,
  Memory,
  getFakeCreep,
  getFakeRoom
};
