const { Client } = require('discord.js');
let Command = require("./Command.js");

class Handler {

  /**
   * @description Create a new handler instance
   * @param {Client} client The discord.js client
   */
  constructor(client) {
    // Creating a new map.
    this.commands = new Map();
    this.client = client;
    
    // TODO: Declare other properties
    // TODO: Customizability
    let prefix = "+";
    
    // Basic commmand handler.
    client.on("message", (msg) => {

      let args = msg.content.split(" ");

      let command = args.shift();

      if (!command.startsWith(prefix)) return;

      if (!this.commands.has(command.slice(prefix.length))) return;

      let command = this.commands.get(command.slice(prefix.length));

      if (command.isEnabled) command.run(msg);
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
   * @param {Object} The command classes.
   */
  addCommand(command) {
    if (!command instanceof Command) return;
    // Theoratical, open to change.
    this.commands.set(command.name, command);
  }
}

module.exports = Handler;