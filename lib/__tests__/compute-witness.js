const fs = require('fs');
const computeWitness = require('../compute-witness');
const deleteFile = require('../utils/utils');

it('should throw an error if file path does not exists', async () => {
  expect.assertions(1);
  await expect(computeWitness('./foo', './code/', 'test-witness', [5, 25])).rejects.toThrow(Error);
});

it('should throw an error if input file ends with .code', async () => {
  expect.assertions(1);
  await expect(
    computeWitness('./code/test-compiled.code', './code/', 'test-witness', [5, 25]),
  ).rejects.toThrow(Error);
});

it('should create the given output file', async () => {
  await computeWitness('./code/test-compiled', './code/test/', 'test-witness', [5, 25]);
  expect(fs.existsSync('./code/test/test-witness')).toBe(true);
  deleteFile('./code/test/test-witness');
});

it('should create a file called "witness" if no argument is given in outputName', async () => {
  await computeWitness('./code/test-compiled', './code/test/', undefined, [5, 25]);
  expect(fs.existsSync('./code/test/witness')).toBe(true);
  deleteFile('./code/test/witness');
});

it('should return a string given a verbose flag', async () => {
  const output = await computeWitness('./code/test-compiled', './code/test/', undefined, [5, 25], {
    verbose: true,
  });
  expect(typeof output).toBe('string');
});
