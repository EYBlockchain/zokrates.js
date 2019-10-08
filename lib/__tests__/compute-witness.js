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
  deleteFile('./code/test-witness');
  await computeWitness('./code/test-compiled', './code/', 'test-witness', [5, 25]);
  expect(fs.existsSync('./code/test-witness')).toBe(true);
});

it('should create a file called "witness" if no argument is given in outputName', async () => {
  await computeWitness('./code/test-compiled', './code/', undefined, [5, 25]);
  expect(fs.existsSync('./code/witness')).toBe(true);
  deleteFile('./code/witness');
});
