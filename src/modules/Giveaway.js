const {Collection, RichEmbed} = require('discord.js');
const moment = require('moment');
const _active = new Collection();

class Giveaway {
  constructor({time, description, price, channelID, client}) {
    this._client = client;
    this._time = time;
    this._price = price;
    this._description = description;
    this._messageID = null;
    this._channelID = channelID;
    this._interval = null;
    this._paused = false;
    this._pausedTime = 0;
  }

  run() {
    return new Promise(resolve => {
      const interval = () => {
        let every = Math.sqrt(this.getTimeLeft() / 60000);
        this._interval = setTimeout(async () => {
          const message = await this._client.channels
            .get(this._channelID)
            .fetchMessage(this._messageID);

          if (this.getTimeLeft() < 1) {
            clearTimeout(this._interval);
            await message.edit(this.embed());
            return resolve(this);
          } else {
            await message.edit(this.embed());
            interval();
          }
        }, Math.floor(every * 60000))
      };
      interval();
    });
  }

  embed() {
    let duration = `Ends in **${moment.duration(this.getTimeLeft(), "ms").humanize()}**`;
    if (this.getTimeLeft() < 1) duration = '**Giveaway ended**';
    else if (this._paused) duration = '**Giveaway Paused**';
    return new RichEmbed()
      .setTitle(this._price)
      .setDescription(
        `
        ${this._description ? `\n${this._description}\n` : ''}
        ${duration}
      `,
      )
      .setFooter('Click the reaction to enter!')
      .setTimestamp(this._time);
  }

  getTimeLeft() {
    return this._time - Date.now();
  }

  async start() {
    const channel = await this._client.channels.get(this._channelID);

    const message = await channel.send(this.embed());
    await message.react('🎉');
    this._messageID = message.id;

    _active.set(this._messageID, this);
    return this.run();
  }

  async pause() {
    this._paused = true;
    this._pausedTime = Date.now();
    clearTimeout(this._interval);
    const channel = await this._client.channels.get(this._channelID);
    return channel.send(this.embed())
  }

  resume() {
    this._paused = false;
    this._pausedTime = 0;
    this.run();
  }
}

module.exports = Giveaway;
