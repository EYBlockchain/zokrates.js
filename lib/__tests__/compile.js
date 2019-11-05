const fs = require('fs');
const compile = require('../compile');
const deleteFile = require('../utils/utils');

it('should throw an error if file path does not exists', async () => {
  expect.assertions(1);
  await expect(compile('./foo', './code/test/', 'test-compiled')).rejects.toThrow(Error);
});

it('should throw an error if file type is incorrect', async () => {
  expect.assertions(1);
  await expect(compile('./code/test', './code/test/', 'test-compiled')).rejects.toThrow(Error);
});

it('should create the given output file', async () => {
  await compile('./code/test.code', './code/test/', 'test-compiled');
  expect(fs.existsSync('./code/test/test-compiled.code')).toBe(true);
  deleteFile('./code/test/test-compiled.code');
});

it('should return a string given a verbose flag', async () => {
  const output = await compile('./code/test.code', './code/test/', 'test-compiled', {
    verbose: true,
  });
  expect(typeof output).toBe('string');
});
