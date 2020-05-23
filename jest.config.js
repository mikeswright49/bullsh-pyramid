module.exports = {
    globals: {
        // jest requires updates to use along side react and next
        // https://medium.com/@kjaer/setting-up-jest-and-enzyme-for-typescript-next-js-apps-ce383167643
        'ts-jest': {
            tsConfig: 'tsconfig.jest.json',
        },
    },
    preset: 'ts-jest',
    cacheDirectory: '<rootDir>/jest-cache',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$': 'jest-transform-stub',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    testRegex: '.*\\.test\\.tsx?$',
};
