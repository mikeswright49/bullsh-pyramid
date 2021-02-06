const config = require('./jest.config');

module.exports = Object.assign({}, config, {
    globals: {
        // jest requires updates to use along side react and next
        // https://medium.com/@kjaer/setting-up-jest-and-enzyme-for-typescript-next-js-apps-ce383167643
        'ts-jest': {
            tsconfig: 'tsconfig.jest.json',
            diagnostics: false,
        },
    },
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$': 'jest-transform-stub',
    },
});
