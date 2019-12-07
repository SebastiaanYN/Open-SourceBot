const { Collection, RichEmbed } = require('discord.js');
const moment = require('moment');

const active = new Collection();

class Giveaway {
  constructor({ time, description, price, winners, channelID, client }) {
    this.client = client;
    this.time = time;
    this.price = price;
    this.winners = isNaN(winners) ? 1 : parseInt(winners);
    this.description = description;
    this.messageID = null;
    this.channelID = channelID;
    this.interval = null;
    this.paused = false;
    this.users = [];
    this.pausedTime = 0;
  }

  run() {
    return new Promise(resolve => {
      const interval = () => {
        const every = Math.sqrt(this.getTimeLeft() / 60000);
        this.interval = setTimeout(async () => {
          const message = await this.client.channels
            .get(this.channelID)
            .fetchMessage(this.messageID);

          if (this.getTimeLeft() < 1) {
            clearTimeout(this.interval);
            await message.edit(this.embed());
            return resolve(this);
          }
          await message.edit(this.embed());
          interval();
        }, Math.floor(every * 60000));
      };
      interval();
    });
  }

  embed() {
    let duration = `Ends in **${moment
      .duration(this.getTimeLeft(), 'ms')
      .humanize()}**`;
    if (this.getTimeLeft() < 1) {
      const winners = this.drawWinners();
      winners.forEach(winner => {
        this.client.users
          .get(winner)
          .send(`You wont the giveaway: **${this.price}** :tada: :tada:`);
      });
      duration = `**Giveaway ended**\nWinner: <@${winners.join(', ')}>`;
    } else if (this.paused) duration = '**Giveaway Paused**';
    return new RichEmbed()
      .setTitle(this.price)
      .setDescription(
        `
        ${this.description ? `\n${this.description}\n` : ''}
        ${duration}
        Users participating: **${this.users.length}**
        Total winners: **${this.winners}**
      `,
      )
      .setFooter('Click the reaction to enter!')
      .setTimestamp(this.time)
      .setColor(this.getTimeLeft() > 0 ? 'green' : 'red');
  }

  getTimeLeft() {
    return this.time - Date.now();
  }

  async start() {
    const channel = await this.client.channels.get(this.channelID);

    const message = await channel.send(this.embed());
    await message.react('🎉');
    this.messageID = message.id;

    active.set(this.messageID, this);
    return this.run();
  }

  async pause() {
    this.paused = true;
    this.pausedTime = Date.now();
    clearTimeout(this.interval);
    const channel = await this.client.channels.get(this.channelID);
    return channel.send(this.embed());
  }

  resume() {
    this.paused = false;
    this.pausedTime = 0;
    this.run();
  }

  enter(userID) {
    this.users.push(userID);
  }

  drawWinners() {
    const winners = [];
    for (let i = 0; i < this.winners; i++) {
      const user = this.users[Math.floor(Math.random() * this.users.length)];
      if (!winners.includes(`<@${user}>`)) winners.push(`<@${user}>`);
      else i--;

      if (this.users.length === i + 1) break;
    }

    return winners;
  }
}

module.exports = {
  Giveaway,
  activeGiveaways: active,
};
