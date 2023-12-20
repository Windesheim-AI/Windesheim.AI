import {
    LanguageCode,
    getLanguageCodeByTranslation,
} from '../../../src/lib/translations/languageOptions';

describe('Languages', () => {
    it('should get language code by translations', () => {
        const translation = 'Nederlands';
        const languageCode = getLanguageCodeByTranslation(translation);
        const expectedCode: LanguageCode = 'nl';
        expect(languageCode).toBe(expectedCode);
    });

    it('should return undefined for an unknown translations', () => {
        const translation = 'Unknown Language';
        const languageCode = getLanguageCodeByTranslation(translation);
        expect(languageCode).toBeUndefined();
    });
});
