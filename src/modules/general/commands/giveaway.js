const moment = require('moment');
const timestring = require('timestring');

const { Command } = require('../../../handler');
const Utils = require('../../../Utils.js');
const { Giveaway } = require('../../Giveaway');

module.exports = class extends Command {
  constructor({ client }) {
    super('giveaway', {
      aliases: ['ga'],
      info:
        'Wanna give things to people? Use this command to create giveaways.',
      usage: 'giveaway "[time]" "[title]" "{description}" {winners}',
      guildOnly: false,
    });

    this.client = client;
  }

  run(message, args) {
    const gArgs = Utils.splitOnDivider(args.join(' '), '"');

    if (gArgs.length < 2) {
      return message.reply('Wrong usage');
    }

    const time = timestring(gArgs[0], 'ms');
    const price = gArgs[1];
    const description = gArgs[2];

    const giveaway = new Giveaway({
      time: moment()
        .add(time)
        .toDate()
        .getTime(),
      description,
      price,
      winners: args[args.length - 1],
      channelID: message.channel.id,
      client: this.client,
    });
    return giveaway.start();
  }
};
