const fs = require('fs');
const path = require('path');

class Utils {
  /**
   * @description Read a directory recursively to get all files
   * @param {string} directory - The directory to read
   * @returns {Array<string>} All the paths to the files
   */
  static readdirSyncRecursive(directory) {
    let files = [];

    fs.readdirSync(directory).forEach(file => {
      const location = path.join(directory, file);

      // If the file is a directory read it recursively
      if (fs.lstatSync(location).isDirectory()) {
        files = files.concat(Utils.readdirSyncRecursive(location));
      } else {
        files.push(location);
      }
    });

    return files;
  }

  /**
   * @description Stringifies an object to get a reader friendly string.
   * @param {object} object - The object to stringify
   * @param {string} [join] - Character to join the array with
   * @returns {string} Stringified object
   */
  static stringify(object, join) {
    if (typeof object === 'boolean') {
      return object ? 'Yes' : 'No';
    }
    if (typeof object === 'object') {
      if (Array.isArray(object)) {
        if (object.length > 0) {
          return object.join(join || ', ');
        }
        return 'None';
      }
      return JSON.stringify(object, null, 2);
    }
    return String(object);
  }
}

module.exports = Utils;
