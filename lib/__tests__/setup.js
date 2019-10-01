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
  await setup('./code/test-compiled', './code/', 'gm17', undefined, undefined);
  expect(fs.existsSync('./code/verification.key')).toBe(true);
  expect(fs.existsSync('./code/proving.key')).toBe(true);
  deleteFile('./code/verification.key');
  deleteFile('./code/proving.key');
});

it('should allow G16, PGHR13, GM17 proving schemes', async () => {
  expect.assertions(3);
  const basePath = './code';
  const vkPath = `${basePath}/test-vk.key`;
  const pkPath = `${basePath}/test-pk.key`;

  const provingSchemes = ['g16', 'pghr13', 'gm17'];
  // eslint-disable-next-line no-restricted-syntax
  for (const schemes of provingSchemes) {
    deleteFile('./code/test-vk.key');
    deleteFile('./code/test-pk.key');
    // eslint-disable-next-line no-await-in-loop
    await setup('./code/test-compiled', './code/', schemes, 'test-vk', 'test-pk');
    expect(fs.existsSync(vkPath) && fs.existsSync(pkPath)).toBe(true);
  }
});
