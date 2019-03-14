let Toggable = require("./Toggable.js");
class Event extends Toggable {
  constructor(eventName) {
    //Calls super for Toggable
    super()
    this.eventName = eventName;
  }
  
  run() {
    //TODO Either place the check in the handler or a seperate method.
    //Checks if the method is runnable, the runs it.
    if (this.enabled) {
     throw new Error('Event is missing run method'); 
    }
  }
}

module.exports = Event;
