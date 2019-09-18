const childProcess = require('child_process');

const { spawn } = childProcess;
const fs = require('fs');

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
) {
  if (!fs.existsSync(codePath)) {
    throw new Error('Export-Verifier codePath input file(s) not found');
  }

  if (!fs.existsSync('./code/ft-mint/ft-mint-vk.key')) {
    throw new Error('ft-mint-vk-key file not found');
  }

  if (!codePath.endsWith('.key')) {
    throw new Error('export-verifier expects a .key file');
  }

  // Ensure path ends with '/'
  const parsedOutputPath = outputPath.endsWith('/') ? outputPath : `${outputPath}/`;

  // Ensure the verifier smart contract ends with `.sol`
  const outputWithSol = outputName.endsWith('.sol') ? outputName : `${outputName}.sol`;

  return new Promise(resolve => {
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

module.exports = exportVerifier;
