import { getRandomInt } from './random';

export function shortId(length = 3): string {
    let response = '';
    const ASCII_A = 97;
    const ASCII_Z = 122;

    for (let i = 0; i < length; i++) {
        response += String.fromCharCode(getRandomInt(ASCII_A, ASCII_Z + 1));
    }

    return response;
}
