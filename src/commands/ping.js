module.exports = class ping {
    constructor(){
            this.name = 'ping', // Name of command
            this.alias = ['latency'], // Alias(es) that the command can also be invoked by.
            this.usage = '!ping' // Command usage
    }
 
    async run(client, message, args) {
        await message.delete();
        let pingmsg = await message.channel.send("Ping?");
        pingmsg.edit(`Pong! Latency is ${pingmsg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`); 
        /* Calculates latency by calcualting created time diffrence between original message and edited message. 
        This can give a better representation of the bot's latency. */
    }
}