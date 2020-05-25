module.exports = {
    globals: {
        // jest requires updates to use along side react and next
        // https://medium.com/@kjaer/setting-up-jest-and-enzyme-for-typescript-next-js-apps-ce383167643
        'ts-jest': {
            tsConfig: 'tsconfig.jest.json',
            diagnostics: false,
        },
    },
    preset: 'ts-jest',
    cacheDirectory: '<rootDir>/jest-cache',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$': 'jest-transform-stub',
    },
    moduleNameMapper: {
        '\\.css$': '<rootDir>/src/__tests__/css-module.stub.ts', // <-- had to pop this in the following day to get any separetly imported .css files mapped to an empty module / object. So if i try to do import 'react-style-module/styles/my-styles.css' it would fail, though 'import './styles.css' worked. Now with this mapped correctly also, everything is imported/mapped/passing successfully.
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    testRegex: '.*\\.test\\.tsx?$',
};
