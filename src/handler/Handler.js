const { Client } = require('discord.js');

class Handler {
  /**
   * @description Create a new handler instance
   * @param {Client} client The discord.js client
   */
  constructor(client) {
    this.client = client;

    // TODO: Declare other properties
  }

  /**
   * @description Load all command/event modules
   * @param {string} directory The directory of the modules
   * @param {Object} dependencies The dependencies of the modules
   */
  load(directory, dependencies) {
    this.directory = directory;
    this.dependencies = dependencies;

    // TODO: Load all files
  }
}

module.exports = Handler;
