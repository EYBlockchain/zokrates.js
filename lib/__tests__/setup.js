const fs = require('fs');
const setup = require('../setup');
const deleteFile = require('../utils/utils');

it('should throw an error if file path does not exists', async () => {
  expect.assertions(1);
  await expect(setup('./foo', './code/', 'gm17', 'test-vk', 'test-pk')).rejects.toThrow(Error);
});

it('should throw an error if input file ends with .code', async () => {
  expect.assertions(1);
  await expect(
    setup('./code/test-compiled.code', './code/', 'gm17', 'test-vk', 'test-pk'),
  ).rejects.toThrow(Error);
});

it('should create the given output file with default names', async () => {
  expect.assertions(2);
  await setup('./code/test-compiled', './code/test/', 'gm17', undefined, undefined);
  expect(fs.existsSync('./code/test/verification.key')).toBe(true);
  expect(fs.existsSync('./code/test/proving.key')).toBe(true);
  deleteFile('./code/test/verification.key');
  deleteFile('./code/test/proving.key');
});

it('should allow G16, PGHR13, GM17 proving schemes', async () => {
  expect.assertions(3);
  const basePath = './code/test/';
  const vkPath = `${basePath}test-vk.key`;
  const pkPath = `${basePath}test-pk.key`;

  const provingSchemes = ['g16', 'pghr13', 'gm17'];
  // eslint-disable-next-line no-restricted-syntax
  for (const schemes of provingSchemes) {
    // eslint-disable-next-line no-await-in-loop
    await setup('./code/test-compiled', './code/test/', schemes, 'test-vk', 'test-pk');
    expect(fs.existsSync(vkPath) && fs.existsSync(pkPath)).toBe(true);
    deleteFile('./code/test/test-vk.key');
    deleteFile('./code/test/test-pk.key');
  }
});

it('should return a string given a verbose flag', async () => {
  const output = await setup('./code/test-compiled', './code/', 'gm17', undefined, undefined, {
    verbose: true,
  });
  expect(typeof output).toBe('string');
});
