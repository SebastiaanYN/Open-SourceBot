let Toggable = require("./Toggable.js");
class Event extends Toggable {
  constructor(eventName) {
    super()
    this.eventName = eventName;
  }

  run() {
    if (this.enabled) {
     throw new Error('Event is missing run method'); 
    }
  }
}

module.exports = Event;
