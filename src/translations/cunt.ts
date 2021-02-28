import { EN } from './en';

/**
 * By popular request, the language mode where every translation is the word cunt.
 */
function generateTranslations() {
    return Object.keys(EN).reduce((acc, key) => {
        acc[key] = 'cunt';
        return acc;
    }, {});
}

export const CUNT = generateTranslations();
