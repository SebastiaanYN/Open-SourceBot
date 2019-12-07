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
   * @description Makes a boolean object Yes or No.
   * @param {boolean} bool - The boolean to stringify.
   * @returns {string} Boolean as Yes or No, accordingly.
   */
  static boolToString(bool) {
    if (typeof bool === 'boolean') {
      return bool ? 'Yes' : 'No';
    }
    return String(bool);
  }

  /**
   * @description Takes a simple string and splits up the messages
   * surrounded by the divider. (Strings not on divider will be ignored)
   * @param {string} string - String to split.
   * @param {string} divider - Where the string would be splitted.
   * @returns {Array<string>} Array of string splitted.
   */
  static splitOnDivider(string, divider) {
    let open = false;
    let message = '';
    const array = [];
    for (let i = 0; i < string.length; i++) {
      const char = string.charAt(i);
      if (char === divider) {
        if (!open) {
          open = true;
        } else {
          open = false;
          array.push(message);
          message = '';
        }
      } else if (open) {
        message += char;
      }
    }
    return array;
  }
}

module.exports = Utils;
