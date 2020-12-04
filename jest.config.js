module.exports = {
    globals: {},
    cacheDirectory: '<rootDir>/jest-cache',
    transform: {
        '^.+\\.(t|j)sx?$': [
            '@swc-node/jest',
            // configuration
            {
                dynamicImport: true,
                sourcemap: true,
            },
        ],
        '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$': 'jest-transform-stub',
    },
    moduleNameMapper: {
        '\\.css$': '<rootDir>/src/__tests__/css-module.stub.ts', // <-- had to pop this in the following day to get any separetly imported .css files mapped to an empty module / object. So if i try to do import 'react-style-module/styles/my-styles.css' it would fail, though 'import './styles.css' worked. Now with this mapped correctly also, everything is imported/mapped/passing successfully.
    },
    modulePaths: ['<rootDir>'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    testRegex: '.*\\.test\\.tsx?$',
    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
};
