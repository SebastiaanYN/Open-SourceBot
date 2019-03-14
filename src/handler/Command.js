let Toggable = require("./Toggable.js");
class Command extends Toggable {
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
    if (this.enabledd) {
      throw new Error(`Command '${this.name}' is missing run method`);
    }
  }
}

module.exports = Command;
