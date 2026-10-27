const createJestConfig = require('./create.jest.config.js');
const pack = require('./package');

module.exports = {
  ...createJestConfig(pack),
  globals: { 'ts-jest': { tsConfig: { jsx: 'react-jsx' } } },
};
