const { Command } = require('../../../handler');
const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')
module.exports = class extends Command {
  constructor() {
    super('meme', {
      info: 'Get a meme',
      usage: 'meme',
      guildOnly: true,
    });
  }

  async run(message) {
    fetch("https://meme-api.herokuapp.com/gimme")
        .then((res) => res.json())
        .then((body) => {
            let embed = new MessageEmbed()
            .setTitle(body.title)
            .setImage(body.url)
            .setFooter(`From r/${body.subreddit}`)
            .setURL(body.postLink)
            .setColor("RANDOM")
            return message.util.send(embed)
        })
  }
};
