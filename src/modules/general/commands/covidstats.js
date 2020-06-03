const {NovelCovid} = require('novelcovid')
const track = new NovelCovid();
const { Command } = require('../../../handler');
const {MessageEmbed} = require('discord.js')
module.exports = class extends Command {
  constructor() {
    super('covid', {
      aliases: ['corona'],
      info: 'Get corona stats',
      usage: 'covid <country name>',
      guildOnly: false,
    });
  }

  async run(message) {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(!args.length) {
        return message.channel.send("Please give the name of country")
      }
      
      if(args.join(" ") === "all") {
        let corona = await track.all() 
        
        let embed = new MessageEmbed()
        .setTitle("Global Cases")
        .setColor("#ff2050")
        .setDescription("Sometimes cases number may differ from other sources")
        .addField("Total Cases", corona.cases, true)
        .addField("Total Deaths", corona.deaths, true)
        .addField("Total Recovered", corona.recovered, true)
        .addField("Today's Cases", corona.todayCases, true)
        .addField("Today's Deaths", corona.todayDeaths, true)
        .addField("Active Cases", corona.active, true);
        
        return message.channel.send(embed)
        
        
        
      } else {
        let corona = await track.countries(args.join(" "))
        
        let embed = new MessageEmbed()
        .setTitle(`${corona.country}`)
        .setColor("#ff2050")
        .setDescription("Sometimes cases number may differ from small amount.")
        .addField("Total Cases", corona.cases, true)
        .addField("Total Deaths", corona.deaths, true)
        .addField("Total Recovered", corona.recovered, true)
        .addField("Today's Cases", corona.todayCases, true)
        .addField("Today's Deaths", corona.todayDeaths, true)
        .addField("Active Cases", corona.active, true);
        
        return message.channel.send(embed)
        
        
      }
      
  } 
};
