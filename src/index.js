const Discord = require('discord.js');

const client = new Discord.Client({
  disableEveryone: true,
});

client.login(process.env.TOKEN);
