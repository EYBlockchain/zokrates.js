const fs = require('fs');
const exportVerifier = require('../export-verifier');
const deleteFile = require('../utils/utils');

it('should throw an error if file path does not exists', async () => {
  expect.assertions(1);
  await expect(exportVerifier('./foo', './code/', 'test-verifier', 'gm17')).rejects.toThrow(Error);
});

it('should throw an error if input file does not end with ".key"', async () => {
  expect.assertions(1);
  await expect(
    exportVerifier('./code/test-vk', './code/', 'test-verifier', 'gm17'),
  ).rejects.toThrow(Error);
});

it('should create the given output file', async () => {
  await exportVerifier('./code/test-vk.key', './code/test/', 'test-verifier', 'gm17');
  expect(fs.existsSync('./code/test/test-verifier.sol')).toBe(true);
  deleteFile('./code/test/test-verifier.sol');
});

it('should create a file called "Verifier.sol" if no argument is given in outputName', async () => {
  await exportVerifier('./code/test-vk.key', './code/test/', undefined, 'gm17');
  expect(fs.existsSync('./code/test/Verifier.sol')).toBe(true);
  deleteFile('./code/test/Verifier.sol');
});

it('should return a string given a verbose flag', async () => {
  const output = await exportVerifier('./code/test-vk.key', './code/test/', undefined, 'gm17', {
    verbose: true,
  });
  expect(typeof output).toBe('string');
});
