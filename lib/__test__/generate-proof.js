// TODO: Not real tests.

const generateProof = require('../generate-proof');

generateProof('./code/test-pk.key', './code/test-compiled', './code/test-witness', 'gm17', {
  createFile: true,
  directory: './code/',
  fileName: 'test-proof.json',
});
