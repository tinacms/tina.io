module.exports = function createJestConfig(pack) {
  return {
    verbose: true,
    transform: {
      '.(ts|tsx)': 'ts-jest',
    },
    testRegex: '(\\.test)\\.(ts|tsx|js)$',
    modulePaths: ['<rootDir>/', '<rootDir>/node_modules/'],
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    displayName: pack.name,
    name: pack.name,
    moduleNameMapper: {
      // strip the node: protocol so this jest version can resolve core modules
      '^node:(.*)$': '$1',
      // mirror the tsconfig `@/*` path aliases so tests can import modules that
      // use them (e.g. getSeo -> defaultSeo -> @/content/settings/config.json)
      '^@/content/(.*)$': '<rootDir>/content/$1',
      '^@/public/(.*)$': '<rootDir>/public/$1',
      '^@/styles/(.*)$': '<rootDir>/styles/$1',
      '^@/utils/(.*)$': '<rootDir>/utils/$1',
      '^@/component/(.*)$': '<rootDir>/components/$1',
      '^@/(.*)$': '<rootDir>/src/$1',
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        '<rootDir>/../../__mocks__/fileMock.js',
      '\\.(css|scss)$': 'identity-obj-proxy',
    },
  };
};
