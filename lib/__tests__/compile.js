const fs = require('fs');
const compile = require('../compile');
const deleteFile = require('../utils/utils');

it('should throw an error if file path does not exists', async () => {
  expect.assertions(1);
  await expect(compile('./foo', './code/', 'test-compiled')).rejects.toThrow(Error);
});

it('should throw an error if file type is incorrect', async () => {
  expect.assertions(1);
  await expect(compile('./code/test', './code/', 'test-compiled')).rejects.toThrow(Error);
});

it('should create the given output file', async () => {
  deleteFile('./code/test-compiled.code');
  await compile('./code/test.code', './code/', 'test-compiled');
  expect(fs.existsSync('./code/test-compiled.code')).toBe(true);
});

it('should return a string given a verbose flag', async () => {
  const output = await compile('./code/test.code', './code/', 'test-compiled', {
    verbose: true,
  });
  expect(typeof output).toBe('string');
});
