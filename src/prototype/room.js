Room.prototype.execute = () => {
  return;
};

Room.prototype.extensions = () => {
  return;
};

// room bootstrapping priority
// 0. plan base layout
// 1. place spawner
// 2. assign and spawn one miner per source
// 3. assign and spawn harverster to carry energy from miner to destination
// 4. build extensions for additional energy storage
// 4. plan path from spawn to sources
// 5. build roads from spawn to sources
// 6. assign builders
// 7. spawn upgraders
