import { Translations } from 'src/providers/translation-provider';

export const MOCK_TRANSLATIONS: Translations = {
    translate: jest.fn().mockImplementation((key) => key),
    translations: {},
};
