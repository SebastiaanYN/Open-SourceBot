const { Feature } = require('../../handler');

const CoinsCommand = require('./commands/coins.js');
const ChatEvent = require('./events/chat.js');

module.exports = class extends Feature {
  constructor({ mongo }) {
    super('economy');

    this.registerCommand(new CoinsCommand(mongo));
    this.registerEvent(new ChatEvent(mongo));
  }
};
