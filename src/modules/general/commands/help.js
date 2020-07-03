const { MessageEmbed } = require('discord.js');
const got = require('got');
const Path = require('path');
const { Command } = require('../../../handler');
const Utils = require('../../../Utils.js');

module.exports = class extends Command {
  constructor({ commandHandler }) {
    super('help', {
      aliases: ['h', 'commands', 'cmds'],
      info: 'Show all the commands or info about a specific command.',
      usage: 'help [command]',
      guildOnly: false,
    });

    this.commandHandler = commandHandler;
  }

  async run(message, args) {
    const prefix = this.commandHandler.prefix;
    let description;

    if (args.length === 0) {
      description = `
        __Features:__
        ${Array.from(this.commandHandler.features)
          .map(
            ([name, feature]) => `**${name}** - ${feature.commands.join(', ')}`,
          )
          .join('\n')}
        
        __Commands:__
        ${Array.from(this.commandHandler.commands)
          .map(
            ([, command]) => `**${prefix}${command.usage}** - ${command.info}`,
          )
          .join('\n')}
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

      const contributors = [];
      const path = Path.relative(
        process.cwd(),
        `${__dirname}/${command.name}.js`,
      ).replace(/\\+/g, '/');

      try {
        const response = await got(
          `https://api.github.com/repos/The-SourceCode/Open-SourceBot/commits?path=${path}`,
        );

        const body = JSON.parse(response.body);
        body.forEach(commit => {
          if (!contributors.includes(commit.author.login)) {
            contributors.push(commit.author.login);
          }
        });
      } catch (e) {
        // Ignore
      }

      description = `
        **Name:** ${command.name}
        **Usage:** ${prefix}${command.usage}
        **Info:** ${command.info}
        **Aliases:** ${command.aliases.join(', ')}
        **Guild Only:** ${Utils.boolToString(command.guildOnly)}
        **Enabled:** ${Utils.boolToString(true) /* TODO: Implement enabled */}
        
        **Contributors:** ${contributors
          .map(
            contributor =>
              `[${contributor}](https://github.com/${contributor})`,
          )
          .join(', ')}
      `;
    }

    const embed = new MessageEmbed()
      .setTitle('Need help? Here are you go!')
      .setDescription(
        `${description}\n(**[]** is optional, **<>** is required)`,
      );

    message.channel.send(embed);
  }
};
