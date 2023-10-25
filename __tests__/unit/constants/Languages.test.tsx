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

    it('should get language code by translation', () => {
        const translation = 'Español';
        const languageCode = getLanguageCodeByTranslation(translation);
        const expectedCode: LanguageCode = 'es';
        expect(languageCode).toBe(expectedCode);
    });

    it('should return undefined for an unknown translation', () => {
        const translation = 'Unknown Language';
        const languageCode = getLanguageCodeByTranslation(translation);
        expect(languageCode).toBeUndefined();
    });
});
