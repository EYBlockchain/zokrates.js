const childProcess = require('child_process');
const fs = require('fs');

const { spawn } = childProcess;

/**
 * Takes the verifying key and outputs a Verifier smart contract.
 *
 * TODO: Needs to check that files and whatnot all exist.
 *
 * @example
 * exportVerifier('./code/ft-mint/ft-mint-vk.key', './code/ft-mint', 'ft-mint-verifier', 'gm17');
 *
 * @param {String} codePath - Path of verifying key
 * @param {String} [outputPath=./] - Path to export file into
 * @param {String} [outputName=Verifier.sol] - Name of Solidity file (with or without trailing .sol)
 * @param {String} provingScheme - Available options are G16, PGHR13, GM17
 */
async function exportVerifier(
  codePath,
  outputPath = './',
  outputName = 'Verifier.sol',
  provingScheme,
  options = {},
) {
  const { maxReturn = 10000000, verbose = false } = options;

  if (!fs.existsSync(codePath)) {
    throw new Error('export-verifier verifying key file not found');
  }

  if (!codePath.endsWith('.key')) {
    throw new Error('export-verifier expects a .key file');
  }

  // Ensure path ends with '/'
  const parsedOutputPath = outputPath.endsWith('/') ? outputPath : `${outputPath}/`;

  // Ensure the verifier smart contract ends with `.sol`
  const outputWithSol = outputName.endsWith('.sol') ? outputName : `${outputName}.sol`;

  return new Promise((resolve, reject) => {
    const zokrates = spawn(
      '/app/zokrates',
      [
        'export-verifier',
        '-i',
        codePath,
        '-o',
        `${parsedOutputPath}${outputWithSol}`,
        '-s',
        provingScheme,
      ],
      {
        stdio: ['ignore', 'pipe', 'pipe'],
        env: {
          ZOKRATES_HOME: '/app/stdlib',
        },
      },
    );

    let output = '';

    zokrates.stdout.on('data', data => {
      if (verbose) {
        output += data.toString('utf8');
        // If the entire output gets too large, just send ...[truncated].
        if (output.length > maxReturn) output = '...[truncated]';
      }
    });

    zokrates.stderr.on('data', err => {
      reject(new Error(`Export verifier failed: ${err}`));
    });

    zokrates.on('close', () => {
      // ZoKrates sometimes outputs error through stdout instead of stderr,
      // so we need to catch those errors manually.
      if (output.includes('panicked')) {
        reject(new Error(output.slice(output.indexOf('panicked'))));
      }
      if (verbose) resolve(output);
      else resolve();
    });
  });
}

module.exports = exportVerifier;
