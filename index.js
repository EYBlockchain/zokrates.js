const compile = require('./lib/compile');
const computeWitness = require('./lib/compute-witness');
const exportVerifier = require('./lib/export-verifier');
const generateProof = require('./lib/generate-proof');
const setup = require('./lib/setup');

module.exports = {
  compile,
  computeWitness,
  exportVerifier,
  generateProof,
  setup,
};
