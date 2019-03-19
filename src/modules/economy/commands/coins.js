const { Command } = require('../../../handler');

module.exports = class extends Command {
  constructor(mongo) {
    super('coins', {
      aliases: ['balance'],
      info: 'Get your coins',
      usage: 'coins',
    });

    this.mongo = mongo;
  }

  async run(message) {
    const user = await this.mongo.findOne({ id: message.author.id }).exec();
    message.channel.send(user.coins);
  }
};
