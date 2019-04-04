const baseConfig = require('@kube-js/tscommons/configs/jest.config.js');

module.exports = {
  ...baseConfig,
  moduleFileExtensions: ['json', 'ts', 'js', 'jsx', 'tsx', 'node'],
};
