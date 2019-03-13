class Handler {
  constructor(client) {
    this.client = client;

    // TODO: Declare other properties
  }

  load(directory, dependencies) {
    this.directory = directory;
    this.dependencies = dependencies;

    // TODO: Load all files
  }
}

module.exports = Handler;
