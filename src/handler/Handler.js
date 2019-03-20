const { Client } = require('discord.js');

const Feature = require('./Feature.js');
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
     * A map of all features
     * @type {Map<string, Feature>}
     */
    this.features = new Map();

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

    // Find and require all JavaScript files
    const nodes = Utils
      .readdirSyncRecursive(directory)
      .filter(file => file.endsWith('.js'))
      .map(require);

    // Load all Features
    nodes.forEach((Node) => {
      if (Node.prototype instanceof Feature) {
        this.loadFeature(new Node(dependencies));
      }
    });

    // Load all Command and Event classes that haven't loaded yet
    nodes.forEach((Node) => {
      if (Node.prototype instanceof Command) {
        const loaded = Array.from(this.commands.values())
          .some(command => command instanceof Node);

        if (!loaded) {
          this.loadCommand(new Node(dependencies));
        }
      }

      if (Node.prototype instanceof Event) {
        const loaded = Array.from(this.events.values())
          .some(events => events
            .some(event => event instanceof Node));

        if (!loaded) {
          this.loadEvent(new Node(dependencies));
        }
      }
    });
  }

  /**
   * @description Load a feature and it's commands
   * @param {Feature} feature The feature that needs to be loaded
   */
  loadFeature(feature) {
    if (this.features.has(feature.name)) {
      throw new Error(`Can't load Feature, the name '${feature.name}' is already used`);
    }

    this.features.set(feature.name, feature);

    feature.commands.forEach((command) => {
      this.loadCommand(command);
    });

    feature.events.forEach((event) => {
      this.loadEvent(event);
    });
  }

  /**
   * @description Load a command
   * @param {Command} command The command that needs to be loaded
   */
  loadCommand(command) {
    // Command name might be in use or name might already be an existing alias
    if (this.commands.has(command.name) || this.aliases.has(command.name)) {
      throw new Error(`Can't load command, the name '${command.name}' is already used as a command name or alias`);
    }

    this.commands.set(command.name, command);

    command.aliases.forEach((alias) => {
      // Alias might already be a command or might already be in use
      if (this.commands.has(alias) || this.aliases.has(alias)) {
        throw new Error(`Can't load command, the alias '${alias}' is already used as a command name or alias`);
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
