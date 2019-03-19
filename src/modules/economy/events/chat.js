const { Event } = require('../../../handler');

module.exports = class extends Event {
  constructor(mongo) {
    super('message');

    this.mongo = mongo;
  }

  async run(client, message) {
    await this.mongo.updateOne({ id: message.author.id }, { $inc: { coins: 5 } }).exec();
    message.channel.send('You earned 5 coins');
  }
};
