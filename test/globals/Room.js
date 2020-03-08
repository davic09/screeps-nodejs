class Room {
  constructor(options) {
    const opts = options || {};
    this._name = opts.name || "default";
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }
}

module.exports = Room;
