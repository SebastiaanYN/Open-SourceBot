const { Command } = require('../../../handler');

module.exports = class extends Command {
  constructor({ commandHandler }) {
    super('help', {
      aliases: ['h', 'commands', 'cmds'],
      info: `
        Show all the commands or info about a specific command
        **[]** is optional
        **<>** is required
      `,
      usage: 'help [command]',
      guildOnly: false,
    });

    this.commandHandler = commandHandler;
  }

  run(message) {
    const commands = Array.from(this.commandHandler.commands)
      .map(([name, command]) => `${name} - ${command.aliases.join(', ')}`)
      .join('\n');

    message.channel.send(commands);
  }
};
