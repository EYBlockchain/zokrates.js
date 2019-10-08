const fs = require('fs');
const generateProof = require('../generate-proof');
const deleteFile = require('../utils/utils');

it('should throw an error if code path or proving key path does not exists', async () => {
  expect.assertions(2);
  await expect(
    generateProof('./foo', './code/test-compiled', './code/test-witness', 'gm17', {
      createFile: true,
      directory: './code/',
      fileName: 'test-proof.json',
    }),
  ).rejects.toThrow(Error);

  await expect(
    generateProof('./code/test-pk.key', './foo', './code/test-witness', 'gm17', {
      createFile: true,
      directory: './code/',
      fileName: 'test-proof.json',
    }),
  ).rejects.toThrow(Error);
});

it('should throw an error if code path ends with ".code"', async () => {
  expect.assertions(1);
  await expect(
    generateProof(
      './code/test-pk.key',
      './code/test-compiled.code',
      './code/test-witness',
      'gm17',
      {
        createFile: true,
        directory: './code/',
        fileName: 'test-proof.json',
      },
    ),
  ).rejects.toThrow(Error);
});

it('should create the given output file', async () => {
  deleteFile('./code/test-proof.json');
  await generateProof('./code/test-pk.key', './code/test-compiled', './code/test-witness', 'gm17', {
    createFile: true,
    directory: './code/',
    fileName: 'test-proof.json',
  });
  expect(fs.existsSync('./code/test-proof.json')).toBe(true);
});

it('should create a file named "proof.json" if no output file specified', async () => {
  await generateProof('./code/test-pk.key', './code/test-compiled', './code/test-witness', 'gm17', {
    createFile: true,
    directory: './code/',
    fileName: undefined,
  });
  expect(fs.existsSync('./code/proof.json')).toBe(true);
  deleteFile('./code/proof.json');
});
