import {
    languages,
    LanguageCode,
    getLanguageCodeByTranslation,
    languageLabels,
} from '../../../src/constants/Languages';

describe('Languages', () => {
    it('should return language labels', () => {
        const labels = languageLabels();
        // @ts-ignore
        expect(labels).toEqual(Object.values(languages));
    });

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
