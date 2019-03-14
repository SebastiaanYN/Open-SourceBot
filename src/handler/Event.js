const Toggleable = require('./Toggleable.js');

class Event extends Toggleable {
  /**
   * @description Create a new event
   * @param {string} eventName The name of the event
   */

  constructor(eventName) {
    // Calls super for Toggleable, (Super needs to be called)
    super();
    this.eventName = eventName;
  }

  /**
   * @description Method that runs when the event is fired
   * //@param {Event} event The event's object/properties.
   */
  run(/* event */) {
    throw new Error('Event is missing run method');
  }
}

module.exports = Event;
