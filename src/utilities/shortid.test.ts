import { shortId } from './shortid';
describe('<Unit test> Short id', () => {
    test('should generate a string of X length', () => {
        expect(shortId(5).length).toBe(5);
    });
});
