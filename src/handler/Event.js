class Event {
  constructor(eventName) {
    this.eventName = eventName;
  }

  run() {
    throw new Error('Event is missing run method');
  }
}

module.exports = Event;
