const Toggleable = require('./Toggleable.js');

class Feature extends Toggleable {
  constructor(name) {
    super();

    this.name = name;
  }
}

module.exports = Feature;
