const childProcess = require('child_process');
const fs = require('fs');

const { spawn } = childProcess;

/**
 * Takes in a proving key and a compiled code file and outputs a proof.
 *
 * TODO: Needs to check that files and whatnot all exist.
 * TODO: Haven't been able to test it yet, I need values from the Nightfall repository.
 *
 * @example
 * generateProof('./code/ft-mint/ft-mint-pk.key',
 *   './code/ft-mint/ft-mint-compiled',
 *   'gm17',
 *   {
 *     createFile: true,
 *     directory: './code/ft-mint',
 *     fileName: 'ft-mint-proof.json',
 *   },
 * );
 *
 * @param {String} provingKeyPath - Path to proving key
 * @param {String} codePath - Path to code file (Result of compile that doesn't end in .code)
 * @param {String} provingScheme - Available options are G16, PGHR13, GM17
 * @param {Object} [options] - Options for output
 * @param {Boolean} options.createFile - Whether or not to output a json file
 * @param {String} [options.directory=./] - Directory to output files in
 * @param {String} [options.fileName=proof.json] - Name of JSON proof file ()
 * @returns {Object} JSON of the proof.
 */
async function generateProof(provingKeyPath, codePath, provingScheme, options) {
  if (!fs.existsSync(codePath)) {
    throw new Error('generate-proof codePath input file(s) not found');
  }

  if (!fs.existsSync(provingKeyPath)) {
    throw new Error('generate-proof proving key path file not found');
  }

  if (codePath.endsWith('.code')) {
    throw new Error("Expected the compiled code that didn't end in .code");
  }

  if (!provingKeyPath.endsWith('.key')) {
    throw new Error('Expected a .key file');
  }

  // Whether we need to create a file or not.
  const createFile = options && options.createFile;

  const args = ['export-verifier', '-i', codePath, '-s', provingScheme];

  if (createFile) {
    // Ensure path ends with '/'
    const { directory } = options;
    const parsedOutputPath = directory.endsWith('/') ? directory : `${directory}/`;

    const { fileName } = options;
    const parsedFileName = fileName.endsWith('.json') ? fileName : `${fileName}.json`;

    args.push('-o');
    args.push(`${parsedOutputPath}${parsedFileName}`);
  }

  // TODO: I don't believe this actually returns anything,
  // need to return to this when I can test off the Nightfall repo.
  return new Promise(resolve => {
    const zokrates = spawn('/app/zokrates', args, {
      stdio: 'ignore',
      env: {
        ZOKRATES_HOME: '/app/stdlib',
      },
    });

    zokrates.on('close', () => {
      resolve();
    });
  });
}

module.exports = generateProof;
