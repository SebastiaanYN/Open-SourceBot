class Command {
  /**
   * @description Create a new command
   * @param {string} name The name of the command
   * @param {Object} options The options for this command
   * @param {Array<string>} [options.aliases] Aliases of this command
   * @param {string} [options.info] Information about this command
   * @param {string} [options.usage] Usage of this command
   */
  constructor(name, options) {
    this.name = name;

    if (!Array.isArray(options.aliases)) {
      throw new TypeError('Aliases must be an array');
    }
    options.aliases.forEach((alias) => {
      if (typeof alias !== 'string') {
        throw new TypeError('Aliases array must contain strings only');
      }
    });
    this.aliases = options.aliases || [];

    if (!(typeof options.info === 'string')) {
      throw new TypeError('Info must be a string');
    }
    this.info = options.info || 'None';

    if (!(typeof options.usage === 'string')) {
      throw new TypeError('Usage must be a string');
    }
    this.usage = options.usage || 'None';
  }

  /**
   * @description Method that runs when the command is executed
   */
  run() {
    throw new Error(`Command '${this.name}' is missing run method`);
  }
}

module.exports = Command;
