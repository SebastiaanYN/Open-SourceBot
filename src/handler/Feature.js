const Command = require('./Command.js');
const Event = require('./Event.js');
const Toggleable = require('./Toggleable.js');

class Feature extends Toggleable {
  /**
   * @description Create a new Feature
   * @param {string} name The name of this Feature
   */
  constructor(name) {
    super();

    if (typeof name !== 'string') {
      throw new TypeError('Feature name must be a string');
    }

    /**
     * The name of this feature
     * @type {String}
     */
    this.name = name;

    /**
     * All commands that belong to this Feature
     * @type {Array<Command>}
     */
    this.commands = [];

    /**
     * All events that belong to this Feature
     * @type {Array<Event>}
     */
    this.events = [];
  }

  /**
   * @description Register a new command
   * @param {Command} command The command that needs to be registered
   */
  registerCommand(command) {
    if (!(command instanceof Command)) {
      throw new TypeError('Can\'t register command, it does not extend Command');
    }

    this.commands.push(command);
  }

  /**
   * @description Register a new event
   * @param {Event} event The event that needs to be registered
   */
  registerEvent(event) {
    if (!(event instanceof Event)) {
      throw new TypeError('Can\'t register event, it does not extend Event');
    }

    this.events.push(event);
  }

  /**
   * @description Toggle this Feature and it's commands and events
   * @returns {undefined}
   * @override
   */
  toggle() {
    if (this.isEnabled) {
      this.disable();
    } else {
      this.enable();
    }
  }

  /**
   * @description Enable this Feature and it's commands and events
   * @returns {undefined}
   * @override
   */
  enable() {
    super.enable();

    this.commands.forEach(command => command.enable());
    this.events.forEach(event => event.enable());
  }

  /**
   * @description Disable this Feature and it's commands and events
   * @returns {undefined}
   * @override
   */
  disable() {
    super.disable();

    this.commands.forEach(command => command.disable());
    this.events.forEach(event => event.disable());
  }
}

module.exports = Feature;
