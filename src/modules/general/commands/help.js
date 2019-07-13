const { RichEmbed } = require('discord.js');
const { Command } = require('../../../handler');
const Utils = require('../../../Utils.js');

module.exports = class extends Command {
  constructor({ commandHandler }) {
    super('help', {
      aliases: ['h', 'commands', 'cmds'],
      info: 'Show all the commands or info about a specific command.',
      usage: 'help [command]',
      guildOnly: false,
      contributors: ['Jacxk'],
    });

    this.commandHandler = commandHandler;
  }

  run(message, args) {
    const prefix = this.commandHandler.prefix;
    let description;

    if (args.length === 0) {
      description = `
        __Features:__
        ${Utils.stringify(
          Array.from(this.commandHandler.features).map(
            ([name, feature]) =>
              `**${name}** - ${Utils.stringify(feature.commands)}`,
          ),
          '\n',
        )}
        
        __Commands:__
        ${Utils.stringify(
          Array.from(this.commandHandler.commands).map(
            ([, command]) => `**${prefix}${command.usage}** - ${command.info}`,
          ),
          '\n',
        )}
      `;
    } else {
      let command = this.commandHandler.commands.get(args[0]);

      if (!command) {
        command = this.commandHandler.aliases.get(args[0]);
      }

      if (!command) {
        const embed = new RichEmbed()
          .setTitle('Something went wrong!')
          .setDescription('Invalid command provided, please try again!');

        message.channel.send(embed);
        return;
      }

      description = `
        **Name:** ${command.name}
        **Usage:** ${prefix}${command.usage}
        **Info:** ${command.info}
        **Aliases:** ${Utils.stringify(command.aliases)}
        **Guild Only:** ${Utils.stringify(command.guildOnly)}
        **Enabled:** ${Utils.stringify(command.guildOnly)}
        
        **Contributors:** ${Utils.stringify(
          command.contributors.map(
            username => `[${username}](https://github.com/${username})`,
          ),
        )}
      `;
    }

    const embed = new RichEmbed()
      .setTitle('Need help? Here are you go!')
      .setDescription(
        `${description}\n(**[]** *is optional*, **<>** *is required*)`,
      );

    message.channel.send(embed);
  }
};
