const fs = require('fs');
const path = require('path');

class Utils {
  /**
   * @description Read a directory recursively to get all files
   * @param {string} directory The directory to read
   * @returns {Array<string>} All the paths to the files
   */
  static readdirSyncRecursive(directory) {
    let files = [];

    fs.readdirSync(directory)
      .forEach((file) => {
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
}

module.exports = Utils;
