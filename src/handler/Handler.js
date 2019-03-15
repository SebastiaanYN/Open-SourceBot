const { Client } = require('discord.js');
const fs = require('fs');
const path = require('path');

const Command = require('./Command.js');
const Event = require('./Event.js');
const Utils = require('../Utils.js');

class Handler {
  /**
   * @description Create a new handler instance
   * @param {Client} client The discord.js client
   */
  constructor(client) {
    /**
     * The discord.js client
     * @type {Client}
     */
    this.client = client;

    /**
     * A map containing all the commands, mapped by command name
     * @type {Map<string, Command>}
     */
    this.commands = new Map();

    /**
     * A map containing all the commands, mapped by alias
     * @type {Map<string, Command>}
     */
    this.aliases = new Map();

    /**
     * A map containing all the events, mapped by event name
     * @type {Map<string, Array<Event>>}
     */
    this.events = new Map();
  }

  /**
   * @description Load all command/event modules from a directory
   * @param {string} directory The directory of the modules
   * @param {Object} dependencies The dependencies of the modules
   * @returns {undefined}
   */
  load(directory, dependencies) {
    this.directory = directory;
    this.dependencies = dependencies;

    const categories = fs.readdirSync(directory);
    categories.forEach((category) => {
      Utils
        .readdirSyncRecursive(path.join(directory, category))
        .filter(file => file.endsWith('.js'))
        .forEach((file) => {
          // eslint-disable-next-line global-require, import/no-dynamic-require
          const CommandOrEvent = require(file);

          // Try to instantiate the command or event, throw an error if it fails
          let commandOrEvent;
          try {
            commandOrEvent = new CommandOrEvent(dependencies);
          } catch (err) {
            // TODO: add a debug message here?
            return;
          }

          // Handle the object, throw an error if it does not extend Command or Event
          if (commandOrEvent instanceof Command) {
            commandOrEvent.category = category;

            this.loadCommand(commandOrEvent, file);
          } else if (commandOrEvent instanceof Event) {
            this.loadEvent(commandOrEvent);
          } else {
            // TODO: add a debug message here?
          }
        });
    });
  }

  /**
   * @description Load a command
   * @param {Command} command The command that needs to be loaded
   * @param {string} file The file path of the command, used for errors
   */
  loadCommand(command, file) {
    // Command name might be in use or name might already be an existing alias
    if (this.commands.has(command.name) || this.aliases.has(command.name)) {
      throw new Error(`Can't load '${file}', the name '${command.name}' is already used as a command name or alias`);
    }

    this.commands.set(command.name, command);

    command.aliases.forEach((alias) => {
      // Alias might already be a command or might already be in use
      if (this.commands.has(alias) || this.aliases.has(alias)) {
        throw new Error(`Can't load '${file}', the alias '${alias}' is already used as a command name or alias`);
      }

      this.aliases.set(alias, command);
    });
  }

  /**
   * @description Load an event
   * @param {Event} event The event that needs to be loaded
   */
  loadEvent(event) {
    const events = this.events.get(event.eventName) || [];
    events.push(event);

    this.events.set(event.eventName, events);
  } 
}

module.exports = Handler;
