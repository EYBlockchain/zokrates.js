// TODO: Not real tests.

const generateProof = require('../compute-witness');

generateProof('./code/ft-mint/ft-mint-pk.key', './code/ft-mint/ft-mint-compiled', 'gm17', {
  createFile: true,
  directory: './code/ft-mint',
  fileName: 'ft-mint-proof.json',
});
