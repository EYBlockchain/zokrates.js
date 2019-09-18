const childProcess = require('child_process');
const fs = require('fs');

const { spawn } = childProcess;

/**
 * Compiles code found at `codePath` and outputs at the output path.
 *
 * @example
 * // Will compile contents, generating ./ft-mint.code` and ./ft-mint as outputs
 * compile('./code/ft-mint/ft-mint.code', './', 'ft-mint');
 *
 * @param {String} codePath - Path of code file to compile
 * @param {String} [outputPath=./] - Directory to output, defaults to current directory
 * @param {String} [outputName=out] - name of `.code` and `out` files. Defaults to out.
 */
async function compile(codePath, outputPath = './', outputName = 'out') {
  if (!fs.existsSync(codePath)) {
    throw new Error('Compile input file(s) not found');
  }

  // Trims .code from the end of outputName
  const parsedOutputName = outputName.endsWith('.code') ? outputName.slice(0, -5) : outputName;
  // TODO: Check if outputPath is directory, otherwise throw.
  const parsedOutputPath = outputPath.endsWith('/') ? outputPath : `${outputPath}/`;

  return new Promise(resolve => {
    const zokrates = spawn(
      '/app/zokrates',
      ['compile', '-i', codePath, '-o', `${parsedOutputPath}${parsedOutputName}`],
      {
        stdio: 'ignore',
        env: {
          ZOKRATES_HOME: '/app/stdlib',
        },
      },
    );

    zokrates.on('close', () => {
      resolve();
    });
  });
}

module.exports = compile;
