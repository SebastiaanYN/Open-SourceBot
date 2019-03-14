const { Command } = require('../../../handler');

module.exports = class extends Command {
  constructor({ commandHandler }) {
    super('help', {
      aliases: ['alias', 'test'],
      info: `
        Show all the commands or info about a specific command
        **[]** is optional
        **<>** is required
      `,
      usage: 'help [command]',
    });

    this.commandHandler = commandHandler;
  }

  run(message) {
    message.channel.send(this.commandHandler.commands);
  }
};
