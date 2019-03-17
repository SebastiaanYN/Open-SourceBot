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

    /**
     * The name of this feature
     * @type {String}
     */
    this.name = name;

    /**
     * All commands that belong to this Feature
     * @type {Map<string, Command>}
     */
    this.commands = new Map();

    /**
     * All events that belong to this Feature
     * @type {Map<string, Array<Event>>}
     */
    this.events = new Map();
  }

  /**
   * @description Register a new command
   * @param {Command} command The command that needs to be registered
   */
  registerCommand(command) {
    if (!(command instanceof Command)) {
      throw new TypeError('Can\'t register command, it does not extend Command');
    }

    this.commands.set(command.name, command);
  }

  /**
   * @description Register a new event
   * @param {Event} event The event that needs to be registered
   */
  registerEvent(event) {
    if (!(event instanceof Event)) {
      throw new TypeError('Can\'t register event, it does not extend Event');
    }

    const events = this.events.get(event.eventName) || [];
    events.push(event);

    this.events.set(event.eventName, events);
  }
}

module.exports = Feature;
