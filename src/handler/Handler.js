const { Client } = require('discord.js');
const Command = require('./Command.js');

class Handler {
  /**
   * @description Create a new handler instance
   * @param {Client} client The discord.js client
   * @returns {undefined} If the command didn't go through
   */
  constructor(client) {
    // Creating a new map.
    this.commands = new Map();
    this.client = client;

    // TODO: Declare other properties
    // TODO: Customizability
    const prefix = '+';

    // Basic commmand handler.
    client.on('message', (msg) => {
      if (!msg.content.startsWith(prefix)) return;

      const args = msg.content.split(' ');

      const command = args.shift().slice(prefix.length);

      if (!this.commands.has(command)) return;

      const commandClass = this.commands.get(command);

      if (commandClass.isEnabled) commandClass.run(msg);
    });
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

  /**
   * @description Add the commands to the list.
   * @returns {undefined} If something went wrong
   * @param {Command} command The command classes.
   */
  addCommand(command) {
    if (!(command instanceof Command)) return;
    // Theoratical, open to change.
    this.commands.set(command.name, command);
  }
}

module.exports = Handler;
