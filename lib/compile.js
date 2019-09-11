const childProcess = require('child_process');

const { spawn } = childProcess;

/**
 * Compiles code found at `codePath` and outputs at the output path.
 *
 * Example: `compile('./code/ft-mint/ft-mint.code, './', 'ft-mint');
 *
 * @param {String} codePath - Path of code file to compile
 * @param {String} outputPath - Directory to output, defaults to current directory
 * @param {String} outputName - name of `.code` and `out` files. Defaults to out.
 */
async function compile(codePath, outputPath = './', outputName = 'out') {
  // Trims .code from the end of outputName
  const parsedOutputName = outputName.endsWith('.code') ? outputName.slice(0, -5) : outputName;
  const parsedOutputPath = outputPath.endsWith('/') ? outputPath : `${outputPath}/`;

  spawn('zokrates', ['compile', '-i', codePath, '-o', `${parsedOutputPath}${parsedOutputName}`], {
    stdio: 'ignore',
  });
}

compile('./code/ft-mint/ft-mint.code', './code/ft-mint', 'ft-mint-compiled');

module.exports = compile;
