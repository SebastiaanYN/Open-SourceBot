const { Command } = require('../../../handler');

module.exports = class extends Command {
  constructor() {
    super({
      name: 'ping',
      aliases: ['pong'],
      info: 'Get the ping of the bot',
      usage: 'ping',
    });
  }

  run(message) {
    message.channel.send(message.client.ping);
  }
};
