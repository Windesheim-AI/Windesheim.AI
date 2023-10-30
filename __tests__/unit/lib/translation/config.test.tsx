import {
    getTranslateApiUrl,
    isTranslationInBlacklist,
} from '../../../../src/lib/translation/Config';
import { TranslationOptions } from '../../../../src/lib/translation/Types'; // Update the import path

describe('Translation Utilities', () => {
    describe('getTranslateApiUrl', () => {
        it('should generate a valid translation API URL', () => {
            const options: TranslationOptions = {
                from: 'en',
                to: 'fr',
                apiKey: 'your-api-key',
            };
            const value = 'Hello, world!';
            const expectedUrl = `https://translation.googleapis.com/language/translate/v2?source=en&target=fr&key=your-api-key&q=Hello, world!&format=text`;
            expect(getTranslateApiUrl(options, value)).toBe(expectedUrl);
        });
    });

    describe('isTranslationInBlacklist', () => {
        it('should return true for a value in the blacklist', () => {
            const value = 'Community of Practice';
            expect(isTranslationInBlacklist(value)).toBe(true);
        });

        it('should return false for a value not in the blacklist', () => {
            const value = 'Non-blacklisted term';
            expect(isTranslationInBlacklist(value)).toBe(false);
        });

        it('should handle case-insensitive matches', () => {
            const value = 'community OF pRActiCe';
            expect(isTranslationInBlacklist(value)).toBe(false);
        });
    });
});
