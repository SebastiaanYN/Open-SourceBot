const path = require('path');

const { Client } = require('discord.js');
const { Handler } = require('./handler');

// TODO: Implement a proper config
const config = {
  token: process.env.TOKEN,
  shards: parseInt(process.env.SHARDS, 10) || 1,
};

for (let shard = 0; shard < config.shards; shard++) {
  const client = new Client({
    disableEveryone: true,
    shardId: shard,
    shardCount: config.shards,
  });

  const handler = new Handler(client);

  handler.load(path.join(__dirname, './modules'), {
    client,
    config,
    commandHandler: handler,
  });

  client.login(config.token)
    .then(() => {
      console.log(`Logged in, shard ${shard + 1} of ${config.shards}`);
    })
    .catch((error) => {
      console.error(`Could not log in, shard ${shard} of ${config.shards};`, error.stack);
    });
}
