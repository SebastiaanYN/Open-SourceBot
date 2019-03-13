class Command extends Module{
  constructor(options) {
    this.name = options.name;

    // TODO: set all other properties
  }
  
  enable() {
    //logs maybe?
  }
  
  disable() {
    //logs maybe?
  }

  run() {
    if (this.enable) {
      throw new Error(`Command '${this.name}' is missing run method`);
    }
  }
}

module.exports = Command;
