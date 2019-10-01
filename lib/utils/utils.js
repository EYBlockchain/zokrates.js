const fs = require('fs');

function deleteFile(fileName) {
  fs.unlink(fileName, err => {
    if (err) throw err;
  });
}

module.exports = deleteFile;
