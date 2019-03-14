class Toggleable {
  constructor() {
    this.isEnabled = true;
  }

  /**
   * @description Toggle isEnabled
  */
  toggle() {
    this.isEnabled = !this.isEnabled;
  }

  /**
   * @description Changes isEnabled to true.
  */
  enable() {
    this.isEnabled = true;
  }

  /**
   * @description Changes isEnabled to false.
  */
  disable() {
    this.isEnabled = false;
  }
}
module.exports = Toggleable;
