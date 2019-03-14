let Toggleable = require("./Toggleable.js");
class Command extends Toggleable {
  /**
   * @description Create a new command
   * @param {string} name The name of the command
   * @param {Object} options The options for this command
   * @param {Array<string>} options.aliases Aliases of this command
   * @param {string} options.info Information about this command
   * @param {string} options.usage Usage of this command
   */
  constructor(name, options) {
    // Calls super for Toggleable, (Super needs to be called)
    super();
    this.name = name;

    if (!Array.isArray(options.aliases)) {
      throw new TypeError('Aliases must be an array');
    }
    this.aliases = options.aliases;

    if (!(typeof options.info === 'string')) {
      throw new TypeError('Info must be a string');
    }
    this.info = options.info;

    if (!(typeof options.usage === 'string')) {
      throw new TypeError('Usage must be a string');
    }
    this.usage = options.usage;
  }
  
  /**
   * @description Method that runs when the command is executed
   * @param {Object} The message event.
   */
  run(msg) {
    throw new Error(`Command '${this.name}' is missing run method`);
  }
}

module.exports = Command;