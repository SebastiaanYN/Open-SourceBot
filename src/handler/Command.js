const Toggleable = require('./Toggleable.js');

class Command extends Toggleable {
  /**
   * @description Create a new command
   * @param {string} name - The name of the command
   * @param {object} options - The options for this command
   * @param {Array<string>} [options.aliases] - Aliases of this command
   * @param {string} [options.info] - Information about this command
   * @param {string} [options.usage] - Usage of this command
   * @param {boolean} [options.guildOnly] - Whether the command can only be used inside a guild
   */
  constructor(name, options) {
    super();

    this.name = name;

    if (!Array.isArray(options.aliases)) {
      throw new TypeError('Aliases must be an array');
    }
    options.aliases.forEach(alias => {
      if (typeof alias !== 'string') {
        throw new TypeError('Aliases array must contain strings only');
      }
    });
    this.aliases = options.aliases;

    if (!(typeof options.info === 'string')) {
      throw new TypeError('Info must be a string');
    }
    this.info = options.info;

    if (!(typeof options.usage === 'string')) {
      throw new TypeError('Usage must be a string');
    }
    this.usage = options.usage;

    if (!(typeof options.guildOnly === 'boolean')) {
      throw new TypeError('Guild only must be a boolean');
    }
    this.guildOnly = options.guildOnly;

    this.cooldown = options.cooldown;
  }

  /**
   * @description Method that runs when the command is executed
   */
  run() {
    throw new Error(`Command '${this.name}' is missing run method`);
  }
}

module.exports = Command;
