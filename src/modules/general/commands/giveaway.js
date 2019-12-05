const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const moment = require('moment');
const timestring = require('timestring');

const { Command } = require('../../../handler');
const Utils = require('../../../Utils.js');

module.exports = class extends Command {
  constructor() {
    super('giveaway', {
      aliases: ['ga'],
      info:
        'Wanna give things to people? Use this command to create giveaways.',
      usage: 'giveaway "[time]" "[title]" "{description}"',
      guildOnly: false,
    });
  }

  async run(message, args) {
    const gArgs = Utils.splitOnDivider(args.join(' '), '"');

    if (gArgs.length < 2) {
      return message.reply('Wrong usage');
    }

    const time = timestring(gArgs[0], 'ms');
    const price = gArgs[1];
    const description = gArgs[2];

    const embed = new RichEmbed()
      .setTitle(price)
      .setDescription(
        `
        ${description ? `\n${description}\n` : ''}
        Ends in **${moment.duration(time).humanize()}**
      `,
      )
      .setFooter('Click the reaction to enter!')
      .setTimestamp(Date.now() + time);

    const gMsg = await message.channel.send(embed);
    await gMsg.react('🎉');
  }
};