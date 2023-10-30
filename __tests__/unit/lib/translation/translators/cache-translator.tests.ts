import MockCacheProvider from '../../../../../__mocks__/cache-provider';
import CacheTranslator from '../../../../../src/lib/translation/translators/CacheTranslator';

const cacher = new MockCacheProvider();

describe('CacheTranslator', () => {
    let translator: CacheTranslator;
    let fetchGoogleTranslation: jest.SpyInstance;

    beforeEach(() => {
        translator = new CacheTranslator(
            { to: 'fr', from: 'en', apiKey: 'fooBar123' },
            cacher,
        );

        fetchGoogleTranslation = jest
            .spyOn(translator, 'fetchGoogleTranslation')
            .mockImplementation((value: string): Promise<string> => {
                return new Promise((resolve): void => {
                    if (value === 'Error') {
                        throw new Error();
                    }

                    resolve('Bonjour le monde!');
                });
            });
    });

    it('should resolve the returned translation without cache when empty', async () => {
        expect(await translator.translate('')).toEqual('');
        // Ensure that fetchGoogleTranslation was not called during this test
        expect(fetchGoogleTranslation).not.toHaveBeenCalled();
    });

    it('should use the cached value when available', async () => {
        expect(await translator.translate('My menu')).toEqual('Mon menu');
        expect(fetchGoogleTranslation).not.toHaveBeenCalled();
    });

    it('should fetch google when no cache available', async () => {
        expect(cacher.cache.fr['Hello world!']).toBeUndefined();

        expect(await translator.translate('Hello world!')).toEqual(
            'Bonjour le monde!',
        );

        expect(fetchGoogleTranslation).toHaveBeenCalled();
        expect(cacher.cache.fr['Hello world!']).toEqual('Bonjour le monde!');
    });
});
