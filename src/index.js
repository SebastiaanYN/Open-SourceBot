const path = require('path');

const { Client } = require('discord.js');
const { Handler } = require('./handler');

const client = new Client({ disableEveryone: true });
const handler = new Handler(client, '!');

handler.load(path.join(__dirname, './modules'), {
  client,
  commandHandler: handler,
});

handler.start(process.env.TOKEN);
