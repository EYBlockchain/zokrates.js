import { exec } from 'child_process';

/**
 * Execute compile shell command.
 * @param {String} cmd
 * @return {Object} {stdout: String, stderr: String}
 */
exec('./zokrates compile -i /path/to/add.code', (err, stdout, stderr) => {
  if (err) {
    // node couldn't execute the command
    return;
  }

  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});

console.log('compile.js worked!!!');
