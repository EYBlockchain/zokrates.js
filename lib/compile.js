const childProcess = require('child_process');

function compile() {
  childProcess.exec('zokrates compile -i ./code/ft-mint/ft-mint.code', (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      return;
    }

    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
}

compile();
