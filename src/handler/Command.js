let Toggable = require("./Toggable.js");
class Command extends Toggable {
  constructor(options) {
    super();
    this.name = options.name;

    // TODO: set all other properties
  }
  
  enable() {
    //Calls the enable method in the Toggable;
    super.enable();
    //logs maybe?
  }
  
  disable() {
    //Calls the disable method in the Toggable;
    super.disable();
    //logs maybe?
  }

  run() {
    //Checks if this command is enabled
    if (this.enabled) {
      throw new Error(`Command '${this.name}' is missing run method`);
    }
  }
}

module.exports = Command;
