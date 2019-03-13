const Discord = require('discord.js');
const { CommandHandler } = require('djs-commands')

const CH = new CommandHandler({
  folder: __dirname + '/commands/',
  prefix: ['!']
});

const client = new Discord.Client({
  disableEveryone: true,
});

client.on('message', (message) => {
  // Runs when a message is recieved
  if(message.author.type === 'bot') return // If message author is a bot ignore it.
  if(message.channel.type === 'dm') return // If message is in a dm channel ignore it.

  let splitMsg = message.content.split(" ") // Split message up by spaces
  let command = splitMsg[0]
  let args = splitMsg.slice(1) // Remove the command from the array so it only includes arguments.
  let cmd = CH.getCommand(command) // Get the command from the command handler
  if(!cmd) return // If command doesn't exist return
  
  try{
    cmd.run(client, message, args) // Run the exported run function from the command file.
  }catch(e){
    console.log(e)
  }

})

client.login(process.env.TOKEN);
