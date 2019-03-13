class Command {
  constructor(options) {
    this.name = options.name;

    // TODO: set all other properties
  }

  run() {
    throw new Error(`Command '${this.name}' is missing run method`);
  }
}

module.exports = Command;
