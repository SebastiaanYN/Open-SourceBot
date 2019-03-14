let Command = require("./Command.js");
class Handler {
  constructor(client) {
    // Creating a new map.
    this.commands = new Map();
    this.client = client;
    
    // TODO: Declare other properties
    // TODO: Customizability
    let prefix = "+";
    
    //Basic commmand handler.
    client.on("message", (msg) => {
      let args = msg.content.split(" ");
      let command = args.shift();
      if (!command.startsWith(prefix)) return;
      if (!this.commands.has(command.slice(prefix.length))) return;
      let command = this.commands.get(command.slice(prefix.length)) return;
      if (command.enabled) command.run(msg);
    });
    
  }

  load(directory, dependencies) {
    this.directory = directory;
    this.dependencies = dependencies;
    
    // TODO: Load all files
  }
  
  // Basic command adding.
  addCommand(command) {
    // Checks if it is a command
    if (!command instanceof Command) return;
    // Theoratical, open to change.
    this.commands.set(command.name, command);
  }
}

module.exports = Handler;
