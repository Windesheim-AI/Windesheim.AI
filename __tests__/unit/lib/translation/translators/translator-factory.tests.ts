import MockCacheProvider from '../../../../../__mocks__/cache-provider';
import CacheTranslator from '../../../../../src/lib/translation/translators/CacheTranslator';
import GoogleTranslator from '../../../../../src/lib/translation/translators/GoogleTranslator';
import IdenticalTranslator from '../../../../../src/lib/translation/translators/IdenticalTranslator';
import { translatorFactory } from '../../../../../src/lib/translation/translators/TranslatorFactory';

describe('TranslatorFactory', () => {
    it('should return IdenticalTranslator when languages are the same', () => {
        const translator = translatorFactory.create({
            to: 'en',
            from: 'en',
            apiKey: 'blabla123',
        });

        expect(translator).toBeInstanceOf(IdenticalTranslator);
    });
    it('should return CacheTranslator when cacheProvider is included', () => {
        const translator = translatorFactory.create(
            {
                to: 'fr',
                from: 'en',
                apiKey: 'blabla123',
            },
            new MockCacheProvider(),
        );

        expect(translator).toBeInstanceOf(CacheTranslator);
    });
    it('should return GoogleTranslator when cacheProvider is ommitted', () => {
        const translator = translatorFactory.create({
            to: 'fr',
            from: 'en',
            apiKey: 'blabla123',
        });

        expect(translator).toBeInstanceOf(GoogleTranslator);
    });
});
