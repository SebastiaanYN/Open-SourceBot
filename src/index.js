// This will check if the node version your are running is the required
// Node version, if it isn't it throw the following error to inform
// you.

if (Number(process.version.slice(1).split('.')[0]) < 10) throw new Error('Node 10.0.0 or higher is required. Update Node on your system.');

const path = require('path');

const { Client } = require('discord.js');
const { Handler } = require('./handler');

const client = new Client({ disableEveryone: true });
const handler = new Handler(client);

handler.load(path.join(__dirname, './modules'), {
  client,
  commandHandler: handler,
});

client.login(process.env.TOKEN);
