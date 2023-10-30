/* eslint-disable @typescript-eslint/unbound-method */
import GoogleTranslator from '../../../../../src/lib/translation/translators/GoogleTranslator';

describe('GoogleTranslator', () => {
    let translator: GoogleTranslator;

    beforeEach(() => {
        translator = new GoogleTranslator({
            to: 'fr',
            from: 'en',
            apiKey: 'fooBar123',
        });

        jest.spyOn(translator, 'fetchGoogleTranslation').mockImplementation(
            (value: string): Promise<string> => {
                return new Promise((resolve): void => {
                    if (value === 'Error') {
                        throw new Error();
                    }

                    resolve('Bonjour le monde!');
                });
            },
        );
    });

    it('should resolve the returned translation without Google when empty', async () => {
        expect(await translator.translate('')).toEqual('');
        // Ensure that fetchGoogleTranslation was not called during this test
        expect(translator.fetchGoogleTranslation).not.toHaveBeenCalled();
    });

    it('should resolve the returned translation from Google', async () => {
        expect(await translator.translate('Hello world!')).toEqual(
            'Bonjour le monde!',
        );
        // Ensure that fetchGoogleTranslation was called once during this test
        expect(translator.fetchGoogleTranslation).toHaveBeenCalledTimes(1);
    });

    it('should resolve undefined if it errors', async () => {
        expect(await translator.translate('Error')).toBeUndefined();
        // Ensure that fetchGoogleTranslation was called once during this test
        expect(translator.fetchGoogleTranslation).toHaveBeenCalledTimes(1);
    });
});
